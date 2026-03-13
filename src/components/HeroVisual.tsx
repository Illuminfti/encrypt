"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ── Deterministic scatter coordinates for 64 cells ──────────── */
const SCATTER = Array.from({ length: 64 }, (_, i) => ({
  x: ((i * 7 + 13) % 64) * 3.5 + 10,
  y: ((i * 11 + 5) % 40) + 30,
}));

/* ── Manta-ray silhouette (simplified veilray) ───────────────── */
const MANTA_PATH =
  "M240,120 Q220,100 200,95 Q170,88 150,95 Q130,80 110,88 Q90,95 80,110 Q70,95 50,88 Q30,80 10,95 Q-10,100 -30,110 Q-10,130 10,125 Q30,135 50,128 Q70,138 80,125 Q90,140 110,128 Q130,135 150,125 Q170,130 200,125 Q220,130 240,120 Z M110,108 Q115,102 120,108 Q115,112 110,108 Z";

/* ── Cell helpers ────────────────────────────────────────────── */
const INPUT_X = 20;
const OUTPUT_X = 340;
const CELL_W = 4;
const CELL_GAP = 1;
const VEIL_X = 200;
const VEIL_W = 80;

function inputCellX(i: number) {
  return INPUT_X + i * (CELL_W + CELL_GAP);
}
function outputCellX(i: number) {
  return OUTPUT_X + i * (CELL_W + CELL_GAP);
}
function cipherMintOpacity(i: number) {
  return 0.6 + (i % 3) * 0.15;
}
function prismCyanOpacity(i: number) {
  return 0.55 + (i % 4) * 0.12;
}
function scatterOpacity(i: number) {
  return 0.3 + (i % 5) * 0.12;
}

/* ── Dashed trail lines ──────────────────────────────────────── */
const TRAIL_YS = [92, 97, 102, 107];

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  /* ── Static / reduced-motion version ───────────────────────── */
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full flex items-center justify-center py-8">
        <svg
          viewBox="0 0 480 200"
          className="w-full h-auto"
          aria-label="Encrypted word computation visualization"
        >
          <defs>
            <linearGradient id="veil-grad-static" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#7A5CFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Manta silhouette */}
          <g transform="translate(120,0) scale(1.5)" opacity="0.05">
            <path d={MANTA_PATH} fill="#7A5CFF" />
          </g>

          {/* Trail lines */}
          {TRAIL_YS.map((ty) => (
            <line
              key={ty}
              x1={INPUT_X}
              y1={ty}
              x2={OUTPUT_X + 64 * (CELL_W + CELL_GAP)}
              y2={ty}
              stroke="#91A2C7"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              opacity="0.08"
            />
          ))}

          {/* Veil glow */}
          <rect
            x={VEIL_X - 20}
            y="20"
            width={VEIL_W + 40}
            height="160"
            rx="12"
            fill="#7A5CFF"
            opacity="0.08"
          />
          {/* Veil zone */}
          <rect
            x={VEIL_X}
            y="20"
            width={VEIL_W}
            height="160"
            rx="8"
            fill="url(#veil-grad-static)"
          />
          {/* Veil brackets */}
          <text x={VEIL_X - 8} y="105" fill="#7A5CFF" fontSize="14" opacity="0.3" fontFamily="monospace">[</text>
          <text x={VEIL_X + VEIL_W + 2} y="105" fill="#7A5CFF" fontSize="14" opacity="0.3" fontFamily="monospace">]</text>

          {/* Input bar */}
          {Array.from({ length: 64 }, (_, i) => (
            <rect
              key={`in-${i}`}
              x={inputCellX(i)}
              y="96"
              width={CELL_W}
              height={CELL_W}
              rx="0.5"
              fill="#1CF2C7"
              opacity={cipherMintOpacity(i)}
            />
          ))}
          <text x={INPUT_X} y="118" fill="#91A2C7" fontSize="8" opacity="0.5">
            64-bit word
          </text>

          {/* Scattered bits */}
          {SCATTER.map((pos, i) => (
            <rect
              key={`sc-${i}`}
              x={VEIL_X + pos.x * 0.3}
              y={pos.y + 50}
              width="2"
              height="2"
              rx="0.5"
              fill="#7A5CFF"
              opacity={scatterOpacity(i)}
            />
          ))}

          {/* Output bar */}
          {Array.from({ length: 64 }, (_, i) => (
            <rect
              key={`out-${i}`}
              x={outputCellX(i)}
              y="96"
              width={CELL_W}
              height={CELL_W}
              rx="0.5"
              fill="#46CFFF"
              opacity={prismCyanOpacity(i)}
            />
          ))}
          <text x={OUTPUT_X} y="118" fill="#91A2C7" fontSize="8" opacity="0.5">
            64-bit word
          </text>
        </svg>
      </div>
    );
  }

  /* ── Animated version ──────────────────────────────────────── */
  return (
    <div className="relative w-full flex items-center justify-center py-8">
      <svg
        viewBox="0 0 480 200"
        className="w-full h-auto"
        aria-label="Encrypted word computation visualization"
      >
        <defs>
          <linearGradient id="veil-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#7A5CFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Manta silhouette */}
        <g transform="translate(120,0) scale(1.5)" opacity="0.05">
          <path d={MANTA_PATH} fill="#7A5CFF" />
        </g>

        {/* Trail lines */}
        {TRAIL_YS.map((ty) => (
          <line
            key={ty}
            x1={INPUT_X}
            y1={ty}
            x2={OUTPUT_X + 64 * (CELL_W + CELL_GAP)}
            y2={ty}
            stroke="#91A2C7"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            opacity="0.08"
          />
        ))}

        {/* Veil glow (pulsing) */}
        <motion.rect
          x={VEIL_X - 20}
          y="20"
          width={VEIL_W + 40}
          height="160"
          rx="12"
          fill="#7A5CFF"
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />

        {/* Veil zone */}
        <rect
          x={VEIL_X}
          y="20"
          width={VEIL_W}
          height="160"
          rx="8"
          fill="url(#veil-grad)"
        />

        {/* Veil brackets */}
        <text x={VEIL_X - 8} y="105" fill="#7A5CFF" fontSize="14" opacity="0.3" fontFamily="monospace">[</text>
        <text x={VEIL_X + VEIL_W + 2} y="105" fill="#7A5CFF" fontSize="14" opacity="0.3" fontFamily="monospace">]</text>

        {/* ── Input bar cells ────────────────────────────── */}
        {Array.from({ length: 64 }, (_, i) => {
          const ix = inputCellX(i);
          const sc = SCATTER[i];
          const scX = VEIL_X + sc.x * 0.3;
          const scY = sc.y + 50;
          const ox = outputCellX(i);
          const baseY = 96;
          const cellDelay = i * 0.02;

          return (
            <motion.rect
              key={`cell-${i}`}
              width={CELL_W}
              height={CELL_W}
              rx="0.5"
              initial={{ x: ix - 10, y: baseY, opacity: 0 }}
              animate={{
                x: [ix - 10, ix, ix, scX, scX, ox, ox, ox],
                y: [baseY, baseY, baseY, scY, scY, baseY, baseY, baseY],
                opacity: [
                  0,
                  cipherMintOpacity(i),
                  cipherMintOpacity(i),
                  scatterOpacity(i),
                  scatterOpacity(i),
                  prismCyanOpacity(i),
                  prismCyanOpacity(i),
                  prismCyanOpacity(i),
                ],
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
              }}
              transition={{
                duration: 6,
                delay: cellDelay,
                ease: "easeInOut" as const,
                times: [0, 0.08, 0.25, 0.42, 0.55, 0.72, 0.88, 1],
                repeat: 0,
              }}
            />
          );
        })}

        {/* ── Idle loop: scattered bits pulsing inside veil ── */}
        {SCATTER.map((pos, i) => (
          <motion.rect
            key={`idle-sc-${i}`}
            x={VEIL_X + pos.x * 0.3}
            y={pos.y + 50}
            width="2"
            height="2"
            rx="0.5"
            fill="#7A5CFF"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [
                scatterOpacity(i) * 0.5,
                scatterOpacity(i),
                scatterOpacity(i) * 0.5,
              ],
            }}
            transition={{
              duration: 20,
              delay: 6 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        ))}

        {/* ── Persistent input bar (fades in after anim) ──── */}
        {Array.from({ length: 64 }, (_, i) => (
          <motion.rect
            key={`in-persist-${i}`}
            x={inputCellX(i)}
            y="96"
            width={CELL_W}
            height={CELL_W}
            rx="0.5"
            fill="#1CF2C7"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, cipherMintOpacity(i)],
            }}
            transition={{
              duration: 8,
              times: [0, 0.75, 1],
              ease: "easeInOut" as const,
            }}
          />
        ))}

        {/* ── Persistent output bar (fades in after anim) ─── */}
        {Array.from({ length: 64 }, (_, i) => (
          <motion.rect
            key={`out-persist-${i}`}
            x={outputCellX(i)}
            y="96"
            width={CELL_W}
            height={CELL_W}
            rx="0.5"
            fill="#46CFFF"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, prismCyanOpacity(i)],
            }}
            transition={{
              duration: 8,
              times: [0, 0.75, 1],
              ease: "easeInOut" as const,
            }}
          />
        ))}

        {/* Labels */}
        <motion.text
          x={INPUT_X}
          y="118"
          fill="#91A2C7"
          fontSize="8"
          opacity="0"
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 6.5 }}
        >
          64-bit word
        </motion.text>
        <motion.text
          x={OUTPUT_X}
          y="118"
          fill="#91A2C7"
          fontSize="8"
          opacity="0"
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 6.5 }}
        >
          64-bit word
        </motion.text>
      </svg>
    </div>
  );
}
