"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { hero } from "@/content/home";
import HeroVisual from "./HeroVisual";
import LetterReveal from "./LetterReveal";
import SpinningBorderButton from "./SpinningBorderButton";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background layers ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #91A2C7 1px, transparent 1px), linear-gradient(to bottom, #91A2C7 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gradient mesh — multi-orb depth */}
        <div className="absolute -top-[200px] -right-[200px] w-[900px] h-[900px] rounded-full bg-ultraviolet/[0.08] blur-[200px]" />
        <div className="absolute top-[60%] -left-[300px] w-[700px] h-[700px] rounded-full bg-cipher-mint/[0.04] blur-[180px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-prism-cyan/[0.03] blur-[160px]" />
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left column ──────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-xs uppercase tracking-[0.2em] text-cipher-mint mb-6 font-medium"
            >
              {hero.eyebrow}
            </motion.p>

            {/* H1 — letter reveal + gradient */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cloud leading-[1.05] tracking-tight">
              <LetterReveal delay={0.15} staggerSpeed={0.025}>
                The
              </LetterReveal>{" "}
              <LetterReveal
                className="text-gradient-uv"
                delay={0.25}
                staggerSpeed={0.025}
              >
                confidential execution
              </LetterReveal>{" "}
              <LetterReveal delay={0.8} staggerSpeed={0.025}>
                network for Solana
              </LetterReveal>
            </h1>

            {/* Subhead */}
            <motion.p
              {...fadeUp(0.5)}
              className="text-lg lg:text-xl text-mist mt-6 max-w-[520px] leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap items-center gap-4">
              <SpinningBorderButton href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
              </SpinningBorderButton>
              <Link
                href={hero.secondaryCTA.href}
                className="group inline-flex items-center gap-2 border border-white/10 text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:border-white/25 hover:bg-white/[0.04] transition-all"
              >
                {hero.secondaryCTA.label}
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

            {/* Micro-line */}
            <motion.p
              {...fadeUp(0.7)}
              className="text-sm text-mist/60 mt-8"
            >
              {hero.microLine}
            </motion.p>

            {/* Caption */}
            <motion.p
              {...fadeUp(0.75)}
              className="text-xs text-mist/40 mt-2"
            >
              {hero.caption}
            </motion.p>
          </div>

          {/* ── Right column ─────────────────────────────── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
          >
            {/* Premium chassis panel */}
            <div className="rounded-3xl border border-white/[0.08] bg-abyss/40 p-1.5 shadow-[0_20px_80px_rgba(0,0,0,0.4),0_0_60px_rgba(122,92,255,0.08)]">
              <div className="rounded-[20px] overflow-hidden relative">
                {/* Soft ultraviolet orb behind */}
                <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(122,92,255,0.15)_0%,transparent_70%)] pointer-events-none" />
                <HeroVisual />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
