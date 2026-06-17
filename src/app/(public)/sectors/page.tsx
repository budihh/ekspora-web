"use client";

import { Leaf, Coffee, TreePine, Droplet, ArrowRight, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MarketIntelligence from "@/components/public/MarketIntelligence";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

const getUIStyles = (name_en: string) => {
  const n = name_en?.toLowerCase() || '';
  if (n.includes('spice')) return { icon: Leaf, image: "bg-linear-to-br from-emerald-900/40 to-canvas" };
  if (n.includes('coffee')) return { icon: Coffee, image: "bg-linear-to-br from-amber-900/40 to-canvas" };
  if (n.includes('wood') || n.includes('conwood')) return { icon: TreePine, image: "bg-linear-to-br from-stone-800/40 to-canvas" };
  if (n.includes('charcoal')) return { icon: Globe, image: "bg-linear-to-br from-zinc-800/40 to-canvas" };
  if (n.includes('oil')) return { icon: Droplet, image: "bg-linear-to-br from-indigo-900/40 to-canvas" };
  return { icon: ShieldCheck, image: "bg-linear-to-br from-zinc-800/40 to-canvas" };
};

const commodityLinesFallback = [
  {
    id: "spices",
    name_en: "Indonesian Spices",
    description_en: "Premium black pepper, cloves, nutmeg, and cinnamon sourced directly from the finest local farmers in Indonesia. Highly sought after for their robust flavor profiles.",
    annual_volume: "15,000 MT",
    main_markets: "EU, US, Middle East"
  },
  {
    id: "coffee",
    name_en: "Coffee Selection",
    description_en: "Selected Arabica and Robusta beans from high-altitude regions including Gayo, Toraja, and Mandheling. Processed with meticulous care.",
    annual_volume: "12,000 MT",
    main_markets: "Japan, US, EU"
  },
  {
    id: "coconut",
    name_en: "Charcoal Briquettes",
    description_en: "Export-standard charcoal briquettes, desiccated coconut, and Virgin Coconut Oil (VCO). Sustainably harvested and cleanly processed.",
    annual_volume: "20,000 MT",
    main_markets: "Middle East, EU"
  },
  {
    id: "cocoa",
    name_en: "Fine Wood",
    description_en: "Premium grade timber and wood solutions.",
    annual_volume: "8,000 MT",
    main_markets: "EU, Asia"
  }
];

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const CategoryText = ({ cat, index, total, progress }: { cat: any, index: number, total: number, progress: any }) => {
  const segmentSize = 1 / total;
  const enter = index * segmentSize;
  const peakStart = enter + (segmentSize * 0.15);
  const peakEnd = enter + (segmentSize * 0.85);
  const exit = (index + 1) * segmentSize;

  let inputPoints = [];
  let opacityPoints = [];
  let scalePoints = [];

  if (total === 1) {
    // Fallback for single item to prevent identical array values (1 item fills 0 to 1)
    inputPoints = [0, 1];
    opacityPoints = [1, 1];
    scalePoints = [1, 1];
  } else if (index === 0) {
    // First item: Explicitly map the end of the scroll (1) to opacity 0
    inputPoints = [0, peakEnd, exit, 1];
    opacityPoints = [1, 1, 0, 0];
    scalePoints = [1, 1, 0.95, 0.95];
  } else if (index === total - 1) {
    // Last item: Explicitly map the beginning of the scroll (0) to opacity 0
    inputPoints = [0, enter, peakStart, 1];
    opacityPoints = [0, 0, 1, 1];
    scalePoints = [1.05, 1.05, 1, 1];
  } else {
    // Middle items: Explicitly set 0 opacity at BOTH the start (0) and end (1) of the page
    inputPoints = [0, enter, peakStart, peakEnd, exit, 1];
    opacityPoints = [0, 0, 1, 1, 0, 0];
    scalePoints = [1.05, 1.05, 1, 1, 0.95, 0.95];
  }

  const opacity = useTransform(progress, inputPoints, opacityPoints);
  const scale = useTransform(progress, inputPoints, scalePoints);
  
  // Ultimate Safety Net: Disable pointer events and hide visibility when opacity is exactly 0
  const pointerEvents = useTransform(opacity, (val) => val > 0.5 ? "auto" : "none");
  const visibility = useTransform(opacity, (val) => val === 0 ? "hidden" : "visible");

  return (
    <motion.div 
      style={{ opacity, scale, pointerEvents, visibility, willChange: "transform, opacity" }}
      className="absolute top-[20vh] left-0 w-full lg:w-[200%] pointer-events-none"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full lg:w-1/2 max-w-xl lg:pr-12 pointer-events-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 drop-shadow-md lg:drop-shadow-none whitespace-nowrap">{cat.name_en}</h2>
          <p className="text-zinc-300 lg:text-zinc-400 text-[1rem] lg:text-[1.125rem] leading-relaxed max-w-md mb-8 drop-shadow-md lg:drop-shadow-none">{cat.description_en}</p>
          
          <div className="grid grid-cols-2 gap-8 mb-8 border-t border-white/10 pt-6 max-w-md">
            <div>
              <h3 className="text-xs tracking-widest text-zinc-500 uppercase mb-2">Annual Volume</h3>
              <p className="text-xl font-light text-zinc-200">{cat.annual_volume || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-zinc-500 uppercase mb-2">Main Markets</h3>
              <p className="text-xl font-light text-zinc-200">{cat.main_markets || 'Global'}</p>
            </div>
          </div>
          
          <a href={`/portfolio?category=${cat.id}`} className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors group">
            View Technical Portfolio
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function SectorsPage() {
  const [categories, setCategories] = useState<any[]>(commodityLinesFallback);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name_en, slug, description_en, annual_volume, main_markets, image_url');
        
        if (error) throw error;
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();

    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile || prefersReducedMotion) return; // Disable scroll scrubbing on mobile or if reduced motion
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  if (!categories || categories.length === 0) return null;

  return (
    <div className="min-h-screen bg-canvas pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Business Sectors</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold bg-linear-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter mb-6">
            Global Commodity Lines
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Our strategic business units are categorized to streamline your procurement process, ensuring you receive the exact specifications your industry demands.
          </p>
        </motion.div>
      </section>

      {/* Video Scrubber Architecture */}
      <section ref={containerRef} style={{ height: `${categories.length * 100}vh` }} className="relative w-full bg-black text-white">
        <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">
          
          {/* 1. LEFT PANE: SYNCHRONIZED TEXT (Rendered First for Desktop Left) */}
          <div className="w-full lg:w-1/2 h-full relative z-20 pointer-events-none flex items-center lg:items-start order-2 lg:order-1">
            {categories.map((cat, idx) => (
              <CategoryText cat={cat} index={idx} key={cat.id || idx} progress={scrollYProgress} total={categories.length} />
            ))}
          </div>

          {/* 2. RIGHT PANE: THE SCRUBBING VIDEO (Rendered Second for Desktop Right) */}
          <div className="absolute lg:relative inset-0 lg:inset-auto w-full lg:w-1/2 h-full bg-zinc-950 z-0 lg:z-10 order-1 lg:order-2">
            
            {/* The Middle Gradient Divider: Fades from left to right over the video */}
            <div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-[60%] bg-linear-to-t from-black via-black/80 to-transparent lg:bg-linear-to-r lg:from-black lg:via-black/70 lg:to-transparent z-20 pointer-events-none"></div>
            
            {(isMobile || prefersReducedMotion) ? (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center z-10 transition-transform duration-10000 ease-linear scale-110 motion-reduce:transition-none motion-reduce:scale-100 will-change-transform"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop')" }}
              />
            ) : (
              <video 
                ref={videoRef}
                src="/videos/sectors-transition.mp4" 
                className="absolute inset-0 w-full h-full object-cover z-10 will-change-transform"
                muted 
                playsInline 
                preload="auto"
              />
            )}
          </div>

        </div>
      </section>

      {/* Market Intelligence Dashboard */}
      <MarketIntelligence />
    </div>
  );
}
