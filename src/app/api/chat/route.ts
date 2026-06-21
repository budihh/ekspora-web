import { google } from '@ai-sdk/google';
import { streamText, type UIMessage, convertToModelMessages, embed } from 'ai';
import { createClient } from '@vercel/postgres';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Safe extraction to prevent "messages.some is not a function"
    let rawMessages: any[] = [];
    if (body.messages && Array.isArray(body.messages)) {
      rawMessages = body.messages;
    } else if (Array.isArray(body)) {
      rawMessages = body;
    }

    const messages = rawMessages as UIMessage[];
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    
    const queryText = (typeof (lastMessage as any)?.content === 'string' && (lastMessage as any).content)
      ? (lastMessage as any).content
      : ((lastMessage as any)?.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || '');

    let contextText = '';

    if (queryText) {
      try {
        const { embedding: queryEmbedding } = await embed({
          model: google.embedding('gemini-embedding-001'),
          value: queryText,
          providerOptions: { google: { outputDimensionality: 768 } },
        });

        const client = createClient({
          connectionString: process.env.SUPABASE_DATABASE_URL,
        });
        await client.connect();

        const { rows } = await client.sql`
          SELECT content, metadata 
          FROM match_product_knowledge(
            ${JSON.stringify(queryEmbedding)}::vector, 
            0.7, 
            5
          );
        `;

        await client.end();

        if (rows && rows.length > 0) {
          contextText = rows.map((row: any) => row.content).join('\n\n');
        }
      } catch (error) {
        console.error('RAG error:', error instanceof Error ? error.message : error);
      }
    }

    const systemPrompt = `You are the Ekspora AI Assistant, a professional and elegant corporate B2B representative for a global commodity supply chain company from Indonesia. Answer concisely and professionally.

Always respond in ENGLISH, translating the context if necessary, unless the user explicitly asks in another language.
Do NOT use any Markdown formatting in your response (no asterisks **, no hashes #, no underscores). Use plain text and simple line breaks to separate lists or paragraphs.

Use the following context to answer the user's question accurately. Combine information from multiple provided context chunks to form a complete, accurate, and professional response.
If the answer is not in the context, politely state that you don't have the specific details but can assist with general trade inquiries.

CONTEXT: ${contextText}`;

    // 3. Use the CORRECT native function (convertToModelMessages)
    const result = streamText({
      model: google(process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    // 4. Return the mandatory v5 format
    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error("Critical API Error in POST /api/chat:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}