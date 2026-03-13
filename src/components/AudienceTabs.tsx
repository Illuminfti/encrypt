"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audience } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AudienceTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = audience.tabs[activeIdx];

  return (
    <section id="audience" className="py-24 lg:py-36">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="rounded-3xl bg-abyss/40 border border-white/[0.06] p-8 lg:p-12"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-cloud mb-10">
            {audience.headline}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ── Left: tabs + content ── */}
            <div className="lg:col-span-8">
              {/* Tab bar */}
              <div className="flex gap-1 bg-abyss/60 rounded-xl p-1 mb-8">
                {audience.tabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveIdx(i)}
                    className={`relative px-4 py-2.5 text-sm font-display rounded-lg cursor-pointer transition-colors ${
                      activeIdx === i
                        ? "text-cloud"
                        : "text-mist hover:text-cloud/80"
                    }`}
                  >
                    {activeIdx === i && (
                      <motion.div
                        layoutId="audienceActiveTab"
                        className="absolute inset-0 rounded-lg bg-ultraviolet/10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <h3 className="font-display font-semibold text-xl text-cloud mb-3">
                    {activeTab.headline}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed mb-6">
                    {activeTab.body}
                  </p>
                  <ul className="space-y-2">
                    {activeTab.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-sm text-mist"
                      >
                        <span className="flex-shrink-0 w-1.5 h-px bg-cipher-mint" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right: proof chips ── */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {audience.proofChips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                  className="text-xs px-3 py-2 rounded-lg border border-ultraviolet/10 text-mist/70 bg-ultraviolet/5"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
