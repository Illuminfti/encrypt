"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { finalCTA } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-24 lg:py-36 text-center bg-gradient-to-b from-void via-ultraviolet/[0.04] to-void"
    >
      {/* Top gradient line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(122,92,255,0.2), transparent)",
        }}
      />

      {/* Bottom gradient line */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(122,92,255,0.2), transparent)",
        }}
      />

      {/* Subtle glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-ultraviolet/[0.06] blur-[140px]"
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud max-w-2xl mx-auto"
        >
          {finalCTA.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="text-lg text-mist mt-6 max-w-lg mx-auto"
        >
          {finalCTA.body}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16, ease }}
          className="mt-10 flex gap-4 justify-center"
        >
          <Link
            href={finalCTA.primaryCTA.href}
            className="bg-ultraviolet text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:shadow-[0_8px_30px_rgba(122,92,255,0.4)] transition-all"
          >
            {finalCTA.primaryCTA.label}
          </Link>
          <Link
            href={finalCTA.secondaryCTA.href}
            className="border border-ultraviolet/40 text-cloud px-6 py-3 rounded-xl font-display font-semibold text-sm hover:bg-ultraviolet/10 transition-all"
          >
            {finalCTA.secondaryCTA.label}
          </Link>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="text-xs text-mist/40 mt-8"
        >
          {finalCTA.footnote}
        </motion.p>
      </div>
    </section>
  );
}
