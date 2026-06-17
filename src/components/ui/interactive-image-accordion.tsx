"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

const defaultAccordionItems = [
  {
    id: 1,
    title: 'Loading...',
    imageUrl: 'https://placehold.co/400x450/111111/333333?text=+',
  },
  {
    id: 2,
    title: 'Loading...',
    imageUrl: 'https://placehold.co/400x450/111111/333333?text=+',
  },
  {
    id: 3,
    title: 'Loading...',
    imageUrl: 'https://placehold.co/400x450/111111/333333?text=+',
  },
  {
    id: 4,
    title: 'Loading...',
    imageUrl: 'https://placehold.co/400x450/111111/333333?text=+',
  },
];

const AccordionItem = ({ item, isActive, onMouseEnter }: { item: typeof defaultAccordionItems[number], isActive: boolean, onMouseEnter: () => void }) => {
  return (
    <div
      className={`
        relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/10
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive ? 'w-full' : 'w-full opacity-60 hover:opacity-100'}
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x450'; }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>

      <span
        className={`
          absolute text-white font-semibold
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-6 text-base lg:text-lg rotate-0 opacity-100 w-[85%] truncate'
              : 'w-auto text-left bottom-12 left-1/2 -translate-x-1/2 -rotate-90 text-sm lg:text-base opacity-80 whitespace-nowrap'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export function FeaturedSectorsAccordion() {
  const [activeItem, setActiveItem] = useState(1);
  const [items, setItems] = useState(defaultAccordionItems);

  useEffect(() => {
    async function fetchProducts() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        console.warn('Supabase env vars missing, using default items');
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from('products')
        .select('name_en, image_url')
        .limit(50);

      if (error) {
        console.error('Failed to fetch products:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const validData = data.filter((item) => item.image_url && item.image_url.startsWith('http'));
        
        const keywords = ['charcoal', 'conwood', 'robusta', 'oil'];
        const selectedItems: any[] = [];

        keywords.forEach((kw) => {
          const found = validData.find(
            (item) =>
              item.name_en?.toLowerCase().includes(kw) &&
              !selectedItems.find((s) => s.name_en === item.name_en)
          );
          if (found) selectedItems.push(found);
        });

        for (const item of validData) {
          if (selectedItems.length >= 4) break;
          if (!selectedItems.find((s) => s.name_en === item.name_en)) {
            selectedItems.push(item);
          }
        }

        const sanitized = selectedItems.slice(0, 4).map((item, index) => ({
          id: index + 1,
          title: item.name_en || 'Untitled Product',
          imageUrl: item.image_url,
        }));

        if (sanitized.length > 0) {
          setItems(sanitized);
        }
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-transparent font-sans w-full">
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Side: Text Content */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-[45%] flex flex-col items-start text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter mb-6">
              Featured Sectors
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
              Discover our comprehensive portfolio of premium Indonesian commodities. We meticulously source, process, and export top-tier products—ranging from aromatic spices to specialty coffee beans—ensuring every shipment meets the most stringent international quality and sustainability standards.
            </p>
            <a href="/sectors" className="flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors group">
              View All Sectors
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Side: Accordion Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-[55%] flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]"
          >
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                variants={fadeUpVariant} 
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${activeItem === item.id ? 'flex-[4] lg:flex-[6]' : 'flex-1'}`}
              >
                <AccordionItem
                  item={item}
                  isActive={activeItem === item.id}
                  onMouseEnter={() => setActiveItem(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
