import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { categories } from './categories.js';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  name: text('name_en').notNull(),
  description: text('description_en').notNull(),
  moq: text('moq'),
  imageUrl: text('image_url'),
  status: text('status').notNull().default('active'),
});
