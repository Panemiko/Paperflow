"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureBlockProps {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
  accent?: boolean;
}

export function FeatureBlock({
  label,
  title,
  description,
  children,
  accent,
}: FeatureBlockProps) {
  return (
    <motion.div
      className={`relative ${accent ? "bg-foreground text-background" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Label */}
      <div className={`mb-6 ${accent ? "opacity-60" : ""}`}>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {label}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-balance ${accent ? "text-background" : "text-foreground"}`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-base md:text-lg leading-relaxed max-w-2xl ${accent ? "text-background/80" : "text-muted-foreground"}`}
      >
        {description}
      </p>

      {/* Optional children (visualizations, etc.) */}
      {children && <div className="mt-8">{children}</div>}
    </motion.div>
  );
}
