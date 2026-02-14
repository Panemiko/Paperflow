"use client";

import { motion } from "framer-motion";
import { Logo } from "./brand/logo";
import { MaxWidth } from "./max-width";

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <MaxWidth>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Logo className="h-12 mb-4 w-auto" />
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              For writers who believe words matter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {["About", "Privacy", "Terms", "Contact"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground">
            © 2026 Paperflow. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground"></p>
        </div>
      </MaxWidth>
    </footer>
  );
}
