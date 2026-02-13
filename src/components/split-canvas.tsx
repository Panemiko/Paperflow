"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GitBranch, Save } from "lucide-react";
import { useEffect, useState } from "react";

type AnimationPhase =
  | "idle"
  | "selecting"
  | "branching"
  | "editing"
  | "merging"
  | "merged";

export function SplitCanvas() {
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  const originalText =
    "She found him at the edge of the pier, exactly where she knew he would be. Twenty years had passed since that summer, but some things never changed. The fog rolled in from the bay, obscuring the distant lights of the city, and she wondered if he had ever stopped waiting.";

  const branchText =
    "She found him at the edge of the pier, exactly where she knew he would be. Twenty years had passed since that summer, but some things never changed. He turned before she could speak, and in his eyes she saw not the boy she remembered, but a man who had learned to live with absence. The fog rolled in like a held breath finally released.";

  useEffect(() => {
    const runAnimation = () => {
      setPhase("idle");

      const timers = [
        setTimeout(() => setPhase("selecting"), 1500),
        setTimeout(() => setPhase("branching"), 3000),
        setTimeout(() => setPhase("editing"), 4500),
        setTimeout(() => setPhase("merging"), 7000),
        setTimeout(() => setPhase("merged"), 8500),
        setTimeout(() => runAnimation(), 11000),
      ];

      return () => timers.forEach(clearTimeout);
    };

    const cleanup = runAnimation();
    return cleanup;
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Editor Side */}
      <div className="relative">
        <div className="absolute -top-3 left-4 z-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-background px-2">
            Editor
          </span>
        </div>
        <div className="border border-border bg-card p-6 lg:p-8 min-h-[320px]">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
              draft_v3.pflow
            </span>
            <div className="flex gap-2">
              <motion.button
                className="px-3 py-1.5 text-xs font-medium border border-border text-foreground bg-transparent flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Save
              </motion.button>
              <motion.button
                className={`px-3 py-1.5 text-xs font-medium border-2 transition-all duration-300 flex items-center gap-2 group ${
                  phase === "selecting" || phase === "branching"
                    ? "border-primary bg-primary text-background shadow-[0_0_20px_rgba(0,105,92,0.4)]"
                    : "border-border text-foreground bg-transparent"
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(0,105,92,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <GitBranch
                  className={`w-3.5 h-3.5 transition-transform group-hover:rotate-12 ${
                    phase === "selecting" || phase === "branching"
                      ? "text-background"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                Branch
              </motion.button>
            </div>
          </div>

          {/* Editor content */}
          <div className="font-serif text-sm leading-relaxed text-foreground">
            <AnimatePresence mode="wait">
              {phase === "merged" ? (
                <motion.div
                  key="merged"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span>{branchText.slice(0, 180)}</span>
                  <motion.span
                    className="bg-primary/30 px-0.5"
                    initial={{ backgroundColor: "rgba(0,105,92,0.6)" }}
                    animate={{ backgroundColor: "rgba(0,105,92,0.15)" }}
                    transition={{ duration: 2 }}
                    style={{ color: "var(--background)" }}
                  >
                    {branchText.slice(180)}
                  </motion.span>
                </motion.div>
              ) : (
                <motion.div key="original">
                  <span>{originalText.slice(0, 180)}</span>
                  <motion.span
                    className={`transition-all duration-500 ${
                      phase === "selecting" || phase === "branching"
                        ? "bg-primary/40 text-background"
                        : ""
                    }`}
                  >
                    {originalText.slice(180)}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status indicator */}
          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor:
                  phase === "idle" || phase === "merged"
                    ? "var(--muted-foreground)"
                    : "#00695C",
                boxShadow:
                  phase === "idle" || phase === "merged"
                    ? "none"
                    : "0 0 8px rgba(0,105,92,0.6)",
              }}
            />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {phase === "idle" && "Ready"}
              {phase === "selecting" && "Selecting text..."}
              {phase === "branching" && "Creating branch..."}
              {phase === "editing" && "Editing branch..."}
              {phase === "merging" && "Merging changes..."}
              {phase === "merged" && "Changes merged"}
            </span>
          </div>
        </div>
      </div>

      {/* Graph Side */}
      <div className="relative">
        <div className="absolute -top-3 left-4 z-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-background px-2">
            Version Graph
          </span>
        </div>
        <div className="border border-border bg-card p-6 lg:p-8 min-h-[320px]">
          <svg viewBox="0 0 400 240" className="w-full h-auto">
            {/* Main timeline */}
            <motion.line
              x1="60"
              y1="120"
              x2="340"
              y2="120"
              stroke="var(--border)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Branch line */}
            <AnimatePresence>
              {(phase === "branching" ||
                phase === "editing" ||
                phase === "merging") && (
                <motion.path
                  d="M 180 120 Q 200 80 240 60"
                  fill="none"
                  stroke="#00695C"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            {/* Merge line */}
            <AnimatePresence>
              {phase === "merging" && (
                <motion.path
                  d="M 240 60 Q 280 80 300 120"
                  fill="none"
                  stroke="#00695C"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            {/* Main nodes */}
            {[60, 120, 180, 300, 340].map((x, i) => (
              <motion.g key={x}>
                <motion.circle
                  cx={x}
                  cy="120"
                  r="8"
                  fill={
                    x === 300 && phase === "merged"
                      ? "#00695C"
                      : "var(--foreground)"
                  }
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    fill:
                      x === 300 && phase === "merged"
                        ? "#00695C"
                        : "var(--foreground)",
                  }}
                  transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                />
                {x === 300 && phase === "merged" && (
                  <motion.circle
                    cx={x}
                    cy="120"
                    r="12"
                    fill="none"
                    stroke="#00695C"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: 2 }}
                  />
                )}
              </motion.g>
            ))}

            {/* Branch node */}
            <AnimatePresence>
              {(phase === "branching" ||
                phase === "editing" ||
                phase === "merging") && (
                <motion.g>
                  <motion.circle
                    cx="240"
                    cy="60"
                    r="10"
                    fill="#00695C"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.circle
                    cx="240"
                    cy="60"
                    r="16"
                    fill="none"
                    stroke="#00695C"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Labels */}
            <text
              x="60"
              y="150"
              textAnchor="middle"
              className="fill-muted-foreground text-[9px] font-mono"
            >
              v1.0
            </text>
            <text
              x="180"
              y="150"
              textAnchor="middle"
              className="fill-muted-foreground text-[9px] font-mono"
            >
              v1.2
            </text>
            <text
              x="340"
              y="150"
              textAnchor="middle"
              className="fill-muted-foreground text-[9px] font-mono"
            >
              HEAD
            </text>

            <AnimatePresence>
              {(phase === "branching" ||
                phase === "editing" ||
                phase === "merging") && (
                <motion.text
                  x="240"
                  y="40"
                  textAnchor="middle"
                  className="fill-primary text-[9px] font-mono font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  branch/alternate-reunion
                </motion.text>
              )}
            </AnimatePresence>
          </svg>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground">
                Main
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="font-mono text-[10px] text-muted-foreground">
                Branch
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
