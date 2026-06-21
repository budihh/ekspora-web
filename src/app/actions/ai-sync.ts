"use server";

import { db } from "@/db";
import { aiSyncLogs } from "@/db/schema/sync";
import { products } from "@/db/schema/products";
import { categories } from "@/db/schema/categories";
import { productEmbeddings } from "@/db/schema/embeddings";
import { eq, desc, inArray } from "drizzle-orm";
import { waitUntil } from "@vercel/functions";
import { embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function triggerSync(type: string, modules: string[]) {
  // Insert initial pending state
  const insertResult = await db.insert(aiSyncLogs).values({
    type,
    modules,
    status: 'processing',
    progress: 0,
    logs: [`[${new Date().toLocaleTimeString('en-GB')}] System: Initialization started...`],
  }).returning({ id: aiSyncLogs.id });

  const syncId = insertResult[0].id;

  // Fire and forget using waitUntil to prevent Vercel timeout
  waitUntil(runBackgroundSync(syncId, type, modules));

  return syncId;
}

export async function getSyncStatus(syncId: string) {
  const result = await db.select().from(aiSyncLogs).where(eq(aiSyncLogs.id, syncId));
  return result[0];
}

export async function getSyncHistory() {
  return await db.select().from(aiSyncLogs).orderBy(desc(aiSyncLogs.createdAt));
}

// Real AI Sync Job
async function runBackgroundSync(syncId: string, type: string, modules: string[]) {
  const startTime = Date.now();

  const updateLog = async (msg: string, progress: number, status: string = 'processing') => {
    const current = await db.select({ logs: aiSyncLogs.logs }).from(aiSyncLogs).where(eq(aiSyncLogs.id, syncId));
    const newLogs = [...(current[0]?.logs as string[] || []), `[${new Date().toLocaleTimeString('en-GB')}] ${msg}`];
    
    const duration = status !== 'processing' 
      ? `${Math.floor((Date.now() - startTime) / 1000)}s` 
      : null;

    await db.update(aiSyncLogs)
      .set({ logs: newLogs, progress, status, ...(duration ? { duration } : {}) })
      .where(eq(aiSyncLogs.id, syncId));
  };

  try {
    if (!modules.includes('Products') && !modules.includes('Categories')) {
      await updateLog("System: No eligible modules selected for embedding.", 100, 'Success');
      return;
    }

    await updateLog(`Info: Fetching active data for ${modules.join(', ')}...`, 10);
    
    const allProducts = await db.select().from(products);
    const allCategories = await db.select().from(categories);

    const categoryMap = new Map(allCategories.map(c => [c.id, c.name]));

    await updateLog(`Process: Preparing rich text chunks for ${allProducts.length} products...`, 30);
    
    const chunks: string[] = [];
    const productRefs: any[] = [];
    
    for (const prod of allProducts) {
      const categoryName = categoryMap.get(prod.categoryId) || 'Unknown Category';
      const richText = `Product Name: ${prod.name}\nCategory: ${categoryName}\nDescription: ${prod.description}\nMOQ: ${prod.moq || 'N/A'}\nStatus: ${prod.status}`;
      
      chunks.push(richText);
      productRefs.push({
        productId: prod.id,
        content: richText,
        metadata: {
          name: prod.name,
          categoryName,
          imageUrl: prod.imageUrl,
          moq: prod.moq,
        }
      });
    }

    if (chunks.length === 0) {
      await updateLog("System: No products found. Sync skipped.", 100, 'Success');
      return;
    }

    await updateLog(`Embedding: Generating vectors via Google gemini-embedding-001...`, 50);
    
    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel('gemini-embedding-001'),
      values: chunks,
    });

    await updateLog(`Processing: Upserting ${embeddings.length} vectors to Supabase pgvector...`, 80);
    
    const records = productRefs.map((ref, i) => ({
      productId: ref.productId,
      content: ref.content,
      metadata: ref.metadata,
      embedding: embeddings[i]
    }));

    if (type === 'Full Rebuild') {
      await db.delete(productEmbeddings);
    } else {
      const productIds = records.map(r => r.productId);
      if (productIds.length > 0) {
        await db.delete(productEmbeddings).where(inArray(productEmbeddings.productId, productIds));
      }
    }

    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await db.insert(productEmbeddings).values(batch);
    }

    await updateLog(`System: AI Sync completed successfully. ${records.length} vectors processed.`, 100, 'Success');

  } catch (error: any) {
    await db.update(aiSyncLogs)
      .set({ 
        status: 'Failed', 
        logs: [`[${new Date().toLocaleTimeString('en-GB')}] Error: ${error.message}`],
        duration: `${Math.floor((Date.now() - startTime) / 1000)}s`
      })
      .where(eq(aiSyncLogs.id, syncId));
  }
}
