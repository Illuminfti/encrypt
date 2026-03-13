"use client";

import { motion } from "framer-motion";
import { architecture } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

const stepVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: i * 0.1 },
  }),
};

export default function ArchitectureFlow() {
  return (
    <section id="architecture" className="py-24 lg:py-36">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl text-cloud text-left mb-16"
        >
          {architecture.headline}
        </motion.h2>

        {/* ── Desktop: horizontal rail ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting dashed line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="absolute top-6 left-6 right-6 h-px origin-left"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(124,58,237,0.3) 0, rgba(124,58,237,0.3) 8px, transparent 8px, transparent 16px)",
              }}
            />

            <div className="flex items-start justify-between">
              {architecture.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={stepVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="flex flex-col items-center text-center w-[180px]"
                >
                  <div className="relative z-10 w-12 h-12 rounded-full border-2 border-ultraviolet/30 flex items-center justify-center bg-void">
                    <span className="text-xs font-display text-ultraviolet">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-cloud mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-mist leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="lg:hidden relative">
          {/* Vertical dashed line */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(124,58,237,0.3) 0, rgba(124,58,237,0.3) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="space-y-0">
            {architecture.steps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={stepVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex gap-4 py-6"
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 border-ultraviolet/30 flex items-center justify-center bg-void">
                  <span className="text-xs font-display text-ultraviolet">
                    {step.step}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-display font-semibold text-cloud mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-mist leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-12 flex gap-8 justify-center text-xs text-mist/60"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cipher-mint" />
            {architecture.legend.confidential}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cloud" />
            {architecture.legend.public}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
