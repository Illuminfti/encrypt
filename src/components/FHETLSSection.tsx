"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Globe, FileCheck } from "lucide-react";

const steps = [
  {
    icon: ShieldCheck,
    label: "Encrypted policy",
    description: "Rules and parameters stay hidden from all parties",
  },
  {
    icon: Globe,
    label: "API read/write",
    description: "Interact with external services over encrypted TLS",
  },
  {
    icon: FileCheck,
    label: "Verifiable outcome",
    description: "Results are provably correct without revealing inputs",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FHETLSSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ultraviolet/[0.04] via-void to-void" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-ultraviolet/[0.06] blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-prism-cyan/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cipher-mint/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Read private.{" "}
            <span className="bg-gradient-to-r from-prism-cyan to-cipher-mint bg-clip-text text-transparent">
              Write verifiable.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-mist text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Solana programs can interact with APIs without exposing the data or
            intent that drives the action.
          </motion.p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              variants={fadeUp}
              className="flex items-center gap-4 md:gap-0"
            >
              {/* Glass card */}
              <div className="relative group w-full md:w-[260px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ultraviolet/10 to-prism-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-abyss/80 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 text-center hover:border-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-ultraviolet/15 to-prism-cyan/10 mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-prism-cyan" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cloud mb-2">
                    {step.label}
                  </h3>
                  <p className="text-mist text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <>
                  {/* Desktop arrow */}
                  <div className="hidden md:flex items-center px-4">
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                      className="origin-left"
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-px bg-gradient-to-r from-ultraviolet/40 to-prism-cyan/40" />
                        <ArrowRight className="w-4 h-4 text-prism-cyan/50" />
                      </div>
                    </motion.div>
                  </div>
                  {/* Mobile arrow */}
                  <div className="md:hidden flex items-center py-1">
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                      className="origin-top"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-8 bg-gradient-to-b from-ultraviolet/40 to-prism-cyan/40" />
                        <ArrowRight className="w-4 h-4 text-prism-cyan/50 rotate-90" />
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
