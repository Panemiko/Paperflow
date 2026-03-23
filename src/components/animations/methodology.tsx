"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PaperflowCard } from "../ui/card";
import { MaxWidth } from "../max-width";

interface MethodologyProps {
  dict: any;
  items: any[];
}

export function Methodology({ dict, items }: MethodologyProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const d = dict || {
    draft: "Draft",
    diverge: "Diverge",
    compare: "Compare",
    merge: "Merge",
  };

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[120px] md:h-48 flex items-center justify-center overflow-hidden bg-white border-y border-border backdrop-blur-sm">
        {/* Background Architectural Grid (Subtle) */}
        <div className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative w-px h-full">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-border to-transparent" />
            </div>
          ))}
        </div>

        <MaxWidth className="w-full flex items-center justify-center relative z-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-4xl"
          >
            {/* ... svg content ... */}
            <defs>
            </defs>

            {/* Phase Labels */}
            <g className="font-mono text-[8px] uppercase tracking-[0.3em] transition-colors duration-500">
              <text
                x="75"
                y="20"
                textAnchor="middle"
                className={
                  activePhase === 0 ? "fill-primary" : "fill-muted-foreground/40"
                }
              >
                {d.draft}
              </text>
              <text
                x="225"
                y="20"
                textAnchor="middle"
                className={
                  activePhase === 1 ? "fill-primary" : "fill-muted-foreground/40"
                }
              >
                {d.diverge}
              </text>
              <text
                x="375"
                y="20"
                textAnchor="middle"
                className={
                  activePhase === 2 ? "fill-primary" : "fill-muted-foreground/40"
                }
              >
                {d.compare}
              </text>
              <text
                x="525"
                y="20"
                textAnchor="middle"
                className={
                  activePhase === 3 ? "fill-primary" : "fill-muted-foreground/40"
                }
              >
                {d.merge}
              </text>
            </g>

            {/* The Base Trace */}
            <g className="text-primary/20">
              <path d="M 0 60 H 600" stroke="currentColor" strokeWidth="1" />
              <path
                d="M 225 60 C 250 60, 275 35, 300 35"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M 300 35 H 450"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M 450 35 C 475 35, 500 60, 525 60"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>

            {/* Active phase highlights */}
            <AnimatePresence>
              {activePhase !== null && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-primary/10"
                >
                  <rect
                    x={activePhase * 150}
                    y="0"
                    width="150"
                    height="120"
                    fill="currentColor"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* The Flow Animation */}
            <g className="text-primary">
              {/* Path A: Straight Baseline */}
              <motion.path
                d="M 0 60 H 600"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="40 560"
                animate={{ strokeDashoffset: [0, -600] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Path B: Divergent then Merged */}
              <motion.path
                d="M 0 60 H 225 C 250 60, 275 35, 300 35 H 450 C 475 35, 500 60, 525 60 H 600"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="40 570"
                animate={{ strokeDashoffset: [0, -610] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </g>

            {/* Highlight Circles at key junctions */}
            <g fill="currentColor" className="text-primary">
              <circle cx="225" cy="60" r="2" />
              <circle cx="525" cy="60" r="2" />
            </g>
          </svg>
        </MaxWidth>
      </div>

      <MaxWidth className="mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: any, index: number) => (
            <PaperflowCard
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              onMouseEnter={() => setActivePhase(index)}
              onMouseLeave={() => setActivePhase(null)}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              hoverGlow={false}
            />
          ))}
        </div>
      </MaxWidth>
    </div>
  );
}
