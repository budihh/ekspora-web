"use server";

import { db } from '@/db';
import { adminUsers } from '@/db/schema/users';
import { products } from '@/db/schema/products';
import { categories } from '@/db/schema/categories';
import { inquiries } from '@/db/schema/inquiries';
import { eq, count, ilike, or, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { productSchema, categorySchema } from '@/lib/validations/admin';

// --- DASHBOARD ---
export async function getDashboardMetrics() {
  const [totalProducts] = await db.select({ count: count() }).from(products);
  const [totalCategories] = await db.select({ count: count() }).from(categories);
  const [newInquiries] = await db.select({ count: count() }).from(inquiries).where(eq(inquiries.status, 'unread'));

  return {
    products: totalProducts.count,
    categories: totalCategories.count,
    newInquiries: newInquiries.count,
  };
}

// --- PRODUCTS ---
export async function getAdminProducts(searchQuery?: string, categoryId?: string) {
  const conditions = [];

  if (searchQuery) {
    conditions.push(ilike(products.name, `%${searchQuery}%`));
  }
  
  if (categoryId) {
    conditions.push(eq(products.categoryId, categoryId));
  }

  return await db.query.products.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    with: {
      category: true,
    },
  });
}

export async function createProduct(data: any) {
  const result = productSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  await db.insert(products).values(result.data);
  revalidatePath('/admin/products');
  revalidatePath('/admin');
}

export async function updateProduct(id: string, data: any) {
  const result = productSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  await db.update(products).set(result.data).where(eq(products.id, id));
  revalidatePath('/admin/products');
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath('/admin/products');
  revalidatePath('/admin');
}

// --- CATEGORIES ---
export async function getAdminCategories(searchQuery?: string) {
  return await db.query.categories.findMany({
    where: searchQuery ? ilike(categories.name, `%${searchQuery}%`) : undefined,
    with: {
      products: {
        columns: {
          id: true
        }
      }
    }
  });
}

export async function createCategory(data: any) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  await db.insert(categories).values(result.data);
  revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, data: any) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
  await db.update(categories).set(result.data).where(eq(categories.id, id));
  revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath('/admin/categories');
}

// --- INQUIRIES ---
export async function getAdminInquiries(searchQuery?: string, filterStatus?: string) {
  const conditions = [];
  
  if (searchQuery) {
    conditions.push(
      or(
        ilike(inquiries.senderName, `%${searchQuery}%`),
        ilike(inquiries.senderEmail, `%${searchQuery}%`),
        ilike(inquiries.company, `%${searchQuery}%`)
      )
    );
  }
  
  if (filterStatus && filterStatus !== 'All Status') {
    conditions.push(eq(inquiries.status, filterStatus.toLowerCase()));
  }

  return await db.query.inquiries.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    orderBy: (inquiries, { desc }) => [desc(inquiries.createdAt)],
  });
}

export async function updateInquiryStatus(id: string, status: string) {
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}
