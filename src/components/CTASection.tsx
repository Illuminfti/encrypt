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
      className="relative py-32 lg:py-44 text-center overflow-hidden"
    >
      {/* Multi-layered gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-ultraviolet/[0.08] blur-[200px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cipher-mint/[0.04] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-prism-cyan/[0.04] blur-[120px]" />
      </div>

      {/* Animated grid pattern behind text */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      {/* Top gradient line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(122,92,255,0.3), rgba(28,242,199,0.2), transparent)",
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
        {/* Animated lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 flex justify-center"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-ultraviolet/30"
            />
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full border border-cipher-mint/20"
            />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ultraviolet">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </motion.div>

        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-3xl mx-auto leading-[1.1]">
          <LetterReveal className="text-gradient-uv" delay={0} staggerSpeed={0.02}>
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
