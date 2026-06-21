"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Scale, Users, Mountain, Globe, TreePine, Flame, Droplets } from "lucide-react";
import { DisplayCards } from "@/components/ui/display-cards";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { TimelineBeam } from "@/components/ui/timeline-beam";
import { OrbitalManifesto } from "@/components/ui/orbital-manifesto";
import Image from "next/link"; // Not next/image, wait, I'll use standard img tag for simplicity with external urls

export default function HeritagePage() {

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any },
    },
  };

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any },
    },
  };

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any },
    },
  };

  const bentoItems: BentoItem[] = [
    {
      title: "Global Credentials",
      meta: "ISO/FDA Certified",
      description: "Strictly regulated operations meeting rigorous global procurement standards.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
      status: "Verified",
      tags: ["Compliance", "Quality"],
    },
    {
      title: "Ethical Sourcing",
      meta: "Fair Trade",
      description: "Direct partnerships with local cooperatives ensuring unmatched quality at the root.",
      icon: <Leaf className="w-4 h-5 text-green-500" />,
      status: "Sustainable",
      tags: ["ESG", "Traceability"],
    },
    {
      title: "Corporate Integrity",
      meta: "Zero-Compromise",
      description: "Transparent pricing, verifiable trade trails, and adherence to international laws.",
      icon: <Scale className="w-4 h-4 text-blue-500" />,
      status: "Secure",
      tags: ["Ethics", "Transparency"],
    },
    {
      title: "Expert Leadership",
      meta: "Supply Chain Veterans",
      description: "Guided by industry leaders in international logistics and agrarian sciences.",
      icon: <Users className="w-4 h-4 text-purple-500" />,
      status: "Expertise",
      tags: ["Leadership", "Strategy"],
    },
  ];

  const originCards = [
    {
      icon: <TreePine className="size-4 text-zinc-300"/>,
      title: "Refined Craftsmanship",
      description: "SVLK/FSC certified wood, local artisans, and custom furniture designs.",
      date: "Forestry & Wood",
      iconClassName: "text-white",
      titleClassName: "text-white",
    },
    {
      icon: <Flame className="size-4 text-zinc-300"/>,
      title: "Sustainable Biomass",
      description: "Eco-friendly, low-smoke charcoal and high-calorie briquettes.",
      date: "Energy Solutions",
      iconClassName: "text-white",
      titleClassName: "text-white",
    },
    {
      icon: <Droplets className="size-4 text-zinc-300"/>,
      title: "Botanical Purity",
      description: "100% pure essential oils and crops sourced directly from farmers.",
      date: "Agrarian Extracts",
      iconClassName: "text-white",
      titleClassName: "text-white",
    },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-40 flex flex-col gap-y-24 md:gap-y-32 lg:gap-y-40 w-full overflow-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden px-6"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <motion.div variants={fadeUpVariant} className="mb-6">
          <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
            Our Heritage
          </span>
        </motion.div>
        
        <motion.h1 
          variants={fadeUpVariant}
          className="text-5xl md:text-8xl font-display font-bold tracking-tighter bg-linear-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-8 max-w-5xl"
        >
          Harnessing the Archipelago's Boundless Resources.
        </motion.h1>
        
        <motion.p 
          variants={fadeUpVariant}
          className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          Ekspora bridges the gap between Indonesia's vast natural wealth and the rigorous demands of global enterprise procurement across multiple sectors.
        </motion.p>
      </motion.section>

      {/* 2. THE ORIGIN STORY */}
      <section className="overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeftVariant}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              A Network Built on Deep Local Integration
            </h2>
            <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
              Indonesia is a treasure trove of natural resources, from fertile volcanic soils to sustainable commercial forests. However, navigating and standardizing this vast archipelago requires more than just trading expertise; it requires deep roots.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Ekspora was established upon a singular, powerful advantage: direct, entrenched access to an extensive network of specialized factories, local cooperatives, and master artisans. We consolidate this fragmented wealth into a seamless, enterprise-grade supply chain.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRightVariant}
            className="md:w-1/2 flex items-center justify-center min-h-[400px] pt-10 md:pt-0"
          >
            <DisplayCards cards={originCards} />
          </motion.div>
        </div>
      </section>

      {/* 2.5 ORBITAL MANIFESTO */}
      <section className="relative overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-10"
        >
          <h3 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase mb-4">
            The Ekspora Manifesto
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
            Our Orbital Philosophy
          </h2>
        </motion.div>
        
        <OrbitalManifesto />
      </section>

      {/* 3. THE CORE PILLARS BENTO GRID */}
      <section className="relative">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-white mb-16 tracking-tighter">
              The Pillars of Our Operation
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <BentoGrid items={bentoItems} />
          </motion.div>
        </div>
      </section>

      {/* 4. THE JOURNEY / TIMELINE */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center bg-linear-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-20 tracking-tighter">
              A Trajectory of Growth
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative ml-4 md:ml-12 pl-8 md:pl-16 space-y-16"
          >
            {/* SVG Shooting Star Timeline */}
            <TimelineBeam />

            {[
              {
                title: "Cultivating Roots",
                desc: "Establishing direct partnerships with over 50 local cooperatives across the archipelago."
              },
              {
                title: "Standardizing Excellence",
                desc: "Achieving FDA registration and ISO compliance to meet stringent global procurement criteria."
              },
              {
                title: "Global Expansion",
                desc: "Seamlessly delivering multi-tonnage shipments to enterprise clients across 3 continents."
              }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="relative">
                {/* Glowing Dot */}
                <div className="absolute left-[-41px] md:left-[-73px] top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-4 border-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4.5 EXECUTIVE LEADERSHIP */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-white mb-6 tracking-tighter">
              The Custodians of Our Standard
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto text-center mb-16">
              A unified team of global supply chain veterans and industry experts ensuring your commodities are delivered without compromise.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { name: "Fahmy", role: "CEO", image: "/images/team/fahmy.png" },
              { name: "Denny", role: "CFO", image: "/images/team/denny.png" },
              { name: "Dany", role: "Marketing", image: "/images/team/dany.png" },
              { name: "Novan", role: "Marketing", image: "/images/team/novan.png" }
            ].map((member, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpVariant}
                className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 aspect-3/4"
              >
                <div className="absolute inset-0 bg-zinc-800" /> {/* Fallback bg */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback visually if image fails to load during dev
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                <div className="p-6 absolute bottom-0 left-0 w-full bg-linear-to-t from-black/60 via-black/30 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-zinc-300 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. BORDERLESS LEGACY CLOSING */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col items-center text-center relative overflow-hidden px-6"
      >
        {/* Ambient bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <motion.div variants={fadeUpVariant}>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
            A Legacy of Excellence
          </h2>
        </motion.div>
        
        <motion.div variants={fadeUpVariant}>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Since our inception, we have been committed to elevating the standards of Indonesian exports. Join us in shaping the future of global trade.
          </p>
        </motion.div>
      </motion.section>

    </div>
  );
}
