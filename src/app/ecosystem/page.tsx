"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ecosystemPage } from "@/content/pages";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
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

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(122,92,255,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(28,242,199,0.06),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            {...animateUp(0)}
            className="text-sm font-medium text-cipher-mint tracking-[0.2em] uppercase mb-4 block"
          >
            {ecosystemPage.eyebrow}
          </motion.span>

          <motion.h1
            {...animateUp(0.1)}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-cloud max-w-3xl"
          >
            {ecosystemPage.headline}
          </motion.h1>

          <motion.p
            {...animateUp(0.2)}
            className="text-lg text-mist mt-4 max-w-xl"
          >
            {ecosystemPage.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ecosystemPage.categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                {...fadeUp(i * 0.08)}
                className="group relative rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 transition-colors hover:border-ultraviolet/15"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(28,242,199,0.04),transparent_70%)]" />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-wider text-cipher-mint/60 bg-cipher-mint/5 px-2 py-1 rounded mb-4 inline-block">
                    {cat.status}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-cloud mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed mb-3">
                    {cat.body}
                  </p>
                  <p className="text-xs text-mist/50 italic">{cat.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing panel */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="rounded-3xl bg-abyss/40 border border-white/[0.06] p-10 max-w-2xl"
          >
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-cloud mb-4">
              {ecosystemPage.closingPanel.headline}
            </h2>
            <p className="text-base text-mist">
              {ecosystemPage.closingPanel.body}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
