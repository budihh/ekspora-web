"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  moq: string;
  imageUrl: string;
};

type Category = {
  id: string;
  name: string;
};

function ProductImage({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  let finalUrl = product.imageUrl || '';

  if (imgError || !finalUrl) {
    return (
      <div className="w-12 h-12 bg-surface-elevated rounded-lg border border-border-hairline flex items-center justify-center font-display font-bold text-text-muted text-small uppercase">
        {product.name.charAt(0)}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 relative rounded-lg border border-border-hairline overflow-hidden">
      <Image 
        src={finalUrl} 
        alt={product.name} 
        width={48} 
        height={48} 
        unoptimized={true}
        onError={() => setImgError(true)}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default function CatalogClient({ products, categories }: { products: Product[], categories: Category[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | 'all'>('all');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProducts = products.filter(product => {
    const matchCategory = activeCategoryId === 'all' || product.categoryId === activeCategoryId;
    const matchSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                        product.id.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Unknown';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h1 className="text-display font-display font-bold text-text-primary tracking-tight mb-4">
              Product Catalog
            </h1>
            <p className="text-body text-text-secondary max-w-2xl">
              Browse our complete list of specifications and export-ready products.
            </p>
          </div>
          <div className="flex w-full md:w-auto relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-surface border border-border-hairline rounded-lg pl-10 pr-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent w-full md:w-64 transition-colors"
            />
            <svg className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-4 py-2 rounded-full text-small font-medium transition-colors border ${
              activeCategoryId === 'all' 
                ? 'bg-text-primary text-base border-text-primary' 
                : 'bg-surface border-border-hairline text-text-secondary hover:text-text-primary hover:bg-surface-2'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-2 rounded-full text-small font-medium transition-colors border ${
                activeCategoryId === cat.id 
                  ? 'bg-text-primary text-base border-text-primary' 
                  : 'bg-surface border-border-hairline text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-border-hairline rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse relative">
              <thead>
                <tr className="border-b border-border-hairline bg-surface-2/50">
                  <th className="py-4 px-6 text-micro font-medium text-text-muted uppercase tracking-wider">Image</th>
                  <th className="py-4 px-6 text-micro font-medium text-text-muted uppercase tracking-wider">Product Name</th>
                  <th className="py-4 px-6 text-micro font-medium text-text-muted uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 text-micro font-medium text-text-muted uppercase tracking-wider">MOQ</th>
                  <th className="py-4 px-6 text-micro font-medium text-text-muted uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={product.id} 
                      className="hover:bg-surface-2/30 transition-all duration-300 group relative z-10 hover:z-20"
                    >
                      <td className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-y border-transparent group-hover:border-border-hairline" />
                      
                      <td className="py-4 px-6 relative z-10">
                        <ProductImage product={product} />
                      </td>
                      <td className="py-4 px-6 text-small font-medium text-text-primary group-hover:text-accent transition-colors relative z-10">
                        <Link href={`/catalog`}>{product.name}</Link>
                      </td>
                      <td className="py-4 px-6 text-small text-text-secondary relative z-10">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-surface border border-border-hairline text-micro">
                          {getCategoryName(product.categoryId)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-small text-text-secondary relative z-10">{product.moq || '-'}</td>
                      <td className="py-4 px-6 text-right relative z-10">
                        <Link href={`/catalog`} className="text-small text-text-primary font-medium hover:text-accent underline decoration-border-hairline underline-offset-4">
                          View Details
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-secondary text-small">
                      No products found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
