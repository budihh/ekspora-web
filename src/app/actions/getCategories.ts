"use server";

import { createClient } from '@vercel/postgres';

export async function getCategories() {
  try {
    const client = createClient({
      connectionString: process.env.SUPABASE_DATABASE_URL,
    });
    await client.connect();

    try {
      const result = await client.sql`select "slug", "name_en" from "categories"`;
      return result.rows;
    } finally {
      await client.end();
    }
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    const detailError = `Code: ${error?.code || 'N/A'} | Cause: ${error?.cause ? String(error.cause) : 'N/A'} | Msg: ${error?.message}`;
    return { error: detailError };
  }
}
