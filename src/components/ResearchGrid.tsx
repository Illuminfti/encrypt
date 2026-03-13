"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { researchCards } from "@/content/home";
import type { ResearchCard, ResearchCardStatus } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

const statusConfig: Record<
  ResearchCardStatus,
  { color: string; bg: string; border: string; glow: string }
> = {
  Paper: {
    color: "#1CF2C7",
    bg: "rgba(28,242,199,0.08)",
    border: "rgba(28,242,199,0.2)",
    glow: "rgba(28,242,199,0.05)",
  },
  Research: {
    color: "#7A5CFF",
    bg: "rgba(122,92,255,0.08)",
    border: "rgba(122,92,255,0.2)",
    glow: "rgba(122,92,255,0.05)",
  },
  "Coming soon": {
    color: "#FF8E72",
    bg: "rgba(255,142,114,0.08)",
    border: "rgba(255,142,114,0.2)",
    glow: "rgba(255,142,114,0.05)",
  },
  "Technical note": {
    color: "#46CFFF",
    bg: "rgba(70,207,255,0.08)",
    border: "rgba(70,207,255,0.2)",
    glow: "rgba(70,207,255,0.05)",
  },
  Docs: {
    color: "#91A2C7",
    bg: "rgba(145,162,199,0.08)",
    border: "rgba(145,162,199,0.15)",
    glow: "rgba(145,162,199,0.03)",
  },
};

/* Status icons */
const statusIcons: Record<ResearchCardStatus, React.ReactNode> = {
  Paper: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M12 2v4h4" />
      <path d="M7 10h6M7 13h4" />
    </svg>
  ),
  Research: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="8" r="5" />
      <path d="M12 12l4 4" />
      <path d="M8 5v3h3" />
    </svg>
  ),
  "Coming soon": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  ),
  "Technical note": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 4h12v12H4z" rx="1" />
      <path d="M8 4v12M4 8h12" />
    </svg>
  ),
  Docs: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 4h5l2 2h7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
      <path d="M8 10h4M8 13h2" />
    </svg>
  ),
};

function CardContent({ card }: { card: ResearchCard }) {
  const config = statusConfig[card.status];

  return (
    <div className="relative h-full flex flex-col">
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${config.border}, transparent)` }}
      />

      {/* Icon + status */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ color: config.color, background: config.bg }}
        >
          {statusIcons[card.status]}
        </div>
        <span
          className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-md"
          style={{ color: config.color, background: config.bg, border: `1px solid ${config.border}` }}
        >
          {card.status}
        </span>
      </div>

      <h3 className="font-display font-semibold text-lg text-cloud mb-2">
        {card.title}
      </h3>
      <p className="text-sm text-mist leading-relaxed flex-1">
        {card.description}
      </p>
      {card.note && (
        <p className="text-xs text-mist/50 mt-3 italic">{card.note}</p>
      )}
      {card.href && (
        <span className="inline-flex items-center gap-1.5 text-xs mt-4 transition-colors group-hover:translate-x-0.5" style={{ color: config.color }}>
          Explore
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function ResearchGrid() {
  return (
    <section id="research" className="relative py-24 lg:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-ultraviolet/[0.02] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-display-md text-cloud leading-[1.1]"
          >
            Research &amp; proof
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-mist mt-4 max-w-lg mx-auto"
          >
            Built on published research, not marketing claims.
          </motion.p>
        </div>

        {/* Featured first two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {researchCards.slice(0, 2).map((card, i) => {
            const config = statusConfig[card.status];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.08 }}
              >
                {card.href ? (
                  <Link
                    href={card.href}
                    className="group block h-full rounded-2xl bg-abyss/60 border border-white/[0.06] p-8 transition-all duration-500 hover:border-opacity-100"
                    style={{ ["--hover-border" as string]: config.border }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${config.glow}, transparent 70%)` }}
                    />
                    <CardContent card={card} />
                  </Link>
                ) : (
                  <div className="group h-full rounded-2xl bg-abyss/60 border border-white/[0.06] p-8">
                    <CardContent card={card} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Remaining cards — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {researchCards.slice(2).map((card, i) => {
            const config = statusConfig[card.status];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.08 }}
              >
                {card.href ? (
                  <Link
                    href={card.href}
                    className="group block h-full rounded-2xl bg-abyss/60 border border-white/[0.06] p-7 transition-all duration-500 hover:border-opacity-100 relative overflow-hidden"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${config.glow}, transparent 70%)` }}
                    />
                    <CardContent card={card} />
                  </Link>
                ) : (
                  <div className="group h-full rounded-2xl bg-abyss/60 border border-white/[0.06] p-7 relative overflow-hidden">
                    <CardContent card={card} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
