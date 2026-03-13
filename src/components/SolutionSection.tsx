"use client";

import { motion } from "framer-motion";
import { solution } from "@/content/home";
import TiltCard from "./TiltCard";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Mini SVG motifs (NOT lucide) ─────────────────────── */

function ArrowInputMotif() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <polyline points="14,8 18,12 14,16" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />
      <line x1="20" y1="6" x2="20" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function LayeredSquaresMotif() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <rect x="7" y="7" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
      <rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.55" fill="none" />
    </svg>
  );
}

function CircuitMotif() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <circle cx="12" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="12" y1="7.5" x2="12" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    </svg>
  );
}

function OpenBracketMotif() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 4 L4 4 L4 20 L8 20" stroke="currentColor" strokeWidth="1" opacity="0.45" fill="none" />
      <line x1="8" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <polyline points="15,9 18,12 15,15" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
    </svg>
  );
}

const motifs = [ArrowInputMotif, LayeredSquaresMotif, CircuitMotif, OpenBracketMotif];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-ultraviolet/[0.03] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Section divider line */}
        <div
          aria-hidden
          className="mb-16 h-px"
          style={{
            background: "linear-gradient(90deg, rgba(122,92,255,0.2), transparent 60%)",
          }}
        />

        {/* Header — left aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud leading-[1.1]"
        >
          {solution.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="text-lg text-mist mt-4 max-w-xl leading-relaxed"
        >
          {solution.body}
        </motion.p>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {solution.cards.map((card, i) => {
            const Motif = motifs[i];
            return (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.1, ease }}
              >
              <TiltCard
                className="group relative rounded-3xl bg-abyss/40 border border-white/[0.06] p-8 lg:p-10 hover:border-ultraviolet/20 transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(122,92,255,0.04),transparent_70%)]" />

                {/* Step number + SVG row */}
                <div className="relative flex items-center gap-3 mb-5">
                  <span className="text-xs font-display text-ultraviolet/60 font-medium">
                    {card.step}
                  </span>
                  <div className="text-ultraviolet/60">
                    <Motif />
                  </div>
                </div>

                <h3 className="font-display font-semibold text-lg text-cloud mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed">
                  {card.body}
                </p>
              </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-sm text-mist/60 mt-8 max-w-lg"
        >
          {solution.footnote}
        </motion.p>
      </div>
    </section>
  );
}
