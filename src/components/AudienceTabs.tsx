"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "builders",
    label: "Builders",
    headline: "Build Solana apps with encrypted state and confidential logic.",
    bullets: [
      "Encrypted program state with RE-FHE primitives",
      "Composable confidential transactions on Solana",
      "FHE-TLS for private API reads and writes",
      "SDKs for TypeScript and Rust",
    ],
  },
  {
    id: "traders",
    label: "Traders & Users",
    headline: "Your alpha should not be public by default.",
    bullets: [
      "Execute strategies without broadcasting intent",
      "Submit orders that resist front-running and MEV",
      "Keep position sizes and timing confidential",
      "Selective disclosure when and where you choose",
    ],
  },
  {
    id: "investors",
    label: "Investors",
    headline:
      "Internet capital markets cannot stay fully public forever.",
    bullets: [
      "Confidential execution is a protocol-level primitive",
      "Encrypt targets the largest crypto ecosystem on Solana",
      "RE-FHE unlocks real application logic, not toy demos",
      "Backed by dWallet Labs and world-class cryptography research",
    ],
  },
];

export default function AudienceTabs() {
  const [activeTab, setActiveTab] = useState("builders");
  const activeContent = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
        >
          Who is Encrypt for
        </motion.h2>

        {/* Tab bar */}
        <div className="relative flex justify-center mb-12">
          <div className="inline-flex gap-1 p-1 rounded-xl bg-abyss border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id ? "text-cloud" : "text-mist hover:text-cloud/80"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-ultraviolet/15 border border-ultraviolet/20"
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
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-abyss border border-white/5 rounded-2xl p-8 md:p-10"
          >
            <h3 className="font-display text-xl md:text-2xl font-semibold text-cloud mb-6 leading-snug">
              {activeContent.headline}
            </h3>
            <ul className="space-y-3">
              {activeContent.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-ultraviolet" />
                  <span className="text-mist text-sm leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
