"use client";

import { motion } from "framer-motion";

interface GradientDividerProps {
  color?: "ultraviolet" | "mint" | "cyan" | "coral";
}

const config = {
  ultraviolet: {
    line: "linear-gradient(90deg, transparent, rgba(122,92,255,0.3), transparent)",
    glow: "rgba(122,92,255,0.08)",
    dot: "#7A5CFF",
  },
  mint: {
    line: "linear-gradient(90deg, transparent, rgba(28,242,199,0.25), transparent)",
    glow: "rgba(28,242,199,0.06)",
    dot: "#1CF2C7",
  },
  cyan: {
    line: "linear-gradient(90deg, transparent, rgba(70,207,255,0.25), transparent)",
    glow: "rgba(70,207,255,0.06)",
    dot: "#46CFFF",
  },
  coral: {
    line: "linear-gradient(90deg, transparent, rgba(255,142,114,0.25), transparent)",
    glow: "rgba(255,142,114,0.06)",
    dot: "#FF8E72",
  },
};

export default function GradientDivider({ color = "ultraviolet" }: GradientDividerProps) {
  const c = config[color];

  return (
    <div className="relative max-w-content mx-auto px-6 lg:px-8 py-2">
      {/* Glow behind line */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[40px] rounded-full blur-[30px]"
        style={{ background: c.glow }}
      />
      {/* Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        className="h-px origin-center relative"
        style={{ background: c.line }}
      >
        {/* Center dot */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}40` }}
        />
      </motion.div>
    </div>
  );
}
