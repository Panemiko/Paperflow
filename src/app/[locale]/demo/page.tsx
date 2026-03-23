"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  Bold,
  Bot,
  Check,
  ChevronDown,
  Clock,
  Code,
  Download,
  FileCode,
  FileText,
  FileType,
  GitBranch,
  GitCommit,
  History,
  Image,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  PenTool,
  Plus,
  Redo2,
  RotateCcw,
  ScrollText,
  Search,
  Strikethrough,
  Type,
  Underline,
  Undo2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const initialCommits = [
  {
    hash: "a9b1e8f",
    author: "Elena Vasquez (You)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
    date: "10 min ago",
    time: "11:45 UTC",
    message: "Adjusted Compensation and Deadlines Clause",
    diff: { added: 12, removed: 4 },
    isAi: false,
  },
  {
    hash: "c4f2d9a",
    author: "AI Assistant",
    avatar: "",
    date: "2 hours ago",
    time: "09:30 UTC",
    message: "Suggested change to mitigate risks in Clause 3",
    diff: { added: 8, removed: 2 },
    isAi: true,
  },
  {
    hash: "e7a5b2c",
    author: "Elena Vasquez (You)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
    date: "Yesterday",
    time: "16:20 UTC",
    message: "Spell check and formatting of Appendix I",
    diff: { added: 45, removed: 38 },
    isAi: false,
  },
  {
    hash: "b1d8f4e",
    author: "Marcos Silva (Legal)",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
    date: "2 days ago",
    time: "14:15 UTC",
    message: "Added termination clause (Standard Template)",
    diff: { added: 156, removed: 0 },
    isAi: false,
  },
  {
    hash: "f3c9a1d",
    author: "Elena Vasquez (You)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
    date: "3 days ago",
    time: "10:05 UTC",
    message: "Initial manuscript draft",
    diff: { added: 342, removed: 0 },
    isAi: false,
  },
];

const docHeader = `
<div class="text-center mb-12">
  <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">Professional Services Agreement</h1>
  <p class="text-base font-normal text-muted-foreground leading-tight">TechSolutions Inc.</p>
</div>`;

const sec1 = `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">1. Scope of Services</h2>
  <p class="mb-3 text-justify leading-relaxed">This agreement covers the provision of specialized technology consulting services by the SERVICE PROVIDER to the CLIENT. The services encompass infrastructure analysis, cloud migration planning, and implementation of information security routines.</p>
  <p class="mb-3 text-justify leading-relaxed">All services shall be rendered strictly following best market practices and the guidelines set forth in Appendix I of this instrument.</p>
  <p class="mb-3 text-justify leading-relaxed">The SERVICE PROVIDER commits to assigning qualified professionals for the execution of the scope, taking full responsibility for all applicable labor, social security, and tax obligations.</p>
</div>`;

const sec2 = `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">2. Service Provider Obligations</h2>
  <p class="mb-3 text-justify leading-relaxed">The SERVICE PROVIDER agrees to deliver the agreed-upon services on a continuous and uninterrupted basis, guaranteeing the contracted quality level (SLA).</p>
  <p class="mb-3 text-justify leading-relaxed">Any unjustified breach shall result in the application of termination fines and contractual penalties.</p>
</div>`;

const initialCommitDiffs: Record<string, { left: string; right: string }> = {
  a9b1e8f: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Price and Payment Terms</h2>
  <p class="mb-3 text-justify leading-relaxed">For the services rendered, the CLIENT shall pay the SERVICE PROVIDER the amount stipulated in Appendix II of this agreement, to be invoiced <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">within the agreed period</span>. In case of delay, a late fee <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">stipulated in an addendum</span> shall apply.</p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Price and Payment Terms</h2>
  <p class="mb-3 text-justify leading-relaxed">For the services rendered, the CLIENT shall pay the SERVICE PROVIDER the amount stipulated in Appendix II of this agreement, to be invoiced <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="within the agreed period">by the 5th business day of the month following service delivery</span>. In case of delay, a late fee of <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="stipulated in an addendum">2% (two percent) of the invoice amount</span> shall apply.</p>
</div>`,
  },
  c4f2d9a: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Client Obligations</h2>
  <p class="mb-3 text-justify leading-relaxed">The CLIENT agrees to provide the SERVICE PROVIDER with the information necessary for the execution of the contracted services.</p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Client Obligations</h2>
  <p class="mb-3 text-justify leading-relaxed">The CLIENT agrees to provide the SERVICE PROVIDER with <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="">all</span> information<span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="">, documents, and system access</span> necessary for the execution of the contracted services.</p>
  <p class="mb-3 text-justify leading-relaxed"><span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 py-0.5 leading-normal cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="">Furthermore, it is the CLIENT's responsibility to ensure that all required third-party software licenses are compliant before the start of activities, mitigating risks of delay or operational disruption.</span></p>
</div>`,
  },
  e7a5b2c: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">Appendix I</h2>
  <p class="mb-3 text-justify leading-relaxed">The infrastructure shall be migrated to the cloud <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">folowing</span> ISO 27001 standards. The provider will ensure <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">tha</span> the system remains <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">availble</span> 99.9% of the time during <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">buisness</span> hours.</p>
  <p class="mb-3 text-justify leading-relaxed">The Provider's responsibilities <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">includ</span>:<br/>- <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">Baic</span> audit<br/>- Server maintenance<br/>- <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">Daly</span> backup and recovery</p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">Appendix I</h2>
  <p class="mb-3 text-justify leading-relaxed">The infrastructure shall be migrated to the cloud <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="folowing">following</span> ISO 27001 standards. The provider will ensure <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="tha">that</span> the system remains <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="availble">available</span> 99.9% of the time during <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="buisness">business</span> hours.</p>
  <p class="mb-3 text-justify leading-relaxed">The Provider's responsibilities <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="includ">include</span>:<br/>- <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="Baic">Basic</span> audit<br/>- Server maintenance<br/>- <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 cursor-pointer hover:bg-green-500/30 hover:underline decoration-dotted transition-all underline-offset-2" data-revert="Daly">Daily</span> backup and recovery</p>
</div>`,
  },
};

export default function EditorDemo() {
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [commits, setCommits] = useState(initialCommits);
  const [commitDiffs, setCommitDiffs] =
    useState<Record<string, { left: string; right: string }>>(
      initialCommitDiffs,
    );
  const [selectedCommitHash, setSelectedCommitHash] = useState<string | null>(
    null,
  );
  const [hoveredChunk, setHoveredChunk] = useState<{
    rect: DOMRect;
    revertText: string;
    targetText: string;
  } | null>(null);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const lastSavedHtml = useRef<string>("");
  const isSyncingLeftScroll = useRef(false);
  const isSyncingRightScroll = useRef(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingLeftScroll.current) {
      isSyncingLeftScroll.current = false;
      return;
    }
    if (rightScrollRef.current) {
      isSyncingRightScroll.current = true;
      rightScrollRef.current.scrollTop = e.currentTarget.scrollTop;
      setHoveredChunk(null);
    }
  };

  const handleRightScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingRightScroll.current) {
      isSyncingRightScroll.current = false;
      return;
    }
    if (leftScrollRef.current) {
      isSyncingLeftScroll.current = true;
      leftScrollRef.current.scrollTop = e.currentTarget.scrollTop;
      setHoveredChunk(null);
    }
  };

  const handleCommit = () => {
    if (!commitMessage.trim()) return;

    // Track baseline from initial render if undefined
    if (!lastSavedHtml.current && editorRef.current) {
      lastSavedHtml.current = editorRef.current.innerHTML;
    }

    const currentHtml = editorRef.current?.innerHTML || "";
    const hashId = Math.random().toString(16).slice(2, 9);

    setCommitDiffs((prev) => ({
      ...prev,
      [hashId]: {
        left: lastSavedHtml.current,
        right: currentHtml,
      },
    }));

    // Update the last saved to match the brand new committed string
    lastSavedHtml.current = currentHtml;

    const newCommit = {
      hash: hashId,
      author: "Elena Vasquez (You)",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
      date: "Just now",
      time: new Date().toISOString().substring(11, 16) + " UTC",
      message: commitMessage,
      diff: {
        added: Math.floor(Math.random() * 50) + 1,
        removed: Math.floor(Math.random() * 10),
      },
      isAi: false,
    };
    setCommits([newCommit, ...commits]);
    setShowHistory(true);
    setShowCommitDialog(false);
    setCommitMessage("");
  };

  const handleRevertChunk = (revertText: string, targetText: string) => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      // Basic text replacement for the demo.
      // In a real app we'd need to be more precise.
      const newHtml = currentHtml.includes(targetText)
        ? currentHtml.replace(targetText, revertText)
        : currentHtml;

      if (newHtml !== currentHtml) {
        editorRef.current.innerHTML = newHtml;
        lastSavedHtml.current = newHtml;
        toast.success("Chunk reverted in document!", {
          description: `Restored: "${revertText || "[Removed]"}"`,
          icon: <RotateCcw className="w-4 h-4 text-primary" />,
        });
      } else {
        toast.error("Could not find this chunk in current document.");
      }
      setHoveredChunk(null);
    }
  };

  const handleRestore = (hash: string) => {
    if (!commitDiffs[hash]) return;
    const targetHtml = commitDiffs[hash].right;

    if (editorRef.current) {
      editorRef.current.innerHTML = targetHtml;
      lastSavedHtml.current = targetHtml;
    }

    const restoreCommit = {
      hash: Math.random().toString(16).slice(2, 9),
      author: "Elena Vasquez (You)",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90",
      date: "Just now",
      time: new Date().toISOString().substring(11, 16) + " UTC",
      message: `Restored to version ${hash}`,
      diff: { added: 0, removed: 0 },
      isAi: false,
    };

    setCommits([restoreCommit, ...commits]);
    setCommitDiffs((prev) => ({
      ...prev,
      [restoreCommit.hash]: {
        left: targetHtml,
        right: targetHtml,
      },
    }));

    setSelectedCommitHash(null);
    setShowHistory(false);
  };

  const currentText = `Professional Services Agreement
TechSolutions Inc.

1. Scope of Services
This agreement covers the provision of specialized technology consulting services by the SERVICE PROVIDER to the CLIENT. The services encompass infrastructure analysis, cloud migration planning, and implementation of information security routines.
All services shall be rendered strictly following best market practices and the guidelines set forth in Appendix I of this instrument.
The SERVICE PROVIDER commits to assigning qualified professionals for the execution of the scope, taking full responsibility for all applicable labor, social security, and tax obligations.

2. Service Provider Obligations
The SERVICE PROVIDER agrees to deliver the agreed-upon services on a continuous and uninterrupted basis, guaranteeing the contracted quality level (SLA).
Any unjustified breach shall result in the application of termination fines and contractual penalties.`;

  return (
    <div className="w-full h-full flex flex-col bg-background/50 overflow-hidden relative mesh-bg">
      {/* Top Header Area */}
      <div className="bg-card border-b-[0.5px] border-border shrink-0 z-20">
        {/* Document Title & Actions */}
        <div className="h-[72px] px-6 py-2 flex items-center justify-between border-b-[0.5px] border-border">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <FileText className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-tight tracking-tight uppercase">
                Professional Services Agreement
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary leading-none uppercase bg-primary/10 px-1.5 py-0.5 rounded-sm">
                  base
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold leading-none uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Saved
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <Popover open={showHistory} onOpenChange={setShowHistory}>
              <PopoverTrigger asChild>
                <Button
                  variant={showHistory ? "secondary" : "ghost"}
                  size="icon"
                  className={
                    showHistory
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  <History className="w-5 h-5 stroke-[1.5]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                sideOffset={12}
                className={cn(
                  "p-0 flex flex-col prism-card rounded-sm z-50 overflow-hidden transition-all duration-500 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] border-primary/20",
                  isHistoryExpanded
                    ? "fixed top-12 bottom-12 left-12 right-12 w-auto h-auto max-w-none"
                    : "w-[420px] max-h-[calc(100vh-120px)]",
                )}
              >
                <div className="p-4 border-b-[0.5px] border-border bg-background flex flex-col gap-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-primary" />
                      Version History
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mr-1">
                        {commits.length} Versions
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-muted-foreground hover:text-foreground hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsHistoryExpanded(!isHistoryExpanded);
                        }}
                      >
                        {isHistoryExpanded ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setShowHistory(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search versions..."
                      className="pl-8 w-full h-8 text-xs rounded-sm bg-muted/50 border-border"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-card relative">
                  <div className="absolute top-0 bottom-0 left-[35px] w-px bg-border z-0" />

                  <div className="py-2 space-y-1 relative z-10">
                    <AnimatePresence initial={false}>
                      {commits.map((commit) => (
                        <motion.div
                          key={commit.hash}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`group relative px-4 py-3 transition-colors duration-200 ${commitDiffs[commit.hash] ? "hover:bg-muted/50 cursor-pointer" : ""}`}
                          onClick={() => {
                            if (commitDiffs[commit.hash])
                              setSelectedCommitHash(commit.hash);
                          }}
                        >
                          <div className="flex items-start gap-4">
                            {/* Avatar/Icon & Timeline Dot */}
                            <div className="flex items-center shrink-0 w-8 pt-0.5">
                              <div
                                className={`w-7 h-7 rounded-sm border flex items-center justify-center z-10 shrink-0 ${
                                  commit.isAi
                                    ? "bg-muted text-muted-foreground border-border"
                                    : "bg-background border-border overflow-hidden"
                                }`}
                              >
                                {commit.isAi ? (
                                  <Bot className="w-4 h-4" />
                                ) : (
                                  <img
                                    src={commit.avatar}
                                    alt={commit.author}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            </div>

                            {/* Commit Info */}
                            <div className="flex-1 min-w-0 bg-transparent">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <div className="flex items-center gap-2">
                                  <code className="font-mono text-[11px] text-muted-foreground bg-muted/50 border-[0.5px] border-border px-1.5 py-0.5 rounded-sm relative font-medium">
                                    {commit.hash}
                                  </code>
                                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {commit.date}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 font-mono text-[11px]">
                                  <span className="text-green-600 bg-green-500/10 px-1 py-0.5 rounded-sm">
                                    +{commit.diff.added}
                                  </span>
                                  {commit.diff.removed > 0 && (
                                    <span className="text-red-500 bg-red-500/10 px-1 py-0.5 rounded-sm">
                                      -{commit.diff.removed}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-foreground font-medium leading-tight mb-2">
                                {commit.message}
                              </p>

                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                {commit.author}{" "}
                                {commit.isAi && (
                                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">
                                    IA
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Restore Button on Hover */}
                            <div className="absolute right-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-6 text-[9px] px-2 gap-1 font-bold uppercase tracking-wider py-0 shadow-lg shadow-destructive/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRestore(commit.hash);
                                }}
                              >
                                <History className="w-2.5 h-2.5" />
                                Restore
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-2 border-t-[0.5px] border-border flex justify-center bg-muted/30 shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground flex items-center cursor-pointer hover:text-foreground">
                    Load earlier versions{" "}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <GitBranch className="w-5 h-5 stroke-[1.5]" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground rounded-sm"
                >
                  <Download className="w-5 h-5 stroke-[1.5]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem className="cursor-pointer">
                  <FileCode className="w-4 h-4 mr-2 text-primary" /> Modelo
                  LaTeX
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileType className="w-4 h-4 mr-2" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ScrollText className="w-4 h-4 mr-2" /> DOCX
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Type className="w-4 h-4 mr-2" /> TXT
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" /> MD
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="font-medium text-sm flex items-center gap-2 rounded-sm relative"
              onClick={() => setShowCommitDialog(!showCommitDialog)}
            >
              <GitBranch className="w-4 h-4" /> Save
            </Button>

            {showCommitDialog && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowCommitDialog(false)}
                />
                <div className="absolute top-[calc(100%+8px)] right-6 w-[320px] bg-card border-[0.5px] border-border rounded-sm p-4 flex flex-col gap-3 z-50">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-primary" />
                    Save Changes
                  </h3>
                  <Input
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Describe your changes..."
                    className="text-xs h-9 rounded-sm bg-muted/50 border-border"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCommit();
                    }}
                  />
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs px-3 rounded-sm"
                      onClick={() => {
                        setShowCommitDialog(false);
                        setCommitMessage("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 text-xs px-4 rounded-sm"
                      onClick={handleCommit}
                      disabled={!commitMessage.trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuItem className="cursor-pointer group">
                  <FileType className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>Rename Document</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer group">
                  <GitBranch className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>Create Branch</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <Download className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Export</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-[180px]">
                      <DropdownMenuItem className="cursor-pointer">
                        <FileCode className="w-4 h-4 mr-2 text-primary" /> LaTeX
                        Template
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <FileType className="w-4 h-4 mr-2" /> PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <ScrollText className="w-4 h-4 mr-2" /> DOCX
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Type className="w-4 h-4 mr-2" /> TXT
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" /> MD
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer group text-destructive focus:text-destructive focus:bg-destructive/5">
                  <X className="w-4 h-4 mr-2 text-destructive/70 group-hover:text-destructive transition-colors" />
                  <span>Move to Trash</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="h-12 px-4 flex items-center justify-between overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm hover:text-destructive transition-colors hover:bg-destructive/10"
              onClick={() => {
                if (commits.length > 0) {
                  handleRestore(commits[0].hash);
                }
              }}
              title="Restore last saved version"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm"
            >
              <Redo2 className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 flex items-center gap-1 px-2 text-foreground rounded-sm font-light text-[13px]"
            >
              <Plus className="w-3.5 h-3.5" /> Paragraph{" "}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Underline className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Code className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <AlignLeft className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <List className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <ListOrdered className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <AlignLeft className="w-4 h-4 rotate-180" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Image className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <PenTool className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 shrink-0 pl-4">
            <div className="flex items-center gap-2">
              <PenTool className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                Editing{" "}
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 md:py-16 flex justify-center bg-linear-to-b from-muted/20 to-transparent relative custom-scrollbar z-0">
        {/* Document Sheet */}
        <div className="w-full max-w-[850px] bg-white dark:bg-zinc-950 border border-border/50 min-h-[1056px] px-12 md:px-[100px] py-16 md:py-[110px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative">
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 noise pointer-events-none opacity-[0.03]" />

          <div
            ref={editorRef}
            className="relative font-sans text-[15px] md:text-[16px] leading-[1.8] text-foreground/90 whitespace-pre-wrap outline-none"
            contentEditable="true"
            suppressContentEditableWarning
          >
            {currentText.split("\n").map((line, index) => {
              if (index === 0)
                return (
                  <h1
                    key={index}
                    className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight text-center"
                  >
                    {line}
                  </h1>
                );
              if (index === 1 && line.trim() !== "" && !line.match(/^\s*\d\./))
                return (
                  <p
                    key={index}
                    className="text-base font-normal mb-12 text-muted-foreground leading-tight text-center"
                  >
                    {line}
                  </p>
                );
              if (line.match(/^\s*\d\./))
                return (
                  <h2
                    key={index}
                    className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-4 text-foreground text-left"
                  >
                    {line}
                  </h2>
                );
              if (line.trim() === "") return <br key={index} />;

              const isIndent = line.startsWith("  ");
              return (
                <p
                  key={index}
                  className={`mb-3 text-justify leading-relaxed ${isIndent ? "pl-8 text-muted-foreground underline decoration-border underline-offset-4 cursor-pointer hover:text-primary transition-colors text-left" : ""}`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diff Review Screen Overlay */}
      <AnimatePresence>
        {selectedCommitHash && commitDiffs[selectedCommitHash] && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute inset-0 z-50 bg-background flex flex-col"
          >
            <div className="h-14 border-b-[0.5px] border-border flex items-center justify-between px-6 shrink-0 bg-card">
              <div className="flex items-center gap-3">
                <GitCommit className="text-primary w-5 h-5" />
                <span className="font-medium text-sm">Review Changes</span>
                <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                  {selectedCommitHash}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRestore(selectedCommitHash)}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore this Version
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm"
                  onClick={() => setSelectedCommitHash(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Left Editor - Original */}
              <div
                ref={leftScrollRef}
                onScroll={handleLeftScroll}
                className="w-1/2 border-r-[0.5px] border-border overflow-y-auto bg-muted/10 p-8 md:p-12 relative custom-scrollbar"
              >
                <div className="absolute top-4 left-4 font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 py-1 bg-background border-[0.5px] border-border rounded-sm">
                  Before
                </div>
                <div
                  className="max-w-[600px] mx-auto opacity-70 mt-4 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: commitDiffs[selectedCommitHash].left,
                  }}
                />
              </div>
              {/* Right Editor - Modified */}
              <div
                ref={rightScrollRef}
                onScroll={handleRightScroll}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const span = target.closest("span[data-revert]");
                  if (span instanceof HTMLElement) {
                    handleRevertChunk(
                      span.getAttribute("data-revert") || "",
                      span.innerText,
                    );
                  }
                }}
                onMouseMove={(e) => {
                  const target = e.target as HTMLElement;
                  const span = target.closest("span[data-revert]");
                  if (span instanceof HTMLElement) {
                    if (hideTimeoutRef.current)
                      clearTimeout(hideTimeoutRef.current);
                    const rect = span.getBoundingClientRect();
                    setHoveredChunk({
                      rect,
                      revertText: span.getAttribute("data-revert") || "",
                      targetText: span.innerText,
                    });
                  }
                }}
                onMouseLeave={() => {
                  hideTimeoutRef.current = setTimeout(
                    () => setHoveredChunk(null),
                    300,
                  );
                }}
                className="w-1/2 overflow-y-auto bg-background p-8 md:p-12 relative custom-scrollbar"
              >
                <div className="absolute top-4 right-4 font-mono text-[10px] font-medium text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                  After
                </div>
                <div
                  className="max-w-[600px] mx-auto mt-4 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: commitDiffs[selectedCommitHash].right,
                  }}
                />

                {hoveredChunk && (
                  <div
                    className="fixed pointer-events-none z-100"
                    style={{
                      top: hoveredChunk.rect.top,
                      left:
                        hoveredChunk.rect.left + hoveredChunk.rect.width / 2,
                    }}
                  >
                    <TooltipProvider delayDuration={0}>
                      <Tooltip open={!!hoveredChunk}>
                        <TooltipTrigger asChild>
                          <div className="w-0 h-0" />
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={12}>
                          Revert this chunk
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
