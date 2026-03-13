"use client";

import { motion } from "framer-motion";
import { useCases } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

const accentColors = [
  { border: "rgba(122,92,255,0.25)", glow: "rgba(122,92,255,0.06)", text: "#7A5CFF" },
  { border: "rgba(28,242,199,0.25)", glow: "rgba(28,242,199,0.06)", text: "#1CF2C7" },
  { border: "rgba(70,207,255,0.25)", glow: "rgba(70,207,255,0.06)", text: "#46CFFF" },
  { border: "rgba(122,92,255,0.25)", glow: "rgba(122,92,255,0.06)", text: "#7A5CFF" },
  { border: "rgba(28,242,199,0.25)", glow: "rgba(28,242,199,0.06)", text: "#1CF2C7" },
  { border: "rgba(255,142,114,0.25)", glow: "rgba(255,142,114,0.06)", text: "#FF8E72" },
];

/* Category icons — unique per card */
const icons: Record<string, React.ReactNode> = {
  Markets: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l4-4 4 4 4-8 6 6" />
      <path d="M21 7v4h-4" strokeLinecap="round" />
    </svg>
  ),
  Credit: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  ),
  Routing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h4c2 0 4 2 4 4v4" />
    </svg>
  ),
  Agents: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a6 6 0 0112 0v2" />
      <path d="M16 4l2 2-2 2" />
    </svg>
  ),
  APIs: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 3v3a2 2 0 01-2 2H3" />
      <path d="M21 8h-3a2 2 0 01-2-2V3" />
      <path d="M3 16h3a2 2 0 012 2v3" />
      <path d="M16 21v-3a2 2 0 012-2h3" />
    </svg>
  ),
  Consumer: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <circle cx="12" cy="18" r="1" />
      <path d="M9 6h6" />
    </svg>
  ),
};

export default function UseCaseGrid() {
  return (
    <section id="use-cases" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-cipher-mint/[0.02] blur-[160px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-ultraviolet/[0.03] blur-[140px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Headline — centered */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-display-md text-cloud leading-[1.1] text-center"
        >
          {useCases.headline}
        </motion.h2>

        {/* Grid — 3 columns, uniform cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.cards.map((card, i) => {
            const accent = accentColors[i];

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease }}
                className="group relative"
              >
                <div
                  className="relative h-full rounded-2xl border border-white/[0.06] bg-abyss/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.15]"
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 inset-x-0 h-px origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
                    style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }}
                  />

                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${accent.glow}, transparent 70%)`,
                    }}
                  />

                  <div className="relative p-7 lg:p-8">
                    {/* Icon + category */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02]"
                        style={{ color: accent.text }}
                      >
                        {icons[card.category]}
                      </div>
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                        style={{ color: accent.text, opacity: 0.7 }}
                      >
                        {card.category}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-lg text-cloud mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-mist leading-relaxed">
                      {card.body}
                    </p>

                    {/* Example tag */}
                    <div className="mt-5 inline-flex items-center gap-2 text-xs text-mist/50 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                      {card.example}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
