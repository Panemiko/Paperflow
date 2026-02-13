"use client";

import { motion } from "framer-motion";

interface PlaceholderProps {
  description: string;
  className?: string;
  aspectRatio?: string;
}

export function Placeholder({
  description,
  className = "",
  aspectRatio = "aspect-video",
}: PlaceholderProps) {
  return (
    <motion.div
      className={`relative w-full ${aspectRatio} bg-muted border border-border flex items-center justify-center overflow-hidden group ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 p-8 flex flex-col items-center text-center max-w-md">
        <div className="w-12 h-12 border-2 border-border mb-4 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Border corners decoration */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-border" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-border" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-border" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-border" />
    </motion.div>
  );
}
