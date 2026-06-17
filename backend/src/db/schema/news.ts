import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title_en'),
  content: text('content_en'),
  date: text('date_en'),
  imageUrl: text('image_url'),
});
