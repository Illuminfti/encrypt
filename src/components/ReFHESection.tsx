"use client";

import { motion } from "framer-motion";
import { reFhe } from "@/content/home";
import EncryptionFlowDiagram from "./EncryptionFlowDiagram";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ReFHESection() {
  return (
    <section id="re-fhe" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cipher-mint/[0.03] blur-[160px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-ultraviolet/[0.04] blur-[140px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Header — centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="text-xs uppercase tracking-[0.2em] text-cipher-mint mb-4 font-medium"
          >
            {reFhe.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud leading-[1.1]"
          >
            {reFhe.headline}
          </motion.h2>

          {reFhe.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.16 + i * 0.08, ease }}
              className="text-base lg:text-lg text-mist mt-4"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Full-width encryption flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mb-16"
        >
          <EncryptionFlowDiagram />
        </motion.div>

        {/* Chips + proof bullets in a centered row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center justify-center">
          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {reFhe.chips.map((chip) => (
              <span
                key={chip}
                className="text-xs px-3 py-1.5 rounded-full border border-cipher-mint/20 text-cipher-mint/80 bg-cipher-mint/5"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Proof bullets */}
          <div>
            {reFhe.proofBullets.map((bullet, i) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
                className="flex items-center gap-3 text-sm text-mist py-2"
              >
                <div className="w-1.5 h-[6px] rounded-full bg-cipher-mint shrink-0" />
                {bullet}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
