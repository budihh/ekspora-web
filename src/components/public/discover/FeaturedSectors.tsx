"use strict";
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Coffee, TreePine, Droplet } from "lucide-react";
import Link from "next/link";

const sectors = [
  {
    id: "spices",
    title: "Spices & Herbs",
    desc: "Premium black pepper, cloves, nutmeg, and cinnamon sourced directly from local farmers.",
    icon: Leaf,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    bgClass: "from-[#1a1c1a] to-canvas",
  },
  {
    id: "coffee",
    title: "Coffee Beans",
    desc: "Selected Arabica and Robusta beans from high-altitude regions of the archipelago.",
    icon: Coffee,
    colSpan: "col-span-1",
    bgClass: "from-[#1c1815] to-canvas",
  },
  {
    id: "coconut",
    title: "Coconut Products",
    desc: "Export-standard charcoal briquettes, desiccated coconut, and VCO.",
    icon: TreePine,
    colSpan: "col-span-1",
    bgClass: "from-[#151a1c] to-canvas",
  },
  {
    id: "cocoa",
    title: "Cocoa",
    desc: "Highly fermented cocoa beans for the international chocolate industry.",
    icon: Droplet,
    colSpan: "col-span-1 md:col-span-2",
    bgClass: "from-[#1c151b] to-canvas",
  },
];

export function FeaturedSectors() {
  return (
    <section className="py-32 bg-base relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              Featured Sectors
            </h2>
            <p className="text-text-secondary text-lg">
              Explore our diverse range of premium commodities, meticulously processed to meet the highest international specifications.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link 
              href="/sectors"
              className="inline-flex items-center gap-2 text-white hover:text-accent font-medium transition-colors group"
            >
              View All Sectors
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {sectors.map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br ${sector.bgClass} ${sector.colSpan} p-8 flex flex-col justify-between hover:border-white/15 transition-colors duration-500`}
            >
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <sector.icon className="w-6 h-6 text-white/80" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out bg-white/5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">{sector.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-sm">{sector.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
