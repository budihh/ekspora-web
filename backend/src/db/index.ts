import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as categoriesSchema from './schema/categories.js';
import * as productsSchema from './schema/products.js';
import * as companySchema from './schema/company.js';
import * as newsSchema from './schema/news.js';
import * as teamSchema from './schema/team.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

// Create postgres.js client for Drizzle
const client = postgres(connectionString, { ssl: 'require' });

// Create Drizzle instance with all schemas
export const db = drizzle(client, {
  schema: {
    ...categoriesSchema,
    ...productsSchema,
    ...companySchema,
    ...newsSchema,
    ...teamSchema,
  },
});

export { client };
