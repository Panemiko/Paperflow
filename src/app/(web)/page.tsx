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
import { useState } from "react";

const writerPersonas = [
  {
    title: "The Novelist",
    description:
      "Managing drafts across three years, four endings, and one character who refuses to die.",
    icon: (
      <svg
        className="w-6 h-6"
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
  {
    title: "The Journalist",
    description:
      "Source protection meets version control. Every fact-check documented, every edit traceable.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    ),
  },
  {
    title: "The Essayist",
    description:
      "Ideas that need room to breathe, arguments that demand revision, thoughts worth preserving.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    title: "The Screenwriter",
    description:
      "Scene variations, dialogue rewrites, and the version where the hero actually wins.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504-1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
        />
      </svg>
    ),
  },
  {
    title: "The Researcher",
    description:
      "Literature reviews, evolving hypotheses, and the paper that's been in progress since 2019.",
    icon: (
      <svg
        className="w-6 h-6"
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
    title: "The Poet",
    description:
      "Where line breaks matter. Where every deleted word leaves a ghost. Where revision is ritual.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "I've lost entire chapters to cloud sync failures. With Paperflow, I sync with confidence, knowing I can export my entire history anytime.",
    author: "Marcus Webb",
    role: "Novelist, 3 published books",
  },
  {
    quote:
      "When an editor asks 'what did the original say?', I can show them exactly. Down to the keystroke.",
    author: "Priya Sharma",
    role: "Investigative Journalist",
  },
  {
    quote:
      "My dissertation has 47 branches. Paperflow is the only reason I haven't lost my mind, or my work.",
    author: "Dr. James Okonkwo",
    role: "Philosophy Researcher",
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
    title: "No Generative AI",
    description:
      "We will never write your text for you. Paperflow enhances your process, it doesn't replace it.",
  },
  {
    title: "No Data Hostage",
    description:
      "Your data is yours. Export everything, always. No lock-in, ever.",
  },
];

const faqs = [
  {
    question: "Is Paperflow really 'No-AI'?",
    answer:
      "Yes. We believe that human authorship is becoming a rare and valuable commodity. Paperflow is designed to enhance your own creative process, not to replace it with generated text. We will never integrate LLMs into your writing flow.",
  },
  {
    question: "How do I get my data if I decide to leave?",
    answer:
      "Your data is always yours. You can export your entire project history in open formats like Markdown and standard Git-compatible structures. No proprietary formats, no gatekeeping.",
  },
  {
    question: "Is this just Git for writers?",
    answer:
      "While we use battle-tested version control principles, the interface is built from the ground up for prose. You don't need to know what a 'rebase' is to use Paperflow—but you get all the power of branching and merging dedicated to your narrative.",
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
  const [activePhilosophyIndex, setActivePhilosophyIndex] = useState<
    number | null
  >(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Section 1: Hero */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
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
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground  relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The Professional
              <br />
              Standard for
              <br />
              <strong className="text-muted-foreground font-bold">
                Serious Authors
              </strong>
            </motion.h1>

            <motion.p
              className="mt-12 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The flexible cloud editor for serious writers. Paperflow provides
              the structure to branch your ideas, track their evolution, and
              merge your best thoughts into a unified whole with zero data
              lock-in.
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

      {/* Section 2: Quote */}
      <section className="py-16 lg:py-20 border-y border-border bg-secondary/30">
        <MaxWidth className="max-w-5xl text-center">
          <motion.blockquote
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            "Writing is revision. Revision requires comparison. Comparison
            demands history."
          </motion.blockquote>
        </MaxWidth>
      </section>

      {/* Section 3: The Logic (Split Canvas) */}
      <section id="mechanism" className="py-24 lg:py-32 border-b border-border">
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

      {/* Section 4: Philosophy */}
      <section
        id="philosophy"
        className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
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
              className="mt-16 bg-background/50 border-y border-border backdrop-blur-sm"
            >
              <PhilosophyVisual activeIndex={activePhilosophyIndex} />
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
                  onMouseEnter={() => setActivePhilosophyIndex(index)}
                  onMouseLeave={() => setActivePhilosophyIndex(null)}
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

      {/* Section 4.5: Review and Comment */}
      <section className="py-24 lg:py-32 border-b border-border bg-background">
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
                  Feedback Loop
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
                    "Resolve feedback with a single click", // Fixed typo "feeback"
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

      {/* Section 5: Your Archive */}
      <section className="py-24 lg:py-32 border-y border-border">
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

      {/* Section 6: Our Stance (No-AI) */}
      <section
        id="ethics"
        className="py-24 lg:py-32 bg-foreground text-background"
      >
        <MaxWidth>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50">
                  Ethics
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-background text-balance">
                  Your Voice. <br />
                  Verified.
                </h2>
                <p className="mt-6 text-lg text-background/70 leading-relaxed">
                  In an age where anyone can generate ten thousand words in
                  seconds, human authorship becomes rare. Valuable. Worth
                  protecting.
                </p>
                <p className="mt-4 text-lg text-background/70 leading-relaxed">
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
              <div className="border-2 border-background/20 p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-primary flex items-center justify-center">
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
                    <h3 className="font-serif text-xl font-semibold text-background">
                      Human-Only Authorship
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      Cryptographically Verified
                    </p>
                  </div>
                </div>
                <ul className="space-y-4 text-background/70">
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
                      No generative writing features. We never write your text
                      for you.
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

      {/* Section 7: Principles */}
      <section className="py-24 lg:py-32 border-b border-border">
        <MaxWidth>
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Principles
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              What We Refuse to Build
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
                className="p-6 border border-border hover:border-foreground transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 border border-foreground flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-foreground"
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

      {/* Section 8: Who Writes With Paperflow */}
      <section className="py-24 lg:py-32">
        <MaxWidth>
          <motion.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Audience
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Built for Serious Writers
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Whether you're crafting your first novel or your fiftieth article,
              Paperflow gives you the infrastructure your words deserve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writerPersonas.map((persona, index) => (
              <motion.div
                key={persona.title}
                className="group p-6 border border-border hover:border-primary transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 border border-border group-hover:border-primary group-hover:bg-primary flex items-center justify-center mb-4 transition-all duration-300 text-muted-foreground group-hover:text-primary-foreground relative noise">
                  {persona.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {persona.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {persona.description}
                </p>
              </motion.div>
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-24 lg:py-32 border-t border-border">
        <MaxWidth>
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Writers Speak
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-bold text-foreground">
              Early Voices
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="p-6 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <blockquote className="font-serif text-lg text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                    <span className="font-serif text-sm font-bold text-foreground">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* Section 11: FAQ */}
      <section id="faq" className="py-24 lg:py-32 border-t border-border">
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
                  for authors.
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

      {/* Section 12: Final Call */}
      <section
        id="waitlist"
        className="py-24 lg:py-32 bg-foreground text-background"
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
                Ready to elevate your prose?
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
