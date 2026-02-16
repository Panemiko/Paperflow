"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, ChevronDown, Clock, RotateCcw, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";

const INITIAL_PHRASE = "Ideas leave a small path.";

const INITIAL_COMMIT = {
  hash: "a9b1e8f",
  message: "Initial manuscript",
  author: "David Park (You)",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
  date: "10 min ago",
  time: "11:45 UTC",
  diff: { added: 5, removed: 0 },
  content: INITIAL_PHRASE,
};

type SegmentType = "stable" | "added" | "removed";

interface Segment {
  text: string;
  type: SegmentType;
}

const SIMULATION_SEQUENCE = [
  {
    type: "add",
    name: "Expanded the opening statement",
    diff: { added: 3, removed: 0 },
    segments: [
      { text: INITIAL_PHRASE, type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "added" as SegmentType },
    ],
  },
  {
    type: "add",
    name: "Clarified the philosophy",
    diff: { added: 5, removed: 0 },
    segments: [
      { text: INITIAL_PHRASE, type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "stable" as SegmentType },
      { text: "\nEvery draft is a decision.", type: "added" as SegmentType },
    ],
  },
  {
    type: "remove",
    name: "Precision edit for impact",
    diff: { added: 0, removed: 1 },
    segments: [
      { text: "Ideas leave a", type: "stable" as SegmentType },
      { text: " small ", type: "removed" as SegmentType },
      { text: "path.", type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "stable" as SegmentType },
      { text: "\nEvery draft is a decision.", type: "stable" as SegmentType },
    ],
  },
];

export function Evolution() {
  const [commits, setCommits] = useState<any[]>([INITIAL_COMMIT]);
  const [phase, setPhase] = useState<
    "idling" | "altering" | "naming" | "committing" | "refreshing"
  >("idling");

  const [displaySegments, setDisplaySegments] = useState<Segment[]>([
    { text: INITIAL_PHRASE, type: "stable" },
  ]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [commitName, setCommitName] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSimulation = async () => {
      if (!isInView) return;

      // 1. Idling Phase
      if (phase === "idling") {
        timeout = setTimeout(() => setPhase("altering"), 2500);
      }

      // 2. Altering Phase
      else if (phase === "altering") {
        const step = SIMULATION_SEQUENCE[stepIndex];
        const targetSegments = step.segments;

        if (step.type === "add") {
          // Check if we need to add a new segment or increase length of the last one
          if (displaySegments.length < targetSegments.length) {
            timeout = setTimeout(() => {
              setDisplaySegments([
                ...displaySegments,
                { text: "", type: targetSegments[displaySegments.length].type },
              ]);
            }, 100);
          } else {
            const lastIdx = displaySegments.length - 1;
            const currentLastText = displaySegments[lastIdx].text;
            const targetLastText = targetSegments[lastIdx].text;

            if (currentLastText.length < targetLastText.length) {
              timeout = setTimeout(() => {
                const newSegments = [...displaySegments];
                newSegments[lastIdx] = {
                  ...newSegments[lastIdx],
                  text: targetLastText.slice(0, currentLastText.length + 1),
                };
                setDisplaySegments(newSegments);
              }, 40);
            } else {
              setPhase("naming");
            }
          }
        } else if (step.type === "remove") {
          // In removal, we highlight the word "absolute"
          if (displaySegments.length < targetSegments.length) {
            timeout = setTimeout(() => {
              setDisplaySegments(targetSegments);
            }, 500);
          } else {
            // Once highlighted, wait a bit then name
            timeout = setTimeout(() => {
              setPhase("naming");
            }, 1500);
          }
        }
      }

      // 3. Naming Phase
      else if (phase === "naming") {
        const step = SIMULATION_SEQUENCE[stepIndex];
        setIsPopoverOpen(true);
        if (commitName.length < step.name.length) {
          timeout = setTimeout(() => {
            setCommitName(step.name.slice(0, commitName.length + 1));
          }, 30);
        } else {
          timeout = setTimeout(() => {
            setPhase("committing");
            setIsPopoverOpen(false);
          }, 1500);
        }
      }

      // 4. Committing Phase
      else if (phase === "committing") {
        timeout = setTimeout(() => {
          const step = SIMULATION_SEQUENCE[stepIndex];

          // Collect text *excluding* any text in "removed" segments
          const commitContent = displaySegments
            .filter((s) => s.type !== "removed")
            .map((s) => s.text)
            .join("");

          const newCommit = {
            hash: Math.random().toString(16).substring(2, 9),
            message: step.name,
            author: "David Park (You)",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
            date: "Just now",
            time:
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) + " UTC",
            diff: step.diff,
            content: commitContent,
          };
          setCommits((prev) => [newCommit, ...prev]);

          // After commit, bake the segments:
          // 1. Remove "removed" segments
          // 2. Change "added" to "stable"
          const bakedSegments = displaySegments
            .filter((s) => s.type !== "removed")
            .map((s) => ({ ...s, type: "stable" as SegmentType }));

          setDisplaySegments(bakedSegments);

          if (stepIndex < SIMULATION_SEQUENCE.length - 1) {
            setStepIndex(stepIndex + 1);
            setCommitName("");
            setPhase("idling");
          } else {
            setPhase("refreshing");
          }
        }, 2000);
      }

      // 5. Refreshing Phase
      else if (phase === "refreshing") {
        timeout = setTimeout(() => {
          setCommits([INITIAL_COMMIT]);
          setDisplaySegments([{ text: INITIAL_PHRASE, type: "stable" }]);
          setStepIndex(0);
          setCommitName("");
          setPhase("idling");
        }, 3000);
      }
    };

    runSimulation();
    return () => clearTimeout(timeout);
  }, [phase, displaySegments, commitName, stepIndex, commits, isInView]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-border bg-card overflow-hidden shadow-2xl h-auto lg:h-[440px]"
    >
      {/* Simulation Pane (Software View) */}
      <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col relative h-[400px] lg:h-auto">
        {/* Background Vertical Guidelines */}
        <div className="absolute inset-0 flex justify-between px-12 opacity-10 pointer-events-none select-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative w-px h-full">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-border to-transparent" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background relative z-10 shrink-0">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:inline">
            {phase === "idling"
              ? "Awaiting change..."
              : phase === "altering"
                ? "Patching buffer..."
                : phase === "refreshing"
                  ? "Broadcasting refresh..."
                  : "Syncing state..."}
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${phase === "idling" && stepIndex === 0 && commits.length === 1 ? "bg-muted-foreground" : "bg-primary animate-pulse relative noise"}`}
            />
            <span className="font-mono text-[9px] text-muted-foreground">
              {phase === "idling" && stepIndex === 0 && commits.length === 1
                ? "Draft"
                : `Revision ${stepIndex + 1}/3`}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-12 pb-16 font-serif text-lg leading-relaxed relative flex flex-col">
          <div className="flex-1 relative">
            <motion.div
              layout
              animate={{
                opacity: phase === "refreshing" ? [1, 0.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: phase === "refreshing" ? Infinity : 0,
                repeatDelay: 0.1,
              }}
              className="w-full h-full text-foreground/80 italic whitespace-pre-wrap select-none"
            >
              {/* Using a span with whitespace-pre-wrap and mapping inline spans inside to fix line breaks */}
              <span className="inline whitespace-pre-wrap">
                {displaySegments.map((segment, idx) => (
                  <motion.span
                    key={idx}
                    layout
                    className={`
                      ${segment.type === "added" ? "bg-primary/20 text-primary border-primary/20" : ""}
                      ${segment.type === "removed" ? "bg-destructive/20 text-destructive line-through decoration-destructive/50" : ""}
                      transition-all duration-300 rounded-[2px] px-0.5
                    `}
                  >
                    {segment.text}
                  </motion.span>
                ))}
              </span>
              {phase === "altering" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-primary translate-y-0.5"
                />
              )}
            </motion.div>
          </div>

          {/* Action Overlay */}
          <AnimatePresence>
            {phase === "committing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-x-0 bottom-8 flex justify-center z-10"
              >
                <div className="bg-foreground text-background px-6 py-3 shadow-xl flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary animate-spin" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Registering change...
                  </span>
                </div>
              </motion.div>
            )}

            {phase === "refreshing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-x-0 bottom-8 flex justify-center z-10"
              >
                <div className="bg-foreground text-background px-6 py-3 shadow-xl flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-primary animate-spin" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Refreshing Manuscript State...
                  </span>
                </div>
              </motion.div>
            )}

            {(phase === "naming" || isPopoverOpen) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 right-6"
              >
                <div className="relative inline-block">
                  {/* Trigger */}
                  <div className="bg-primary text-primary-foreground px-4 py-2 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 shadow-lg cursor-default relative noise">
                    <Send className="w-3 h-3" />
                    Commit Change
                  </div>

                  {/* Popover Content */}
                  <AnimatePresence>
                    {isPopoverOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-background border border-border shadow-2xl z-30 pointer-events-none"
                      >
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-serif text-sm font-medium leading-none text-foreground">
                              Record Evolution
                            </h4>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                              Documenting this file state.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <Input
                              id="commit-name"
                              value={commitName}
                              readOnly
                              className="h-8 text-xs font-serif bg-primary/5"
                            />
                            <div className="w-full bg-primary/20 text-primary-foreground/50 px-4 py-2 text-[9px] font-mono uppercase tracking-widest text-center relative noise text-balance">
                              Updating Buffer...
                            </div>
                          </div>
                        </div>
                        {/* Arrow/Tail */}
                        <div className="absolute top-full right-6 w-3 h-3 bg-background border-r border-b border-border rotate-45 -translate-y-1.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Commit History Pane */}
      <div className="lg:col-span-2 flex flex-col h-full overflow-hidden relative">
        <div className="px-6 py-4 border-b border-border bg-background flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
              Latest changes
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

        <div
          className={`flex-1 overflow-y-auto custom-scrollbar bg-card border-l border-border/50 ${!isHistoryExpanded ? "h-[120px] lg:h-auto" : ""}`}
        >
          <div className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {commits.map((commit, index) => (
                <motion.div
                  key={commit.hash}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`px-6 py-5 group relative border-b border-border last:border-0 transition-colors duration-300 hover:bg-primary/5 ${
                    index === 0 && phase !== "refreshing" ? "bg-primary/5" : ""
                  } ${index > 0 && !isHistoryExpanded ? "hidden lg:block" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start w-full gap-4">
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
                        <div className="flex items-center gap-3 mb-1 justify-between">
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-[2px] relative noise">
                              {commit.hash}
                            </code>
                            <span className="text-xs text-muted-foreground">
                              {commit.time || commit.date}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 font-mono text-[10px]">
                            <span className="text-green-600">
                              +{commit.diff?.added || 0}
                            </span>
                            <span className="text-red-500">
                              -{commit.diff?.removed || 0}
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-foreground font-medium leading-tight truncate">
                          {commit.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Authored by {commit.author}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end">
                      <div className="mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronDown className="size-3.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Expand/Collapse Button */}
        <button
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          disabled={commits.length <= 1}
          className={`w-full py-3 bg-muted/30 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors lg:hidden shrink-0 ${
            commits.length <= 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-muted/50"
          }`}
        >
          {commits.length <= 1
            ? "No Additional History"
            : isHistoryExpanded
              ? "Collapse History"
              : `View ${commits.length - 1} More Updates`}
        </button>

        <div className="p-4 bg-background mt-auto border-t border-border hidden lg:block">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="font-mono text-[8px] uppercase tracking-tighter">
              {phase === "refreshing" ? "Refreshing..." : "Paperflow"}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">
              Branch: New section
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
