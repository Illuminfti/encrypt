"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ElementType } from "react";

interface LetterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerSpeed?: number;
  as?: ElementType;
}

const easing = [0.22, 1, 0.36, 1] as const;

export default function LetterReveal({
  children,
  className,
  delay = 0,
  staggerSpeed = 0.03,
  as: Tag = "span",
}: LetterRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const characters = children.split("");

  return (
    <Tag className={className} aria-label={children}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: easing,
            delay: delay + i * staggerSpeed,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
