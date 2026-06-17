"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Thermometer, Flame, Globe2, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar, LineChart, Line, Cell, ReferenceArea, ReferenceLine, CartesianGrid, ComposedChart
} from "recharts";

// Utility for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------
// DATA DEFINITIONS
// ---------------------------
const rattanData = [
  { year: "2024", "Raw Rattan": 40, "Processed Furniture": 60 },
  { year: "2025", "Raw Rattan": 35, "Processed Furniture": 65 },
  { year: "2026 (YTD)", "Raw Rattan": 20, "Processed Furniture": 80 },
  { year: "2027 (Est)", "Raw Rattan": 10, "Processed Furniture": 90 },
];

const coffeeData = [
  { altitude: "200m", temp: 28, viability: 30 },
  { altitude: "400m", temp: 24, viability: 85 },
  { altitude: "550m", temp: 22, viability: 100 },
  { altitude: "700m", temp: 21, viability: 90 },
  { altitude: "900m", temp: 18, viability: 40 },
];

const charcoalData = [
  { name: "Base Purity", value: 85, fill: "#450a0a" },
  { name: "Peak Purity", value: 98, fill: "url(#thermalGradient)" },
];

const essentialData = [
  { period: "Q1 '26", export: 320, demand: 350 },
  { period: "Q2 '26", export: 410, demand: 420 },
  { period: "Q3 '26", export: 580, demand: 610 },
  { period: "Q4 '26 (Proj)", export: 750, demand: 820 },
];

const TABS = [
  {
    id: "rattan",
    title: "2026 Rattan Supply Forecast",
    desc: "Real-time tracking of sustainable yields against projected global furniture demands.",
    color: "#3b82f6", // blue-500
    glowClass: "bg-blue-500/20",
    icon: ShieldCheck,
    badge: "Export Regulated"
  },
  {
    id: "coffee",
    title: "Climate-Resilient Coffee Yields",
    desc: "Monitoring 2026 climatic shifts and Robusta adaptability.",
    color: "#10b981", // emerald-500
    glowClass: "bg-emerald-500/20",
    icon: Thermometer,
    badge: "Ideal Temp: 21-24°C"
  },
  {
    id: "charcoal",
    title: "Next-Gen Carbon Purity",
    desc: "Strict 2026 EU environmental compliance while sustaining 85-98% pure carbon metrics.",
    color: "#ef4444", // red-500
    glowClass: "bg-red-500/20",
    icon: Flame,
    badge: "Combustion Cap: 1,100°C"
  },
  {
    id: "essential",
    title: "Global Essential Oil Distribution",
    desc: "Live 2026 export volume mapping.",
    color: "#8b5cf6", // violet-500
    glowClass: "bg-violet-500/20",
    icon: Globe2,
    badge: "Crude Essential Volume"
  }
];

// ---------------------------
// CUSTOM TOOLTIP
// ---------------------------
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
        <p className="text-white font-medium mb-3">{label || 'Metric'}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 text-sm text-zinc-300 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: entry.color, backgroundColor: entry.color }} />
              <span>{entry.name || 'Value'}</span>
            </div>
            <span className="font-mono text-white">
              {entry.value}
              {entry.name === 'Temperature' ? '°C' : ''}
              {entry.name === 'Yield Viability' || entry.name === 'Purity' || entry.name === 'Base Purity' || entry.name === 'Peak Purity' ? '%' : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ---------------------------
// COMPONENT EXPORT
// ---------------------------
export default function MarketIntelligence() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  return (
    <section className="relative w-full bg-neutral-950 py-24 lg:py-32 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={cn("w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] mix-blend-screen opacity-40 transition-colors duration-1000", activeTab.glowClass)}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <p className="text-zinc-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Real-Time Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-3">
            Data-Driven <span className="font-semibold bg-linear-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">Commodity Insights</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Empowering global B2B procurement with hyper-accurate export data, climate metrics, and industrial specifications straight from the source.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          
          {/* LEFT PANE: TABS */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            {TABS.map((tab) => {
              const isActive = activeTabId === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  onMouseEnter={() => setActiveTabId(tab.id)}
                  onFocus={() => setActiveTabId(tab.id)}
                  className="relative flex items-start gap-3 py-3 px-5 rounded-2xl text-left transition-all duration-300 group"
                >
                  {/* Animated Background for active state */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Left Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shrink-0",
                    isActive ? "bg-white/10 shadow-lg backdrop-blur-md" : "bg-white/5 group-hover:bg-white/10"
                  )}>
                    <Icon size={18} style={{ color: isActive ? tab.color : '#a1a1aa' }} />
                  </div>

                  <div className="relative z-10 pt-0.5">
                    <h3 className={cn(
                      "text-lg font-medium leading-snug mb-1 transition-colors duration-300",
                      isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                    )}>
                      {tab.title}
                    </h3>
                    <p className={cn(
                      "text-sm leading-snug mt-1 transition-colors duration-300",
                      isActive ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"
                    )}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* CTA */}
            <div className="mt-8 pl-6">
              <a href="#" className="inline-flex items-center gap-3 text-white font-medium group transition-all">
                Access Full Insights
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT PANE: CANVAS */}
          <div className="w-full lg:w-7/12 min-h-[400px] lg:min-h-[500px]">
            <div className="relative w-full h-full rounded-3xl bg-neutral-900/40 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl p-5 md:p-8 flex flex-col">
              
              {/* Badge Header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeTab.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: activeTab.color, backgroundColor: activeTab.color }} />
                    <span className="text-[11px] leading-none font-medium tracking-wide text-zinc-200 uppercase">{activeTab.badge}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Chart Area */}
              <div className="flex-1 relative w-full h-full">
                <AnimatePresence mode="wait">
                  {isMounted && (
                    <motion.div
                      key={`chart-${activeTab.id}`}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {activeTabId === "rattan" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={rattanData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="rattanGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity={1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid horizontal={false} stroke="#ffffff0a" strokeDasharray="3 3" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="year" type="category" axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12, fontWeight: 500 }} tickMargin={15} />
                            <RechartsTooltip cursor={{ fill: '#ffffff0a' }} content={<CustomTooltip />} />
                            <Bar barSize={16} dataKey="Raw Rattan" stackId="a" fill="#ffffff10" radius={[10, 0, 0, 10]} />
                            <Bar barSize={16} dataKey="Processed Furniture" stackId="a" fill="url(#rattanGradient)" radius={[0, 10, 10, 0]} background={{ fill: '#ffffff05', radius: 10 }} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}

                      {activeTabId === "coffee" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={coffeeData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={activeTab.color} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={activeTab.color} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="#ffffff15" strokeDasharray="1 4" />
                            <XAxis dataKey="altitude" axisLine={false} tickLine={false} stroke="#a1a1aa" fontSize={12} tickMargin={10} />
                            <YAxis yAxisId="left" domain={['dataMin - 2', 'dataMax + 2']} hide />
                            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <ReferenceArea yAxisId="left" x1="400m" x2="700m" fill="#10b981" fillOpacity={0.1} />
                            <ReferenceLine yAxisId="left" y={20} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.4} />
                            <Area yAxisId="left" type="monotone" name="Temperature" dataKey="temp" stroke={activeTab.color} strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" activeDot={{ r: 6, strokeWidth: 2, stroke: activeTab.color, fill: '#fff' }} />
                            <Line yAxisId="right" type="monotone" name="Yield Viability" dataKey="viability" stroke="#2dd4bf" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 4, fill: '#2dd4bf', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#2dd4bf', stroke: '#fff', strokeWidth: 2 }} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      )}

                      {activeTabId === "charcoal" && (
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                          <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadialBarChart 
                                cx="50%" cy="100%" 
                                innerRadius="80%" outerRadius="100%" 
                                barSize={12} 
                                data={charcoalData}
                                startAngle={180} endAngle={0}
                              >
                                <defs>
                                  <linearGradient id="thermalGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                                    <stop offset="50%" stopColor="#ef4444" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#9f1239" stopOpacity={1} />
                                  </linearGradient>
                                </defs>
                                <RadialBar background={{ fill: '#ffffff0a' }} dataKey="value" cornerRadius={15} />
                                <RechartsTooltip content={<CustomTooltip />} />
                              </RadialBarChart>
                            </ResponsiveContainer>
                          </div>
                          {/* Centered Gauge Text */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-5xl md:text-6xl font-light text-white tracking-tighter"
                              style={{ textShadow: "0 0 40px rgba(239, 68, 68, 0.6)" }}
                            >
                              85-98<span className="text-3xl text-zinc-500">%</span>
                            </motion.div>
                            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mt-2">Carbon Purity</p>
                          </div>
                        </div>
                      )}

                      {activeTabId === "essential" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={essentialData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                            <XAxis dataKey="period" axisLine={false} tickLine={false} stroke="#a1a1aa" fontSize={12} tickMargin={10} />
                            <YAxis hide />
                            <RechartsTooltip cursor={{ fill: '#ffffff0a' }} content={<CustomTooltip />} />
                            <Bar dataKey="export" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                            <Line 
                              type="monotone" 
                              dataKey="demand" 
                              stroke="#ffffff80" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ r: 4, fill: '#8b5cf6', stroke: '#ffffff80', strokeWidth: 2 }} 
                              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }} 
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
