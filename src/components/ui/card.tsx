"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

interface PaperflowCardProps extends HTMLMotionProps<"div"> {
  index?: number;
  icon?: React.ReactNode;
  title: string;
  description: string;
  hoverGlow?: boolean;
}

function PaperflowCard({
  index,
  icon,
  title,
  description,
  className,
  hoverGlow = true,
  ...props
}: PaperflowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group p-8 border border-border bg-background hover:border-primary transition-all duration-300 relative overflow-hidden flex flex-col items-start text-left h-full",
        className,
      )}
      whileHover={{ y: -4 }}
      {...props}
    >
      {hoverGlow && (
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {index !== undefined && (
        <div className="w-10 h-10 bg-primary flex items-center justify-center mb-6 relative noise shrink-0">
          <span className="font-mono text-xs text-primary-foreground font-bold">
            {index + 1}
          </span>
        </div>
      )}

      {icon && (
        <div className="w-12 h-12 border border-border group-hover:border-primary group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300 text-primary group-hover:text-primary-foreground relative noise overflow-hidden shrink-0">
          {icon}
        </div>
      )}

      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 leading-tight text-balance">
        {title}
      </h3>
      <p className="text-sm text-balance text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  PaperflowCard,
};
