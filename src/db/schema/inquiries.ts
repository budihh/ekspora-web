import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const inquiries = pgTable('inquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderName: varchar('sender_name', { length: 255 }).notNull(),
  senderEmail: varchar('sender_email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('unread'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
