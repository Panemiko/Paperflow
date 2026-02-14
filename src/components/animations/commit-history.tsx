"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, GitBranchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const getDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
};

const ALL_COMMITS = [
  {
    hash: "8e2a9b7",
    message: "First draft complete: 87,234 words",
    author: "Elena Vasquez",
    daysAgo: 14,
    time: "11:03 UTC",
    color: "bg-blue-500",
    details: {
      words: "+87,234",
      section: "Full Manuscript",
      description:
        "Initial assembly of all chapters into a single master document.",
    },
  },
  {
    hash: "2d4f6c1",
    message: "Fact-check complete: historical preamble",
    author: "Sarah Chen",
    daysAgo: 12,
    time: "16:48 UTC",
    color: "bg-amber-500",
    details: {
      words: "+42",
      section: "Introduction",
      description:
        "Verified dates and locations against the 1924 architectural archives.",
    },
  },
  {
    hash: "a9b1e8f",
    message: "Merged branch: alternate-ending",
    author: "Marcus Thorne",
    daysAgo: 10,
    time: "09:15 UTC",
    isMerge: true,
    color: "bg-emerald-500",
    details: {
      words: "-1,204",
      section: "Chapter 24",
      description:
        "Consolidated the 'Harbor' and 'Departure' endings into a single resolution.",
    },
  },
  {
    hash: "f7c3a2d",
    message: "Final pass: tightened dialogue in confrontation",
    author: "Elena Vasquez",
    daysAgo: 9,
    time: "14:32 UTC",
    color: "bg-blue-500",
    details: {
      words: "-85",
      section: "Chapter 12",
      description:
        "Removed redundant phrasing to increase tension in the ballroom scene.",
    },
  },
  {
    hash: "b3d1e4a",
    message: "Adjusted pacing in the third act bridge",
    author: "Marcus Thorne",
    daysAgo: 8,
    time: "08:12 UTC",
    color: "bg-emerald-500",
    details: {
      words: "+156",
      section: "Chapter 18",
      description:
        "Added transitional prose to smooth the jump between settings.",
    },
  },
  {
    hash: "c9f2b8d",
    message: "Character voice refinement: Chapter 4",
    author: "Elena Vasquez",
    daysAgo: 7,
    time: "11:45 UTC",
    color: "bg-blue-500",
    details: {
      words: "+210",
      section: "Chapter 4",
      description:
        "Enhanced the protagonist's internal monologue for deeper POV.",
    },
  },
  {
    hash: "e4a5d6c",
    message: "Updated source citations: Lunar Colonies",
    author: "Sarah Chen",
    daysAgo: 6,
    time: "16:20 UTC",
    color: "bg-amber-500",
    details: {
      words: "+0",
      section: "Technical Appendix",
      description: "Corrected DOI links and bibliography formatting.",
    },
  },
  {
    hash: "d1f2g3h",
    message: "Structural edit: removed redundant flashback",
    author: "Marcus Thorne",
    daysAgo: 5,
    time: "09:30 UTC",
    color: "bg-emerald-500",
    details: {
      words: "-4,500",
      section: "Chapter 7",
      description:
        "Leaner narrative achieved by moving backstory to Chapter 1.",
    },
  },
  {
    hash: "h2j3k4l",
    message: "Finalized epilogue: 'The Long Wait'",
    author: "Elena Vasquez",
    daysAgo: 4,
    time: "21:15 UTC",
    color: "bg-blue-500",
    details: {
      words: "+890",
      section: "Epilogue",
      description: "Completed the final sequence and thematic closure.",
    },
  },
  {
    hash: "m4n5p6q",
    message: "Grammar sweep: complete manuscript",
    author: "Sarah Chen",
    daysAgo: 3,
    time: "14:05 UTC",
    color: "bg-amber-500",
    details: {
      words: "-12",
      section: "Global",
      description: "Final proofreading for consistency, spelling, and grammar.",
    },
  },
  {
    hash: "r7s8t9u",
    message: "Merged branch: publisher-requested-cuts",
    author: "Marcus Thorne",
    daysAgo: 2,
    time: "10:50 UTC",
    isMerge: true,
    color: "bg-emerald-500",
    details: {
      words: "-2,300",
      section: "Chapters 15-17",
      description: "Removed subplots as requested for the initial print run.",
    },
  },
  {
    hash: "v1w2x3y",
    message: "Restored Chapter 12: 'The Pier' (Draft 4)",
    author: "Elena Vasquez",
    daysAgo: 1,
    time: "13:22 UTC",
    color: "bg-blue-500",
    details: {
      words: "+1,450",
      section: "Chapter 12",
      description:
        "Recovered original prose after deciding against the rewrite.",
    },
  },
  {
    hash: "z4a5b6c",
    message: "Tone adjustment: increased suspense in intro",
    author: "Marcus Thorne",
    daysAgo: 0,
    time: "08:45 UTC",
    color: "bg-emerald-500",
    details: {
      words: "+65",
      section: "Introduction",
      description: "Reworked the opening hook to grab reader attention faster.",
    },
  },
  {
    hash: "d7e8f9g",
    message: "Cross-referenced timelines for consistency",
    author: "Sarah Chen",
    daysAgo: 0,
    time: "17:10 UTC",
    color: "bg-amber-500",
    details: {
      words: "+0",
      section: "Chronology",
      description: "Ensured age consistency across the 40-year timeline.",
    },
  },
  {
    hash: "h1i2j3k",
    message: "Final pre-publication binary freeze",
    author: "Elena Vasquez",
    daysAgo: 0,
    time: "23:55 UTC",
    isMerge: true,
    color: "bg-blue-500",
    details: {
      words: "+0",
      section: "Global",
      description: "Version locked for final typesetting.",
    },
  },
];

interface Commit {
  hash: string;
  message: string;
  author: string;
  daysAgo: number;
  time: string;
  color: string;
  isMerge?: boolean;
  details: {
    words: string;
    section: string;
    description: string;
  };
}

interface CommitItem extends Commit {
  id: string;
  date: string;
}

export function CommitHistory() {
  const [items, setItems] = useState<CommitItem[]>(() =>
    ALL_COMMITS.slice(0, 4).map((c, i) => ({
      ...c,
      id: `init-${i}`,
      date: getDate(c.daysAgo),
    })),
  );
  const [isHovered, setIsHovered] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const counterRef = useRef(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Sync animation clock
  useEffect(() => {
    if (isHovered || expandedId || !isInView) return;

    // Resume from the FIRST item (most recently added in a top-feed)
    const firstItem = items[0];
    const firstHash = firstItem?.hash;
    const firstIndex = ALL_COMMITS.findIndex((c) => c.hash === firstHash);

    // If we can't find it (shouldn't happen) or list is initial, continue sequence
    let nextIndex =
      firstIndex === -1 ? 4 : (firstIndex + 1) % ALL_COMMITS.length;

    const interval = setInterval(() => {
      const rawCommit = ALL_COMMITS[nextIndex];
      const nextCommit = {
        ...rawCommit,
        id: `stream-${counterRef.current++}`,
        date: getDate(rawCommit.daysAgo),
      };

      setItems((prev) => {
        // Prepend mode: Add first, Remove last to simulate new items arriving at top
        return [nextCommit, ...prev.slice(0, prev.length - 1)];
      });

      nextIndex = (nextIndex + 1) % ALL_COMMITS.length;
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, expandedId, isInView]);

  const transition = {
    duration: 0.8,
    ease: "easeInOut" as const,
  };

  return (
    <div
      ref={containerRef}
      className="border border-border bg-card shadow-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 py-4 border-b border-border bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isHovered || expandedId ? (
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            ) : (
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </div>
            )}
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
              Latest changes
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GitBranchIcon className="size-3.5 text-foreground/70" />
          <span className="font-mono">main</span>
        </div>
      </div>
      {/* Footer Commented Out per User Request */}

      {/* Commits Container */}

      <div
        className="divide-y divide-border bg-card relative"
        style={{ height: 440 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((commit: CommitItem, index: number) => (
            <motion.div
              key={commit.id}
              layout
              initial={{ opacity: 0, y: -40, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: 110,
              }}
              exit={{
                opacity: 0,
                y: 40,
                height: 0,
                transition: { duration: 0.4 },
              }}
              transition={transition}
              onClick={() =>
                setExpandedId(expandedId === commit.id ? null : commit.id)
              }
              className={`group cursor-pointer border-b border-border last:border-0 relative transition-colors duration-300 ${
                expandedId === commit.id
                  ? "bg-secondary/40 ring-1 ring-inset ring-primary/20 z-10"
                  : "hover:bg-secondary/20"
              } ${index === 0 && !isHovered && !expandedId ? "animate-pulse bg-primary/5" : ""}`}
            >
              <div className="min-h-[110px] px-6 py-5 flex flex-col justify-center relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 relative noise">
                        {commit.hash}
                      </code>
                      {commit.isMerge && (
                        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                          Merge
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground font-medium leading-tight text-balance pr-8">
                      {commit.message}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${commit.color}`}
                      />
                      <p className="font-mono text-[10px] text-muted-foreground tracking-tight">
                        {commit.author}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end">
                    <p className="font-mono text-[10px] text-foreground font-bold">
                      {commit.date}
                    </p>
                    <p className="font-mono text-[9px] text-muted-foreground opacity-60">
                      {commit.time}
                    </p>
                    <div className="mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${expandedId === commit.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Content Section */}
                <AnimatePresence>
                  {expandedId === commit.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[109px] left-0 w-full bg-card border-x border-b border-border shadow-2xl z-50 p-6 pt-0 space-y-4"
                    >
                      <div className="pt-6 border-t border-border/50 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                              Impact
                            </p>
                            <p className="text-xs font-serif italic text-primary">
                              {commit.details.words} words
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                              Domain
                            </p>
                            <p className="text-xs font-mono">
                              {commit.details.section}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                            Editorial Note
                          </p>
                          <p className="text-xs font-sans leading-relaxed text-muted-foreground">
                            {commit.details.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
