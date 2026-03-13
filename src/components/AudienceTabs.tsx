"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audience } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Persona icons (inline SVGs) ─────────────────────────── */

function BuildersIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={`transition-all duration-500 ${
        active ? "drop-shadow-[0_0_12px_rgba(122,92,255,0.6)]" : ""
      }`}
    >
      <rect
        x="4"
        y="10"
        width="40"
        height="28"
        rx="4"
        stroke={active ? "#7A5CFF" : "#91A2C7"}
        strokeWidth="2"
        fill="none"
        className="transition-colors duration-500"
      />
      <path
        d="M14 20l-4 4 4 4M34 20l4 4-4 4M27 18l-6 12"
        stroke={active ? "#7A5CFF" : "#91A2C7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

function TradersIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={`transition-all duration-500 ${
        active ? "drop-shadow-[0_0_12px_rgba(28,242,199,0.6)]" : ""
      }`}
    >
      <path
        d="M8 36V20l6-4v20M18 36V16l6 8v12M28 36V12l6 6v18M38 36V8"
        stroke={active ? "#1CF2C7" : "#91A2C7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
      <circle
        cx="38"
        cy="8"
        r="2.5"
        fill={active ? "#1CF2C7" : "#91A2C7"}
        className="transition-colors duration-500"
      />
      <line
        x1="6"
        y1="40"
        x2="42"
        y2="40"
        stroke={active ? "#1CF2C7" : "#91A2C7"}
        strokeWidth="1.5"
        opacity={0.4}
        className="transition-colors duration-500"
      />
    </svg>
  );
}

function InvestorsIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={`transition-all duration-500 ${
        active ? "drop-shadow-[0_0_12px_rgba(70,207,255,0.6)]" : ""
      }`}
    >
      <path
        d="M24 4l8 14H16L24 4z"
        stroke={active ? "#46CFFF" : "#91A2C7"}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={active ? "rgba(70,207,255,0.15)" : "none"}
        className="transition-all duration-500"
      />
      <path
        d="M16 18l-8 14h32l-8-14"
        stroke={active ? "#46CFFF" : "#91A2C7"}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={active ? "rgba(70,207,255,0.08)" : "none"}
        className="transition-all duration-500"
      />
      <path
        d="M24 32v12M8 32l16 12 16-12"
        stroke={active ? "#46CFFF" : "#91A2C7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

/* ── Per-persona config ──────────────────────────────────── */

const personaConfig = [
  {
    icon: BuildersIcon,
    color: "#7A5CFF",
    colorClass: "ultraviolet",
    glowShadow: "0 0 40px rgba(122,92,255,0.25), 0 0 80px rgba(122,92,255,0.1)",
    borderColor: "rgba(122,92,255,0.4)",
    bgGlow: "radial-gradient(ellipse at center, rgba(122,92,255,0.08) 0%, transparent 70%)",
    checkColor: "#7A5CFF",
  },
  {
    icon: TradersIcon,
    color: "#1CF2C7",
    colorClass: "cipher-mint",
    glowShadow: "0 0 40px rgba(28,242,199,0.25), 0 0 80px rgba(28,242,199,0.1)",
    borderColor: "rgba(28,242,199,0.4)",
    bgGlow: "radial-gradient(ellipse at center, rgba(28,242,199,0.08) 0%, transparent 70%)",
    checkColor: "#1CF2C7",
  },
  {
    icon: InvestorsIcon,
    color: "#46CFFF",
    colorClass: "prism-cyan",
    glowShadow: "0 0 40px rgba(70,207,255,0.25), 0 0 80px rgba(70,207,255,0.1)",
    borderColor: "rgba(70,207,255,0.4)",
    bgGlow: "radial-gradient(ellipse at center, rgba(70,207,255,0.08) 0%, transparent 70%)",
    checkColor: "#46CFFF",
  },
] as const;

/* ── Animated check mark ─────────────────────────────────── */

function AnimatedCheck({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, delay, ease }}
      className="flex-shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <motion.path
        d="M6 10.5l2.5 2.5 5.5-5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.15, ease }}
      />
    </motion.svg>
  );
}

/* ── Main component ──────────────────────────────────────── */

export default function AudienceTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = audience.tabs[activeIdx];
  const config = personaConfig[activeIdx];

  return (
    <section id="audience" className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background glow that shifts with active persona */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: config.bgGlow,
        }}
        transition={{ duration: 0.8, ease }}
      />

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Section headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud text-center mb-16 lg:mb-20 leading-[1.1]"
        >
          {audience.headline}
        </motion.h2>

        {/* ── Persona cards row ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {audience.tabs.map((tab, i) => {
            const pc = personaConfig[i];
            const isActive = activeIdx === i;
            const Icon = pc.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative cursor-pointer text-left"
              >
                {/* Glass card */}
                <motion.div
                  animate={{
                    boxShadow: isActive ? pc.glowShadow : "0 0 0px transparent",
                    borderColor: isActive ? pc.borderColor : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.5, ease }}
                  className="relative rounded-2xl border backdrop-blur-md bg-abyss/60 p-6 lg:p-8 h-full overflow-hidden"
                >
                  {/* Active indicator line at top */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scaleX: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease }}
                    style={{ background: pc.color, transformOrigin: "center" }}
                  />

                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${pc.color}08 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="mb-5">
                    <Icon active={isActive} />
                  </div>

                  {/* Label */}
                  <motion.span
                    animate={{ color: isActive ? pc.color : "#F6F8FF" }}
                    transition={{ duration: 0.4 }}
                    className="font-display font-bold text-lg lg:text-xl block"
                  >
                    {tab.label}
                  </motion.span>

                  {/* Brief hint */}
                  <p className="text-sm text-mist/60 mt-2 leading-relaxed line-clamp-2">
                    {tab.headline}
                  </p>

                  {/* Active dot */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease }}
                    className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full"
                    style={{ background: pc.color }}
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Expanded content area ──────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="relative"
          >
            <div
              className="rounded-3xl border backdrop-blur-md bg-abyss/40 p-8 lg:p-14 overflow-hidden"
              style={{ borderColor: config.borderColor }}
            >
              {/* Subtle glow in top-left corner */}
              <div
                className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
                style={{ background: config.color }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Content */}
                <div className="lg:col-span-8">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-cloud mb-5 leading-[1.15]"
                  >
                    {activeTab.headline}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease }}
                    className="text-base lg:text-lg text-mist leading-relaxed mb-8 max-w-2xl"
                  >
                    {activeTab.body}
                  </motion.p>

                  {/* Bullets with animated checks */}
                  <ul className="space-y-4">
                    {activeTab.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.25 + i * 0.07, ease }}
                        className="flex items-center gap-3.5 text-sm lg:text-base text-cloud/90"
                      >
                        <AnimatedCheck
                          color={config.checkColor}
                          delay={0.3 + i * 0.07}
                        />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Floating proof chips */}
                <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 items-start content-start lg:justify-center">
                  {audience.proofChips.map((chip, i) => (
                    <motion.span
                      key={chip}
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.35 + i * 0.09,
                        ease,
                      }}
                      className="inline-flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-full border backdrop-blur-sm"
                      style={{
                        borderColor: `${config.color}20`,
                        background: `${config.color}08`,
                        color: config.color,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: config.color }}
                      />
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
