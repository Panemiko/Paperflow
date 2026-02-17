"use client";

import { Archive } from "@/components/animations/archive";
import { MaxWidth } from "@/components/max-width";
import { motion } from "framer-motion";

export function ArchiveSection({ dict }: { dict: any }) {
  return (
    <section
      id="result"
      className="py-24 lg:py-32 border-b border-border relative"
    >
      <MaxWidth>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {dict.home.archive.badge}
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                {dict.home.archive.title}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {dict.home.archive.description}
              </p>
              <ul className="mt-8 space-y-3">
                {dict.home.archive.items.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-balance text-muted-foreground before:content-['+'] before:text-primary before:mr-3 before:select-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Archive
              dict={{ ...dict.home.archive, ...dict.animations }}
            />
          </motion.div>
        </div>
      </MaxWidth>
    </section>
  );
}
