"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", label: "Encrypt data" },
  { number: "02", label: "Dispatch confidential job" },
  { number: "03", label: "Compute on encrypted state" },
  { number: "04", label: "Authorize reveal or API action" },
  { number: "05", label: "Settle on Solana" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ArchitectureFlow() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-20"
        >
          How it works
        </motion.h2>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.1 }}
            className="relative flex items-start justify-between"
          >
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute top-[28px] left-[28px] right-[28px] h-px origin-left"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #7A5CFF40 0, #7A5CFF40 8px, transparent 8px, transparent 16px)",
              }}
            />

            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center w-[180px]"
              >
                {/* Numbered circle */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full border border-ultraviolet/30 bg-abyss mb-4">
                  <span className="font-display text-sm font-bold text-ultraviolet">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-abyss border border-white/5 rounded-xl px-4 py-3 w-full">
                  <p className="text-cloud text-sm font-medium leading-snug">
                    {step.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet: vertical flow */}
        <div className="lg:hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.1 }}
            className="relative flex flex-col items-start max-w-sm mx-auto"
          >
            {/* Connecting line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute top-[28px] bottom-[28px] left-[27px] w-px origin-top"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #7A5CFF40 0, #7A5CFF40 8px, transparent 8px, transparent 16px)",
              }}
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className={`relative flex items-center gap-5 ${
                  i < steps.length - 1 ? "mb-6" : ""
                }`}
              >
                {/* Numbered circle */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-ultraviolet/30 bg-abyss">
                  <span className="font-display text-sm font-bold text-ultraviolet">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-abyss border border-white/5 rounded-xl px-5 py-3.5 flex-1">
                  <p className="text-cloud text-sm font-medium">
                    {step.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
