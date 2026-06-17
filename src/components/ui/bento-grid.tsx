"use client";

import React from "react";

export interface BentoItem {
  title: string;
  meta: string;
  description: string;
  icon: React.ReactNode;
  status: string;
  tags: string[];
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-zinc-900/50 backdrop-blur-md border border-white/5 p-8"
        >
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                <span className="text-sm font-medium text-zinc-400">{item.meta}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
              {item.status}
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-800/50 rounded-md border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
