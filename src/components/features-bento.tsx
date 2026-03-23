"use client";

import { MaxWidth } from "@/components/max-width";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

import changesImg from "@/app/[locale]/(marketing)/features/changes.png";
import editorImg from "@/app/[locale]/(marketing)/features/editor.png";
import exportImg from "@/app/[locale]/(marketing)/features/export.png";
import feedbackImg from "@/app/[locale]/(marketing)/features/feedback.png";
import restoreImg from "@/app/[locale]/(marketing)/features/restore.png";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export function FeaturesBento({
  dict,
}: {
  dict: {
    badge: string;
    title: string;
    title_highlight?: string;
    description: string;
    items: FeatureItem[];
  };
}) {
  const items = dict.items;

  const getLayoutClasses = (index: number) => {
    switch (index) {
      case 0:
        return "lg:col-span-2 md:col-span-2 h-auto min-h-[320px] lg:min-h-[520px]";
      case 1:
        return "lg:col-span-1 md:col-span-1 h-auto min-h-[320px] lg:min-h-[520px]";
      case 2:
        return "lg:col-span-1 md:col-span-1 min-h-[250px] lg:h-[350px]";
      case 3:
        return "lg:col-span-1 md:col-span-1 min-h-[250px] lg:h-[350px]";
      case 4:
        return "lg:col-span-1 md:col-span-1 min-h-[250px] lg:h-[350px]";
      case 5:
        return "lg:col-span-3 md:col-span-2 min-h-[250px] lg:h-[200px]";
      default:
        return "lg:col-span-1 md:col-span-1 min-h-[250px]";
    }
  };

  const getImageSrc = (icon: string) => {
    switch (icon) {
      case "type":
        return editorImg;
      case "download":
        return exportImg;
      case "history":
        return changesImg;
      case "user-check":
        return feedbackImg;
      case "rotate-ccw":
        return restoreImg;
      case "shield":
        return editorImg;
      default:
        return editorImg;
    }
  };

  const getImageAdjustment = (index: number) => {
    switch (index) {
      case 0:
        return "origin-bottom object-center";
      case 1:
        return "scale-[1] origin-bottom object-center";
      case 2:
        return "object-top origin-top";
      case 3:
        return "object-top origin-top";
      case 4:
        return "";
      default:
        return "";
    }
  };

  return (
    <section
      id="features"
      className="py-24 lg:py-32 border-b border-border bg-[#FBFBFC]"
    >
      <MaxWidth>
        <Reveal className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
            {dict.badge}
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {dict.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {dict.description}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={cn(
                "group prism-card border-border/40 p-8 lg:p-10 flex flex-col relative bg-linear-to-br from-white via-white to-primary/5 shadow-sm hover:shadow-xl transition-all duration-500",
                getLayoutClasses(i),
                i === 5 && "items-center text-center",
              )}
            >
              {/* Text Content */}
              <div className={cn("relative z-10 mb-4 lg:mb-6", i === 5 && "text-center")}>
                <h3
                  className={cn(
                    "font-serif font-bold text-foreground leading-[1.2] tracking-tight mb-3 group-hover:text-primary transition-colors duration-500",
                    i < 2 ? "text-xl lg:text-3xl" : "text-lg lg:text-2xl",
                  )}
                >
                  {item.title}
                </h3>
              </div>

              {/* Image / Visualization - Premium bleed style for top cards, internal margin for bottom cards */}
              <div
                className={cn(
                  "mt-auto relative overflow-hidden flex items-end justify-center flex-1 transition-all duration-500",
                  i < 2 || i === 5
                    ? "w-[calc(100%+5rem)] left-1/2 -translate-x-1/2 -mb-10 min-h-[150px] lg:min-h-[220px]"
                    : "w-full min-h-[120px] lg:min-h-[180px] mb-2",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 z-10 pointer-events-none",
                    i < 2 || i === 5
                      ? "bg-linear-to-t from-white/80 to-transparent"
                      : "bg-linear-to-t from-white/20 to-transparent",
                  )}
                />
                <div
                  className={cn(
                    "relative transition-transform duration-1000 ease-out",
                    i < 2 || i === 5
                      ? "w-full h-full"
                      : "w-[95%] h-[95%] rounded-lg overflow-hidden border border-border/10 shadow-sm",
                    getImageAdjustment(i),
                  )}
                >
                  <Image
                    src={getImageSrc(i === 5 ? "shield" : item.icon)}
                    alt={item.title}
                    className={cn(
                      "w-full h-full object-cover",
                      getImageAdjustment(i),
                    )}
                    placeholder="blur"
                  />
                </div>
              </div>

              {/* Dynamic Gradient Glow Base */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none",
                  [
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                    "bg-linear-to-br from-primary via-transparent to-transparent",
                  ][i % 6],
                )}
              />
            </motion.div>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
