"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PhilosophyVisualProps {
  activeIndex: number | null;
}

export function PhilosophyVisual({ activeIndex }: PhilosophyVisualProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Auto-cycle index through all 4 stages when not hovering
  useEffect(() => {
    if (activeIndex !== null || !isInView) return;

    const interval = setInterval(() => {
      setInternalIndex((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, isInView]);

  // Stage 0: Draft, 1: Diverge, 2: Compare, 3: Merge
  const effectiveStage = activeIndex !== null ? activeIndex + 1 : internalIndex;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 flex items-center justify-center overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-px h-full">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-border to-transparent" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 border-t border-r border-border opacity-50" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-l border-border opacity-50" />
          </div>
        ))}
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-4xl relative z-10"
      >
        <defs>
          <filter id="sectionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Section Labels - Fixed Position */}
        <g className="font-mono text-[7px] uppercase tracking-[0.3em]">
          {[
            { x: 75, text: "Draft", stage: 0 },
            { x: 225, text: "Diverge", stage: 1 },
            { x: 375, text: "Compare", stage: 2 },
            { x: 525, text: "Merge", stage: 3 },
          ].map((item) => (
            <g key={item.text} className="transition-all duration-500">
              {effectiveStage === item.stage && (
                <rect
                  x={item.x - 30}
                  y="5"
                  width="60"
                  height="14"
                  fill="currentColor"
                  className="text-primary/10"
                />
              )}
              <text
                x={item.x}
                y="15"
                textAnchor="middle"
                className={`transition-opacity duration-300 ${
                  effectiveStage === item.stage
                    ? "fill-primary font-bold opacity-100"
                    : "fill-muted-foreground opacity-30"
                }`}
              >
                {item.text}
              </text>
            </g>
          ))}
        </g>

        {/* --- STAGE 0: DRAFT (0 -> 150) --- */}
        <g>
          <path
            d="M 0 60 H 150"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/20"
          />
          <motion.path
            d="M 0 60 H 150"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary"
            initial={false}
            animate={{ opacity: effectiveStage === 0 ? 1 : 0 }}
          />
          {effectiveStage === 0 && (
            <motion.circle
              r="2"
              fill="currentColor"
              className="text-primary"
              animate={{ cx: [0, 150], opacity: [0, 1, 0] }}
              style={{ cy: 60 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </g>

        {/* --- STAGE 1: DIVERGE (150 -> 275) --- */}
        <g>
          {[35, 85].map((y, i) => (
            <g key={`diverge-${i}`}>
              <path
                d={`M 150 60 C 200 60, 225 ${y}, 275 ${y}`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/20"
              />
              <motion.path
                d={`M 150 60 C 200 60, 225 ${y}, 275 ${y}`}
                stroke="currentColor"
                strokeWidth="2.5"
                filter={effectiveStage === 1 ? "url(#sectionGlow)" : "none"}
                className="text-primary"
                initial={false}
                animate={{
                  opacity: effectiveStage === 1 ? 1 : 0,
                }}
              />
              {effectiveStage === 1 && (
                <motion.circle
                  r="2"
                  fill="currentColor"
                  className="text-primary"
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  style={{
                    offsetPath: `path("M 150 60 C 200 60, 225 ${y}, 275 ${y}")`,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {/* --- STAGE 2: COMPARE (275 -> 425) --- */}
        <g>
          {[35, 85].map((y, i) => (
            <g key={`compare-${i}`}>
              <path
                d={`M 275 ${y} H 425`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/20"
              />
              <motion.path
                d={`M 275 ${y} H 425`}
                stroke="currentColor"
                strokeWidth="2.5"
                filter={effectiveStage === 2 ? "url(#sectionGlow)" : "none"}
                className="text-primary"
                initial={false}
                animate={{ opacity: effectiveStage === 2 ? 1 : 0 }}
              />
            </g>
          ))}

          {effectiveStage === 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.rect
                x="275"
                y="25"
                width="2"
                height="70"
                fill="currentColor"
                className="text-primary opacity-40 blur-[1px]"
                animate={{ x: [275, 425, 275] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {[275, 310, 350, 390].map((x, i) => (
                <motion.rect
                  key={i}
                  x={x + 15}
                  y="40"
                  width="1"
                  height="40"
                  fill="currentColor"
                  className="text-primary/20"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              <rect
                x="310"
                y="32"
                width="15"
                height="4"
                fill="currentColor"
                className="text-primary/40"
              />
              <rect
                x="370"
                y="82"
                width="20"
                height="4"
                fill="currentColor"
                className="text-primary/40"
              />
            </motion.g>
          )}
        </g>

        {/* --- STAGE 3: MERGE (425 -> 600) --- */}
        <g>
          {[35, 85].map((y, i) => (
            <g key={`merge-${i}`}>
              <path
                d={`M 425 ${y} C 475 ${y}, 500 60, 525 60`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/20"
              />
              <motion.path
                d={`M 425 ${y} C 475 ${y}, 500 60, 525 60`}
                stroke="currentColor"
                strokeWidth="2.5"
                filter={effectiveStage === 3 ? "url(#sectionGlow)" : "none"}
                className="text-primary"
                initial={false}
                animate={{ opacity: effectiveStage === 3 ? 1 : 0 }}
              />
            </g>
          ))}
          <path
            d="M 525 60 H 600"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/20"
          />
          <motion.path
            d="M 525 60 H 600"
            stroke="currentColor"
            strokeWidth="3.5"
            filter={effectiveStage === 3 ? "url(#sectionGlow)" : "none"}
            className="text-primary"
            initial={false}
            animate={{ opacity: effectiveStage === 3 ? 1 : 0 }}
          />
          {effectiveStage === 3 && (
            <motion.circle
              r="4"
              fill="currentColor"
              className="text-primary shadow-lg"
              animate={{ cx: [525, 610], opacity: [0, 1, 0] }}
              style={{ cy: 60 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
