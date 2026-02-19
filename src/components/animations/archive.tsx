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
  "Liam O'Sullivan":
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces&q=80",
  "Yuki Sato":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
  "Isabella Conti":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
  "Paperflow Bot": "/bot-avatar-placeholder",
};

const getAvatar = (author: string) => {
  const baseName = author.replace(/ \(You\)| \(Você\)/, "");
  return AUTHORS[baseName as keyof typeof AUTHORS] || AUTHORS["Paperflow Bot"];
};

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

export function Archive({ dict }: { dict?: any }) {
  const d = dict || {
    latest_changes: "Latest changes",
    branch: "main",
    ui: {
      impact: "Impact",
      domain: "Domain",
      editorial_note: "Editorial Note",
      words: "words",
      by: "",
      you: "You",
      merge: "Merge",
      ai_authored: "AI Authored",
      ai: "AI",
      time_ago: {
        just_now: "Just now",
        minute: "{count} min ago",
        minutes: "{count} mins ago",
        hour: "{count} hour ago",
        hours: "{count} hours ago",
        day: "{count} day ago",
        days: "{count} days ago",
        yesterday: "Yesterday",
      },
    },
    commits: [],
  };

  const getTimeAgo = (daysAgo: number, time: string) => {
    const t = d.ui.time_ago;
    if (daysAgo === 0) {
      // If it's a "Just now" or today's time
      if (time === "Just now" || time === "Agora mesmo") return t.just_now;
      if (time.includes("h ago") || time.includes("h atrás")) {
        const count = parseInt(time) || 2;
        return count === 1
          ? t.hour.replace("{count}", "1")
          : t.hours.replace("{count}", count.toString());
      }
      return t.just_now; // Fallback for today
    }
    if (daysAgo === 1) return t.yesterday;
    return daysAgo === 1
      ? t.day.replace("{count}", "1")
      : t.days.replace("{count}", daysAgo.toString());
  };

  const ALL_COMMITS = (d.commits || []) as Commit[];

  const [items, setItems] = useState<CommitItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const counterRef = useRef(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [initialized, setInitialized] = useState(false);

  // Initialize with dictionary data
  useEffect(() => {
    if (ALL_COMMITS.length > 0) {
      setItems(
        ALL_COMMITS.slice(0, 4).map((c, i) => ({
          ...c,
          id: `init-${i}`,
          date: getDate(c.daysAgo),
          avatar: getAvatar(c.author),
        })),
      );
      setInitialized(true);
    }
  }, [d.commits]); // Update when dictionary changes

  // Sync animation clock
  useEffect(() => {
    if (
      !initialized ||
      isHovered ||
      expandedId ||
      !isInView ||
      ALL_COMMITS.length === 0
    )
      return;

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
        avatar: getAvatar(rawCommit.author),
      };

      setItems((prev) => {
        // Prepend mode: Add first, Remove last to simulate new items arriving at top
        return [nextCommit, ...prev.slice(0, prev.length - 1)];
      });

      nextIndex = (nextIndex + 1) % ALL_COMMITS.length;
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, expandedId, isInView, initialized, items, ALL_COMMITS]);

  const transition = {
    duration: 0.8,
    ease: "easeInOut" as const,
  };

  if (!initialized && ALL_COMMITS.length === 0) return null;

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
              {d.latest_changes}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GitBranchIcon className="size-3.5 text-foreground/70" />
          <span className="font-mono">{d.branch}</span>
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
                            {getTimeAgo(commit.daysAgo, commit.time)}
                          </span>

                          {/* Desktop Badges */}
                          <div className="hidden md:flex items-center gap-2">
                            {commit.isMerge && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 whitespace-nowrap">
                                {d.ui.merge}
                              </span>
                            )}
                            {commit.isAi && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
                                {d.ui.ai_authored}
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
                                {d.ui.merge}
                              </span>
                            )}
                            {commit.isAi && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
                                {d.ui.ai}
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
                          {commit.author}
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
                              {d.ui.impact}
                            </p>
                            <p className="text-xs font-serif italic text-primary">
                              +{commit.details.diff.added} / -
                              {commit.details.diff.removed} {d.ui.words}
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                              {d.ui.domain}
                            </p>
                            <p className="text-xs font-mono">
                              {commit.details.section}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                            {d.ui.editorial_note}
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
