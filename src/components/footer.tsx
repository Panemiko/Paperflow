"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "./brand/logo";
import { MaxWidth } from "./max-width";

export function Footer({ dict, lang }: { dict: any; lang: string }) {
  return (
    <footer className="py-16 lg:py-24 border-t border-border relative z-50 bg-background">
      <MaxWidth>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a
              href={`/${lang}`}
              className="hover:opacity-80 transition-opacity"
            >
              <BrandLogo className="h-12 mb-4 w-auto" />
            </a>
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {dict.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {[
              { label: dict.links.how_it_works, href: `/${lang}#how-it-works` },
              {
                label: dict.links.collaboration,
                href: `/${lang}#collaboration`,
              },
              { label: dict.links.the_record, href: `/${lang}#result` },
              { label: dict.links.principles, href: `/${lang}#refuse` },
              { label: dict.links.faq, href: `/${lang}#faq` },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground">
            {dict.copyright.replace(
              "{year}",
              new Date().getFullYear().toString(),
            )}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground"></p>
        </div>
      </MaxWidth>
    </footer>
  );
}
