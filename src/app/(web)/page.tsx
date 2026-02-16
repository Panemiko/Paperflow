"use client";

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
import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";
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
import { useState } from "react";

const writerPersonas = [
  {
    title: "The Academic",
    description:
      "Manage research, evolving theories, and the precision needed for scholarly publishing.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    title: "The Lawyer",
    description:
      "Track every clause and version history to ensure accuracy before reaching court.",
    icon: <Scale className="w-5 h-5" />,
  },
  {
    title: "The Executive",
    description:
      "Build strategic plans and reports where every word choice impacts the business.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: "The Copywriter",
    description:
      "Test headlines, refine campaigns, and manage multiple drafts without the clutter.",
    icon: <PenTool className="w-5 h-5" />,
  },
  {
    title: "The Product Manager",
    description:
      "Keep requirements, user stories, and roadmaps aligned as the project evolves.",
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    title: "The Novelist",
    description:
      "Manage complex stories with multiple paths and characters that evolve over time.",
    icon: <Feather className="w-5 h-5" />,
  },
];

const antiFeatures = [
  {
    title: "No AI Training",
    description:
      "We never use your private text to train artificial intelligence models.",
    icon: <EyeOff className="w-5 h-5" />,
  },
  {
    title: "No Lock-in",
    description:
      "Your data is yours. Export your documents to standard formats at any time.",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    title: "No Distractions",
    description:
      "No badges, streaks, or gamification. Just a quiet place to focus.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

const faqs = [
  {
    question: "Who is Paperflow for?",
    answer:
      "Paperflow is designed for professionals who manage complex, high-stakes documents. It is built for academics, lawyers, technical writers, and authors who need absolute control over their revision history.",
  },
  {
    question: "Do you use my writing to train AI?",
    answer:
      "No. We do not use your text to train artificial intelligence models. Your work remains private and is never used to feed our algorithms.",
  },
  {
    question: "Why use Markdown?",
    answer:
      "We use Markdown to ensure formatting never becomes a distraction. You focus purely on the structure and content while writing, but you can export to any styled format (PDF, Word, LaTeX) when you are ready to publish.",
  },
  {
    question: "What platforms will be supported?",
    answer:
      "Paperflow will launch initially as a web application optimized for desktop browsers. This allows us to deliver updates quickly before we expand to native desktop or mobile apps.",
  },
  {
    question: "How do I get my data out?",
    answer:
      "Data ownership is a core principle. You will be able to export your individual documents or your entire repository to standard formats like Markdown, Docx, or PDF at any time.",
  },
  {
    question: "How is this different from Google Docs?",
    answer:
      "Google Docs is designed for live collaboration, which often results in a messy history. Paperflow is designed for version control, providing a clean, permanent record of every major decision you make.",
  },
  {
    question: "Do I need technical skills to use this?",
    answer:
      "No. While the technology is powerful, the interface is simple. We use concepts like 'Save Version' and 'Explore Idea' so you get the benefits of version control without needing to be a developer.",
  },
  {
    question: "Is there a limit to how many versions I can save?",
    answer:
      "We plan to offer unlimited version history. We believe your history is a valuable asset, not a storage problem that needs to be deleted.",
  },
  {
    question: "Is this just Git for writers?",
    answer:
      "It shares the same philosophy as Git (branching, merging, history), but the interface and features are built specifically for prose, legal text, and academic writing.",
  },
  {
    question: "When can I start using Paperflow?",
    answer:
      "Paperflow is currently in active development. We are opening access in waves to ensure stability. Join the waitlist to secure your spot for the first public release.",
  },
];

export default function Home() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section
        id="hero"
        className="pt-32 pb-24 lg:pt-40 lg:pb-32 border-b border-border relative overflow-hidden"
      >
        <MaxWidth>
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary border border-primary px-3 py-1 rounded-lg relative noise">
                Waitlist open
              </span>
            </motion.div>

            <motion.h1
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Write with <br className="hidden lg:sm" />
              <strong className="text-muted-foreground font-bold">
                total control
              </strong>{" "}
              over your work
            </motion.h1>

            <motion.p
              className="mt-12 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A professional writing tool for people who need to explore ideas
              without losing their original draft.
            </motion.p>

            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WaitlistForm />
            </motion.div>
          </div>
        </MaxWidth>
      </section>

      <section
        id="how-it-works"
        className="py-24 lg:py-32 border-b border-border relative"
      >
        <MaxWidth>
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              How it works
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Test new ideas,{" "}
              <span className="text-muted-foreground">keep what works.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Explore different directions for your document in a safe space. If
              a change works, keep it. If it doesn’t, go back to your original
              draft with one click.
            </p>
          </motion.div>

          <Evolution />
        </MaxWidth>
      </section>

      {/* Section 3: Chat (Review and Comment) */}
      <section
        id="collaboration"
        className="py-24 lg:py-32 border-b border-border bg-background relative overflow-hidden"
      >
        <MaxWidth>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Review />
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Collaborate with clarity
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Get feedback without the friction
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Share your work and get notes exactly where they belong.
                  Discuss changes in context and approve updates with one click.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Add comments directly to any draft.",
                    "Discuss changes in organized threads.",
                    "Fix problems with one click.",
                    "Keep every conversation attached to the right change.",
                  ].map((item) => (
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  The Record
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  Your entire process, perfectly preserved
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Save your progress whenever you reach a milestone. You can go
                  back in time to see how your work evolved or recover something
                  you changed weeks ago.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Go back to any saved version instantly.",
                    "See exactly what was changed and when.",
                    "Bring back deleted text with one click.",
                    "Share specific versions with others easily.",
                  ].map((item) => (
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
              <Archive />
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                The Method
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                A better way to build your work
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Most tools want you to write faster. We want you to write
                better. Paperflow gives you the space to explore ideas, the
                clarity to make decisions, and the confidence to share your best
                work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-background/50 border-y border-border backdrop-blur-sm hidden md:block w-full"
            >
              <Methodology activePhase={activePhase} />
            </motion.div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Draft",
                  description:
                    "Write your thoughts freely. Every version you save is kept in a permanent history.",
                },
                {
                  title: "Explore",
                  description:
                    "Try a new direction. Create a separate path for a new idea without changing your main work.",
                },
                {
                  title: "Compare",
                  description:
                    "Put two versions side-by-side. See exactly what changed line by line to choose the best one.",
                },
                {
                  title: "Combine",
                  description:
                    "Bring the best parts together. Put your favorite ideas into one polished final work.",
                },
              ].map((item, index) => (
                <PaperflowCard
                  key={item.title}
                  index={index}
                  title={item.title}
                  description={item.description}
                  onMouseEnter={() => setActivePhase(index)}
                  onMouseLeave={() => setActivePhase(null)}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  hoverGlow={false}
                />
              ))}
            </div>
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
          <motion.div
            className="max-w-2xl mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              Built for Professionals
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Precision for every project
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Whether you are writing a novel or a legal contract, Paperflow
              gives you the tools to manage complex documents with confidence.
            </p>
          </motion.div>

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
          <motion.div
            className="max-w-2xl mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              Our Principles
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Your work belongs to you
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Paperflow is built to protect your process, not to exploit it. We
              believe in privacy, ownership, and the human act of writing.
            </p>
          </motion.div>

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Clarifications
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Common Questions
                </h2>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Everything you need to know about the professional standard
                  for the modern editor.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index: number) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                  </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50">
                Early Access
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
                Ready to take control of your work?
              </h2>
              <p className="mt-6 text-lg text-background/70 leading-relaxed max-w-xl mx-auto">
                Paperflow is currently in active development. Join the waitlist
                to be notified when early access opens.
              </p>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <WaitlistForm variant="dark" />
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-background/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Early access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Shape the roadmap</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Reserved spot</span>
              </div>
            </motion.div>
          </div>
        </MaxWidth>
      </section>
    </main>
  );
}
