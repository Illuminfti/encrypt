"use client";

import { motion } from "framer-motion";
import { useCases } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/** Map card index to grid column span */
function colSpan(i: number): string {
  if (i === 0) return "lg:col-span-7";
  if (i === 1) return "lg:col-span-5";
  return "lg:col-span-3";
}

export default function UseCaseGrid() {
  return (
    <section id="use-cases" className="py-24 lg:py-36">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Headline — left aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl text-cloud"
        >
          {useCases.headline}
        </motion.h2>

        {/* Asymmetric mosaic grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {useCases.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 lg:p-8 hover:border-ultraviolet/15 transition-colors duration-300 ${colSpan(i)}`}
            >
              <p className="text-[10px] uppercase tracking-widest text-ultraviolet/60 mb-3">
                {card.category}
              </p>
              <h3 className="font-display font-semibold text-base text-cloud mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-mist leading-relaxed">
                {card.body}
              </p>
              <p className="text-xs text-mist/50 mt-3 italic">
                {card.example}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
