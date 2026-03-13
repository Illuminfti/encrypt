"use client";

import { motion } from "framer-motion";
import { problem } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Mini SVG motifs (NOT lucide) ─────────────────────── */

function EyeMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="3" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
    </svg>
  );
}

function GridMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={7 + col * 5}
            cy={7 + row * 5}
            r="1.2"
            fill="currentColor"
            opacity="0.4"
          />
        ))
      )}
    </svg>
  );
}

function WaveMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M6 14 Q10 8 14 14 Q18 20 22 14" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M6 10 Q10 4 14 10 Q18 16 22 10" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
      <path d="M6 18 Q10 12 14 18 Q18 24 22 18" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
    </svg>
  );
}

const motifs = [EyeMotif, GridMotif, WaveMotif];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Subtle section bg gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-signal-coral/[0.03] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Header — left aligned */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-xs uppercase tracking-[0.2em] text-signal-coral mb-4 font-medium"
        >
          {problem.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud max-w-lg leading-[1.1]"
        >
          {problem.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16, ease }}
          className="text-lg text-mist mt-4 max-w-lg leading-relaxed"
        >
          {problem.body}
        </motion.p>

        {/* Cards — asymmetric 12-col grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {problem.cards.map((card, i) => {
            const Motif = motifs[i];
            const span =
              i === 0
                ? "lg:col-span-5 lg:row-span-2"
                : "lg:col-span-7";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className={`group relative rounded-3xl bg-abyss/60 border border-white/[0.06] p-8 lg:p-10 hover:border-signal-coral/20 transition-all duration-500 ${span}`}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,rgba(255,142,114,0.04),transparent_70%)]" />

                {/* Mini SVG in top-right */}
                <div className="relative text-signal-coral mb-6">
                  <Motif />
                </div>

                <h3 className="font-display font-semibold text-lg text-cloud mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed max-w-[360px]">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
