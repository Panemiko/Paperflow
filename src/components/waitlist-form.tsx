"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import React, { useState } from "react";

export function WaitlistForm({
  variant = "default",
  dict,
}: {
  variant?: "default" | "compact" | "dark";
  dict?: any; // We'll make this optional to avoid breaking other usages if any
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const d = dict?.[variant] ||
    dict?.default || {
      placeholder: "your@email.com",
      join: "Join",
      joined: "Joined!",
      joining: "Joining...",
      welcome: "Welcome Aboard!",
      error: "Try Again",
      success_status: "You're on the list. We'll be in touch soon.",
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("success");
    setEmail("");

    setTimeout(() => setStatus("idle"), 3000);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={d.placeholder}
            className="w-full pl-11 pr-4 py-3 border-2 border-border bg-card text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 group"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            <>
              {d.joined}
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              {d.join}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={d.placeholder}
              className="w-full pl-11 pr-5 py-4 border-2 border-background/20 bg-background/5 text-background font-mono text-sm placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <Button
            type="submit"
            variant="dark"
            size="xl"
            disabled={status === "loading"}
            className="whitespace-nowrap group"
          >
            {status === "loading" && (
              <>
                {d.joining}
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            )}
            {status === "success" && (
              <>
                {d.welcome}
                <Check className="w-4 h-4" />
              </>
            )}
            {status === "error" && d.error}
            {status === "idle" && (
              <>
                {d.join}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-mono text-xs text-primary"
          >
            {d.success_status}
          </motion.p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={d.placeholder}
            className="w-full pl-11 pr-5 py-4 border-2 border-border bg-card text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <Button
          type="submit"
          size="xl"
          disabled={status === "loading"}
          className="whitespace-nowrap group"
        >
          {status === "loading" && (
            <>
              {d.joining}
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          )}
          {status === "success" && (
            <>
              {d.welcome}
              <Check className="w-4 h-4" />
            </>
          )}
          {status === "error" && d.error}
          {status === "idle" && (
            <>
              {d.join}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-mono text-xs text-primary"
        >
          {d.success_status}
        </motion.p>
      )}
    </form>
  );
}
