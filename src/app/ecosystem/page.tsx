"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const categories = [
  { label: "DeFi", gradient: "from-ultraviolet/20 to-prism-cyan/20" },
  { label: "Infrastructure", gradient: "from-cipher-mint/20 to-ultraviolet/20" },
  { label: "Gaming", gradient: "from-signal-coral/20 to-ultraviolet/20" },
  { label: "Identity", gradient: "from-prism-cyan/20 to-cipher-mint/20" },
  { label: "Enterprise", gradient: "from-ultraviolet/20 to-signal-coral/20" },
  { label: "Research", gradient: "from-cipher-mint/20 to-prism-cyan/20" },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-prism-cyan/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={18} className="text-prism-cyan" />
            <span className="text-sm font-medium text-prism-cyan tracking-wide uppercase">
              Ecosystem
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cloud leading-tight max-w-3xl"
          >
            Ecosystem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-mist max-w-2xl leading-relaxed"
          >
            Projects and partners building on Encrypt
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className="group relative rounded-2xl p-[1px] overflow-hidden"
              >
                {/* Gradient border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.gradient} opacity-40 group-hover:opacity-70 transition-opacity`}
                />

                {/* Card inner */}
                <div className="relative rounded-2xl bg-abyss/90 p-8 h-full flex flex-col items-center justify-center text-center min-h-[220px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1 text-xs font-medium text-mist mb-5">
                    {cat.label}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-cloud/60 mb-2">
                    Ecosystem slot
                  </h3>
                  <p className="text-sm text-mist/50">Coming soon</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aspirational / Join */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-ultraviolet/20 bg-gradient-to-br from-ultraviolet/[0.06] to-transparent p-10 sm:p-16 text-center overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-ultraviolet/10 blur-[100px] pointer-events-none" />

            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-5">
                Join the ecosystem
              </h2>
              <p className="text-mist max-w-xl mx-auto leading-relaxed mb-10">
                Encrypt enables an entirely new class of applications on Solana -- from confidential DeFi to private identity systems, sealed-bid auctions, and encrypted data marketplaces. If you are building something that needs confidential execution, we want to hear from you.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-ultraviolet px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ultraviolet/85 hover:shadow-[0_0_24px_rgba(122,92,255,0.3)]"
              >
                Apply to join
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
