"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
    }
  };

  const handleEmailBlur = () => {
    if (email && email.includes("@")) {
      // @ts-ignore
      if (window.umami) {
        // @ts-ignore
        window.umami.track("email_input_blur", { email, variant });
      }
    }
  };

  const params = useParams();
  const locale = params?.locale || "en";

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

    // @ts-ignore
    if (window.umami) {
      // @ts-ignore
      window.umami.track("waitlist_submission", { email, variant });
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setErrorMessage(
            dict?.error_duplicate || "This email is already registered.",
          );
        } else {
          setErrorMessage(d.error || "Try Again");
        }
        throw new Error("Failed to register");
      }

      setStatus("success");
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      console.error("Waitlist error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (variant === "compact") {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={d.placeholder}
              className="w-full pl-11 pr-4 py-3 border border-border bg-card rounded-sm text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              required
              onBlur={handleEmailBlur}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 group"
            data-umami-event={`waitlist_submit_${variant}`}
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
        {status === "error" && errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-mono text-xs text-destructive text-center"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        {d.label && (
          <label className="block text-center mt-2 mb-6 text-[10px] font-mono tracking-[0.3em] uppercase text-primary/90">
            {d.label}
          </label>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-background/40" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={d.placeholder}
              className="w-full pl-11 pr-5 py-4 border border-background/20 bg-background/5 rounded-sm text-background font-mono text-sm placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              required
              onBlur={handleEmailBlur}
            />
          </div>
          <Button
            type="submit"
            size="xl"
            disabled={status === "loading"}
            className="whitespace-nowrap group"
            data-umami-event={`waitlist_submit_${variant}`}
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
        {status === "error" && errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-mono text-xs text-destructive"
          >
            {errorMessage}
          </motion.p>
        )}

        {dict?.consent_agreed && (
          <p className="mt-4 text-center text-[10px] text-background/60 w-full">
            {dict.consent_agreed}
            <Link
              href={`/${locale}/terms`}
              className="underline hover:text-background/80"
            >
              {dict.terms_link}
            </Link>
            {dict.consent_and}
            <Link
              href={`/${locale}/privacy`}
              className="underline hover:text-background/80"
            >
              {dict.privacy_link}
            </Link>
            {dict.consent_end}
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      {d.label && (
        <label className="block text-center mt-2 mb-6 text-[10px] font-mono tracking-wider uppercase text-primary/90">
          {d.label}
        </label>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={d.placeholder}
            className="w-full pl-11 pr-5 py-4 border border-border bg-card rounded-sm text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            required
            onBlur={handleEmailBlur}
          />
        </div>
        <Button
          type="submit"
          size="xl"
          disabled={status === "loading"}
          className="whitespace-nowrap group"
          data-umami-event={`waitlist_submit_${variant}`}
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
      {status === "error" && errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-mono text-xs text-destructive"
        >
          {errorMessage}
        </motion.p>
      )}

      {dict?.consent_agreed && (
        <p className="mt-4 text-center text-[10px] text-muted-foreground w-full">
          {dict.consent_agreed}
          <Link
            href={`/${locale}/terms`}
            className="underline hover:text-foreground"
          >
            {dict.terms_link}
          </Link>
          {dict.consent_and}
          <Link
            href={`/${locale}/privacy`}
            className="underline hover:text-foreground"
          >
            {dict.privacy_link}
          </Link>
          {dict.consent_end}
        </p>
      )}
    </form>
  );
}
