"use client";

import { motion, useAnimation, useAnimationFrame } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animation = useAnimation();

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      lastPosition.current = position;
    },
    []
  );

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove, disabled]);

  useAnimationFrame(() => {
    if (!containerRef.current || disabled) return;
    const { x, y } = lastPosition.current;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  });

  return (
    <>
      <div
        className={[
          "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-300 sm:block",
          glow ? "opacity-100" : "",
          variant === "white" ? "border-white" : "border-transparent",
          className || ""
        ].filter(Boolean).join(" ")}
      />
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": `${spread}deg`,
            "--inactive-zone": inactiveZone,
            "--proximity": proximity,
            "--border-width": `${borderWidth}px`,
            "--gradient":
              variant === "white"
                ? `repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))`
                : `radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 20%),
                   radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 5%, transparent 15%),
                   radial-gradient(circle at 60% 60%, rgba(161,161,170,0.1) 10%, transparent 20%), 
                   repeating-conic-gradient(
                     from 236.84deg at 50% 50%,
                     #ffffff 0%,
                     #71717a calc(25% / var(--repeating-conic-gradient-times)),
                     #a1a1aa calc(50% / var(--repeating-conic-gradient-times)), 
                     #27272a calc(75% / var(--repeating-conic-gradient-times)),
                     #ffffff calc(100% / var(--repeating-conic-gradient-times))
                   )`,
            "--repeating-conic-gradient-times": "5",
          } as React.CSSProperties
        }
        className={[
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-300",
          glow ? "opacity-100" : "",
          blur > 0 ? "blur-[var(--blur)]" : "",
          disabled ? "!hidden" : "",
          className || ""
        ].filter(Boolean).join(" ")}
      >
        <div
          className={[
            "glow",
            "rounded-[inherit]",
            "absolute inset-0",
            "mix-blend-color-dodge",
            "will-change-[background]"
          ].join(" ")}
          style={{
            background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), white 0%, transparent var(--proximity, 50%))`,
            WebkitMaskImage: `var(--gradient)`,
            maskImage: `var(--gradient)`,
          }}
        />
        <div
          className={[
            "glow",
            "rounded-[inherit]",
            "absolute inset-0",
            "will-change-[background]"
          ].join(" ")}
          style={{
            padding: "var(--border-width)",
            background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), white 0%, transparent var(--proximity, 50%))`,
            WebkitMaskImage:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        >
          <div
            className="absolute inset-0 rounded-[inherit] will-change-[background]"
            style={{
              background: `var(--gradient)`,
            }}
          />
        </div>
      </div>
    </>
  );
}
