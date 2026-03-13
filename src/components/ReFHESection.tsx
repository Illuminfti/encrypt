"use client";

import { motion, useReducedMotion } from "framer-motion";
import { reFhe } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Bit Decomposition Diagram ────────────────────────── */

function BitDecompDiagram() {
  const prefersReducedMotion = useReducedMotion();

  const CELLS = 32;
  const CELL_W = 8;
  const CELL_H = 8;
  const GAP = 3.5;
  const ROW_WIDTH = CELLS * (CELL_W + GAP) - GAP;
  const X_OFFSET = (400 - ROW_WIDTH) / 2;

  // Deterministic scatter positions for middle stage
  const scatterPositions = Array.from({ length: CELLS }, (_, i) => ({
    x: 30 + ((i * 37 + 11) % 340),
    y: 105 + ((i * 23 + 7) % 50),
  }));

  return (
    <svg viewBox="0 0 400 260" className="w-full" aria-label="Bit decomposition diagram">
      {/* Stage 1: 64-bit word */}
      <text x={X_OFFSET} y="22" fill="#91A2C7" fontSize="9" opacity="0.6">
        64-bit word
      </text>
      {Array.from({ length: CELLS }).map((_, i) => (
        <motion.rect
          key={`top-${i}`}
          x={X_OFFSET + i * (CELL_W + GAP)}
          y="32"
          width={CELL_W}
          height={CELL_H}
          rx="1.5"
          fill="#1CF2C7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02, duration: 0.4 }}
        />
      ))}

      {/* Dotted connector top→mid */}
      <line
        x1="200" y1="48" x2="200" y2="92"
        stroke="#91A2C7" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.25"
      />

      {/* Stage 2: Bit decomposition */}
      <text x="16" y="100" fill="#91A2C7" fontSize="9" opacity="0.6">
        Bit decomposition
      </text>
      {scatterPositions.map((pos, i) => (
        <motion.rect
          key={`mid-${i}`}
          width={6}
          height={6}
          rx="1"
          fill="#7A5CFF"
          initial={
            prefersReducedMotion
              ? { opacity: 0.65, x: pos.x, y: pos.y }
              : { opacity: 0, x: 200, y: 120 }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 0.65 }
              : { opacity: [0, 0.65], x: [200, pos.x], y: [120, pos.y] }
          }
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.02, duration: 0.7, ease: "easeOut" as const }}
        />
      ))}

      {/* Gentle opacity pulse on mid cells (only when not reduced motion) */}
      {!prefersReducedMotion &&
        scatterPositions.map((pos, i) => (
          <motion.rect
            key={`pulse-${i}`}
            x={pos.x}
            y={pos.y}
            width={6}
            height={6}
            rx="1"
            fill="#7A5CFF"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0.3, 0.65, 0.3] }}
            viewport={{ once: true }}
            transition={{
              delay: 1.4 + i * 0.02,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        ))}

      {/* Dotted connector mid→bottom */}
      <line
        x1="200" y1="168" x2="200" y2="204"
        stroke="#91A2C7" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.25"
      />

      {/* Stage 3: Encrypted output */}
      <text x={X_OFFSET} y="218" fill="#91A2C7" fontSize="9" opacity="0.6">
        Encrypted output
      </text>
      {Array.from({ length: CELLS }).map((_, i) => (
        <motion.rect
          key={`bot-${i}`}
          x={X_OFFSET + i * (CELL_W + GAP)}
          y="228"
          width={CELL_W}
          height={CELL_H}
          rx="1.5"
          fill="#46CFFF"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 + i * 0.02, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

/* ── Section ──────────────────────────────────────────── */

export default function ReFHESection() {
  return (
    <section id="re-fhe" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cipher-mint/[0.03] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div>
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
                className="text-base text-mist mt-4 max-w-md"
              >
                {p}
              </motion.p>
            ))}

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.32, ease }}
              className="mt-6 flex flex-wrap gap-2"
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
            <div className="mt-8">
              {reFhe.proofBullets.map((bullet, i) => (
                <motion.div
                  key={bullet}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
                  className="flex items-center gap-3 text-sm text-mist py-2"
                >
                  {/* Tiny 6px cipher-mint line marker */}
                  <div className="w-1.5 h-[6px] rounded-full bg-cipher-mint shrink-0" />
                  {bullet}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column — diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex items-center"
          >
            <BitDecompDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
