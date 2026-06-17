"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Handshake, ShieldCheck, Building2, Leaf, Zap, Link as LinkIcon } from "lucide-react";

const timelineData = [
  { id: 1, title: "Global Bridge", date: "Pillar 01", content: "Connecting Indonesia's finest commodities with the global market. We curate authentic natural resources to meet stringent international demands.", category: "Vision", icon: Globe, relatedIds: [2, 4], status: "completed", energy: 100 },
  { id: 2, title: "Strategic Alliances", date: "Pillar 02", content: "Moving beyond transactional trade to align our growth directly with the operational success of our global clients.", category: "Partnership", icon: Handshake, relatedIds: [1, 3], status: "completed", energy: 90 },
  { id: 3, title: "Uncompromising Standards", date: "Pillar 03", content: "Governed by strict international compliance, from ethical sourcing to rigorous quality control across every supply chain tier.", category: "Quality", icon: ShieldCheck, relatedIds: [2, 5], status: "in-progress", energy: 85 },
  { id: 4, title: "Enterprise Value", date: "Pillar 04", content: "Delivering the predictability, massive scale, and premium consistency required by multinational enterprises worldwide.", category: "Scale", icon: Building2, relatedIds: [1, 5], status: "pending", energy: 75 },
  { id: 5, title: "Sustainable Empowerment", date: "Pillar 05", content: "Investing in local communities to ensure fair trade practices, mutual growth, and long-term ecological balance.", category: "Sustainability", icon: Leaf, relatedIds: [3, 4], status: "in-progress", energy: 95 }
];

export function OrbitalManifesto() {
  const [activeNodeId, setActiveNodeId] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState(false);

  const radius = 160;

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y, angle };
  };

  const centerViewOnNode = (id: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === id);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    // Target the top-most position (270 degrees in JS Math)
    setRotationAngle(270 - targetAngle); 
  };

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => prev + 0.2);
    }, 20);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const activeItem = timelineData.find((n) => n.id === activeNodeId) || timelineData[0];

  return (
    <div className="container mx-auto px-4 md:px-6 h-[700px] flex flex-col lg:flex-row items-center justify-between gap-12">
      
      {/* LEFT COLUMN: The Orbit */}
      <div 
        className="relative w-full lg:w-1/2 h-full flex items-center justify-center overflow-visible"
        onMouseEnter={() => setAutoRotate(false)}
        onMouseLeave={() => setAutoRotate(true)}
      >
        {/* Lingkaran Pusat (Dekorasi) */}
        <div className="absolute w-[320px] h-[320px] rounded-full border border-zinc-800/50" />
        <div className="absolute w-[480px] h-[480px] rounded-full border border-zinc-800/20 border-dashed" />
        <div className="absolute w-[160px] h-[160px] rounded-full bg-zinc-900/50 border border-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            <Globe className="w-10 h-10 text-zinc-600 opacity-50" />
        </div>

        {/* Orbit Rotating Container */}
        <div className="absolute w-[320px] h-[320px] flex items-center justify-center">
          {timelineData.map((node, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isActive = node.id === activeNodeId;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                className="absolute transition-all duration-700 ease-in-out"
                style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
              >
                <div
                  onClick={() => {
                    setActiveNodeId(node.id);
                    setAutoRotate(false); // Stop auto-spinning when user interacts
                    centerViewOnNode(node.id); // SPIN THE ORBIT
                    
                    setPulseEffect(true);
                    setTimeout(() => setPulseEffect(false), 500);
                  }}
                  className={`relative cursor-pointer flex items-center justify-center w-14 h-14 rounded-full border backdrop-blur-md transition-all duration-500 ${
                    isActive 
                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.8)] scale-110 z-20" 
                      : "bg-zinc-900/80 text-white border-white/10 hover:bg-zinc-800 hover:scale-105 hover:border-white/30 z-10"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  
                  {/* Efek Denyut saat diklik */}
                  {isActive && pulseEffect && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white"
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Master Content Card */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
        <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden h-[460px] flex flex-col">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              {/* Header Badge */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
                  {activeItem.date}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                  activeItem.status === 'completed' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' :
                  activeItem.status === 'in-progress' ? 'border-blue-500/20 text-blue-400 bg-blue-500/10' :
                  'border-zinc-500/20 text-zinc-400 bg-zinc-500/10'
                }`}>
                  {activeItem.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              {/* Title & Content */}
              <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight mb-3">
                {activeItem.title}
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                {activeItem.content}
              </p>

              {/* Data Row: Energy & Connections */}
              <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                
                {/* Energy Bar */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-400 mb-2">
                    <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-zinc-300"/> Core Energy</span>
                    <span>{activeItem.energy}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-zinc-500 to-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeItem.energy}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Related Nodes Button */}
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 mb-3">
                    <LinkIcon className="w-3 h-3" /> Related Pillars
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.relatedIds.map(rid => {
                      const relatedNode = timelineData.find(n => n.id === rid);
                      if (!relatedNode) return null;
                      return (
                        <button
                          key={rid}
                          onClick={() => centerViewOnNode(rid)}
                          className="px-3 py-1.5 text-xs text-zinc-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          <relatedNode.icon className="w-3 h-3" />
                          {relatedNode.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
