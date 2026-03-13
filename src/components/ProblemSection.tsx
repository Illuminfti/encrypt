"use client";

import { motion } from "framer-motion";
import { Eye, Database, Wifi } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Public execution leaks strategy",
    description:
      "Every transaction is visible before and after settlement. Strategies, logic, and intent are exposed to the entire network.",
  },
  {
    icon: Database,
    title: "Public state leaks user data",
    description:
      "On-chain state is globally readable. Balances, positions, and behavioral patterns are open to anyone watching.",
  },
  {
    icon: Wifi,
    title: "API-connected apps leak secrets offchain",
    description:
      "Interacting with external APIs exposes payloads, credentials, and data to intermediaries and observers.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-balance"
        >
          Everything composable.{" "}
          <span className="text-signal-coral">Everything visible.</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative bg-abyss border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:border-signal-coral/30 hover:shadow-[0_0_40px_-12px_rgba(255,142,114,0.15)]"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-signal-coral/10 mb-6 group-hover:bg-signal-coral/15 transition-colors">
                <card.icon className="w-6 h-6 text-signal-coral" />
              </div>
              <h3 className="font-display text-xl font-semibold text-cloud mb-3">
                {card.title}
              </h3>
              <p className="text-mist text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
