"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const scaleInVariant = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } } };

export interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Transparent Supply Chain",
    image: "/images/features/supply-chain.png",
    description: "Full traceability from farm to port. We provide complete visibility into sourcing, processing, and shipping, ensuring you know exactly where your commodities originate."
  },
  {
    id: 2,
    title: "Strict Quality Compliance",
    image: "/images/features/compliance.png",
    description: "Every shipment undergoes rigorous quality assurance. Our facilities and network of partners strictly adhere to FDA, ISO, and international customs standards."
  },
  {
    id: 3,
    title: "Sustainable Practices",
    image: "/images/features/sustainable.png",
    description: "Committed to ethical sourcing that empowers local cooperatives, ensures fair trade, and heavily minimizes environmental impact across our agricultural footprint."
  },
  {
    id: 4,
    title: "Global Logistics Excellence",
    image: "/images/features/logistics.png",
    description: "Leveraging a robust maritime and freight network to ensure your commodities arrive on time, in pristine condition, anywhere across the globe."
  }
];

export function AccordionFeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pt-32 pb-16 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6 w-full">
        {/* Section Header */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter">
            The Ekspora Standard
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
            Why leading global enterprises choose us as their primary sourcing partner in Southeast Asia.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left: Accordion List */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            {defaultFeatures.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div 
                  variants={fadeUpVariant}
                  key={feature.id} 
                  className={`border-t ${index === defaultFeatures.length - 1 ? 'border-b' : ''} border-zinc-800/50 py-8 cursor-pointer group`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"}`}>
                      {feature.title}
                    </h3>
                    <ChevronDown 
                      className={`w-6 h-6 transition-transform duration-500 ${isActive ? "text-white rotate-180" : "text-zinc-700"}`} 
                    />
                  </div>
                  
                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-lg text-zinc-400 leading-relaxed pr-8">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Sticky Image Gallery */}
          <motion.div 
            variants={scaleInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-5/12 ml-auto"
          >
            <div className="sticky top-32 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/50 shadow-2xl shadow-black aspect-video md:aspect-square relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={defaultFeatures[activeIndex].image}
                  alt={defaultFeatures[activeIndex].title}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
