"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { researchCards } from "@/content/home";
import type { ResearchCard, ResearchCardStatus } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

const statusStyles: Record<ResearchCardStatus, string> = {
  Paper: "text-cipher-mint bg-cipher-mint/10",
  Research: "text-ultraviolet bg-ultraviolet/10",
  "Coming soon": "text-signal-coral bg-signal-coral/10",
  "Technical note": "text-prism-cyan bg-prism-cyan/10",
  Docs: "text-mist bg-white/5",
};

function CardInner({ card }: { card: ResearchCard }) {
  return (
    <>
      <span
        className={`inline-block text-[10px] uppercase tracking-wider mb-4 px-2 py-1 rounded ${statusStyles[card.status]}`}
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
        <span className="text-xs text-ultraviolet/70 hover:text-ultraviolet mt-4 block">
          Learn more &rarr;
        </span>
      )}
    </>
  );
}

export default function ResearchGrid() {
  return (
    <section id="research" className="py-24 lg:py-36">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl text-cloud text-left"
        >
          Research &amp; proof
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {researchCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className={
                i >= 3
                  ? "md:col-span-1 lg:col-span-1"
                  : undefined
              }
            >
              {card.href ? (
                <Link
                  href={card.href}
                  className="block rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 hover:border-white/[0.1] transition-colors h-full"
                >
                  <CardInner card={card} />
                </Link>
              ) : (
                <div className="rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 h-full">
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
