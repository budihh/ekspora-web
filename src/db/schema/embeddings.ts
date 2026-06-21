import { pgTable, uuid, text, jsonb } from 'drizzle-orm/pg-core';
import { customType } from 'drizzle-orm/pg-core';
import { products } from './products';

const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'vector(3072)';
  },
  toDriver(value: number[]): string {
    return JSON.stringify(value);
  },
});

export const productEmbeddings = pgTable('product_embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  embedding: vector('embedding'),
});
