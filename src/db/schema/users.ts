import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('admin'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
