"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BadgeRowProps {
  badges: string[];
}

export default function BadgeRow({ badges }: BadgeRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="flex gap-3 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
    >
      {badges.map((badge, index) => (
        <motion.span
          key={badge}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.4,
            delay: index * 0.06,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="
            shrink-0 rounded-full border border-white/10 bg-white/[0.05]
            px-4 py-2 text-sm text-mist
            transition-all duration-200
            hover:border-white/20 hover:bg-white/[0.08]
            hover:shadow-[0_0_16px_-4px_rgba(122,92,255,0.2)]
          "
        >
          {badge}
        </motion.span>
      ))}
    </div>
  );
}
