import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { adminUsers } from '../src/db/schema/users';

dotenv.config({ path: '.env.local' });

async function main() {
  const connectionString = process.env.SUPABASE_DATABASE_URL;
  if (!connectionString) {
    throw new Error('SUPABASE_DATABASE_URL is not defined in .env.local');
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  console.log('Seeding admin user...');

  const passwordHash = await bcrypt.hash('password123', 10);

  try {
    // We use onConflictDoNothing to avoid crashing if run multiple times
    // Note: Drizzle's onConflictDoNothing requires a target in Postgres
    await db.insert(adminUsers).values({
      email: 'admin@ekspora.com',
      passwordHash,
      name: 'Admin Ekspora',
      role: 'superadmin',
    }).onConflictDoNothing({ target: adminUsers.email });

    console.log('Admin user seeded successfully. (Email: admin@ekspora.com, Password: password123)');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await client.end();
  }
}

main();
