import CatalogClient from '@/components/public/CatalogClient';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 60; // ISR 60 seconds

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];
  let hasError = false;

  try {
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('categories').select('*')
    ]);

    if (prodRes.error || catRes.error) throw new Error('Failed to fetch data from Supabase');

    // Map snake_case DB columns → camelCase props expected by CatalogClient
    products = (prodRes.data || []).map((p: any) => ({
      id: p.id,
      name: p.name_en || p.name || '',
      categoryId: p.category_id || '',
      description: p.description_en || p.description || '',
      moq: p.moq || '',
      imageUrl: p.image_url || '',
    }));

    categories = (catRes.data || []).map((c: any) => ({
      id: c.id,
      name: c.name_en || c.name || '',
    }));
  } catch (error) {
    console.error("Error fetching catalog:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="pt-48 pb-24 min-h-screen text-center">
        <h1 className="text-h2 font-display text-text-primary">Unable to load catalog</h1>
        <p className="text-text-secondary mt-4">Please try again later or contact our support.</p>
      </div>
    );
  }

  return <CatalogClient products={products} categories={categories} />;
}
