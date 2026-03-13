"use client";

import { motion } from "framer-motion";
import { Lock, Shield, Cpu, KeyRound } from "lucide-react";

const cards = [
  {
    icon: Lock,
    title: "Encrypted inputs",
    description:
      "User data and transaction parameters are encrypted before submission. No observer can read what goes in.",
  },
  {
    icon: Shield,
    title: "Encrypted state",
    description:
      "On-chain state remains encrypted at rest. Balances, positions, and program variables stay confidential.",
  },
  {
    icon: Cpu,
    title: "Confidential execution",
    description:
      "Computation runs directly on encrypted data using RE-FHE. Logic executes without ever decrypting.",
  },
  {
    icon: KeyRound,
    title: "Authorized reveal",
    description:
      "Only designated parties can decrypt results. Selective disclosure keeps control with the data owner.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SolutionSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-ultraviolet/5 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          Now programs can{" "}
          <span className="bg-gradient-to-r from-ultraviolet to-cipher-mint bg-clip-text text-transparent">
            keep secrets.
          </span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative bg-abyss border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:border-ultraviolet/20 hover:shadow-[0_0_60px_-12px_rgba(122,92,255,0.12)]"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-ultraviolet/[0.03] to-cipher-mint/[0.03]" />

              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-ultraviolet/10 mb-6 group-hover:bg-ultraviolet/15 transition-colors">
                  <card.icon className="w-6 h-6 text-ultraviolet" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cloud mb-3">
                  {card.title}
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
