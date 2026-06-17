import { pgTable, uuid, varchar, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const companyProfile = pgTable('company_profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  tagline: varchar('tagline', { length: 300 }),
  aboutHtml: text('about_html'),
  vision: text('vision'),
  mission: text('mission'),
  values: jsonb('values').default([]),
  foundedYear: integer('founded_year'),
  address: text('address'),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  whatsapp: varchar('whatsapp', { length: 50 }),
  businessHours: varchar('business_hours', { length: 200 }),
  mapsEmbedUrl: text('maps_embed_url'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const companyCertifications = pgTable('company_certifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: uuid('company_id').references(() => companyProfile.id).notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  issuer: varchar('issuer', { length: 150 }),
  issuedYear: integer('issued_year'),
  imageUrl: varchar('image_url', { length: 500 }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: uuid('company_id').references(() => companyProfile.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  position: varchar('position', { length: 150 }).notNull(),
  role: varchar('role', { length: 20 }).notNull(), // 'leadership' | 'management'
  bio: text('bio'),
  photoUrl: varchar('photo_url', { length: 500 }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const companyProfileRelations = relations(companyProfile, ({ many }) => ({
  certifications: many(companyCertifications),
  teamMembers: many(teamMembers),
}));

export const companyCertificationsRelations = relations(companyCertifications, ({ one }) => ({
  company: one(companyProfile, {
    fields: [companyCertifications.companyId],
    references: [companyProfile.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  company: one(companyProfile, {
    fields: [teamMembers.companyId],
    references: [companyProfile.id],
  }),
}));
