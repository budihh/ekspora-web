"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  date?: string;
}

export function DisplayCards({ cards }: { cards?: DisplayCardProps[] }) {
  const defaultCards = [
    {
      icon: <Sparkles className="size-4 text-zinc-300" />,
      title: "Featured",
      description: "Discover our premium selection",
      date: "Today",
    },
    {
      icon: <Sparkles className="size-4 text-zinc-300" />,
      title: "Secondary",
      description: "Discover our premium selection",
      date: "Tomorrow",
    },
    {
      icon: <Sparkles className="size-4 text-zinc-300" />,
      title: "Tertiary",
      description: "Discover our premium selection",
      date: "Soon",
    },
  ];

  const initialCards = cards || defaultCards;
  
  // We use a simple array of objects, but to keep track of React keys stably,
  // we add an originalIndex.
  const [order, setOrder] = useState(
    initialCards.map((card, idx) => ({ ...card, originalIndex: idx }))
  );

  const cycleCards = () => {
    setOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift();
      if (first) newOrder.push(first);
      return newOrder;
    });
  };

  return (
    <div 
      className="relative w-full max-w-[18rem] md:max-w-[22rem] h-[24rem] mx-auto cursor-pointer" 
      onClick={cycleCards}
    >
      {order.map((card, index) => {
        return (
          <motion.div
            key={card.originalIndex}
            layout
            initial={{ scale: 0.9, opacity: 0, y: index * 40, x: index * 20 }}
            animate={{ 
              scale: index === 0 ? 1 : 1 - index * 0.05, 
              opacity: index === 0 ? 1 : Math.max(0.3, 1 - index * 0.3), 
              y: index * 30,
              x: index * 20,
              zIndex: order.length - index 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 w-full"
          >
            <div
              className={`relative flex flex-col justify-between w-full h-80 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-zinc-950/80 after:to-transparent after:pointer-events-none`}
            >
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div
                  className={`p-2 bg-zinc-800/80 rounded-lg border border-white/10 ${card.iconClassName || ""}`}
                >
                  {card.icon}
                </div>
                {card.date && (
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {card.date}
                  </span>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                <h3
                  className={`text-xl font-bold text-white mb-2 ${card.titleClassName || ""}`}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
