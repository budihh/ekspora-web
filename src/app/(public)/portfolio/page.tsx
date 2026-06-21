"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Scale, ArrowUpRight } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// ---------------------------
// SUPABASE CLIENT
// ---------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Category {
  id: string;
  name_en: string;
  slug: string;
  description_en: string;
}

interface Product {
  id: string;
  category_id: string;
  name_en: string;
  description_en: string;
  moq: string;
  image_url: string;
}

// ---------------------------
// SUB-COMPONENT: CATEGORY ROW
// ---------------------------
const CategoryRow = ({ category, products }: { category: Category, products: Product[] }) => {
  const initialIndex = products.length > 1 ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [activeId, setActiveId] = useState<string | null>(products[initialIndex]?.id || null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasMounted = useRef(false);

  // Scroll to card at index 1 on mount
  useLayoutEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    const target = cardRefs.current[initialIndex];
    if (target && railRef.current) {
      requestAnimationFrame(() => {
        const rail = railRef.current;
        if (rail) {
          const targetCenter = target.offsetLeft + (target.offsetWidth / 2);
          const railCenter = rail.offsetWidth / 2;
          rail.scrollLeft = targetCenter - railCenter;
        }
      });
    }
  }, [products, initialIndex]);

  // Scroll listener for "Cinematic Focus" Center-Lock Logic
  useEffect(() => {
    let currentActiveId = products[initialIndex]?.id || null;

    const handleScroll = () => {
      if (!railRef.current || cardRefs.current.length === 0) return;
      const rail = railRef.current;
      
      const containerCenter = rail.offsetWidth / 2;
      let closestId: string | null = null;
      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2) - rail.scrollLeft;
        const distance = Math.abs(cardCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestId = card.getAttribute("data-id");
          closestIndex = idx;
        }
      });

      if (closestId && closestId !== currentActiveId) {
        currentActiveId = closestId;
        setActiveId(closestId);
        setActiveIndex(closestIndex);
      }
    };

    const rail = railRef.current;
    if (rail) {
      rail.addEventListener("scroll", handleScroll, { passive: true });
      requestAnimationFrame(handleScroll);
    }

    return () => {
      if (rail) rail.removeEventListener("scroll", handleScroll);
    };
  }, [products, initialIndex]);

  if (!products || products.length === 0) return null;

  return (
    <div className="mb-24 w-full overflow-x-hidden">
      {/* Row Header - Typography Sync */}
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-3">{category.name_en}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{category.description_en || `${products.length} premium export-ready commodities.`}</p>
      </div>

      {/* Precision Masking Wrapper */}
      <div 
        className="w-full relative"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)"
        }}
      >
        <div
          ref={railRef}
          className="flex gap-2 md:gap-4 w-full min-h-[520px] overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-4 px-6 md:px-[calc(50vw-150px)] overscroll-x-contain"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((item, index) => {
            const isActive = activeId === item.id;
            const distance = Math.abs(index - activeIndex);
            // Only show the active card and its immediate neighbors
            const isVisible = distance <= 1;

            return (
              <div
                key={item.id}
                data-id={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`
                  group shrink-0 snap-start md:snap-center relative cursor-pointer
                  w-[85vw] md:w-[300px] h-[480px] rounded-2xl overflow-hidden
                  transition-all duration-700 ease-out will-change-transform
                  ${
                    isActive
                      ? "scale-100 brightness-100 z-20 shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10"
                      : isVisible
                        ? "scale-[0.88] brightness-[0.4] z-10 border border-transparent"
                        : "scale-[0.80] brightness-0 z-0 border border-transparent opacity-0 pointer-events-none"
                  }
                `}
                onClick={() => {
                  const target = cardRefs.current[index];
                  const rail = railRef.current;
                  if (target && rail) {
                    const targetCenter = target.offsetLeft + (target.offsetWidth / 2);
                    const railCenter = rail.offsetWidth / 2;
                    rail.scrollTo({
                      left: targetCenter - railCenter,
                      behavior: "smooth"
                    });
                  }
                  if (isActive) {
                    window.location.href = `/inquiries?product=${encodeURIComponent(item.name_en)}`;
                  }
                }}
              >
                {/* Efek Glare/Pendaran Cahaya (Hanya aktif di kartu tengah) */}
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#f3dca6]/80 to-transparent blur-[2px] transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  } z-30 pointer-events-none`}
                />

                {/* Gambar Produk */}
                <img
                  src={item.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"}
                  alt={item.name_en}
                  className="absolute inset-0 w-full h-[65%] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop";
                  }}
                />

                {/* Gradient transisi halus dari gambar ke panel bawah */}
                <div className="absolute inset-0 h-[70%] bg-gradient-to-t from-[#111111] via-black/20 to-transparent z-10 pointer-events-none" />

                {/* Panel Kaca Bawah (Obsidian Glass) */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[40%] flex flex-col justify-end p-5 z-20 
                  bg-[#0f0f0f]/95 backdrop-blur-md lg:backdrop-blur-xl border-t transition-colors duration-700
                  ${isActive ? "border-white/10" : "border-white/5"}
                  `}
                >
                  {/* Judul */}
                  <h3 className="text-xl md:text-2xl font-light text-white leading-tight tracking-tight mb-2 uppercase">
                    {item.name_en}
                  </h3>

                  {/* Deskripsi */}
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mb-5 pr-4 line-clamp-3">
                    {item.description_en}
                  </p>

                  {/* MOQ Pill & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-md border border-white/5 bg-white/[0.02] text-[10px] tracking-wider text-[#999999] uppercase">
                      MOQ <span className="text-white font-medium ml-1">{item.moq || '1 FCL'}</span>
                    </span>
                    
                    {/* Only show prompt if active */}
                    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="text-[10px] uppercase tracking-widest text-[#f3dca6]/80 flex items-center gap-1">
                        Inquire <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ---------------------------
// MAIN PAGE COMPONENT
// ---------------------------

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCat, setProductsByCat] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        // Fetch Categories and Products in parallel
        const [catRes, prodRes] = await Promise.all([
          supabase.from('categories').select('id, name_en, slug, description_en').order('name_en'),
          supabase.from('products').select('id, category_id, name_en, description_en, moq, image_url')
        ]);
        
        if (catRes.error) throw catRes.error;
        if (prodRes.error) throw prodRes.error;

        const fetchedCategories = catRes.data || [];
        let fetchedProducts = prodRes.data || [];

        // Fallback dummy data logic in case the database is empty
        if (fetchedCategories.length === 0) {
          fetchedCategories.push(
            { id: "1", name_en: "Spices & Aromatics", slug: "spices-herbs", description_en: "Premium black pepper, cloves, and cinnamon." },
            { id: "2", name_en: "Specialty Coffee", slug: "specialty-coffee", description_en: "High-altitude Arabica & fine Robusta beans." }
          );
        }

        if (fetchedProducts.length === 0) {
          // Map dummy products to the first two categories
          fetchedProducts = [
            { id: "p1", category_id: fetchedCategories[0]?.id, name_en: "Black Pepper (GL 550)", description_en: "High density black pepper sourced from Lampung, cleaned and sorted for export.", moq: "1 FCL (20ft)", image_url: "" },
            { id: "p2", category_id: fetchedCategories[0]?.id, name_en: "Cassia Vera (Cinnamon)", description_en: "Premium AA stick cinnamon with distinct sweet aroma.", moq: "5 MT", image_url: "" },
            { id: "p3", category_id: fetchedCategories[1]?.id, name_en: "Arabica Gayo Grade 1", description_en: "Specialty grade coffee beans hand-picked from the Gayo highlands.", moq: "1 FCL (20ft)", image_url: "" },
            { id: "p4", category_id: fetchedCategories[1]?.id, name_en: "Robusta Dampit", description_en: "Rich, bold Robusta beans ideal for espresso blends.", moq: "10 MT", image_url: "" },
          ].filter(p => p.category_id);
        }

        // Group products by category ID
        const grouped = fetchedProducts.reduce((acc, product) => {
          if (!acc[product.category_id]) acc[product.category_id] = [];
          acc[product.category_id].push(product);
          return acc;
        }, {} as Record<string, Product[]>);

        setCategories(fetchedCategories);
        setProductsByCat(grouped);

      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolioData();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-zinc-200 selection:bg-white/30 font-sans">
      
      {/* SECTION 1: HERO TITLE */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6 mb-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as any }}
          className="w-full flex flex-col items-center"
        >
          <div className="mb-6">
            <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
              Global Supply Chain
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-8 max-w-5xl mx-auto">
            Curated Products for International Markets
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mx-auto">
            Premium commodities, ethically sourced. Crafted for global excellence.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: THE TRADING FLOOR (HORIZONTAL ROWS) */}
      <section className="relative w-full pb-32 bg-[#050505]">
        {loading ? (
           <div className="container mx-auto px-4 md:px-6">
             {/* Elegant Skeleton Row Loaders */}
             {Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="mb-20">
                 <div className="w-1/3 h-8 bg-zinc-900 rounded mb-4 animate-pulse" />
                 <div className="w-1/4 h-4 bg-zinc-900 rounded mb-8 animate-pulse" />
                 <div className="flex gap-6 overflow-hidden">
                   {Array.from({ length: 4 }).map((_, j) => (
                     <div key={j} className="flex-shrink-0 w-[300px] md:w-[350px] h-[450px] bg-zinc-900/40 rounded-3xl animate-pulse" />
                   ))}
                 </div>
               </div>
             ))}
           </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} id={`section-${category.slug}`}>
              <CategoryRow 
                category={category} 
                products={productsByCat[category.id] || []} 
              />
            </div>
          ))
        )}
      </section>

      {/* Global Style for scrollbar hiding (if inline fails on some browsers) */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

    </div>
  );
}
