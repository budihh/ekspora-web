import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name_en').notNull().unique(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 255 }),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
