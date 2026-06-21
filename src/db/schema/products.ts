import { pgTable, uuid, varchar, text, numeric, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { categories } from './categories';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  name: text('name_en').notNull(),
  description: text('description_en').notNull(),
  moq: text('moq'),
  imageUrl: text('image_url'),
  status: text('status').notNull().default('active'),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
