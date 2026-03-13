"use client";

import { motion } from "framer-motion";
import { useCases } from "@/content/home";
import TiltCard from "./TiltCard";

const ease = [0.22, 1, 0.36, 1] as const;

/** Map card index to grid column span */
function colSpan(i: number): string {
  if (i === 0) return "lg:col-span-7";
  if (i === 1) return "lg:col-span-5";
  return "lg:col-span-3";
}

/** Varied accent colors per card */
const accents = [
  "group-hover:border-ultraviolet/20",
  "group-hover:border-cipher-mint/20",
  "group-hover:border-prism-cyan/20",
  "group-hover:border-ultraviolet/20",
  "group-hover:border-cipher-mint/20",
  "group-hover:border-signal-coral/20",
];

const glowColors = [
  "rgba(122,92,255,0.04)",
  "rgba(28,242,199,0.04)",
  "rgba(70,207,255,0.04)",
  "rgba(122,92,255,0.04)",
  "rgba(28,242,199,0.04)",
  "rgba(255,142,114,0.04)",
];

export default function UseCaseGrid() {
  return (
    <section id="use-cases" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-cipher-mint/[0.02] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Section divider */}
        <div
          aria-hidden
          className="mb-16 h-px"
          style={{
            background: "linear-gradient(90deg, rgba(28,242,199,0.2), transparent 60%)",
          }}
        />

        {/* Headline — left aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud leading-[1.1]"
        >
          {useCases.headline}
        </motion.h2>

        {/* Asymmetric mosaic grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {useCases.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease }}
              className={colSpan(i)}
            >
            <TiltCard
              className={`group relative rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 lg:p-8 transition-all duration-500 h-full ${accents[i]}`}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at center, ${glowColors[i]}, transparent 70%)`,
                }}
              />

              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ultraviolet/60 mb-3 font-medium">
                  {card.category}
                </p>
                <h3 className="font-display font-semibold text-base text-cloud mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed">
                  {card.body}
                </p>
                <p className="text-xs text-mist/40 mt-3 italic">
                  {card.example}
                </p>
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
