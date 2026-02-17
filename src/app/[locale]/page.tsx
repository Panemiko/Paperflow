import { Archive } from "@/components/animations/archive";
import { Evolution } from "@/components/animations/evolution";
import { Methodology } from "@/components/animations/methodology";
import { Review } from "@/components/animations/review";
import { MaxWidth } from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PaperflowCard } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { getDictionary, Locale } from "@/dictionaries";
import {
  Briefcase,
  ClipboardList,
  EyeOff,
  Feather,
  GraduationCap,
  Lock,
  PenTool,
  Scale,
  ShieldCheck,
} from "lucide-react";

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
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[1].title,
      description: dictionary.home.audience.personas[1].description,
      icon: <Scale className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[2].title,
      description: dictionary.home.audience.personas[2].description,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[3].title,
      description: dictionary.home.audience.personas[3].description,
      icon: <PenTool className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[4].title,
      description: dictionary.home.audience.personas[4].description,
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      title: dictionary.home.audience.personas[5].title,
      description: dictionary.home.audience.personas[5].description,
      icon: <Feather className="w-5 h-5" />,
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
        className="pt-32 pb-24 lg:pt-40 lg:pb-32 border-b border-border relative overflow-hidden"
      >
        <MaxWidth>
          <div className="max-w-5xl mx-auto text-center">
            <Reveal className="mb-8" transition={{ duration: 0.6 }}>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary border border-primary px-3 py-1 rounded-lg relative noise">
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
              <p className="mt-12 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {dictionary.home.hero.description}
              </p>
            </Reveal>

            <Reveal
              className="mt-12 flex justify-center"
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WaitlistForm dict={dictionary.waitlist} />
            </Reveal>
          </div>
        </MaxWidth>
      </section>

      {/* Section 2: Features (Evolution) */}
      <section
        id="how-it-works"
        className="py-24 lg:py-32 border-b border-border relative"
      >
        <MaxWidth>
          <Reveal className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
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

          <Evolution dict={dictionary.animations.evolution} />
        </MaxWidth>
      </section>

      {/* Section 3: Chat (Review and Comment) */}
      <section
        id="collaboration"
        className="py-24 lg:py-32 border-b border-border bg-background relative overflow-hidden"
      >
        <MaxWidth>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Review dict={dictionary.animations.review} />
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {dictionary.home.collaboration.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {dictionary.home.collaboration.title}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {dictionary.home.collaboration.description}
                </p>
                <ul className="mt-8 space-y-3">
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
        className="py-24 lg:py-32 border-b border-border relative"
      >
        <MaxWidth>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {dictionary.home.archive.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  {dictionary.home.archive.title}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {dictionary.home.archive.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {dictionary.home.archive.items.map((item: string) => (
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

            <Reveal
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
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
        className="py-24 lg:py-32 bg-primary/2 relative overflow-hidden border-b border-border"
      >
        {/* Subtle background pattern for integration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <MaxWidth className="relative z-10">
          <div className="text-left">
            <Reveal className="max-w-3xl">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {dictionary.home.philosophy.badge}
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                {dictionary.home.philosophy.title}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {dictionary.home.philosophy.description}
              </p>
            </Reveal>

            <Reveal
              className="mt-16 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Methodology
                dict={dictionary.animations.methodology}
                items={dictionary.home.philosophy.items}
              />
            </Reveal>
          </div>
        </MaxWidth>
      </section>

      {/* Section 6: Public (Audience) */}
      <section
        id="public"
        className="py-16 lg:py-24 border-b border-border relative bg-primary/2 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <MaxWidth>
          <Reveal
            className="max-w-2xl mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              {dictionary.home.audience.badge}
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {dictionary.home.audience.title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {dictionary.home.audience.description}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writerPersonas.map((persona, index) => (
              <PaperflowCard
                key={persona.title}
                icon={persona.icon}
                title={persona.title}
                description={persona.description}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              />
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* Section 7: What We Refuse to Build (Principles) */}
      <section
        id="refuse"
        className="py-24 lg:py-32 border-b border-border relative bg-primary/2 overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <MaxWidth>
          <Reveal className="max-w-2xl mb-16 relative">
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

          <div className="grid md:grid-cols-3 gap-6">
            {antiFeatures.map((feature, index) => (
              <PaperflowCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                icon={
                  <div className="w-full h-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                }
              />
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="py-24 lg:py-32 border-b border-border">
        <MaxWidth>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {dictionary.home.faq.badge}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
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
        className="py-24 lg:py-32 bg-foreground relative text-background"
      >
        <MaxWidth>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50">
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
