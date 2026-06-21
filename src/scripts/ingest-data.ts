import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@vercel/postgres";
import * as dotenv from "dotenv";

// Load environment variables for local script execution
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

async function ingestData() {
  console.log("Starting data ingestion...");

  const client = createClient({
    connectionString: process.env.SUPABASE_DATABASE_URL,
  });

  try {
    await client.connect();

    // 1. Clear existing data to prevent duplicates on multiple runs
    console.log("Clearing existing product_knowledge entries...");
    await client.sql`TRUNCATE TABLE product_knowledge;`;

    // 2. Fetch data directly via client.sql
    const { rows: allCategories } = await client.sql`SELECT * FROM categories`;
    console.log(`Found ${allCategories.length} categories to ingest.`);

    // 3. Process and insert
    for (const item of allCategories) {
      const text = `Product Category: ${item.name_en}. Details: ${item.description || 'No description'}`;
      console.log(`Processing: ${item.name_en}`);
      
      try {
        // Generate Embedding using Gemini (try new model first, fallback to stable)
        let embeddingValues;
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
          const result = await model.embedContent({
            content: { role: 'user', parts: [{ text }] },
          });
          embeddingValues = result.embedding.values;
        } catch (embedError: any) {
          throw embedError;
        }

        // Insert into the vector table
        await client.sql`
          INSERT INTO product_knowledge (content, embedding, metadata)
          VALUES (${text}, ${JSON.stringify(embeddingValues)}::vector, ${JSON.stringify({ id: item.id, slug: item.slug })}::jsonb)
        `;
        console.log(`  \u2714\uFE0F Successfully ingested ${item.name_en}`);
      } catch (itemError) {
        console.error(`  \u274C Failed to ingest category: ${item.name_en}`, itemError);
        // Continue to the next item instead of crashing the script
      }
    }
    
    console.log("Ingestion complete! \u2728");
  } catch (error) {
    console.error("Error during ingestion:", error);
  } finally {
    await client.end();
  }
}

ingestData().then(() => process.exit(0));
