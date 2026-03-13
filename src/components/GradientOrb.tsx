"use client";

import { motion } from "framer-motion";

interface GradientOrbProps {
  color: string;
  size: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  blur?: string;
  animate?: boolean;
}

export default function GradientOrb({
  color,
  size,
  position,
  blur = "80px",
  animate = true,
}: GradientOrbProps) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        width: size,
        height: size,
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur})`,
        opacity: 0.5,
      }}
      {...(animate
        ? {
            animate: {
              y: [0, -20, 0, 20, 0],
              x: [0, 10, 0, -10, 0],
            },
            transition: {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }
        : {})}
    />
  );
}
