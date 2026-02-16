"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, ChevronDown, GitBranchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const getDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
};

const AUTHORS = {
  "Liam O'Sullivan (You)":
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces&q=80",
  "Yuki Sato":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
  "Isabella Conti":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
  "Paperflow Bot": "/bot-avatar-placeholder", // We'll handle this in the component
};

const ALL_COMMITS = [
  {
    hash: "8e2a9b7",
    message: "First draft complete: 87,234 words",
    author: "Liam O'Sullivan (You)",
    daysAgo: 14,
    time: "11:03 UTC",
    color: "bg-primary",
    details: {
      diff: { added: 87234, removed: 120 },
      section: "Full Manuscript",
      description:
        "Initial assembly of all chapters into a single master document.",
    },
  },
  {
    hash: "ai-1b2c",
    message: "Auto-format: Standardized dialogue punctuation",
    author: "Paperflow Bot",
    daysAgo: 13,
    time: "03:12 UTC",
    isAi: true,
    color: "bg-purple-500",
    details: {
      diff: { added: 12, removed: 12 },
      section: "Global",
      description: "Applied standard em-dash formatting rules across dialogue.",
    },
  },
  {
    hash: "2d4f6c1",
    message: "Fact-check complete: historical preamble",
    author: "Yuki Sato",
    daysAgo: 12,
    time: "16:48 UTC",
    color: "bg-amber-500",
    details: {
      diff: { added: 42, removed: 15 },
      section: "Introduction",
      description:
        "Verified dates and locations against the 1924 architectural archives.",
    },
  },
  {
    hash: "a9b1e8f",
    message: "Merged branch: alternate-ending",
    author: "Isabella Conti",
    daysAgo: 10,
    time: "09:15 UTC",
    isMerge: true,
    color: "bg-emerald-500",
    details: {
      diff: { added: 150, removed: 1204 },
      section: "Chapter 24",
      description:
        "Consolidated the 'Harbor' and 'Departure' endings into a single resolution.",
    },
  },
  {
    hash: "f7c3a2d",
    message: "Final pass: tightened dialogue in confrontation",
    author: "Liam O'Sullivan (You)",
    daysAgo: 9,
    time: "14:32 UTC",
    color: "bg-primary",
    details: {
      diff: { added: 24, removed: 109 },
      section: "Chapter 12",
      description:
        "Removed redundant phrasing to increase tension in the ballroom scene.",
    },
  },
  {
    hash: "b3d1e4a",
    message: "Adjusted pacing in the third act bridge",
    author: "Isabella Conti",
    daysAgo: 8,
    time: "08:12 UTC",
    color: "bg-emerald-500",
    details: {
      diff: { added: 156, removed: 12 },
      section: "Chapter 18",
      description:
        "Added transitional prose to smooth the jump between settings.",
    },
  },
  {
    hash: "ai-3d4e",
    message: "Consistency: Renamed 'Theatre' to 'Theater'",
    author: "Paperflow Bot",
    daysAgo: 8,
    time: "04:45 UTC",
    isAi: true,
    color: "bg-purple-500",
    details: {
      diff: { added: 8, removed: 8 },
      section: "Global",
      description:
        "Enforced US English spelling conventions per project settings.",
    },
  },
  {
    hash: "c9f2b8d",
    message: "Character voice refinement: Chapter 4",
    author: "Liam O'Sullivan (You)",
    daysAgo: 7,
    time: "11:45 UTC",
    color: "bg-primary",
    details: {
      diff: { added: 210, removed: 45 },
      section: "Chapter 4",
      description:
        "Enhanced the protagonist's internal monologue for deeper POV.",
    },
  },
  {
    hash: "e4a5d6c",
    message: "Updated source citations: Lunar Colonies",
    author: "Yuki Sato",
    daysAgo: 6,
    time: "16:20 UTC",
    color: "bg-amber-500",
    details: {
      diff: { added: 15, removed: 15 },
      section: "Technical Appendix",
      description: "Corrected DOI links and bibliography formatting.",
    },
  },
  {
    hash: "d1f2g3h",
    message: "Structural edit: removed redundant flashback",
    author: "Isabella Conti",
    daysAgo: 5,
    time: "09:30 UTC",
    color: "bg-emerald-500",
    details: {
      diff: { added: 0, removed: 4500 },
      section: "Chapter 7",
      description:
        "Leaner narrative achieved by moving backstory to Chapter 1.",
    },
  },
  {
    hash: "h2j3k4l",
    message: "Finalized epilogue: 'The Long Wait'",
    author: "Liam O'Sullivan (You)",
    daysAgo: 4,
    time: "21:15 UTC",
    color: "bg-primary",
    details: {
      diff: { added: 890, removed: 45 },
      section: "Epilogue",
      description: "Completed the final sequence and thematic closure.",
    },
  },
  {
    hash: "ai-5f6g",
    message: "Typography: Curly quotes application",
    author: "Paperflow Bot",
    daysAgo: 4,
    time: "21:16 UTC",
    isAi: true,
    color: "bg-purple-500",
    details: {
      diff: { added: 45, removed: 45 },
      section: "Epilogue",
      description: "Converted straight quotes to smart quotes.",
    },
  },
  {
    hash: "m4n5p6q",
    message: "Grammar sweep: complete manuscript",
    author: "Yuki Sato",
    daysAgo: 3,
    time: "14:05 UTC",
    color: "bg-amber-500",
    details: {
      diff: { added: 12, removed: 24 },
      section: "Global",
      description: "Final proofreading for consistency, spelling, and grammar.",
    },
  },
  {
    hash: "r7s8t9u",
    message: "Merged branch: publisher-requested-cuts",
    author: "Isabella Conti",
    daysAgo: 2,
    time: "10:50 UTC",
    isMerge: true,
    color: "bg-emerald-500",
    details: {
      diff: { added: 0, removed: 2300 },
      section: "Chapters 15-17",
      description: "Removed subplots as requested for the initial print run.",
    },
  },
  {
    hash: "ai-6g7h",
    message: "Cleanup: Removed trailing whitespace",
    author: "Paperflow Bot",
    daysAgo: 2,
    time: "10:55 UTC",
    isAi: true,
    color: "bg-purple-500",
    details: {
      diff: { added: 0, removed: 15 },
      section: "Global",
      description: "Removed unnecessary whitespace from end of lines.",
    },
  },
  {
    hash: "v1w2x3y",
    message: "Restored Chapter 12: 'The Pier' (Draft 4)",
    author: "Liam O'Sullivan (You)",
    daysAgo: 1,
    time: "13:22 UTC",
    color: "bg-primary",
    details: {
      diff: { added: 1450, removed: 0 },
      section: "Chapter 12",
      description:
        "Recovered original prose after deciding against the rewrite.",
    },
  },
  {
    hash: "z4a5b6c",
    message: "Tone adjustment: increased suspense in intro",
    author: "Isabella Conti",
    daysAgo: 0,
    time: "08:45 UTC",
    color: "bg-emerald-500",
    details: {
      diff: { added: 65, removed: 12 },
      section: "Introduction",
      description: "Reworked the opening hook to grab reader attention faster.",
    },
  },
  {
    hash: "d7e8f9g",
    message: "Cross-referenced timelines for consistency",
    author: "Yuki Sato",
    daysAgo: 0,
    time: "17:10 UTC",
    color: "bg-amber-500",
    details: {
      diff: { added: 5, removed: 5 },
      section: "Chronology",
      description: "Ensured age consistency across the 40-year timeline.",
    },
  },
  {
    hash: "h1i2j3k",
    message: "Final pre-publication binary freeze",
    author: "Liam O'Sullivan (You)",
    daysAgo: 0,
    time: "23:55 UTC",
    isMerge: true,
    color: "bg-primary",
    details: {
      diff: { added: 0, removed: 0 },
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
  isAi?: boolean;
  details: {
    diff: { added: number; removed: number };
    section: string;
    description: string;
  };
}

interface CommitItem extends Commit {
  id: string;
  date: string;
  avatar: string;
}

export function Archive() {
  const [items, setItems] = useState<CommitItem[]>(() =>
    ALL_COMMITS.slice(0, 4).map((c, i) => ({
      ...c,
      id: `init-${i}`,
      date: getDate(c.daysAgo),
      avatar: AUTHORS[c.author as keyof typeof AUTHORS],
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
        avatar: AUTHORS[rawCommit.author as keyof typeof AUTHORS],
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
      <div className="px-6 py-4 border-b border-border bg-background flex items-center justify-between relative z-10">
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

      <div className="divide-y divide-border bg-card relative z-0 h-[500px] md:h-[440px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((commit: CommitItem, index: number) => (
            <motion.div
              key={commit.id}
              layout
              initial={{ opacity: 0, y: -40, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
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
                  ? "bg-primary/5 ring-1 ring-inset ring-primary/20 z-10"
                  : "hover:bg-primary/5"
              } ${index === 0 && !isHovered && !expandedId ? "animate-pulse bg-primary/5" : ""}`}
            >
              <div className="h-[125px] md:h-[110px] pl-4 pr-2 md:px-6 py-3 md:py-5 flex flex-col justify-center relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start flex-1 min-w-0 gap-4">
                    <div className="mt-1 shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center ${
                          commit.isAi
                            ? "bg-purple-500/10 border-purple-500/20 text-purple-600"
                            : "bg-primary/10 border-primary/20"
                        }`}
                      >
                        {commit.isAi ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                          </div>
                        ) : (
                          <img
                            src={commit.avatar}
                            alt={commit.author}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 min-h-[20px]">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <code className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-[2px] relative noise">
                            {commit.hash}
                          </code>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {commit.time}
                          </span>

                          {/* Desktop Badges */}
                          <div className="hidden md:flex items-center gap-2">
                            {commit.isMerge && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 whitespace-nowrap">
                                Merge
                              </span>
                            )}
                            {commit.isAi && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
                                AI Authored
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top Right Group: Mobile Badges + Desktop Diffs */}
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          {/* Mobile Badges */}
                          <div className="flex md:hidden items-center gap-2">
                            {commit.isMerge && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 whitespace-nowrap">
                                Merge
                              </span>
                            )}
                            {commit.isAi && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
                                AI
                              </span>
                            )}
                          </div>

                          {/* Desktop Diffs */}
                          <span className="hidden md:flex items-center gap-1 font-mono text-[10px]">
                            <span className="text-green-600">
                              +{commit.details.diff.added}
                            </span>
                            <span className="text-red-500">
                              -{commit.details.diff.removed}
                            </span>
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground line-clamp-2 font-medium leading-tight text-balance">
                        {commit.message}
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">
                          by {commit.author}
                        </p>

                        {/* Mobile Diffs */}
                        <span className="flex md:hidden items-center gap-1 font-mono text-[10px]">
                          <span className="text-green-600">
                            +{commit.details.diff.added}
                          </span>
                          <span className="text-red-500">
                            -{commit.details.diff.removed}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end">
                    <div className="mt-2 text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${
                          expandedId === commit.id ? "rotate-180" : ""
                        }`}
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
                              +{commit.details.diff.added} / -
                              {commit.details.diff.removed} words
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
