"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export const TimelineBeam = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Kepala bergerak presisi tanpa lag
  const headPosition = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Ekor menggunakan spring agar "membuntuti" kepala dengan halus
  const tailPosition = useSpring(headPosition, { stiffness: 200, damping: 40 });

  // Kalkulasi posisi absolut Kepala
  const headTop = useTransform(headPosition, (v) => `${v * 100}%`);

  // Kalkulasi Elastisitas Ekor (Mencegah gap antara kepala dan ekor)
  const tailTop = useTransform(
    [headPosition, tailPosition],
    ([head, tail]) => {
      if ((head as number) > (tail as number)) {
        // Scroll turun: ekor tertinggal di atas. Top point harus naik 32px untuk base height
        return `calc(${(tail as number) * 100}% - 32px)`;
      } else {
        // Scroll naik: ekor tertinggal di bawah. Top point tepat di kepala.
        return `${(head as number) * 100}%`;
      }
    }
  );

  const tailHeight = useTransform(
    [headPosition, tailPosition],
    ([head, tail]) => {
      // Tinggi = Jarak absolut antara kepala dan ekor + 32px (panjang minimum komet)
      const distance = Math.abs((head as number) - (tail as number)) * 100;
      return `calc(${distance}% + 32px)`;
    }
  );

  const tailGradient = useTransform(
    [headPosition, tailPosition],
    ([head, tail]) => {
      if ((head as number) > (tail as number)) {
        // Arah bawah -> pudar ke atas
        return "linear-gradient(to top, rgba(255,255,255,0.8), transparent)";
      } else {
        // Arah atas -> pudar ke bawah
        return "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)";
      }
    }
  );

  return (
    <div ref={containerRef} className="absolute left-0 top-0 h-full w-px bg-zinc-800">
      
      {/* Ekor Fisika Elastis (Selalu tersambung ke kepala, memanjang sesuai kecepatan) */}
      <motion.div
        style={{ 
          top: tailTop,
          height: tailHeight,
          background: tailGradient,
        }}
        className="absolute -left-[0.5px] z-10 w-[2px]"
      />

      {/* Kepala Komet (Titik Konstan) */}
      <motion.div
        style={{ top: headTop }}
        className="absolute -left-[3.5px] z-20 h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)] -translate-y-1/2"
      />

    </div>
  );
};
