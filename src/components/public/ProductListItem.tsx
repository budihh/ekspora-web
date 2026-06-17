"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductItemProps {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  moq: string;
  imageUrl?: string;
}

export function ProductListItem({ product, isLast }: { product: ProductItemProps, isLast?: boolean }) {
  const [imgError, setImgError] = useState(false);

  let finalUrl = product.imageUrl || '';

  return (
    <Link 
      href={`/catalog`}
      className={`group flex flex-col sm:flex-row p-6 sm:p-8 hover:bg-surface-2 transition-colors cursor-pointer ${!isLast ? 'border-b border-border-hairline' : ''}`}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 mb-5 sm:mb-0 sm:mr-6">
        <div className="w-20 h-20 bg-surface-2 rounded-lg border border-border-hairline overflow-hidden relative">
          {!imgError && finalUrl ? (
            <Image 
              src={finalUrl} 
              alt={product.name}
              width={80}
              height={80}
              unoptimized={true}
              onError={() => setImgError(true)}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-elevated text-text-muted font-display font-bold text-h3 uppercase">
              {product.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 min-w-0 sm:pr-4 flex flex-col justify-center">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-h3 font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors truncate">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 text-[11px] uppercase tracking-wider font-bold">
                {product.categoryId}
              </span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center text-text-secondary group-hover:text-text-primary transition-colors">
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <p className="text-small text-text-secondary leading-relaxed line-clamp-2 mt-1">
          {product.description}
        </p>
        
        {product.moq && (
          <div className="mt-3">
            <span className="text-small font-medium text-success">
              MOQ: {product.moq}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
