import { pgTable, uuid, varchar, text, boolean, numeric, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { categories } from './categories';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  description: text('description').notNull(),
  shortDesc: varchar('short_desc', { length: 300 }),
  specifications: jsonb('specifications').default({}),
  origin: varchar('origin', { length: 100 }),
  priceMin: numeric('price_min', { precision: 15, scale: 2 }),
  priceMax: numeric('price_max', { precision: 15, scale: 2 }),
  moq: integer('moq'),
  moqUnit: varchar('moq_unit', { length: 50 }),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  isFeatured: boolean('is_featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  altText: varchar('alt_text', { length: 200 }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
