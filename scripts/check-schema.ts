import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function check() {
  const connectionString = process.env.SUPABASE_DATABASE_URL;
  if (!connectionString) {
    throw new Error('SUPABASE_DATABASE_URL is not defined in .env.local');
  }

  const sql = postgres(connectionString, { max: 1 });

  const columns = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products'`;
  console.log("Products table columns:");
  console.log(columns);

  const categories = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'categories'`;
  console.log("Categories table columns:");
  console.log(categories);

  await sql.end();
}

check().catch(console.error);
