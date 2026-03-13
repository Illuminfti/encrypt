"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant: "problem" | "solution";
}

const variantStyles = {
  problem: {
    hoverBorder: "hover:border-signal-coral/25",
    hoverShadow: "hover:shadow-[0_0_40px_-12px_rgba(255,142,114,0.15)]",
  },
  solution: {
    hoverBorder: "hover:border-ultraviolet/25",
    hoverShadow: "hover:shadow-[0_0_40px_-12px_rgba(122,92,255,0.15)]",
  },
};

export default function FeatureCard({
  title,
  description,
  icon,
  variant,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const styles = variantStyles[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`
        group relative rounded-2xl border border-white/[0.05] bg-abyss p-6 sm:p-8
        transition-all duration-300 ease-out
        hover:-translate-y-1
        ${styles.hoverBorder}
        ${styles.hoverShadow}
      `}
    >
      {/* Icon container */}
      <div
        className={`
          mb-5 flex h-12 w-12 items-center justify-center rounded-xl
          ${variant === "problem"
            ? "bg-signal-coral/10 text-signal-coral"
            : "bg-ultraviolet/10 text-ultraviolet"
          }
          transition-colors duration-300
          ${variant === "problem"
            ? "group-hover:bg-signal-coral/15"
            : "group-hover:bg-ultraviolet/15"
          }
        `}
      >
        {icon}
      </div>

      <h3 className="font-display text-lg font-semibold text-cloud mb-2">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-mist">
        {description}
      </p>
    </motion.div>
  );
}
