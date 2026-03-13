"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { researchPage } from "@/content/pages";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease, delay },
  };
}

function animateUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fadeUp(index * 0.06)} className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-display font-medium text-base text-cloud pr-4">
          {question}
        </span>
        <span className="text-mist shrink-0 text-lg leading-none select-none">
          {open ? "\u2212" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-mist leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            {...animateUp(0)}
            className="text-sm font-medium text-cipher-mint tracking-wide uppercase mb-4 block"
          >
            {researchPage.eyebrow}
          </motion.span>

          <motion.h1
            {...animateUp(0.1)}
            className="font-display font-bold text-4xl md:text-5xl text-cloud max-w-3xl"
          >
            {researchPage.headline}
          </motion.h1>

          <motion.p
            {...animateUp(0.2)}
            className="text-lg text-mist mt-4 max-w-xl"
          >
            {researchPage.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Research sections */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {researchPage.sections.map((section, i) => (
            <motion.div key={section.title} {...fadeUp(i * 0.1)} className="max-w-2xl">
              <h2 className="font-display font-semibold text-2xl text-cloud mb-4">
                {section.title}
              </h2>
              <p className="text-base text-mist leading-relaxed">
                {section.body}
              </p>
              <div className="mt-8 h-px bg-gradient-to-r from-ultraviolet/30 via-cipher-mint/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="text-xs text-signal-coral bg-signal-coral/10 px-2 py-1 rounded inline">
              {researchPage.benchmarks.label}
            </span>
            <h2 className="font-display font-semibold text-2xl text-cloud mt-4 mb-4">
              Benchmarks
            </h2>
            <p className="text-base text-mist max-w-2xl">
              {researchPage.benchmarks.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security model */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUp(0)}
            className="font-display font-semibold text-2xl text-cloud mb-6"
          >
            {researchPage.securityModel.title}
          </motion.h2>

          <ul className="space-y-4 max-w-2xl">
            {researchPage.securityModel.points.map((point, i) => (
              <motion.li
                key={i}
                {...fadeUp(i * 0.06)}
                className="flex gap-3 items-start"
              >
                <span className="mt-2 block w-4 h-px bg-cipher-mint shrink-0" />
                <span className="text-sm text-mist">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUp(0)}
            className="font-display font-semibold text-2xl text-cloud mb-8"
          >
            Frequently asked questions
          </motion.h2>

          <div className="max-w-2xl">
            {researchPage.faq.map((item, i) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
