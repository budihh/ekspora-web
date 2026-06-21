import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name_en').notNull(),
  slug: text('slug').notNull(),
  description: text('description_en'),
  annualVolume: text('annual_volume'),
  mainMarkets: text('main_markets'),
  imageUrl: text('image_url'),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
