import { Archive } from "@/components/animations/archive";
import { Evolution } from "@/components/animations/evolution";
import { Methodology } from "@/components/animations/methodology";
import { Review } from "@/components/animations/review";
import { FeaturesBento } from "@/components/features-bento";
import { MaxWidth } from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { getDictionary, Locale } from "@/dictionaries";
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  EyeOff,
  FileText,
  Lock,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import demoImage from "./demo.png";

import { MicroPlatform } from "@/components/micro-platform";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  const writerPersonas = [
    {
      title: dictionary.home.audience.personas[0].title,
      description: dictionary.home.audience.personas[0].description,
      icon: <Scale className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[1].title,
      description: dictionary.home.audience.personas[1].description,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[2].title,
      description: dictionary.home.audience.personas[2].description,
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[3].title,
      description: dictionary.home.audience.personas[3].description,
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[4].title,
      description: dictionary.home.audience.personas[4].description,
      icon: <Lock className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[5].title,
      description: dictionary.home.audience.personas[5].description,
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const antiFeatures = [
    {
      title: dictionary.home.principles.items[0].title,
      description: dictionary.home.principles.items[0].description,
      icon: <EyeOff className="w-5 h-5" />,
    },
    {
      title: dictionary.home.principles.items[1].title,
      description: dictionary.home.principles.items[1].description,
      icon: <Lock className="w-5 h-5" />,
    },
    {
      title: dictionary.home.principles.items[2].title,
      description: dictionary.home.principles.items[2].description,
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section
        id="hero"
        className="pt-24 pb-32 lg:pt-32 lg:pb-48 border-b border-border relative overflow-hidden"
      >
        {/* Asymmetric decorative glows removed */}

        <MaxWidth>
          <div className="max-w-6xl mx-auto text-center">
            <Reveal className="mb-6" transition={{ duration: 0.6 }}>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary border border-primary px-3 py-1 rounded-sm relative noise">
                {dictionary.home.hero.waitlist_badge}
              </span>
            </Reveal>

            <Reveal transition={{ duration: 0.8, delay: 0.1 }}>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground relative z-10">
                {dictionary.home.hero.title_start}{" "}
                <br className="hidden lg:sm" />
                <strong className="text-muted-foreground font-bold">
                  {dictionary.home.hero.title_strong}
                </strong>{" "}
                {dictionary.home.hero.title_end}
              </h1>
            </Reveal>

            <Reveal transition={{ duration: 0.6, delay: 0.4 }}>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {dictionary.home.hero.description}
              </p>
            </Reveal>

            <Reveal
              className="mt-10 flex justify-center"
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WaitlistForm dict={dictionary.waitlist} />
            </Reveal>
          </div>
        </MaxWidth>
      </section>

      {/* Section 1.25: Demo Image */}
      <section className="pb-16 lg:pb-24 -mt-16 relative z-20">
        <MaxWidth>
          <Reveal
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
          >
            <Image
              src={demoImage}
              alt="Paperflow Demo Preview"
              priority
              className="w-full h-auto prism-card"
            />
          </Reveal>
        </MaxWidth>
      </section>

      {/* Section 1.5: Main Features Bento */}
      <FeaturesBento dict={dictionary.home.main_features} />

      {/* Section 2: Features (Evolution) */}
      <section
        id="how-it-works"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden bg-white/50"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-b from-transparent via-prism-3/5 to-transparent pointer-events-none" />

        <MaxWidth className="relative z-10">
          <Reveal className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              {dictionary.home.features.how_it_works_badge}
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {dictionary.home.features.test_ideas}{" "}
              <span className="text-muted-foreground">
                {dictionary.home.features.keep_works}
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {dictionary.home.features.description}
            </p>
          </Reveal>

          <Reveal
            className="mt-8"
            whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
          >
            <Evolution dict={dictionary.animations.evolution} />
          </Reveal>

          <Reveal
            className="mt-12 flex justify-center"
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="#waitlist">
                {dictionary.home.features.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </MaxWidth>
      </section>

      {/* Section 3: Chat (Review and Comment) */}
      <section
        id="collaboration"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden bg-linear-to-b from-transparent to-foreground/3"
      >
        {/* Distinct background removed */}

        <MaxWidth className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal
              className="order-2 lg:order-1 lg:mt-8"
              whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
            >
              <Review dict={dictionary.animations.review} />
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                  {dictionary.home.collaboration.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {dictionary.home.collaboration.title}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {dictionary.home.collaboration.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {dictionary.home.collaboration.items.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-start text-sm text-balance text-muted-foreground before:content-['+'] before:text-primary before:mr-3 before:select-none"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* Section 4: The Result (Your Archive) */}
      <section
        id="result"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden"
      >
        {/* Gradient sweep removed */}

        <MaxWidth className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                  {dictionary.home.archive.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  {dictionary.home.archive.title}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {dictionary.home.archive.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {dictionary.home.archive.items.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-start text-sm text-balance text-muted-foreground before:content-['+'] before:text-primary before:mr-3 before:select-none"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button asChild size="lg" className="group">
                    <Link href="#waitlist">
                      {dictionary.home.archive.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal
              className="lg:mt-6"
              whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
            >
              <Archive
                dict={{
                  ...dictionary.home.archive,
                  ...dictionary.animations,
                }}
              />
            </Reveal>
          </div>
        </MaxWidth>
      </section>

      {/* Section 5: Philosophy (Restored) */}
      <section
        id="philosophy"
        className="py-16 lg:py-24 relative overflow-hidden border-b border-border bg-linear-to-b from-transparent to-foreground/3"
      >
        {/* Richer background removed */}

        <MaxWidth className="relative z-10">
          <div className="text-left">
            <Reveal className="max-w-4xl">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                {dictionary.home.philosophy.badge}
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                {dictionary.home.philosophy.title}{" "}
                <span className="text-muted-foreground">
                  {(dictionary.home.philosophy as any).title_highlight}
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {dictionary.home.philosophy.description}
              </p>
            </Reveal>
          </div>
        </MaxWidth>

        <MaxWidth className="mt-12">
          <Reveal
            className="w-full"
            whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
          >
            <div className="w-full">
              <Methodology
                dict={dictionary.animations.methodology}
                items={dictionary.home.philosophy.items}
              />
            </div>
          </Reveal>
        </MaxWidth>
      </section>

      {/* Section 6: Public (Audience) */}
      <section
        id="public"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden"
      >
        {/* Subtle background variation removed */}

        <MaxWidth className="relative z-10">
          <Reveal
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              {dictionary.home.audience.badge}
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {dictionary.home.audience.title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {dictionary.home.audience.description}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {writerPersonas.map((persona, index) => (
              <Reveal
                key={persona.title}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
              >
                <div className={`h-full relative flex flex-col group`}>
                  {/* Icon Container - simplified for 'texto avulso' */}
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 mb-4">
                    {persona.icon}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold mb-3 text-foreground">
                      {persona.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {persona.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            className="mt-16 flex justify-center"
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="#waitlist">
                {dictionary.home.audience.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </MaxWidth>
      </section>

      {/* Section 7: What We Refuse to Build (Principles) */}
      <section
        id="refuse"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden bg-linear-to-b from-transparent to-foreground/3"
      >
        <MaxWidth className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <Reveal className="relative max-w-3xl mx-auto mb-16">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                {dictionary.home.principles.badge}
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {dictionary.home.principles.title}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {dictionary.home.principles.description}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {antiFeatures.map((feature, index) => (
                <Reveal
                  key={feature.title}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3, delay: 0 } }}
                >
                  <div
                    className="p-8 prism-card flex flex-col items-center text-center gap-6 group border-t-2 border-t-primary h-full"
                  >
                    <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0 text-primary group-hover:text-primary-foreground group-hover:bg-primary group-hover:border-primary bg-white backdrop-blur-sm rounded-sm transition-all duration-500 shadow-sm">
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* Section 8: FAQ */}
      <section
        id="faq"
        className="py-16 lg:py-24 border-b border-border relative overflow-hidden"
      >
        {/* Clean background removed */}

        <MaxWidth className="relative z-10">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                  {dictionary.home.faq.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {dictionary.home.faq.title}
                </h2>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  {dictionary.home.faq.description}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full">
                {dictionary.home.faq.items.map((faq: any, index: number) => (
                  <Reveal
                    key={faq.question}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="font-serif text-lg py-6 hover:no-underline hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Reveal>
                ))}
              </Accordion>
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* Section 9: Final Call */}
      <section
        id="waitlist"
        className="py-16 lg:py-24 bg-foreground relative text-background overflow-hidden mesh-bg"
      >
        {/* Subtle glow on dark background */}
        <div className="absolute top-[-20%] left-[30%] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none opacity-40" />

        <MaxWidth className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                {dictionary.home.final.badge}
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
                {dictionary.home.final.title}
              </h2>
              <p className="mt-6 text-lg text-background/70 leading-relaxed max-w-xl mx-auto">
                {dictionary.home.final.description}
              </p>
            </Reveal>

            <Reveal
              className="mt-12 flex justify-center"
              transition={{ delay: 0.2 }}
            >
              <WaitlistForm variant="dark" dict={dictionary.waitlist} />
            </Reveal>

            <Reveal
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-background/60"
              transition={{ delay: 0.4 }}
            >
              {dictionary.home.final.benefits.map((benefit: string) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </MaxWidth>
      </section>
    </main>
  );
}
