"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { solution } from "@/content/home";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Encrypted data block SVG (abstract visual on the right) ── */
function DataBlock({
  locked,
  index,
}: {
  locked: boolean;
  index: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
    >
      <motion.div
        className="relative w-full h-10 rounded-lg border overflow-hidden"
        animate={{
          borderColor: locked
            ? "rgba(28, 242, 199, 0.3)"
            : "rgba(122, 92, 255, 0.15)",
          backgroundColor: locked
            ? "rgba(28, 242, 199, 0.04)"
            : "rgba(122, 92, 255, 0.02)",
        }}
        transition={{ duration: 0.6, ease }}
      >
        {/* Shimmer bar representing data */}
        <div className="absolute inset-0 flex items-center px-3 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-2 rounded-full"
              animate={{
                backgroundColor: locked
                  ? "rgba(28, 242, 199, 0.25)"
                  : "rgba(122, 92, 255, 0.15)",
                width: locked ? "8px" : `${12 + Math.random() * 24}px`,
              }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
            />
          ))}
        </div>

        {/* Lock icon overlay */}
        <motion.div
          className="absolute right-3 top-1/2 -translate-y-1/2"
          animate={{ opacity: locked ? 1 : 0, scale: locked ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1CF2C7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Pipeline step component ────────────────────────────────── */
function PipelineStep({
  card,
  index,
  isActive,
}: {
  card: (typeof solution.cards)[number];
  index: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      className="relative flex items-start gap-6 lg:gap-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease }}
    >
      {/* Numbered circle */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Outer glow ring */}
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          animate={{
            boxShadow: isActive
              ? "0 0 30px rgba(122, 92, 255, 0.4), 0 0 60px rgba(28, 242, 199, 0.15)"
              : "0 0 0px rgba(122, 92, 255, 0)",
          }}
          transition={{ duration: 0.8, ease }}
        />
        {/* Circle background */}
        <motion.div
          className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center z-10"
          animate={{
            borderColor: isActive
              ? "rgba(122, 92, 255, 0.8)"
              : "rgba(122, 92, 255, 0.2)",
            backgroundColor: isActive
              ? "rgba(122, 92, 255, 0.12)"
              : "rgba(11, 17, 35, 0.6)",
          }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.span
            className="font-display font-bold text-sm tracking-wider"
            animate={{
              color: isActive ? "#7A5CFF" : "rgba(145, 162, 199, 0.5)",
            }}
            transition={{ duration: 0.5 }}
          >
            {card.step}
          </motion.span>
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        className="relative flex-1 rounded-2xl border p-6 lg:p-8 backdrop-blur-sm overflow-hidden"
        animate={{
          borderColor: isActive
            ? "rgba(122, 92, 255, 0.25)"
            : "rgba(255, 255, 255, 0.04)",
          backgroundColor: isActive
            ? "rgba(122, 92, 255, 0.06)"
            : "rgba(11, 17, 35, 0.3)",
        }}
        transition={{ duration: 0.6, ease }}
      >
        {/* Inner glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{
            background: isActive
              ? "radial-gradient(ellipse at top left, rgba(122, 92, 255, 0.08), transparent 60%)"
              : "radial-gradient(ellipse at top left, transparent, transparent)",
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 h-[1px]"
          animate={{
            width: isActive ? "100%" : "0%",
            background:
              "linear-gradient(90deg, #7A5CFF, #1CF2C7, transparent)",
          }}
          transition={{ duration: 0.8, ease }}
        />

        <h3 className="relative font-display font-semibold text-lg lg:text-xl text-cloud mb-2">
          {card.title}
        </h3>
        <p className="relative text-sm lg:text-base text-mist leading-relaxed">
          {card.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────── */
export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.4"],
  });

  /* Map scroll progress to active step index */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.floor(v * (solution.cards.length + 0.5));
    setActiveStep(Math.min(step, solution.cards.length - 1));
  });

  /* Animated gradient line height */
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="solution"
      ref={containerRef}
      className="relative py-28 lg:py-44 overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-ultraviolet/[0.03] blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cipher-mint/[0.02] blur-[180px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* ── Centered headline ── */}
        <div className="text-center mb-20 lg:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-cloud leading-[1.05] tracking-tight"
          >
            {solution.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-lg lg:text-xl text-mist mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            {solution.body}
          </motion.p>
        </div>

        {/* ── Pipeline + Visual grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          {/* Left: Vertical pipeline */}
          <div ref={pipelineRef} className="relative">
            {/* Animated gradient line (connecting the steps) */}
            <div className="absolute left-8 top-8 bottom-8 w-[2px] z-0">
              {/* Track (dim) */}
              <div className="absolute inset-0 bg-white/[0.04] rounded-full" />
              {/* Animated fill */}
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: lineHeight,
                  background:
                    "linear-gradient(180deg, #7A5CFF 0%, #1CF2C7 100%)",
                }}
              />
              {/* Glow on the animated line */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full blur-[3px]"
                style={{
                  height: lineHeight,
                  background:
                    "linear-gradient(180deg, rgba(122, 92, 255, 0.5) 0%, rgba(28, 242, 199, 0.4) 100%)",
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative z-10 flex flex-col gap-10 lg:gap-14">
              {solution.cards.map((card, i) => (
                <PipelineStep
                  key={card.step}
                  card={card}
                  index={i}
                  isActive={activeStep >= i}
                />
              ))}
            </div>
          </div>

          {/* Right: Abstract encrypted data visualization */}
          <motion.div
            className="hidden lg:flex flex-col gap-3 sticky top-32"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            {/* Visual header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-ultraviolet animate-pulse" />
                <span className="text-xs font-display text-mist/50 uppercase tracking-widest">
                  Encrypted state
                </span>
              </div>
              <div className="h-[1px] bg-gradient-to-r from-ultraviolet/20 to-transparent" />
            </div>

            {/* Data blocks that lock progressively */}
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <DataBlock
                  key={i}
                  index={i}
                  locked={activeStep >= Math.floor((i / 12) * 4)}
                />
              ))}
            </div>

            {/* Status indicator */}
            <motion.div
              className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg border"
              animate={{
                borderColor:
                  activeStep >= 3
                    ? "rgba(28, 242, 199, 0.3)"
                    : "rgba(255, 255, 255, 0.06)",
                backgroundColor:
                  activeStep >= 3
                    ? "rgba(28, 242, 199, 0.04)"
                    : "transparent",
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor:
                    activeStep >= 3 ? "#1CF2C7" : "rgba(145, 162, 199, 0.3)",
                }}
              />
              <motion.span
                className="text-xs font-display tracking-wide"
                animate={{
                  color:
                    activeStep >= 3 ? "#1CF2C7" : "rgba(145, 162, 199, 0.4)",
                }}
              >
                {activeStep >= 3 ? "Fully encrypted" : "Encrypting\u2026"}
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Footnote ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-sm text-mist/50 mt-16 lg:mt-24 max-w-lg mx-auto text-center"
        >
          {solution.footnote}
        </motion.p>
      </div>
    </section>
  );
}
