"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import React, { useState } from "react";

export function WaitlistForm({
  variant = "default",
}: {
  variant?: "default" | "compact" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 border-2 border-border bg-card text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          required
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 group"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            <>
              Joined!
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              Join
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 border-2 border-background/20 bg-background/5 text-background font-mono text-sm placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
            required
          />
          <Button
            type="submit"
            variant="dark"
            size="xl"
            disabled={status === "loading"}
            className="whitespace-nowrap group"
          >
            {status === "loading" && (
              <>
                Joining...
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            )}
            {status === "success" && (
              <>
                Welcome Aboard!
                <Check className="w-4 h-4" />
              </>
            )}
            {status === "error" && "Try Again"}
            {status === "idle" && (
              <>
                Join the Waitlist
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
            You're on the list. We'll be in touch soon.
          </motion.p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-5 py-4 border-2 border-border bg-card text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
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
              Joining...
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          )}
          {status === "success" && (
            <>
              Welcome Aboard!
              <Check className="w-4 h-4" />
            </>
          )}
          {status === "error" && "Try Again"}
          {status === "idle" && (
            <>
              Join the Waitlist
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
          You're on the list. We'll be in touch soon.
        </motion.p>
      )}
    </form>
  );
}
