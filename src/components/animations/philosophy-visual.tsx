"use client";

import { motion } from "framer-motion";

export function PhilosophyVisual() {
  return (
    <div className="relative w-full min-h-[120px] md:h-48 flex items-center justify-center overflow-hidden">
      {/* Background Architectural Grid (Subtle) */}
      <div className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-px h-full">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-border to-transparent" />
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
          <filter id="flowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Phase Labels */}
        <g className="font-mono text-[8px] uppercase tracking-[0.3em] fill-muted-foreground/40">
          <text x="75" y="20" textAnchor="middle">
            Draft
          </text>
          <text x="225" y="20" textAnchor="middle">
            Diverge
          </text>
          <text x="375" y="20" textAnchor="middle">
            Compare
          </text>
          <text x="525" y="20" textAnchor="middle">
            Merge
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

        {/* The Flow Animation */}
        <g className="text-primary" filter="url(#flowGlow)">
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
    </div>
  );
}
