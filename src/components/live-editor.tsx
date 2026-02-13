"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_COMMITS = [
  {
    hash: "a9b1e8f",
    message: "Merged branch: alternate-ending",
    author: "Elena Vasquez",
    date: "2 min ago",
  },
  {
    hash: "2d4f6c1",
    message: "Rewrote chapter 12 opening: killed the flashback",
    author: "Elena Vasquez",
    date: "1 hour ago",
  },
];

const NEW_COMMIT = {
  hash: "f7c3a2d",
  message: "Final pass: tightened dialogue in confrontation scene",
  author: "Elena Vasquez",
  date: "Just now",
};

export function LiveEditor() {
  const [commits, setCommits] = useState(INITIAL_COMMITS);
  const [phase, setPhase] = useState<"idle" | "typing" | "committing" | "done">(
    "idle",
  );
  const [typedText, setTypedText] = useState("");
  const fullMessage = "Everything had changed, and yet, nothing was different.";

  useEffect(() => {
    const runCycle = async () => {
      // 1. Idle
      setPhase("idle");
      setCommits(INITIAL_COMMITS);
      setTypedText("");
      await new Promise((r) => setTimeout(r, 2000));

      // 2. Typing
      setPhase("typing");
      for (let i = 0; i <= fullMessage.length; i++) {
        setTypedText(fullMessage.slice(0, i));
        await new Promise((r) => setTimeout(r, 50));
      }
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Committing
      setPhase("committing");
      await new Promise((r) => setTimeout(r, 1500));
      setCommits([NEW_COMMIT, ...INITIAL_COMMITS]);
      setPhase("done");

      // 4. Reset
      await new Promise((r) => setTimeout(r, 4000));
      runCycle();
    };

    runCycle();
  }, []);

  return (
    <div className="grid lg:grid-cols-5 gap-0 border border-border bg-card overflow-hidden shadow-2xl h-[440px]">
      {/* Simulation Pane (Software View) */}
      <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border bg-background">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Editing draft...
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${phase === "typing" ? "bg-primary" : "bg-muted-foreground"}`}
            />
            <span className="font-mono text-[9px] text-muted-foreground">
              {phase === "typing" ? "Changes detected" : "Synced"}
            </span>
          </div>
        </div>

        <div className="p-8 pb-12 font-serif text-lg leading-relaxed relative min-h-[300px]">
          <div className="text-muted-foreground opacity-30 select-none">
            He looked at the horizon, waiting for a sign. The silence was
            absolute.
          </div>
          <div className="mt-4 relative">
            <AnimatePresence>
              {phase === "typing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -left-4 top-2.5 text-primary font-mono text-xs"
                >
                  +
                </motion.div>
              )}
            </AnimatePresence>
            <span
              className={
                phase === "typing"
                  ? "text-primary bg-primary/10"
                  : "text-foreground transition-colors duration-1000"
              }
            >
              {typedText}
            </span>
            {phase === "typing" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-6 bg-primary ml-1 translate-y-1"
              />
            )}
          </div>
          <div className="mt-4 text-muted-foreground opacity-30 select-none">
            The world kept turning, indifferent to his revelation. He closed his
            eyes and began again.
          </div>

          {/* Action Overlay */}
          <AnimatePresence>
            {phase === "committing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-x-0 bottom-8 flex justify-center"
              >
                <div className="bg-foreground text-background px-6 py-3 shadow-xl flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Registering changes...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Commit History Pane */}
      <div className="lg:col-span-2 flex flex-col h-full">
        <div className="px-6 py-4 border-b border-border bg-secondary/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
              Journal
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={commits.length}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-mono text-[10px] text-primary"
            >
              {commits.length} entries
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex-1 divide-y divide-border overflow-hidden">
          <AnimatePresence initial={false}>
            {commits.map((commit, index) => (
              <motion.div
                key={commit.hash + index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="px-6 py-5 bg-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] text-primary px-1.5 py-0.5 bg-primary/10">
                    {commit.hash}
                  </span>
                  {index === 0 && commit.hash === NEW_COMMIT.hash && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 font-mono text-[8px] uppercase text-green-600 font-bold"
                    >
                      <Check className="w-2.5 h-2.5" />
                      Verified
                    </motion.span>
                  )}
                </div>
                <p className="text-[13px] text-foreground font-medium leading-normal">
                  {commit.message}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {commit.author}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/60">
                    {commit.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-secondary/30 mt-auto border-t border-border">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="font-mono text-[8px] uppercase tracking-tighter">
              Status: Active
            </span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">
              Region: US-EAST
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
