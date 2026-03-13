"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { finalCTA } from "@/content/home";
import SpinningBorderButton from "./SpinningBorderButton";
import LetterReveal from "./LetterReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-28 lg:py-40 text-center overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-ultraviolet/[0.06] blur-[180px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cipher-mint/[0.03] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-prism-cyan/[0.03] blur-[120px]" />
      </div>

      {/* Top gradient line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(122,92,255,0.25), transparent)",
        }}
      />

      {/* Bottom gradient line */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(122,92,255,0.25), transparent)",
        }}
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-cloud max-w-3xl mx-auto leading-[1.1]">
          <LetterReveal delay={0} staggerSpeed={0.02}>
            {finalCTA.headline}
          </LetterReveal>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-lg lg:text-xl text-mist mt-6 max-w-lg mx-auto leading-relaxed"
        >
          {finalCTA.body}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <SpinningBorderButton href={finalCTA.primaryCTA.href}>
            {finalCTA.primaryCTA.label}
          </SpinningBorderButton>
          <Link
            href={finalCTA.secondaryCTA.href}
            className="group inline-flex items-center gap-2 border border-white/10 text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:border-white/25 hover:bg-white/[0.04] transition-all"
          >
            {finalCTA.secondaryCTA.label}
            <svg
              className="w-4 h-4 text-mist group-hover:text-cloud group-hover:translate-x-0.5 transition-all"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="text-xs text-mist/40 mt-10"
        >
          {finalCTA.footnote}
        </motion.p>
      </div>
    </section>
  );
}
