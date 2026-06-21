import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as categoriesSchema from './schema/categories';
import * as productsSchema from './schema/products';
import * as usersSchema from './schema/users';
import * as inquiriesSchema from './schema/inquiries';
import * as syncSchema from './schema/sync';
import * as embeddingsSchema from './schema/embeddings';

const connectionString = process.env.SUPABASE_DATABASE_URL!;

// Disable prepare for serverless or connection pooling compatibility
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, {
  schema: {
    ...categoriesSchema,
    ...productsSchema,
    ...usersSchema,
    ...inquiriesSchema,
    ...syncSchema,
    ...embeddingsSchema,
  }
});
