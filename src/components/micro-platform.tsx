"use client";

import { motion } from "framer-motion";
import { 
  Type, 
  Download, 
  History, 
  UserCheck, 
  RotateCcw,
  FileText,
  Users,
  Clock,
  ArrowDownToLine,
  Undo2
} from "lucide-react";

export type PlatformType = "editor" | "export" | "history" | "collaboration" | "undo";

interface MicroPlatformProps {
  type: PlatformType;
  color?: string;
}

export function MicroPlatform({ type, color = "primary" }: MicroPlatformProps) {
  const renderContent = () => {
    switch (type) {
      case "editor":
        return (
          <div className="flex flex-col gap-2 p-6">
            <div className="space-y-2">
              <div className="w-16 h-1.5 rounded-full bg-primary/20" />
              <div className="w-24 h-1 rounded-full bg-foreground/10" />
              <div className="w-20 h-1 rounded-full bg-foreground/10" />
              <div className="w-24 h-1 rounded-full bg-foreground/5" />
            </div>
            <div className="flex gap-1.5 items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
              <div className="w-12 h-1 rounded-full bg-primary/20" />
            </div>
          </div>
        );
      case "export":
        return (
          <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
            <motion.div 
              whileHover={{ y: -2 }}
              className="w-12 h-12 rounded-sm bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center shadow-sm relative mr-2"
            >
               <ArrowDownToLine className="w-5 h-5 text-primary/60" />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-border flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
               </div>
            </motion.div>
            <div className="flex gap-1.5">
              <div className="w-4 h-1 rounded-full bg-primary/20" />
              <div className="w-4 h-1 rounded-full bg-muted/40" />
            </div>
          </div>
        );
      case "history":
        return (
          <div className="p-6 space-y-3 flex flex-col items-start h-full justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full border border-primary/30 ${i === 1 ? 'bg-primary/40' : 'bg-transparent'}`} />
                <div className={`h-1 rounded-full bg-foreground/10 ${i === 1 ? 'w-16' : i === 2 ? 'w-20' : 'w-12'}`} />
              </div>
            ))}
          </div>
        );
      case "collaboration":
        return (
          <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white shadow-md relative z-20" />
              <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-white shadow-md relative z-10" />
              <div className="w-8 h-8 rounded-full bg-prism-1/20 border-2 border-white shadow-md" />
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary/40" />
               <div className="w-16 h-1 rounded-full bg-foreground/10" />
            </div>
          </div>
        );
      case "undo":
        return (
          <div className="flex items-center justify-center h-full relative p-4">
             <div className="relative isolate">
                <div className="w-14 h-10 rounded-sm border border-border bg-white/40 -skew-x-12 translate-x-2 opacity-50" />
                <div className="absolute top-1 left-1 w-14 h-10 rounded-sm border border-primary/30 bg-white/90 shadow-sm flex items-center justify-center -skew-x-12 z-10 transition-transform group-hover:-translate-y-1">
                  <Undo2 className="w-5 h-5 text-primary/70" />
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:scale-110">
      <div className="h-full w-full relative">
        {renderContent()}
      </div>
    </div>
  );
}
