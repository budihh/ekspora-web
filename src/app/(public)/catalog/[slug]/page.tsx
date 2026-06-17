"use client";

import { useState } from 'react';
import Link from 'next/link';
import { InquiryModal } from '@/components/public/InquiryModal';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock product name derived from slug
  const productName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/catalog" className="inline-flex items-center text-small text-text-muted hover:text-text-primary transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Catalog
        </Link>
        
        <div className="bg-surface border border-border-hairline rounded-2xl p-8 mb-12 shadow-sm">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-2 border border-border-hairline text-micro font-medium mb-4">
            Product Detail
          </div>
          <h1 className="text-display font-display font-bold text-text-primary tracking-tight mb-4">
            {productName}
          </h1>
          <p className="text-body text-text-secondary leading-relaxed mb-8">
            Premium quality {productName} sourced directly from local Indonesian farmers, prepared perfectly for export standard. High quality, great aroma, and strict quality control.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 pt-8 border-t border-border-hairline">
            <div>
              <p className="text-micro text-text-muted uppercase tracking-wider mb-1">Origin</p>
              <p className="text-small font-medium text-text-primary">Indonesia</p>
            </div>
            <div>
              <p className="text-micro text-text-muted uppercase tracking-wider mb-1">MOQ</p>
              <p className="text-small font-medium text-text-primary">1 MT</p>
            </div>
            <div>
              <p className="text-micro text-text-muted uppercase tracking-wider mb-1">Grade</p>
              <p className="text-small font-medium text-text-primary">Premium</p>
            </div>
            <div>
              <p className="text-micro text-text-muted uppercase tracking-wider mb-1">Category</p>
              <p className="text-small font-medium text-text-primary">Commodity</p>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-accent hover:brightness-110 text-white px-8 py-4 rounded-xl font-semibold transition-all inline-flex justify-center items-center"
          >
            Hubungi Kami Sekarang
          </button>
        </div>
      </div>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productName={productName} 
      />
    </div>
  );
}
