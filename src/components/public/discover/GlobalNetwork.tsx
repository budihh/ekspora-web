"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import { Globe2, Anchor, Building2, TrendingUp } from "lucide-react";
import { Map, MapArc, MapMarker, MarkerContent } from "@/components/ui/mapcn-map-arc";
import CountUp from "react-countup";

const ARC_DATA = [
  { id: "1", from: [106.8, -6.2] as [number, number], to: [-0.1, 51.5] as [number, number] }, 
  { id: "2", from: [106.8, -6.2] as [number, number], to: [-74.0, 40.7] as [number, number] },
  { id: "3", from: [106.8, -6.2] as [number, number], to: [139.6, 35.6] as [number, number] },
  { id: "4", from: [106.8, -6.2] as [number, number], to: [55.2, 25.2] as [number, number] },
  { id: "5", from: [106.8, -6.2] as [number, number], to: [103.8, 1.3] as [number, number] },
];

// Spotlight Card Component - REMOVED for Immersive Spatial UI

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const scaleInVariant = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } } };

export function GlobalNetwork() {
  const stats = [
    { end: 35, suffix: "+", label: "Export Destinations" },
    { end: 50, suffix: "k+", label: "Tons Shipped Annually" },
    { end: 12, suffix: "", label: "Global Partners" },
    { end: 100, suffix: "%", label: "Quality Assurance" },
  ];

  return (
    <section className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full relative">
          
          {/* LEFT SIDE (Z-index 20, ~45% width) */}
          <div className="w-full lg:w-[45%] relative z-20 flex flex-col">
            {/* Headline */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-0"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter leading-[1.15] mb-4">
                <span className="block">A Network That Spans</span>
                <span className="block font-light italic mt-1">Across Continents.</span>
              </h2>
              <p className="text-sm text-zinc-400 max-w-md mt-4">
                From the fertile volcanic soils of Indonesia to the world's most demanding markets. Our logistics infrastructure ensures your commodities arrive on time, maintaining peak freshness and quality.
              </p>
            </motion.div>

            {/* Typography Metrics */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  className="flex flex-col"
                >
                  <h4 className="text-2xl lg:text-3xl font-medium text-white">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2.5}
                      separator=","
                      enableScrollSpy={true}
                      scrollSpyOnce={true}
                      scrollSpyDelay={100}
                    />
                  </h4>
                  <p className="whitespace-nowrap text-[10px] lg:text-xs text-zinc-500 tracking-[0.2em] uppercase mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE (Z-index 10, ~55% width) Immersive Globe */}
          <div className="absolute lg:relative top-0 right-0 w-full lg:w-[55%] h-[400px] lg:h-[500px] z-10 bg-transparent opacity-40 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
            {/* Heavy linear gradient overlay blending left side */}
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-10" />
            
            {/* Map Container */}
            <motion.div 
              variants={scaleInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="absolute inset-0 lg:-right-20 lg:scale-[1.15] flex items-center justify-center overflow-hidden mix-blend-screen grayscale"
            >
              <Map
                viewport={{ center: [80, 20], zoom: 1, pitch: 0, bearing: 0 }}
                theme="dark"
                projection={{ type: "globe" }}
                scrollZoom={false}
                doubleClickZoom={false}
                className="w-full h-full scale-[1.3] cursor-grab active:cursor-grabbing"
              >
                <MapArc
                  data={ARC_DATA}
                  paint={{ "line-color": "#d4af37", "line-width": 2, "line-opacity": 0.6 }}
                />
                <MapMarker longitude={106.8} latitude={-6.2}>
                  <MarkerContent>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
                  </MarkerContent>
                </MapMarker>
              </Map>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
