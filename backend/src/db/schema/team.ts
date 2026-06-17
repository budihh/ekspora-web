import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const team_members = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  imageUrl: text('image_url'),
});
