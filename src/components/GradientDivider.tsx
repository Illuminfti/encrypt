"use client";

import { motion } from "framer-motion";

interface GradientDividerProps {
  color?: "ultraviolet" | "mint" | "cyan" | "coral";
}

const gradients: Record<string, string> = {
  ultraviolet: "linear-gradient(90deg, transparent, rgba(122,92,255,0.25), transparent)",
  mint: "linear-gradient(90deg, transparent, rgba(28,242,199,0.2), transparent)",
  cyan: "linear-gradient(90deg, transparent, rgba(70,207,255,0.2), transparent)",
  coral: "linear-gradient(90deg, transparent, rgba(255,142,114,0.2), transparent)",
};

export default function GradientDivider({ color = "ultraviolet" }: GradientDividerProps) {
  return (
    <div className="max-w-content mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        className="h-px origin-left"
        style={{ background: gradients[color] }}
      />
    </div>
  );
}
