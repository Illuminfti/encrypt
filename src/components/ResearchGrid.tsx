"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { researchCards } from "@/content/home";
import type { ResearchCard, ResearchCardStatus } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

const statusStyles: Record<ResearchCardStatus, string> = {
  Paper: "text-cipher-mint bg-cipher-mint/10 border border-cipher-mint/20",
  Research: "text-ultraviolet bg-ultraviolet/10 border border-ultraviolet/20",
  "Coming soon": "text-signal-coral bg-signal-coral/10 border border-signal-coral/20",
  "Technical note": "text-prism-cyan bg-prism-cyan/10 border border-prism-cyan/20",
  Docs: "text-mist bg-white/5 border border-white/10",
};

const hoverBorders: Record<ResearchCardStatus, string> = {
  Paper: "hover:border-cipher-mint/20",
  Research: "hover:border-ultraviolet/20",
  "Coming soon": "hover:border-signal-coral/20",
  "Technical note": "hover:border-prism-cyan/20",
  Docs: "hover:border-white/15",
};

function CardInner({ card }: { card: ResearchCard }) {
  return (
    <>
      <span
        className={`inline-block text-[10px] uppercase tracking-wider mb-4 px-2.5 py-1 rounded-md ${statusStyles[card.status]}`}
      >
        {card.status}
      </span>
      <h3 className="font-display font-semibold text-lg text-cloud mb-2">
        {card.title}
      </h3>
      <p className="text-sm text-mist leading-relaxed">{card.description}</p>
      {card.note && (
        <p className="text-xs text-mist/50 mt-3 italic">{card.note}</p>
      )}
      {card.href && (
        <span className="inline-flex items-center gap-1.5 text-xs text-ultraviolet/70 group-hover:text-ultraviolet mt-4 transition-colors">
          Learn more
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </span>
      )}
    </>
  );
}

export default function ResearchGrid() {
  return (
    <section id="research" className="relative py-24 lg:py-36">
      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Section divider */}
        <div
          aria-hidden
          className="mb-16 h-px"
          style={{
            background: "linear-gradient(90deg, rgba(70,207,255,0.2), transparent 60%)",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud text-left leading-[1.1]"
        >
          Research &amp; proof
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {researchCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.08 }}
              className={
                i >= 3
                  ? "md:col-span-1 lg:col-span-1"
                  : undefined
              }
            >
              {card.href ? (
                <Link
                  href={card.href}
                  className={`group block rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 transition-all duration-500 h-full ${hoverBorders[card.status]}`}
                >
                  <CardInner card={card} />
                </Link>
              ) : (
                <div className={`group rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 transition-all duration-500 h-full ${hoverBorders[card.status]}`}>
                  <CardInner card={card} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
