"use client";

import { motion } from "framer-motion";

const commits = [
  {
    hash: "f7c3a2d",
    message: "Final pass: tightened dialogue in confrontation scene",
    author: "Elena Vasquez",
    date: "2026-01-28",
    time: "14:32 UTC",
  },
  {
    hash: "a9b1e8f",
    message: "Merged branch: alternate-ending",
    author: "Elena Vasquez",
    date: "2026-01-27",
    time: "09:15 UTC",
    isMerge: true,
  },
  {
    hash: "2d4f6c1",
    message: "Rewrote chapter 12 opening: killed the flashback",
    author: "Elena Vasquez",
    date: "2026-01-25",
    time: "16:48 UTC",
  },
  {
    hash: "8e2a9b7",
    message: "First draft complete: 87,234 words",
    author: "Elena Vasquez",
    date: "2026-01-22",
    time: "11:03 UTC",
  },
];

export function CommitHistory() {
  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
          Audit Trail
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          4 commits
        </span>
      </div>

      {/* Commits */}
      <div className="divide-y divide-border">
        {commits.map((commit, index) => (
          <motion.div
            key={commit.hash}
            className="px-6 py-5 hover:bg-secondary/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <code className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5">
                    {commit.hash}
                  </code>
                  {commit.isMerge && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                      Merge
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground font-medium leading-snug">
                  {commit.message}
                </p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                  {commit.author}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-xs text-muted-foreground">
                  {commit.date}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground/60">
                  {commit.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-border bg-secondary/30">
        <p className="font-mono text-[9px] text-muted-foreground text-center tracking-wider uppercase">
          Every change. Every thought. Permanently recorded.
        </p>
      </div>
    </div>
  );
}
