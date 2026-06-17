import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as categoriesSchema from './schema/categories';
import * as productsSchema from './schema/products';
import * as companySchema from './schema/company';
import * as embeddingsSchema from './schema/embeddings';
import * as usersSchema from './schema/users';

export const db = drizzle(sql, {
  schema: {
    ...categoriesSchema,
    ...productsSchema,
    ...companySchema,
    ...embeddingsSchema,
    ...usersSchema,
  }
});
