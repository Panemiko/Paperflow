"use client";

import { motion, useInView } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COMMIT_DATA_TEMPLATE = {
  hash: "7f2a9c1",
  avatar:
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=faces&q=80",
  diff: { added: 12, removed: 45 },
};

const COMMENTS_TEMPLATE = [
  {
    initials: "AO",
    color: "bg-primary",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    initials: "SM",
    color: "bg-emerald-500",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=faces&q=80",
  },
];

export function Review({ dict }: { dict?: any }) {
  const d = dict || {
    reviewing: "Reviewing...",
    reply_to_thread: "Reply to thread...",
    thread_resolved: "Thread Resolved",
    resolved: "Resolved",
    thread_marked_resolved: "Thread marked as resolved",
    commit: {
      message: "Refactored the bridge sequence for clarity",
      author: "Sofia Morales (You)",
      time: "2h ago",
    },
    comments: [
      {
        author: "Amara Okafor",
        text: "This removal is aggressive. Are we losing the character motivation here?",
      },
      {
        author: "Sofia Morales (You)",
        text: "It was redundant. I moved the motivation to the previous chapter.",
      },
    ],
  };

  const COMMIT_DATA = {
    ...COMMIT_DATA_TEMPLATE,
    message: d.commit.message,
    author: d.commit.author,
    time: d.commit.time,
  };

  const COMMENTS = [
    {
      ...COMMENTS_TEMPLATE[0],
      author: d.comments[0].author,
      text: d.comments[0].text,
    },
    {
      ...COMMENTS_TEMPLATE[1],
      author: d.comments[1].author,
      text: d.comments[1].text,
    },
  ];

  const [phase, setPhase] = useState<
    "idle" | "focus" | "commenting" | "typing" | "replying" | "resolved"
  >("idle");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Reset on dict change
  useEffect(() => {
    setPhase("idle");
  }, [d.commit.message]);

  // Animation Loop
  useEffect(() => {
    if (!isInView) return;

    let timeout: NodeJS.Timeout;

    const sequence = async () => {
      // 1. Idle -> Focus (Expand)
      if (phase === "idle") {
        timeout = setTimeout(() => setPhase("focus"), 2000);
      }
      // 2. Focus -> Commenting (Editor asks)
      else if (phase === "focus") {
        timeout = setTimeout(() => setPhase("commenting"), 1500);
      }
      // 3. Commenting -> Typing (Author types)
      else if (phase === "commenting") {
        timeout = setTimeout(() => setPhase("typing"), 2000);
      }
      // 4. Typing -> Replying (Author posts)
      else if (phase === "typing") {
        timeout = setTimeout(() => setPhase("replying"), 1500);
      }
      // 5. Replying -> Resolved
      else if (phase === "replying") {
        timeout = setTimeout(() => setPhase("resolved"), 2500);
      }
      // 6. Resolved -> Reset
      else if (phase === "resolved") {
        timeout = setTimeout(() => setPhase("idle"), 4000);
      }
    };

    sequence();
    return () => clearTimeout(timeout);
  }, [phase, isInView]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] border border-border bg-card shadow-2xl overflow-hidden relative flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
            {d.reviewing}
          </span>
        </div>
      </div>
      {/* Commit Content */}
      <div className="w-full relative z-10">
        {/* Commit Header */}
        <div className="p-4 flex bg-background items-start gap-4 border-b border-border">
          <div className="mt-1">
            <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden border border-primary/20 text-primary">
              <img
                src={COMMIT_DATA.avatar}
                alt={COMMIT_DATA.author}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-[2px]">
                  {COMMIT_DATA.hash}
                </span>
                <span className="text-xs text-muted-foreground">
                  {COMMIT_DATA.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="text-green-600">
                  +{COMMIT_DATA.diff.added}
                </span>
                <span className="text-red-500">
                  -{COMMIT_DATA.diff.removed}
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-foreground leading-tight">
              {COMMIT_DATA.message}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {COMMIT_DATA.author}
            </p>
          </div>
        </div>

        {/* Discussion Area (Expandable) */}
        {phase !== "idle" && (
          <div>
            <div className="p-4 space-y-4">
              {/* Comment 1 */}
              {(phase === "commenting" ||
                phase === "typing" ||
                phase === "replying" ||
                phase === "resolved") && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex gap-3"
                >
                  <div
                    className={`w-6 h-6 rounded-full overflow-hidden border border-border shrink-0 mt-0.5`}
                  >
                    <img
                      src={COMMENTS[0].avatar}
                      alt={COMMENTS[0].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">
                        {COMMENTS[0].author}
                      </span>
                    </div>
                    <div className="text-sm text-foreground bg-background p-2 rounded-lg border border-border shadow-sm w-fit max-w-[calc(100%-2.3rem)] md:max-w-[320px] h-auto min-h-[60px] wrap-break-word">
                      {phase === "commenting" ? (
                        <Typewriter text={COMMENTS[0].text} />
                      ) : (
                        COMMENTS[0].text
                      )}
                    </div>
                  </div>{" "}
                </motion.div>
              )}

              {/* Comment 2 */}
              {(phase === "replying" || phase === "resolved") && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div
                    className={`w-6 h-6 rounded-full overflow-hidden border border-border shrink-0 mt-0.5`}
                  >
                    <img
                      src={COMMENTS[1].avatar}
                      alt={COMMENTS[1].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-right flex-1 flex flex-col items-end min-w-0">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs font-semibold">
                        {COMMENTS[1].author}
                      </span>
                    </div>
                    <div className="text-sm text-primary-foreground bg-primary p-2 rounded-lg border border-primary/20 shadow-sm text-left w-fit max-w-[calc(100%-2.3rem)] md:max-w-[320px] h-auto min-h-[60px] wrap-break-word">
                      {COMMENTS[1].text}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* System Message: Thread Resolved */}
              {phase === "resolved" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center justify-center gap-2 py-2"
                >
                  <div className="h-px bg-border flex-1" />
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Check className="w-3 h-3" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      {d.thread_marked_resolved}
                    </span>
                  </div>
                  <div className="h-px bg-border flex-1" />
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      {phase !== "idle" && (
        <div className="mt-auto w-full p-3 border-t border-border bg-background flex items-center justify-between relative z-20">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
            {phase === "resolved" ? (
              d.thread_resolved
            ) : phase === "typing" ? (
              <span className="text-foreground normal-case tracking-normal font-sans text-sm ml-1">
                <Typewriter text={COMMENTS[1].text} speed={20} />
              </span>
            ) : (
              d.reply_to_thread
            )}
          </span>

          {phase === "resolved" ? (
            <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-lg border border-green-200">
              <Check className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {d.resolved}
              </span>
            </div>
          ) : (
            <div className="w-6 h-6 rounded flex items-center justify-center bg-primary/20 text-primary">
              <ChevronDown className="w-3 h-3" />
            </div>
          )}
        </div>
      )}

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-primary/5 blur-3xl rounded-full z-0 pointer-events-none" />
    </div>
  );
}

// Simple Typewriter component for effect
function Typewriter({
  text,
  speed = 30,
  delay = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i > text.length) clearInterval(timer);
      }, speed);
      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return <span>{displayedText}</span>;
}
