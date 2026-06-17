import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { vector } from 'drizzle-orm/pg-core'; // Requires pgvector extension

export const knowledgeEmbeddings = pgTable('knowledge_embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: varchar('entity_type', { length: 30 }).notNull(), // 'product' | 'category' | 'company'
  entityId: uuid('entity_id').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }).notNull(),
  content: text('content').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
