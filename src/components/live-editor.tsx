"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, RotateCcw, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const INITIAL_PHRASE = "Ideas leave a small path.";

const INITIAL_COMMIT = {
  hash: "a9b1e8f",
  message: "Initial draft",
  author: "Elena Vasquez",
  date: "10 min ago",
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
    name: "Extended the thought",
    segments: [
      { text: INITIAL_PHRASE, type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "added" as SegmentType },
    ],
  },
  {
    type: "add",
    name: "Expanded the flow",
    segments: [
      { text: INITIAL_PHRASE, type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "stable" as SegmentType },
      { text: "\nFollow the flow.", type: "added" as SegmentType },
    ],
  },
  {
    type: "remove",
    name: "Focused the opening",
    segments: [
      { text: "Ideas leave a", type: "stable" as SegmentType },
      { text: " small ", type: "removed" as SegmentType },
      { text: "path.", type: "stable" as SegmentType },
      { text: "\nNotice the change.", type: "stable" as SegmentType },
      { text: "\nFollow the flow.", type: "stable" as SegmentType },
    ],
  },
];

export function LiveEditor() {
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

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSimulation = async () => {
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
            author: "You",
            date: "Just now",
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
  }, [phase, displaySegments, commitName, stepIndex, commits]);

  return (
    <div className="grid lg:grid-cols-5 gap-0 border border-border bg-card overflow-hidden shadow-2xl h-[440px]">
      {/* Simulation Pane (Software View) */}
      <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col relative">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
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

        <div className="flex-1 p-12 pb-16 font-serif text-lg leading-relaxed relative flex flex-col">
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
                    Securing change...
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
                <Popover open={isPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="bg-primary text-primary-foreground px-4 py-2 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 shadow-lg cursor-default relative noise">
                      <Send className="w-3 h-3" />
                      Commit Change
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-4 bg-background border-border shadow-2xl z-10 pointer-events-none"
                    align="end"
                    sideOffset={12}
                    side="top"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-serif text-sm font-medium leading-none">
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
                          className="h-8 text-xs font-serif bg-secondary/10"
                        />
                        <div className="w-full bg-primary/20 text-primary-foreground/50 px-4 py-2 text-[9px] font-mono uppercase tracking-widest text-center relative noise">
                          Updating Buffer...
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Commit History Pane */}
      <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/10 flex items-center justify-between">
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

        <div className="flex-1 divide-y divide-border overflow-y-auto custom-scrollbar bg-card border-l border-border/50">
          <AnimatePresence initial={false}>
            {commits.map((commit, index) => (
              <motion.div
                key={commit.hash}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="px-6 py-6 group relative hover:bg-secondary/5 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-primary px-1.5 py-0.5 bg-primary/10 border border-primary/20 relative noise">
                      {commit.hash}
                    </span>
                    {index === 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 font-mono text-[8px] uppercase text-green-600 font-bold"
                      >
                        <Check className="w-2.5 h-2.5" />
                        Signed
                      </motion.span>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground/60">
                    {commit.date}
                  </span>
                </div>

                <h3 className="text-[13px] text-foreground font-bold leading-tight mb-2">
                  {commit.message}
                </h3>

                <p className="text-[10px] text-muted-foreground/70 leading-relaxed line-clamp-2 italic font-serif">
                  {commit.content.split("\n")[0]}...
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-tighter">
                    Author: {commit.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-secondary/30 mt-auto border-t border-border">
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
