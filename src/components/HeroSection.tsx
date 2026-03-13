"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { hero } from "@/content/home";
import SpinningBorderButton from "./SpinningBorderButton";

const NetworkVisualization = lazy(
  () => import("./3d/NetworkVisualization")
);

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── 3D Background ─────────────────────────────────── */}
      {mounted && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0 opacity-70">
            <NetworkVisualization />
          </div>
        </Suspense>
      )}

      {/* ── Gradient overlays for text readability ─────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* Center radial darken for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,8,22,0.7) 0%, rgba(5,8,22,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-void via-void/80 to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-void/50 to-transparent" />
      </div>

      {/* ── Content — Centered, cinematic ─────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 text-center py-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-cipher-mint mb-8 font-medium"
        >
          {hero.eyebrow}
        </motion.p>

        {/* H1 — Large, centered, balanced */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-cloud leading-[1.08] tracking-tight mx-auto max-w-4xl text-balance"
        >
          The{" "}
          <span className="text-gradient-uv">confidential execution</span>
          {" "}network for Solana
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="text-lg lg:text-xl text-mist/80 mt-6 max-w-xl mx-auto leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.0 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 1.3 }}
          className="text-sm text-mist/50 mt-10"
        >
          {hero.microLine}
        </motion.p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-mist/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-ultraviolet/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
