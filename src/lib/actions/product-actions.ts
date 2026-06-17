'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Skema Validasi Zod untuk Produk dengan Type Safety Ketat
export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter").max(100),
  categoryId: z.string().uuid("ID Kategori tidak valid"),
  description: z.string().min(10, "Deskripsi terlalu singkat"),
  shortDesc: z.string().max(300).optional(),
  origin: z.string().max(100).optional(),
  priceMin: z.coerce.number().positive().optional().or(z.literal('')),
  priceMax: z.coerce.number().positive().optional().or(z.literal('')),
  moq: z.coerce.number().int().positive().optional().or(z.literal('')),
  moqUnit: z.string().max(50).optional(),
  status: z.enum(['active', 'inactive', 'draft']).default('active'),
  isFeatured: z.boolean().default(false),
  specifications: z.record(z.string(), z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

/**
 * Buat Produk Baru
 */
export async function createProduct(data: ProductFormValues) {
  try {
    // 1. Validasi Input Data
    const validatedData = productSchema.parse(data);
    
    // 2. Insert ke Database via Drizzle (Kerangka)
    // const newProduct = await db.insert(products).values({
    //   ...validatedData,
    //   slug: generateSlug(validatedData.name),
    // }).returning();
    
    // 3. Log Aksi Admin
    // await logAdminAction('CREATE_PRODUCT', 'product', newProduct[0].id);

    // 4. Invalidasi Cache ISR agar halaman publik langsung update
    revalidatePath('/catalog');
    revalidatePath('/commodities');
    if (validatedData.isFeatured) revalidatePath('/');

    return { success: true, message: "Produk berhasil ditambahkan" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validasi gagal", details: error.issues };
    }
    console.error("Error creating product:", error);
    return { success: false, error: "Terjadi kesalahan internal server" };
  }
}

/**
 * Update Data Produk
 */
export async function updateProduct(id: string, data: Partial<ProductFormValues>) {
  try {
    // 1. Update ke DB via Drizzle
    // await db.update(products).set(data).where(eq(products.id, id));
    
    // 2. Log Aksi Admin
    // await logAdminAction('UPDATE_PRODUCT', 'product', id);

    revalidatePath('/catalog');
    // Idealnya memanggil slug spesifik produk yang diubah
    // revalidatePath(`/catalog/${slug}`, 'page');
    
    return { success: true, message: "Data produk berhasil diperbarui" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Gagal memperbarui produk" };
  }
}

/**
 * Hapus Produk (Soft Delete)
 */
export async function deleteProduct(id: string) {
  try {
    // Soft delete: set status menjadi inactive
    // await db.update(products).set({ status: 'inactive' }).where(eq(products.id, id));
    
    // await logAdminAction('DELETE_PRODUCT', 'product', id);

    revalidatePath('/catalog');
    revalidatePath('/');
    
    return { success: true, message: "Produk berhasil diarsipkan" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Gagal menghapus produk" };
  }
}
