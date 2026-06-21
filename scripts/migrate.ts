import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runMigrations() {
  const connectionString = process.env.SUPABASE_DATABASE_URL;
  if (!connectionString) {
    throw new Error('SUPABASE_DATABASE_URL is not defined in .env.local');
  }

  const migrationClient = postgres(connectionString, { max: 1 });

  console.log('Running direct table creation...');
  
  await migrationClient`
    CREATE TABLE IF NOT EXISTS "admin_users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" varchar(255) NOT NULL,
      "password_hash" varchar(255) NOT NULL,
      "name" varchar(100) NOT NULL,
      "role" varchar(20) DEFAULT 'admin' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "admin_users_email_unique" UNIQUE("email")
    );
  `;

  await migrationClient`
    CREATE TABLE IF NOT EXISTS "inquiries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "sender_name" varchar(255) NOT NULL,
      "sender_email" varchar(255) NOT NULL,
      "company" varchar(255),
      "message" text NOT NULL,
      "status" varchar(20) DEFAULT 'unread' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `;

  // Try creating products just in case it doesn't exist
  await migrationClient`
    CREATE TABLE IF NOT EXISTS "products" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" varchar(255) NOT NULL,
      "description" text NOT NULL,
      "price" numeric(15, 2) DEFAULT '0' NOT NULL,
      "stock" integer DEFAULT 0 NOT NULL,
      "category_id" uuid NOT NULL,
      "image_url" varchar(500),
      "status" varchar(20) DEFAULT 'active' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `;

  console.log('Tables created successfully.');

  await migrationClient.end();
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
