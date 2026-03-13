"use client";

import { motion, useReducedMotion } from "framer-motion";
import { problem } from "@/content/home";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const HEX_CHARS = "0123456789abcdef";
const STREAM_LENGTH = 32;

/* ── Surveillance Eye SVG ─────────────────────────────────── */

function SurveillanceEye({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className="mx-auto"
      animate={active ? { scale: [1, 1.05, 1] } : {}}
      transition={active ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {/* Outer eye shape */}
      <motion.path
        d="M8 32 Q32 8 56 32 Q32 56 8 32Z"
        stroke="#FF8E72"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Inner iris */}
      <motion.circle
        cx="32"
        cy="32"
        r="10"
        stroke="#FF8E72"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />
      {/* Pupil */}
      <motion.circle
        cx="32"
        cy="32"
        r="4"
        fill="#FF8E72"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 0.7 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      />
      {/* Scan lines */}
      {[18, 26, 34, 42, 50].map((y, i) => (
        <motion.line
          key={y}
          x1="12"
          y1={y}
          x2="52"
          y2={y}
          stroke="#FF8E72"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: [0, 0.15, 0] } : {}}
          transition={active ? { duration: 2, delay: i * 0.2, repeat: Infinity } : {}}
        />
      ))}
    </motion.svg>
  );
}

/* ── Hex Stream Cell ──────────────────────────────────────── */

function HexCell({
  active,
  delay,
  reducedMotion,
}: {
  active: boolean;
  delay: number;
  reducedMotion: boolean;
}) {
  const [char, setChar] = useState(() =>
    HEX_CHARS[Math.floor(Math.random() * 16)]
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setChar(HEX_CHARS[Math.floor(Math.random() * 16)]);
      }, 80 + Math.random() * 120);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, delay, reducedMotion]);

  return (
    <span
      className={`
        inline-block w-[1ch] text-center font-mono text-xs sm:text-sm
        transition-all duration-300
        ${active ? "text-signal-coral/80" : "text-mist/20"}
      `}
    >
      {char}
    </span>
  );
}

/* ── Data Stream Row ──────────────────────────────────────── */

function DataStreamRow({
  card,
  index,
  isInView,
  reducedMotion,
}: {
  card: { title: string; body: string };
  index: number;
  isInView: boolean;
  reducedMotion: boolean;
}) {
  const [rowActive, setRowActive] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(
      () => setRowActive(true),
      reducedMotion ? 0 : 400 + index * 600
    );
    return () => clearTimeout(timeout);
  }, [isInView, index, reducedMotion]);

  const cells = useMemo(
    () =>
      Array.from({ length: STREAM_LENGTH }, (_, i) => (
        <HexCell
          key={i}
          active={rowActive}
          delay={i * 30}
          reducedMotion={!!reducedMotion}
        />
      )),
    [rowActive, reducedMotion]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : 0.2 + index * 0.3,
        ease,
      }}
      className="group relative"
    >
      {/* Row container */}
      <div
        className={`
          relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8
          rounded-2xl border px-6 py-5
          transition-all duration-700
          ${
            rowActive
              ? "border-signal-coral/20 bg-signal-coral/[0.03]"
              : "border-white/[0.04] bg-abyss/40"
          }
        `}
      >
        {/* Glow effect when active */}
        <div
          className={`
            pointer-events-none absolute inset-0 rounded-2xl
            transition-opacity duration-1000
            bg-[radial-gradient(ellipse_at_left,rgba(255,142,114,0.06),transparent_60%)]
            ${rowActive ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Left: problem info */}
        <div className="relative z-10 flex-shrink-0 lg:w-[280px] xl:w-[340px]">
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`
                block w-1.5 h-1.5 rounded-full transition-colors duration-500
                ${rowActive ? "bg-signal-coral animate-pulse" : "bg-mist/30"}
              `}
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-signal-coral/70 font-mono">
              STREAM {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display font-semibold text-base text-cloud leading-snug">
            {card.title}
          </h3>
          <p className="text-xs text-mist/70 mt-1 leading-relaxed max-w-[300px] hidden lg:block">
            {card.body}
          </p>
        </div>

        {/* Right: hex data stream */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {/* Stream container */}
          <div className="relative flex items-center gap-px">
            {/* Exposed data indicator */}
            <div
              className={`
                flex-shrink-0 mr-3 px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-mono
                border transition-all duration-700
                ${
                  rowActive
                    ? "border-signal-coral/40 text-signal-coral bg-signal-coral/10"
                    : "border-white/[0.06] text-mist/30 bg-transparent"
                }
              `}
            >
              {rowActive ? "EXPOSED" : "IDLE"}
            </div>

            {/* Hex characters */}
            <div className="flex gap-[2px] flex-wrap sm:flex-nowrap">
              {cells}
            </div>

            {/* Fade out right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-abyss/80 to-transparent pointer-events-none" />
          </div>

          {/* Mobile: show body text */}
          <p className="text-xs text-mist/60 mt-2 leading-relaxed lg:hidden">
            {card.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Scanline Overlay ─────────────────────────────────────── */

function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,142,114,0.4) 2px, rgba(255,142,114,0.4) 3px)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */

export default function ProblemSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const handleInView = useCallback(() => {
    setIsInView(true);
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-signal-coral/[0.03] blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-signal-coral/[0.02] blur-[120px]" />
      </div>

      {/* Scanline effect */}
      <ScanlineOverlay />

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Surveillance Eye */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          onViewportEnter={handleInView}
          className="flex justify-center mb-10"
        >
          <SurveillanceEye active={isInView} />
        </motion.div>

        {/* Header — centered for impact */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="text-xs uppercase tracking-[0.25em] text-signal-coral mb-4 font-mono"
          >
            {problem.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-display-md text-cloud leading-[1.1]"
          >
            {problem.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-lg text-mist mt-5 leading-relaxed"
          >
            {problem.body}
          </motion.p>
        </div>

        {/* Terminal header bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-14 mb-3"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-t-xl bg-abyss/80 border border-b-0 border-white/[0.06]">
            {/* Terminal dots */}
            <div className="flex gap-1.5">
              <span className="block w-2 h-2 rounded-full bg-signal-coral/60" />
              <span className="block w-2 h-2 rounded-full bg-signal-coral/30" />
              <span className="block w-2 h-2 rounded-full bg-signal-coral/15" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-mist/40">
              blockchain_surveillance_monitor_v1.0
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span
                className={`block w-1.5 h-1.5 rounded-full ${
                  isInView ? "bg-signal-coral animate-pulse" : "bg-mist/20"
                }`}
              />
              <span className="text-[9px] font-mono text-signal-coral/50 uppercase">
                {isInView ? "monitoring" : "standby"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Data stream rows */}
        <div className="space-y-3 rounded-b-xl border border-white/[0.06] bg-abyss/40 p-4 backdrop-blur-sm">
          {problem.cards.map((card, i) => (
            <DataStreamRow
              key={card.title}
              card={card}
              index={i}
              isInView={isInView}
              reducedMotion={!!reducedMotion}
            />
          ))}

          {/* Bottom status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-4"
          >
            <span className="text-[9px] font-mono text-mist/30 uppercase tracking-widest">
              3 / 3 data vectors exposed
            </span>
            <span className="text-[9px] font-mono text-signal-coral/40 uppercase tracking-widest">
              confidentiality: none
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
