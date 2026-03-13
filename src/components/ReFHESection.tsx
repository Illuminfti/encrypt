"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const bullets = [
  "Arithmetic + logical operations on encrypted data",
  "Machine-word compute over 64-bit values",
  "Designed for distributed network execution",
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function BitDecompDiagram() {
  const prefersReducedMotion = useReducedMotion();
  const CELLS = 8;
  const SIZE = 22;
  const GAP = 3;
  const barWidth = CELLS * (SIZE + GAP) - GAP;

  // Scatter positions for each bit cell
  const scatterPositions = [
    { x: 195, y: 15 },
    { x: 210, y: 50 },
    { x: 185, y: 75 },
    { x: 220, y: 30 },
    { x: 200, y: 90 },
    { x: 215, y: 65 },
    { x: 190, y: 45 },
    { x: 225, y: 80 },
  ];

  return (
    <svg viewBox="0 0 420 140" className="w-full max-w-md mx-auto">
      <defs>
        <filter id="refheGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Labels */}
      <text x={barWidth / 2} y="12" textAnchor="middle" fill="#91A2C7" fontSize="9" fontFamily="var(--font-inter), sans-serif">
        Plaintext word
      </text>
      <text x="207" y="12" textAnchor="middle" fill="#91A2C7" fontSize="9" fontFamily="var(--font-inter), sans-serif">
        Bit decomposition
      </text>
      <text x={420 - barWidth / 2} y="12" textAnchor="middle" fill="#91A2C7" fontSize="9" fontFamily="var(--font-inter), sans-serif">
        Encrypted output
      </text>

      {/* Arrows */}
      <line x1={barWidth + 8} y1="60" x2="170" y2="60" stroke="#91A2C7" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
      <line x1="240" y1="60" x2={420 - barWidth - 8} y2="60" stroke="#91A2C7" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
      <polygon points="170,57 176,60 170,63" fill="#91A2C7" opacity="0.4" />
      <polygon points={`${420 - barWidth - 8},57 ${420 - barWidth - 2},60 ${420 - barWidth - 8},63`} fill="#91A2C7" opacity="0.4" />

      {/* Input bar cells */}
      {Array.from({ length: CELLS }).map((_, i) => (
        <motion.rect
          key={`in-${i}`}
          x={i * (SIZE + GAP)}
          y="49"
          width={SIZE}
          height={SIZE}
          rx="3"
          fill="#1CF2C7"
          filter="url(#refheGlow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        />
      ))}

      {/* Scattered bit cells */}
      {scatterPositions.map((pos, i) => (
        <motion.rect
          key={`scatter-${i}`}
          width={10}
          height={10}
          rx="2"
          fill="#7A5CFF"
          initial={{ opacity: 0, x: 207, y: 55 }}
          whileInView={
            prefersReducedMotion
              ? { opacity: 0.7, x: pos.x, y: pos.y }
              : { opacity: [0, 0.7, 0.7], x: [207, pos.x, pos.x], y: [55, pos.y, pos.y] }
          }
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: "easeOut" as const }}
        />
      ))}

      {/* Output bar cells */}
      {Array.from({ length: CELLS }).map((_, i) => (
        <motion.rect
          key={`out-${i}`}
          x={420 - barWidth + i * (SIZE + GAP)}
          y="49"
          width={SIZE}
          height={SIZE}
          rx="3"
          fill="#46CFFF"
          filter="url(#refheGlow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ delay: 1 + i * 0.05, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

export default function ReFHESection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h2
              variants={fadeIn}
              className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-8 leading-tight"
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-cipher-mint to-prism-cyan bg-clip-text text-transparent">
                real application logic
              </span>
            </motion.h2>

            <motion.ul variants={fadeIn} className="space-y-4 mb-8">
              {bullets.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-cipher-mint/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-cipher-mint" />
                  </div>
                  <span className="text-cloud text-sm leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeIn}
              className="text-mist text-sm leading-relaxed max-w-lg"
            >
              RE-FHE supports real application logic — comparisons, branching,
              scoring, and decision-making on encrypted data. Not toy encrypted
              math.
            </motion.p>
          </motion.div>

          {/* Right column - diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-abyss border border-white/5 rounded-2xl p-8 lg:p-10"
          >
            <BitDecompDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
