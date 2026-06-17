import CatalogClient from '@/components/public/CatalogClient';

export const revalidate = 60; // ISR 60 seconds

export default async function CatalogPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
  
  let products = [];
  let categories = [];
  let hasError = false;

  try {
    const [prodRes, catRes] = await Promise.all([
      fetch(`${API_URL}/catalog`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/commodities`, { next: { revalidate: 60 } })
    ]);

    console.log("Status Catalog:", prodRes.status, "| Status Categories:", catRes.status);

    if (!prodRes.ok || !catRes.ok) throw new Error('Failed to fetch data');

    const prodData = await prodRes.json();
    const catData = await catRes.json();

    products = prodData.data || [];
    categories = catData.data || [];
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
