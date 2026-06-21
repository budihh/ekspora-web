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
      ease: 'easeOut' as any as any,
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
              Research & Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter bg-linear-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-8 max-w-5xl mx-auto">
            Industry Insights
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mx-auto">
            Expert analysis, market intelligence, and sustainable export strategies.
          </p>
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
