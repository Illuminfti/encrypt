"use client";

import { motion } from "framer-motion";
import { credibilityBadges } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BadgeRow() {
  return (
    <section id="credibility" className="py-12 border-y border-white/[0.04]">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Mobile: horizontal scroll; Desktop: flex-wrap centered */}
        <div className="flex gap-3 flex-nowrap overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible">
          {credibilityBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="shrink-0 text-xs text-mist/80 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
