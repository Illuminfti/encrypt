"use client";

import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex items-center">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #91A2C7 1px, transparent 1px), linear-gradient(to bottom, #91A2C7 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial gradient orbs */}
        <div className="absolute -top-[300px] -left-[200px] w-[800px] h-[800px] rounded-full bg-ultraviolet/10 blur-[160px]" />
        <div className="absolute -bottom-[200px] right-[10%] w-[600px] h-[600px] rounded-full bg-prism-cyan/8 blur-[140px]" />
        <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] rounded-full bg-cipher-mint/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.2em] text-cipher-mint font-medium"
            >
              From dWallet Labs
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-tight"
            >
              <span className="bg-gradient-to-r from-ultraviolet to-prism-cyan bg-clip-text text-transparent">
                The confidential execution network for Solana
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-mist max-w-xl leading-relaxed"
            >
              Compute on encrypted data. Keep strategies, user data, and API
              actions private.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mt-2"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-ultraviolet text-white font-medium text-sm hover:bg-ultraviolet/90 transition-colors shadow-lg shadow-ultraviolet/25"
              >
                Build with Encrypt
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/10 text-cloud font-medium text-sm hover:border-white/20 hover:bg-white/[0.03] transition-colors"
              >
                Read RE-FHE
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm text-mist/70 mt-2"
            >
              Public settlement. Encrypted logic.
            </motion.p>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
