"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BlogPostCard } from "@/components/ui/card-18";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation variants for child items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

interface Category {
  id: string;
  name_en: string;
  slug: string;
  description_en: string;
  image_url: string;
  annual_volume: string;
}

export default function InsightPage() {
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('categories').select('*');
      
      if (!error && data) {
        // Find "Coffee Selection" for the featured post
        const coffeeIndex = data.findIndex((c: Category) => c.name_en.toLowerCase().includes('coffee'));
        let featuredData = data[0]; // fallback to first item
        let gridData = data.slice(1);

        if (coffeeIndex !== -1) {
          featuredData = data[coffeeIndex];
          // Remove coffee from the grid array
          gridData = data.filter((_: any, index: number) => index !== coffeeIndex);
        }

        // Map Database Category to BlogPostCardProps structure
        setFeaturedPost({
          tag: "Featured Commodity",
          date: `VOL: ${featuredData.annual_volume}`,
          title: featuredData.name_en,
          description: featuredData.description_en,
          href: `/portfolio`,
          imageUrl: featuredData.image_url,
          readMoreText: "View Portfolio"
        });

        setPosts(gridData.map((cat: Category) => ({
          tag: cat.slug.replace('-', ' '),
          date: `VOL: ${cat.annual_volume}`,
          title: cat.name_en,
          description: cat.description_en,
          href: `/portfolio`,
          readMoreText: "View Portfolio"
        })));
      }
      
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#f3dca6] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-zinc-200 selection:bg-white/30 font-sans pb-24">
      
      {/* PAGE HEADER */}
      <section className="pt-32 pb-16 px-4 md:px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center container mx-auto"
        >
          <div className="mb-10 md:mb-16">
            <p className="text-zinc-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Research & Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-white leading-tight tracking-tight mb-4">
              Industry <span className="font-semibold bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Expert analysis, market intelligence, and sustainable export strategies.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 md:mb-16">
            <BlogPostCard
              variant="featured"
              {...featuredPost}
            />
          </motion.div>
        )}

        {/* Section Title */}
        {posts.length > 0 && (
          <>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10">
              <h3 className="text-2xl font-light text-white tracking-tight">Commodity Intelligence</h3>
            </div>

            {/* Grid of Default Posts */}
            <motion.div 
              className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {posts.map((post, index) => (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <BlogPostCard {...post} className="h-full" />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
