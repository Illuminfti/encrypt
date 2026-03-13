"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`flex flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cipher-mint">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl font-bold leading-tight text-cloud sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
