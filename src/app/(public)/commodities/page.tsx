import Link from 'next/link';

export const revalidate = 60;

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export default async function CommoditiesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
  let categories: Category[] = [];
  let hasError = false;

  try {
    const res = await fetch(`${API_URL}/commodities`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch commodities');
    const data = await res.json();
    categories = data.data || [];
  } catch (error) {
    console.error('Error fetching commodities:', error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="pt-48 pb-24 min-h-screen text-center">
        <h1 className="text-h2 font-display text-text-primary">Unable to load commodities</h1>
        <p className="text-text-secondary mt-4">Please try again later or contact our support.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16">
          <h1 className="text-display font-display font-bold text-text-primary tracking-tight mb-4">
            Our Commodities
          </h1>
          <p className="text-body text-text-secondary max-w-2xl">
            We provide a wide range of premium agricultural products sourced ethically from local Indonesian farmers, ensuring world-class quality for global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div key={item.id} className="flex flex-col bg-surface border border-border-hairline rounded-2xl p-6 hover:border-text-muted transition-colors group">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-h3 font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-small text-text-secondary mb-6 leading-relaxed">
                  {item.description || 'Premium agricultural commodity from Indonesia.'}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border-hairline">
                <Link 
                  href={`/catalog?category=${item.slug}`}
                  className="w-full inline-flex justify-center items-center py-2.5 rounded-lg border border-border-hairline text-small font-medium text-text-primary hover:bg-surface-2 transition-colors"
                >
                  View in Catalog
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
