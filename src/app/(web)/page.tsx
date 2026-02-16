"use client";

import { CommentVisual } from "@/components/animations/comment-visual";
import { CommitHistory } from "@/components/animations/commit-history";
import { LiveEditor } from "@/components/animations/live-editor";
import { PhilosophyVisual } from "@/components/animations/philosophy-visual";
import { MaxWidth } from "@/components/max-width";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";

const writerPersonas = [
  {
    title: "The Academic",
    description:
      "Literature reviews, evolving hypotheses, and the precision required for rigorous scholarly publication.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "The Lawyer",
    description:
      "Privileged drafts, clause-by-clause history, and the precision that wins cases before they reach court.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.303.485 2.713.75 4.185.75m-8.37 0c0-6.21 5.04-11.25 11.25-11.25m-11.25 0a11.25 11.25 0 0111.25-11.25"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.5h18m-18-4.5h18"
        />
      </svg>
    ),
  },
  {
    title: "The Executive",
    description:
      "Strategic plans, board reports, and quarterly narratives where every word choice has market impact.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m-1.5 3h1.5m4.5-9H15m0 3H15m0 3H15m0 3H15"
        />
      </svg>
    ),
  },

  {
    title: "The Technical Lead",
    description:
      "Specifications and technical documentation where the architecture of the writing reflects the code.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0a5.999 5.999 0 01-5.999 5.999M19.5 12a5.999 5.999 0 00-5.999-5.999m0 11.998a5.999 5.999 0 01-5.999-5.999m5.999-5.999a5.999 5.999 0 00-5.999 5.999"
        />
      </svg>
    ),
  },

  {
    title: "The Policy Analyst",
    description:
      "Evolving legislation, complex white papers, and the detailed history of every policy transition.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>
    ),
  },
  {
    title: "The Novelist",
    description:
      "Managing complex drafts across years, alternate endings, and characters that evolve with the story.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
];

const antiFeatures = [
  {
    title: "No Vendor Lock-in",
    description:
      "Your work is yours. Sync to the cloud for accessibility, but export your entire history in open formats whenever you want.",
  },
  {
    title: "No Surveillance",
    description:
      "We don't read your work. We don't train on your work. We don't even know what you're writing.",
  },
  {
    title: "Opt-in Intelligence",
    description:
      "AI will never access your content unless you ask. And if used, every AI contribution is clearly marked.",
  },
  {
    title: "No Data Hostage",
    description:
      "Your data is yours. Export everything, always. No lock-in, ever.",
  },
];

const faqs = [
  {
    question: "Is Paperflow 'No-AI'?",
    answer:
      "AI is entirely optional. It never accesses your work without permission. If used, AI text is always visually distinct from your own.",
  },
  {
    question: "How do I get my data if I decide to leave?",
    answer:
      "Your data is always yours. You can export your entire project history in open formats like Markdown and standard Git-compatible structures. No proprietary formats, no gatekeeping.",
  },
  {
    question: "Is this just Git for writers?",
    answer:
      "While we use the same principles found in professional development tools, our editor is built from the ground up for writing. You don't need to know what a 'rebase' is to use Paperflow—but you get all the power of branching and merging dedicated to your narrative.",
  },
  {
    question: "Is my work private and secure?",
    answer:
      "Absolutely. We use end-to-end AES-256 encryption. We don't read your manuscripts, we don't sell your data, and we don't use it to train any models. Your thoughts are yours alone.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "Paperflow is built as a cloud-native web application that works beautifully on desktop and tablet browsers. We are currently developing dedicated native apps for macOS and iPadOS for offline-first writing.",
  },
  {
    question: "How does the 'verified authorship' work?",
    answer:
      "We track the entropy of your keystrokes and session patterns to create a unique behavioral signature. This is then cryptographically verified and stored alongside your version history, allowing you to prove that the work was created by a human in real-time.",
  },
  {
    question: "Is there a limit to how many branches I can create?",
    answer:
      "No. Branch as much as you need. Whether you're exploring three different endings or fifty minor plot variations, Paperflow is built to handle complex narrative structures without slowing down.",
  },
  {
    question: "Can I work offline?",
    answer:
      "Yes. Our upcoming native desktop applications are built with an offline-first architecture. Your work is saved locally and synced automatically once you're back online, with built-in conflict resolution to ensure no data loss.",
  },
  {
    question: "Does Paperflow support Markdown?",
    answer:
      "Yes. Every manuscript is stored as a collection of Markdown files. You can export your work at any time and it will be perfectly readable by any text editor.",
  },
  {
    question: "Who is Paperflow for?",
    answer:
      "Serious authors who value their craft, their data, and their legacy. If you're tired of being treated as a data point for AI training and want a tool that respects the sanctity of the writing process, Paperflow is for you.",
  },
];

export default function Home() {
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
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Writing built for
              <br />
              <strong className="text-muted-foreground font-bold">
                speed and control
              </strong>
            </motion.h1>

            <motion.p
              className="mt-12 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Multi-branch drafting, surgical history, private by design,
              <br /> and more — in any environment.
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

      {/* Section 2: The Mechanism (Live Editor) */}
      <section
        id="mechanism"
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
              The Mechanism
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Write Fearlessly.{" "}
              <span className="text-muted-foreground">Revert Instantly.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every branch is a safe space to explore. Every merge is a
              conscious decision. Delete that chapter. You can always bring it
              back.
            </p>
          </motion.div>

          <LiveEditor />
        </MaxWidth>
      </section>

      {/* Section 3: Chat (Review and Comment) */}
      <section
        id="chat"
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
              <CommentVisual />
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Chat
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  Review Without Resistance
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Leave comments on specific versions. Discuss changes in
                  context. Resolve threads as you merge branches.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Inline commenting on any draft",
                    "Threaded discussions for deep dives",
                    "Resolve feedback with a single click",
                    "Keep the conversation attached to the code",
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
                  The Result
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  Every Edit, Forever
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Your commit history isn't just a backup. It's a chronicle of
                  your creative evolution. Scholars study writers' drafts for
                  insight. Paperflow makes that possible for everyone.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Time-travel to any version instantly",
                    "See exactly what you changed and when",
                    "Restore deleted passages with a click",
                    "Share your creative process with readers",
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
              <CommitHistory />
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Philosophy
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                Every Draft Is a Decision
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Writing is revision. Revision requires comparison. Comparison
                demands history. Paperflow makes your creative process visible
                to yourself, and to anyone you choose to show.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-background/50 border-y border-border backdrop-blur-sm hidden md:block"
            >
              <PhilosophyVisual />
            </motion.div>

            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                {
                  title: "Diverge",
                  description:
                    "What if the detective was the killer? What if chapter three came first? Branch and find out.",
                },
                {
                  title: "Compare",
                  description:
                    "See the version from Tuesday beside the version from today. Word by word, line by line.",
                },
                {
                  title: "Merge",
                  description:
                    "Take the ending from branch A, the middle from branch B. Your manuscript, your rules.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="text-left p-6 border border-border bg-background hover:border-primary transition-colors cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-primary flex items-center justify-center mb-4 relative noise">
                    <span className="font-mono text-xs text-primary-foreground font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
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
            className="max-w-2xl mb-10 pl-6 border-l-2 border-primary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              Public
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Built for Professional Writing
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Whether you're crafting your first novel or your fiftieth policy
              white paper, Paperflow gives you the infrastructure your words
              deserve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writerPersonas.map((persona, index) => (
              <motion.div
                key={persona.title}
                className="group p-5 border border-border hover:border-primary transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="w-10 h-10 border border-border group-hover:border-primary group-hover:bg-primary flex items-center justify-center mb-4 transition-all duration-300 text-primary group-hover:text-primary-foreground relative noise">
                  {persona.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5 leading-tight">
                  {persona.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {persona.description}
                </p>
              </motion.div>
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
            className="max-w-2xl mx-auto text-center mb-16 pt-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
              What We Refuse to Build
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Principles of Absence
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Some features are absent by design. These are promises, not
              limitations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {antiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 border border-border hover:border-primary transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                    <svg
                      className="w-3 h-3 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* Section 8: Your Voice Verified (Ethics) */}
      <section
        id="ethics"
        className="py-24 lg:py-32 relative border-b border-border bg-primary/2 overflow-hidden"
      >
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <MaxWidth>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                className="pl-6 border-l-2 border-primary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                  Your Voice Verified
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground text-balance">
                  Your Voice. <br />
                  Verified.
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  In an age where anyone can generate ten thousand words in
                  seconds, human authorship becomes rare. Valuable. Worth
                  protecting.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Paperflow doesn't just store your words. It certifies them as
                  yours.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="border border-border p-8 lg:p-10 bg-background/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border border-primary flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Human-Only Authorship
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      Cryptographically Verified
                    </p>
                  </div>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">+</span>
                    <span>Every keystroke attributed to a human author</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">+</span>
                    <span>
                      Timestamped commits create unforgeable provenance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">+</span>
                    <span>
                      AI is optional. If used, its contributions are clearly
                      marked.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">+</span>
                    <span>
                      Exportable proof of authorship for publishers and courts
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
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
                    transition={{ delay: index * 0.05 }}
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
                Final Draft
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
                Ready to elevate your writing?
              </h2>
              <p className="mt-6 text-lg text-background/70 leading-relaxed max-w-xl mx-auto">
                Join our waitlist for early access. We invite founding authors
                in waves to ensure the best experience for everyone.
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
