"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const papers = [
  {
    title: "RE-FHE",
    description:
      "Real-number fully homomorphic encryption operating on machine-word values for practical confidential computation.",
    href: "/research",
  },
  {
    title: "Threshold FHE",
    description:
      "Distributed key generation and decryption across a network of nodes, eliminating single points of trust.",
    href: "/research",
  },
  {
    title: "Benchmarks",
    description:
      "Performance data for arithmetic, logical, and comparison operations on encrypted 64-bit words.",
    href: "/research",
  },
  {
    title: "Security model",
    description:
      "Formal threat model and security guarantees for confidential execution on a public ledger.",
    href: "/research",
  },
  {
    title: "Developer docs",
    description:
      "Guides, API references, and tutorials for building confidential Solana programs with Encrypt.",
    href: "/research",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ResearchGrid() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          Research & proof
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {papers.map((paper) => (
            <motion.a
              key={paper.title}
              variants={cardVariants}
              href={paper.href}
              className="group bg-abyss border border-white/5 rounded-2xl p-7 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-cloud mb-3 group-hover:text-prism-cyan transition-colors">
                  {paper.title}
                </h3>
                <p className="text-mist text-sm leading-relaxed mb-6">
                  {paper.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ultraviolet group-hover:text-prism-cyan transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
