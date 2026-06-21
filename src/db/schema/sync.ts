import { pgTable, uuid, varchar, jsonb, integer, timestamp } from 'drizzle-orm/pg-core';

export const aiSyncLogs = pgTable('ai_sync_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  modules: jsonb('modules').notNull(),
  status: varchar('status', { length: 50 }).notNull(), // pending, processing, success, failed
  progress: integer('progress').notNull().default(0),
  logs: jsonb('logs').notNull().default([]), // Array of log strings
  duration: varchar('duration', { length: 50 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
