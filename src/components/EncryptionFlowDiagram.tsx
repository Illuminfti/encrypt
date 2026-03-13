"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ================================================================
   Encrypt Protocol — Full-width Encryption Flow Visualization
   Three-stage animated SVG: Plaintext -> FHE Encryption -> Ciphertext
   Features: 8x8 grids, scrambled output, particle flow, lock icon, veil glow
   ================================================================ */

/* ── Design tokens ─────────────────────────────────────────────── */
const MINT = "#1CF2C7";
const VIOLET = "#7A5CFF";
const CYAN = "#46CFFF";
const MIST = "#91A2C7";

/* ── Layout constants (viewBox: 1200 x 520) ────────────────────── */
const VB_W = 1200;
const VB_H = 520;

/* Stage 1: Input grid */
const INPUT_ORIGIN = { x: 60, y: 100 };
const ROWS = 8;
const COLS = 8;
const BLOCK_SIZE = 14;
const BLOCK_GAP = 4;
const BLOCK_R = 2;

/* Stage 2: Veil */
const VEIL = { x: 420, y: 40, w: 360, h: 420, r: 24 };

/* Stage 3: Output grid */
const OUTPUT_ORIGIN = { x: 960, y: 100 };

/* ── Deterministic pseudo-random helper ────────────────────────── */
function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 9301 + salt * 4973) * 49297;
  return x - Math.floor(x);
}

/* ── Input block positions (ordered grid) ──────────────────────── */
function inputPos(row: number, col: number) {
  return {
    x: INPUT_ORIGIN.x + col * (BLOCK_SIZE + BLOCK_GAP),
    y: INPUT_ORIGIN.y + row * (BLOCK_SIZE + BLOCK_GAP),
  };
}

/* ── Output block positions (scrambled/randomized) ─────────────── */
function outputPos(row: number, col: number) {
  const idx = row * COLS + col;
  const offsetX = (seeded(idx, 111) - 0.5) * 28;
  const offsetY = (seeded(idx, 222) - 0.5) * 28;
  return {
    x: OUTPUT_ORIGIN.x + col * (BLOCK_SIZE + BLOCK_GAP) + offsetX,
    y: OUTPUT_ORIGIN.y + row * (BLOCK_SIZE + BLOCK_GAP) + offsetY,
  };
}

/* ── Opacity helpers ───────────────────────────────────────────── */
function mintOpacity(i: number) {
  return 0.45 + seeded(i, 1) * 0.5;
}
function cyanOpacity(i: number) {
  return 0.35 + seeded(i, 2) * 0.55;
}
function scatterOpacity(i: number) {
  return 0.2 + seeded(i, 3) * 0.45;
}

/* ── Scattered bits inside veil (deterministic) ────────────────── */
const SCATTER_COUNT = 90;
const SCATTERED_BITS = Array.from({ length: SCATTER_COUNT }, (_, i) => ({
  x: VEIL.x + 30 + seeded(i, 10) * (VEIL.w - 60),
  y: VEIL.y + 30 + seeded(i, 20) * (VEIL.h - 60),
  rot: seeded(i, 30) * 360,
  size: 3 + seeded(i, 40) * 5,
  opacity: scatterOpacity(i),
}));

/* ── Grid lines inside veil ────────────────────────────────────── */
const VEIL_GRID_LINES_H = 12;
const VEIL_GRID_LINES_V = 10;

/* ── Connection paths (input -> veil, veil -> output) ──────────── */
function inputToVeilPath(row: number): string {
  const startX = INPUT_ORIGIN.x + COLS * (BLOCK_SIZE + BLOCK_GAP) + 8;
  const startY = INPUT_ORIGIN.y + row * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;
  const endX = VEIL.x;
  const endY = VEIL.y + 40 + row * ((VEIL.h - 80) / (ROWS - 1));
  const cp1x = startX + (endX - startX) * 0.45;
  const cp2x = startX + (endX - startX) * 0.55;
  const cp1y = startY + (seeded(row, 50) - 0.5) * 30;
  const cp2y = endY + (seeded(row, 60) - 0.5) * 30;
  return `M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
}

function veilToOutputPath(row: number): string {
  const startX = VEIL.x + VEIL.w;
  const startY = VEIL.y + 40 + row * ((VEIL.h - 80) / (ROWS - 1));
  const endX = OUTPUT_ORIGIN.x - 8;
  const endY = OUTPUT_ORIGIN.y + row * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;
  const cp1x = startX + (endX - startX) * 0.45;
  const cp2x = startX + (endX - startX) * 0.55;
  const cp1y = startY + (seeded(row, 70) - 0.5) * 30;
  const cp2y = endY + (seeded(row, 80) - 0.5) * 30;
  return `M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
}

/* ── Particle flow paths (animated data particles) ─────────────── */
const PARTICLE_COUNT_LEFT = 10;
const PARTICLE_COUNT_RIGHT = 10;
const PARTICLE_PATHS_LEFT = Array.from({ length: PARTICLE_COUNT_LEFT }, (_, i) => {
  const row = Math.floor(seeded(i, 200) * ROWS);
  return inputToVeilPath(row);
});
const PARTICLE_PATHS_RIGHT = Array.from({ length: PARTICLE_COUNT_RIGHT }, (_, i) => {
  const row = Math.floor(seeded(i, 300) * ROWS);
  return veilToOutputPath(row);
});

/* ── Timing ────────────────────────────────────────────────────── */
const T = {
  inputStagger: 0.018,
  inputDuration: 0.35,
  inputDone: 0.018 * 64 + 0.35,
  leftLinesStart: 0.6,
  leftLinesDuration: 0.8,
  particlesLeftStart: 1.0,
  scatterStart: 1.2,
  scatterStagger: 0.012,
  rightLinesStart: 1.8,
  rightLinesDuration: 0.8,
  particlesRightStart: 2.0,
  outputStart: 2.2,
  outputStagger: 0.02,
  outputDuration: 0.4,
  idleStart: 3.4,
};

/* ── Ease ──────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

/* ── Lock icon path (centered at 0,0, ~40px) ──────────────────── */
const LOCK_PATH =
  "M-10,-6 L-10,-12 C-10,-19 -5,-24 0,-24 C5,-24 10,-19 10,-12 L10,-6 M-14,-6 L14,-6 L14,14 L-14,14 Z M-3,2 C-3,-0.5 -1.5,-2 0,-2 C1.5,-2 3,-0.5 3,2 L2,8 L-2,8 Z";

/* ================================================================
   Component
   ================================================================ */
export default function EncryptionFlowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  /* ── Build block indices ──────────────────────────────────────── */
  const blocks: { row: number; col: number; idx: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      blocks.push({ row: r, col: c, idx: r * COLS + c });
    }
  }

  /* ── SVG defs ────────────────────────────────────────────────── */
  const svgDefs = (
    <defs>
      {/* Veil gradient */}
      <linearGradient id="enc-veil-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={VIOLET} stopOpacity="0.06" />
        <stop offset="35%" stopColor={VIOLET} stopOpacity="0.2" />
        <stop offset="50%" stopColor="#9B7AFF" stopOpacity="0.25" />
        <stop offset="65%" stopColor={VIOLET} stopOpacity="0.2" />
        <stop offset="100%" stopColor={VIOLET} stopOpacity="0.06" />
      </linearGradient>

      {/* Veil glow filter */}
      <filter id="enc-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="0 0 0 0 0.478  0 0 0 0 0.361  0 0 0 0 1  0 0 0 0.7 0"
        />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Inner glow for veil edge */}
      <filter id="enc-inner-glow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
      </filter>

      {/* Particle glow */}
      <filter id="enc-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>

      {/* Lock glow */}
      <filter id="enc-lock-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="0 0 0 0 0.478  0 0 0 0 0.361  0 0 0 0 1  0 0 0 0.5 0"
        />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Connection line gradient left */}
      <linearGradient id="enc-line-left" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={MINT} stopOpacity="0.5" />
        <stop offset="100%" stopColor={VIOLET} stopOpacity="0.3" />
      </linearGradient>

      {/* Connection line gradient right */}
      <linearGradient id="enc-line-right" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={VIOLET} stopOpacity="0.3" />
        <stop offset="100%" stopColor={CYAN} stopOpacity="0.5" />
      </linearGradient>

      {/* Veil border gradient */}
      <linearGradient id="enc-veil-border" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={VIOLET} stopOpacity="0.5" />
        <stop offset="50%" stopColor="#9B7AFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor={VIOLET} stopOpacity="0.4" />
      </linearGradient>

      {/* Radial glow for veil center */}
      <radialGradient id="enc-veil-center-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={VIOLET} stopOpacity="0.15" />
        <stop offset="60%" stopColor={VIOLET} stopOpacity="0.05" />
        <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  /* ── Label Y position ────────────────────────────────────────── */
  const labelY = INPUT_ORIGIN.y + ROWS * (BLOCK_SIZE + BLOCK_GAP) + 28;

  /* ── Veil internal grid ──────────────────────────────────────── */
  const veilGridLines = (
    <>
      {Array.from({ length: VEIL_GRID_LINES_H }, (_, i) => {
        const y = VEIL.y + (VEIL.h / (VEIL_GRID_LINES_H + 1)) * (i + 1);
        return (
          <line
            key={`vgh-${i}`}
            x1={VEIL.x + 12}
            y1={y}
            x2={VEIL.x + VEIL.w - 12}
            y2={y}
            stroke={VIOLET}
            strokeWidth="0.5"
          />
        );
      })}
      {Array.from({ length: VEIL_GRID_LINES_V }, (_, i) => {
        const x = VEIL.x + (VEIL.w / (VEIL_GRID_LINES_V + 1)) * (i + 1);
        return (
          <line
            key={`vgv-${i}`}
            x1={x}
            y1={VEIL.y + 12}
            x2={x}
            y2={VEIL.y + VEIL.h - 12}
            stroke={VIOLET}
            strokeWidth="0.5"
          />
        );
      })}
    </>
  );

  /* ── Input grid center X for label ───────────────────────────── */
  const inputCenterX = INPUT_ORIGIN.x + (COLS * (BLOCK_SIZE + BLOCK_GAP) - BLOCK_GAP) / 2;
  const outputCenterX = OUTPUT_ORIGIN.x + (COLS * (BLOCK_SIZE + BLOCK_GAP) - BLOCK_GAP) / 2;

  /* ================================================================
     Reduced motion — static final state
     ================================================================ */
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full" style={{ minHeight: "500px" }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto"
          aria-label="Encryption flow: plaintext data is encrypted via FHE into ciphertext"
          role="img"
        >
          {svgDefs}

          {/* Input blocks */}
          {blocks.map(({ row, col, idx }) => {
            const p = inputPos(row, col);
            return (
              <rect
                key={`si-${idx}`}
                x={p.x}
                y={p.y}
                width={BLOCK_SIZE}
                height={BLOCK_SIZE}
                rx={BLOCK_R}
                fill={MINT}
                opacity={mintOpacity(idx)}
              />
            );
          })}
          <text x={inputCenterX} y={labelY} fill={MIST} fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">
            Plaintext
          </text>

          {/* Left connections */}
          {Array.from({ length: ROWS }, (_, r) => (
            <path key={`slc-${r}`} d={inputToVeilPath(r)} stroke={MINT} strokeWidth="1" strokeDasharray="6 8" fill="none" opacity="0.2" />
          ))}

          {/* Veil */}
          <rect x={VEIL.x - 20} y={VEIL.y - 20} width={VEIL.w + 40} height={VEIL.h + 40} rx={VEIL.r + 8} fill={VIOLET} opacity="0.06" filter="url(#enc-inner-glow)" />
          <rect x={VEIL.x} y={VEIL.y} width={VEIL.w} height={VEIL.h} rx={VEIL.r} fill="url(#enc-veil-grad)" />
          <rect x={VEIL.x} y={VEIL.y} width={VEIL.w} height={VEIL.h} rx={VEIL.r} fill="url(#enc-veil-center-glow)" />
          <rect x={VEIL.x} y={VEIL.y} width={VEIL.w} height={VEIL.h} rx={VEIL.r} fill="none" stroke="url(#enc-veil-border)" strokeWidth="1" />
          <g opacity="0.06">{veilGridLines}</g>
          {SCATTERED_BITS.map((bit, i) => (
            <rect key={`ssb-${i}`} x={bit.x} y={bit.y} width={bit.size} height={bit.size} rx={1} fill={VIOLET} opacity={bit.opacity} transform={`rotate(${bit.rot} ${bit.x + bit.size / 2} ${bit.y + bit.size / 2})`} />
          ))}
          {/* Lock icon */}
          <g transform={`translate(${VEIL.x + VEIL.w / 2}, ${VEIL.y + VEIL.h / 2})`} filter="url(#enc-lock-glow)">
            <path d={LOCK_PATH} fill={VIOLET} opacity="0.35" />
          </g>
          <text x={VEIL.x + VEIL.w / 2} y={labelY} fill={MIST} fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">
            FHE Encryption
          </text>

          {/* Right connections */}
          {Array.from({ length: ROWS }, (_, r) => (
            <path key={`src-${r}`} d={veilToOutputPath(r)} stroke={CYAN} strokeWidth="1" strokeDasharray="6 8" fill="none" opacity="0.2" />
          ))}

          {/* Output blocks (scrambled) */}
          {blocks.map(({ row, col, idx }) => {
            const p = outputPos(row, col);
            return (
              <rect key={`so-${idx}`} x={p.x} y={p.y} width={BLOCK_SIZE} height={BLOCK_SIZE} rx={BLOCK_R} fill={CYAN} opacity={cyanOpacity(idx)} />
            );
          })}
          <text x={outputCenterX} y={labelY} fill={MIST} fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">
            Ciphertext
          </text>
        </svg>
      </div>
    );
  }

  /* ================================================================
     Animated version
     ================================================================ */
  return (
    <div className="relative w-full" style={{ minHeight: "500px" }}>
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto"
        aria-label="Encryption flow: plaintext data is encrypted via FHE into ciphertext"
        role="img"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {svgDefs}

        {/* ── Stage 1: Input blocks (8x8 ordered grid) ──────────── */}
        {blocks.map(({ row, col, idx }) => {
          const p = inputPos(row, col);
          const delay = idx * T.inputStagger;
          return (
            <motion.rect
              key={`i-${idx}`}
              x={p.x}
              y={p.y}
              width={BLOCK_SIZE}
              height={BLOCK_SIZE}
              rx={BLOCK_R}
              fill={MINT}
              variants={{
                hidden: { opacity: 0, x: p.x - 24 },
                visible: {
                  opacity: mintOpacity(idx),
                  x: p.x,
                  transition: { duration: T.inputDuration, delay, ease },
                },
              }}
            />
          );
        })}

        {/* Input label */}
        <motion.text
          x={inputCenterX}
          y={labelY}
          fill={MIST}
          fontSize="13"
          fontFamily="monospace"
          textAnchor="middle"
          variants={{
            hidden: { opacity: 0, y: labelY + 8 },
            visible: {
              opacity: 0.7,
              y: labelY,
              transition: { duration: 0.5, delay: T.inputDone * 0.5 },
            },
          }}
        >
          Plaintext
        </motion.text>

        {/* ── Left connection lines (input -> veil) ────────────── */}
        {Array.from({ length: ROWS }, (_, r) => {
          const d = inputToVeilPath(r);
          return (
            <motion.path
              key={`lc-${r}`}
              d={d}
              stroke="url(#enc-line-left)"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.35,
                  transition: {
                    pathLength: {
                      duration: T.leftLinesDuration,
                      delay: T.leftLinesStart + r * 0.04,
                      ease,
                    },
                    opacity: {
                      duration: 0.3,
                      delay: T.leftLinesStart + r * 0.04,
                    },
                  },
                },
              }}
            />
          );
        })}

        {/* ── Data particles flowing left -> veil ──────────────── */}
        {PARTICLE_PATHS_LEFT.map((pathD, i) => (
          <motion.circle
            key={`dp-l-${i}`}
            r="3"
            fill={MINT}
            filter="url(#enc-particle-glow)"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: [0, 0.8, 0.8, 0],
                offsetDistance: ["0%", "30%", "70%", "100%"],
                transition: {
                  duration: 1.8,
                  delay: T.particlesLeftStart + i * 0.15,
                  ease: "easeInOut",
                },
              },
            }}
            style={{ offsetPath: `path("${pathD}")` }}
          />
        ))}

        {/* ── Stage 2: Veil zone ───────────────────────────────── */}

        {/* Outer glow */}
        <motion.rect
          x={VEIL.x - 35}
          y={VEIL.y - 35}
          width={VEIL.w + 70}
          height={VEIL.h + 70}
          rx={VEIL.r + 20}
          fill={VIOLET}
          filter="url(#enc-inner-glow)"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 0.1, 0.05],
              transition: {
                duration: 2,
                delay: T.scatterStart - 0.3,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Pulsing outer glow (idle loop) */}
        <motion.rect
          x={VEIL.x - 35}
          y={VEIL.y - 35}
          width={VEIL.w + 70}
          height={VEIL.h + 70}
          rx={VEIL.r + 20}
          fill={VIOLET}
          filter="url(#enc-inner-glow)"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 0, 0.04, 0.1, 0.04],
              transition: {
                duration: 4,
                delay: T.idleStart,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Veil body */}
        <motion.rect
          x={VEIL.x}
          y={VEIL.y}
          width={VEIL.w}
          height={VEIL.h}
          rx={VEIL.r}
          fill="url(#enc-veil-grad)"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8, delay: T.scatterStart - 0.4, ease },
            },
          }}
        />

        {/* Veil center radial glow */}
        <motion.rect
          x={VEIL.x}
          y={VEIL.y}
          width={VEIL.w}
          height={VEIL.h}
          rx={VEIL.r}
          fill="url(#enc-veil-center-glow)"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 1, delay: T.scatterStart, ease },
            },
          }}
        />

        {/* Veil border */}
        <motion.rect
          x={VEIL.x}
          y={VEIL.y}
          width={VEIL.w}
          height={VEIL.h}
          rx={VEIL.r}
          fill="none"
          stroke="url(#enc-veil-border)"
          strokeWidth="1"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8, delay: T.scatterStart - 0.2, ease },
            },
          }}
        />

        {/* Veil internal grid */}
        <motion.g
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 0.06,
              transition: { duration: 1, delay: T.scatterStart, ease },
            },
          }}
        >
          {veilGridLines}
        </motion.g>

        {/* Scattered encrypted bits (fade in) */}
        {SCATTERED_BITS.map((bit, i) => (
          <motion.rect
            key={`sb-${i}`}
            x={bit.x}
            y={bit.y}
            width={bit.size}
            height={bit.size}
            rx={1}
            fill={VIOLET}
            transform={`rotate(${bit.rot} ${bit.x + bit.size / 2} ${bit.y + bit.size / 2})`}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: bit.opacity,
                transition: {
                  duration: 0.5,
                  delay: T.scatterStart + i * T.scatterStagger,
                  ease,
                },
              },
            }}
          />
        ))}

        {/* Scattered bits breathing idle */}
        {SCATTERED_BITS.map((bit, i) => (
          <motion.rect
            key={`sb-idle-${i}`}
            x={bit.x}
            y={bit.y}
            width={bit.size}
            height={bit.size}
            rx={1}
            fill={VIOLET}
            transform={`rotate(${bit.rot} ${bit.x + bit.size / 2} ${bit.y + bit.size / 2})`}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: [
                  0,
                  0,
                  bit.opacity * 0.5,
                  bit.opacity,
                  bit.opacity * 0.5,
                ],
                transition: {
                  duration: 3 + seeded(i, 99) * 2,
                  delay: T.idleStart + seeded(i, 88) * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.01, 0.3, 0.6, 1],
                },
              },
            }}
          />
        ))}

        {/* Lock icon in veil center */}
        <motion.g
          transform={`translate(${VEIL.x + VEIL.w / 2}, ${VEIL.y + VEIL.h / 2})`}
          filter="url(#enc-lock-glow)"
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.6,
                delay: T.scatterStart + 0.3,
                ease,
              },
            },
          }}
        >
          <motion.path
            d={LOCK_PATH}
            fill={VIOLET}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: [0, 0.35, 0.25, 0.35],
                transition: {
                  duration: 3,
                  delay: T.idleStart,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
        </motion.g>

        {/* Veil label */}
        <motion.text
          x={VEIL.x + VEIL.w / 2}
          y={labelY}
          fill={MIST}
          fontSize="13"
          fontFamily="monospace"
          textAnchor="middle"
          variants={{
            hidden: { opacity: 0, y: labelY + 8 },
            visible: {
              opacity: 0.7,
              y: labelY,
              transition: { duration: 0.5, delay: T.scatterStart + 0.5 },
            },
          }}
        >
          FHE Encryption
        </motion.text>

        {/* ── Right connection lines (veil -> output) ──────────── */}
        {Array.from({ length: ROWS }, (_, r) => {
          const d = veilToOutputPath(r);
          return (
            <motion.path
              key={`rc-${r}`}
              d={d}
              stroke="url(#enc-line-right)"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.35,
                  transition: {
                    pathLength: {
                      duration: T.rightLinesDuration,
                      delay: T.rightLinesStart + r * 0.04,
                      ease,
                    },
                    opacity: {
                      duration: 0.3,
                      delay: T.rightLinesStart + r * 0.04,
                    },
                  },
                },
              }}
            />
          );
        })}

        {/* ── Data particles flowing veil -> output ────────────── */}
        {PARTICLE_PATHS_RIGHT.map((pathD, i) => (
          <motion.circle
            key={`dp-r-${i}`}
            r="3"
            fill={CYAN}
            filter="url(#enc-particle-glow)"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: [0, 0.8, 0.8, 0],
                offsetDistance: ["0%", "30%", "70%", "100%"],
                transition: {
                  duration: 1.8,
                  delay: T.particlesRightStart + i * 0.15,
                  ease: "easeInOut",
                },
              },
            }}
            style={{ offsetPath: `path("${pathD}")` }}
          />
        ))}

        {/* ── Stage 3: Output blocks (scrambled positions) ──────── */}
        {blocks.map(({ row, col, idx }) => {
          const p = outputPos(row, col);
          const delay = T.outputStart + idx * T.outputStagger;
          const rotation = (seeded(idx, 333) - 0.5) * 30;
          return (
            <motion.rect
              key={`o-${idx}`}
              x={p.x}
              y={p.y}
              width={BLOCK_SIZE}
              height={BLOCK_SIZE}
              rx={BLOCK_R}
              fill={CYAN}
              variants={{
                hidden: { opacity: 0, x: p.x + 24 },
                visible: {
                  opacity: cyanOpacity(idx),
                  x: p.x,
                  rotate: rotation,
                  transition: { duration: T.outputDuration, delay, ease },
                },
              }}
            />
          );
        })}

        {/* Output label */}
        <motion.text
          x={outputCenterX}
          y={labelY}
          fill={MIST}
          fontSize="13"
          fontFamily="monospace"
          textAnchor="middle"
          variants={{
            hidden: { opacity: 0, y: labelY + 8 },
            visible: {
              opacity: 0.7,
              y: labelY,
              transition: { duration: 0.5, delay: T.outputStart + 1.2 },
            },
          }}
        >
          Ciphertext
        </motion.text>

        {/* ── Idle: continuous flowing particles (left) ─────────── */}
        {Array.from({ length: 8 }, (_, i) => {
          const row = Math.floor(seeded(i, 400) * ROWS);
          const pathD = inputToVeilPath(row);
          return (
            <motion.circle
              key={`fp-l-${i}`}
              r="2.5"
              fill={MINT}
              filter="url(#enc-particle-glow)"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: [0, 0.7, 0.7, 0],
                  offsetDistance: ["0%", "20%", "80%", "100%"],
                  transition: {
                    duration: 2.2 + seeded(i, 410) * 1.2,
                    delay: T.idleStart + i * 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  },
                },
              }}
              style={{ offsetPath: `path("${pathD}")` }}
            />
          );
        })}

        {/* ── Idle: continuous flowing particles (right) ────────── */}
        {Array.from({ length: 8 }, (_, i) => {
          const row = Math.floor(seeded(i, 500) * ROWS);
          const pathD = veilToOutputPath(row);
          return (
            <motion.circle
              key={`fp-r-${i}`}
              r="2.5"
              fill={CYAN}
              filter="url(#enc-particle-glow)"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: [0, 0.7, 0.7, 0],
                  offsetDistance: ["0%", "20%", "80%", "100%"],
                  transition: {
                    duration: 2.2 + seeded(i, 510) * 1.2,
                    delay: T.idleStart + 0.3 + i * 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  },
                },
              }}
              style={{ offsetPath: `path("${pathD}")` }}
            />
          );
        })}

        {/* ── Decorative: corner accent dots on veil ────────────── */}
        {[
          { cx: VEIL.x + 16, cy: VEIL.y + 16 },
          { cx: VEIL.x + VEIL.w - 16, cy: VEIL.y + 16 },
          { cx: VEIL.x + 16, cy: VEIL.y + VEIL.h - 16 },
          { cx: VEIL.x + VEIL.w - 16, cy: VEIL.y + VEIL.h - 16 },
        ].map((pos, i) => (
          <motion.circle
            key={`corner-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            r="3"
            fill={VIOLET}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 0.5,
                scale: 1,
                transition: { duration: 0.4, delay: T.scatterStart + 0.2 + i * 0.1, ease },
              },
            }}
          />
        ))}

        {/* ── Decorative: hex strings inside veil ──────────────── */}
        {Array.from({ length: 5 }, (_, i) => {
          const y = VEIL.y + 55 + i * 75;
          const hex = Array.from(
            { length: 16 },
            (_, j) => "0123456789abcdef"[Math.floor(seeded(i * 16 + j, 500) * 16)]
          ).join("");
          return (
            <motion.text
              key={`hex-${i}`}
              x={VEIL.x + VEIL.w / 2}
              y={y}
              fill={VIOLET}
              fontSize="9"
              fontFamily="monospace"
              textAnchor="middle"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 0.07,
                  transition: { duration: 0.8, delay: T.scatterStart + 0.3 + i * 0.15 },
                },
              }}
            >
              0x{hex}
            </motion.text>
          );
        })}
      </motion.svg>
    </div>
  );
}
