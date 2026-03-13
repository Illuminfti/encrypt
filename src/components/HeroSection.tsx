"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { hero } from "@/content/home";
import HeroVisual from "./HeroVisual";

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
      {/* ── Background decorations ─────────────────────────── */}
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
        {/* Radial orb top-right */}
        <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] rounded-full bg-ultraviolet/10 blur-[160px]" />
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left column ──────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-xs uppercase tracking-widest text-cipher-mint mb-4"
            >
              {hero.eyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-cloud leading-[1.1] tracking-tight"
            >
              The{" "}
              <span className="text-gradient-uv">confidential execution</span>{" "}
              network for Solana
            </motion.h1>

            {/* Subhead */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-lg text-mist mt-6 max-w-[480px]"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} className="mt-8 flex gap-4">
              <Link
                href={hero.primaryCTA.href}
                className="bg-ultraviolet text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:shadow-[0_8px_30px_rgba(122,92,255,0.4)] transition-all"
              >
                {hero.primaryCTA.label}
              </Link>
              <Link
                href={hero.secondaryCTA.href}
                className="border border-ultraviolet/40 text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:bg-ultraviolet/10 transition-all"
              >
                {hero.secondaryCTA.label}
              </Link>
            </motion.div>

            {/* Micro-line */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-sm text-mist/70 mt-6"
            >
              {hero.microLine}
            </motion.p>

            {/* Caption */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-xs text-mist/50 mt-2"
            >
              {hero.caption}
            </motion.p>
          </div>

          {/* ── Right column ─────────────────────────────── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            {/* Premium chassis panel */}
            <div className="rounded-3xl border border-white/[0.08] bg-abyss/40 p-1 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="rounded-[20px] overflow-hidden relative">
                {/* Soft ultraviolet orb behind */}
                <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(122,92,255,0.12)_0%,transparent_70%)] pointer-events-none" />
                <HeroVisual />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
