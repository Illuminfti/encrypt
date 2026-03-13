"use client";

import { motion, useReducedMotion } from "framer-motion";

const CELL_COUNT = 8;
const CELL_SIZE = 28;
const CELL_GAP = 4;
const BAR_WIDTH = CELL_COUNT * (CELL_SIZE + CELL_GAP) - CELL_GAP;

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const cycleDuration = prefersReducedMotion ? 0 : 18;

  // Manta ray silhouette path
  const mantaPath =
    "M200,180 Q240,120 320,100 Q360,90 400,100 Q440,80 480,90 Q520,100 540,130 Q560,100 600,90 Q640,80 680,100 Q760,120 800,180 Q820,200 800,220 Q760,260 680,240 Q640,250 600,240 Q560,250 540,230 Q520,250 480,240 Q440,250 400,240 Q360,250 320,240 Q240,260 200,220 Q180,200 200,180 Z M480,160 Q500,140 520,160 Q500,170 480,160 Z";

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Manta ray silhouette */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={mantaPath} fill="#7A5CFF" />
      </svg>

      {/* Main animation SVG */}
      <svg
        viewBox="0 0 520 200"
        className="relative w-full max-w-[520px] h-auto"
        aria-label="Animation showing data cells passing through an encryption veil and reforming as encrypted output"
      >
        <defs>
          {/* Veil gradient */}
          <linearGradient id="veilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0" />
            <stop offset="30%" stopColor="#7A5CFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7A5CFF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#7A5CFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="veilGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cellGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Veil barrier */}
        <motion.rect
          x="245"
          y="20"
          width="30"
          height="160"
          rx="15"
          fill="url(#veilGrad)"
          filter="url(#veilGlow)"
          animate={
            prefersReducedMotion
              ? {}
              : { opacity: [0.5, 0.9, 0.5] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />

        {/* Input cells (plaintext word bar) - entering from left */}
        {Array.from({ length: CELL_COUNT }).map((_, i) => {
          const startX = -BAR_WIDTH + i * (CELL_SIZE + CELL_GAP);
          const barX = 10 + i * (CELL_SIZE + CELL_GAP);
          const y = 86;

          // Scatter positions (behind the veil)
          const scatterX = 260 + Math.random() * 60 - 30 + i * 5;
          const scatterY = 40 + Math.random() * 120;

          // Reformed positions (output bar)
          const reformX = 280 + i * (CELL_SIZE + CELL_GAP);

          const keyframes = [
            startX,   // 0% - offscreen
            barX,     // 15% - formed as bar
            barX,     // 30% - hold
            scatterX, // 50% - scatter through veil
            scatterX, // 60% - hold scatter
            reformX,  // 75% - reform
            reformX,  // 90% - hold
            reformX + BAR_WIDTH + 100, // 100% - exit right
          ];
          const yKeyframes = [
            y, y, y, scatterY, scatterY, y, y, y,
          ];
          const times = [0, 0.12, 0.28, 0.45, 0.55, 0.7, 0.88, 1];

          return (
            <motion.rect
              key={i}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx="4"
              filter="url(#cellGlow)"
              animate={
                prefersReducedMotion
                  ? { x: barX, y, fill: "#1CF2C7", opacity: 0.9 }
                  : {
                      x: keyframes,
                      y: yKeyframes,
                      fill: [
                        "#1CF2C7",
                        "#1CF2C7",
                        "#1CF2C7",
                        "#7A5CFF",
                        "#7A5CFF",
                        "#46CFFF",
                        "#46CFFF",
                        "#46CFFF",
                      ],
                      opacity: [0, 1, 1, 0.7, 0.7, 1, 1, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: cycleDuration,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                      times,
                      delay: i * 0.08,
                    }
              }
            />
          );
        })}

        {/* Labels */}
        <text
          x="10"
          y="140"
          fill="#91A2C7"
          fontSize="10"
          fontFamily="var(--font-inter), sans-serif"
          opacity="0.6"
        >
          Plaintext
        </text>
        <text
          x="248"
          y="195"
          fill="#7A5CFF"
          fontSize="10"
          fontFamily="var(--font-inter), sans-serif"
          textAnchor="middle"
          opacity="0.7"
        >
          Veil
        </text>
        <text
          x="410"
          y="140"
          fill="#91A2C7"
          fontSize="10"
          fontFamily="var(--font-inter), sans-serif"
          opacity="0.6"
        >
          Encrypted
        </text>
      </svg>
    </div>
  );
}
