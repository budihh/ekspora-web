import fs from 'fs';
import path from 'path';
import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@supabase/supabase-js';

async function main() {
  console.log('🚀 Starting Knowledge Base Ingestion...');

  // Ensure environment variables are loaded
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Supabase environment variables.');
    process.exit(1);
  }

  // 1. Read the Markdown file
  const filePath = path.join(process.cwd(), 'Ekspora_Knowledge_Base_RAG.md');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found at ${filePath}. Please ensure Ekspora_Knowledge_Base_RAG.md is in the project root.`);
    process.exit(1);
  }

  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  console.log(`✅ Read ${filePath}`);

  // 2. Chunking Strategy
  // Split by "## PILAR" using a positive lookahead to keep the heading inside the chunk
  const chunks = markdownContent
    .split(/(?=## PILAR)/g)
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0);

  console.log(`📦 Generated ${chunks.length} chunks from the document.`);

  // 3. Database Initialization
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  console.log('✅ Connected to Supabase');

  // 4. Embedding and Insertion Loop
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Extract a title for metadata (optional, just grabbing the first line)
    const titleMatch = chunk.match(/^(.*)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `Chunk ${i + 1}`;

    console.log(`⏳ Processing: ${title}`);

    try {
      // Generate embedding using ai-sdk
      const { embedding } = await embed({
        model: google.embedding('gemini-embedding-001'),
        value: chunk,
        // Force 768 dimensions to match your Supabase pgvector schema
        providerOptions: {
          google: {
            outputDimensionality: 768,
            taskType: 'RETRIEVAL_DOCUMENT',
          },
        },
      });

      // Insert into the product_knowledge table
      const { error } = await supabase.from('product_knowledge').insert({
        content: chunk,
        embedding: embedding,
        metadata: { source: 'Ekspora_Knowledge_Base_RAG.md', title }
      });

      if (error) throw error;

      console.log(`✅ Inserted: ${title}`);
    } catch (error) {
      console.error(`❌ Failed to process or insert chunk: ${title}`);
      console.error(error instanceof Error ? error.message : error);
    }
  }

  console.log('🎉 Ingestion complete!');
}

main().catch(console.error);
