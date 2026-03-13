"use client";

import { motion } from "framer-motion";
import { architecture } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Brand palette ─────────────────────────────────────────── */
const ULTRAVIOLET = "#7A5CFF";
const CIPHER_MINT = "#1CF2C7";
const PRISM_CYAN = "#46CFFF";
const MIST = "#91A2C7";
const VOID = "#050816";

/* ── Helpers ───────────────────────────────────────────────── */
const steps = architecture.steps;
const confidentialSteps = steps.slice(0, 4); // 01–04
const publicStep = steps[4]; // 05

/* ── Animated data packet (glowing dot that travels a path) ── */
function DataPacket({
  path,
  color,
  delay,
  duration,
}: {
  path: string;
  color: string;
  delay: number;
  duration: number;
}) {
  return (
    <g>
      {/* Glow filter */}
      <defs>
        <filter id={`glow-${color.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle r="4" fill={color} filter={`url(#glow-${color.replace("#", "")})`}>
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
          path={path}
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
      {/* Trailing glow */}
      <circle r="8" fill={color} opacity="0.15" filter={`url(#glow-${color.replace("#", "")})`}>
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
          path={path}
        />
        <animate
          attributeName="opacity"
          values="0;0.2;0.2;0"
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
    </g>
  );
}

/* ── Step node (station on the lane) ─────────────────────── */
function StepNode({
  step,
  title,
  body,
  x,
  y,
  isPublic,
  index,
}: {
  step: string;
  title: string;
  body: string;
  x: number;
  y: number;
  isPublic: boolean;
  index: number;
}) {
  const accentColor = isPublic ? CIPHER_MINT : ULTRAVIOLET;

  return (
    <motion.g
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: 0.2 + index * 0.12 }}
    >
      {/* Outer glow ring */}
      <circle cx={x} cy={y} r="28" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.2" />
      <circle cx={x} cy={y} r="22" fill={VOID} stroke={accentColor} strokeWidth="1.5" />
      {/* Inner glow */}
      <circle cx={x} cy={y} r="20" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3">
        <animate attributeName="r" values="16;20;16" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Step number */}
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill={accentColor}
        fontSize="11"
        fontWeight="600"
        fontFamily="inherit"
      >
        {step}
      </text>
      {/* Title below node */}
      <text
        x={x}
        y={y + 48}
        textAnchor="middle"
        fill="#F6F8FF"
        fontSize="13"
        fontWeight="600"
        fontFamily="inherit"
      >
        {title}
      </text>
      {/* Body text, wrapped manually for SVG */}
      <foreignObject x={x - 80} y={y + 56} width="160" height="60">
        <div
          style={{
            color: MIST,
            fontSize: "11px",
            lineHeight: "1.4",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          {body}
        </div>
      </foreignObject>
    </motion.g>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP SVG — dual horizontal lanes
   ═══════════════════════════════════════════════════════════════ */
function DesktopDiagram() {
  const W = 1100;
  const H = 420;
  const confY = 100; // Confidential lane Y
  const pubY = 280; // Public lane Y
  const startX = 80;
  const confGap = (W - 260) / 3; // spacing for 4 nodes on confidential lane

  // Node positions for confidential lane (steps 01–04)
  const confNodes = confidentialSteps.map((_, i) => ({
    x: startX + 50 + i * confGap,
    y: confY,
  }));

  // Public lane node (step 05) — positioned under last confidential node
  const pubNode = { x: confNodes[3].x, y: pubY };

  // Lane paths
  const confLanePath = `M ${startX} ${confY} L ${W - startX} ${confY}`;
  const pubLanePath = `M ${startX} ${pubY} L ${W - startX} ${pubY}`;
  const bridgePath = `M ${pubNode.x} ${confY + 28} L ${pubNode.x} ${pubY - 28}`;

  // Data packet travel paths
  const confPacketPath = `M ${startX - 20} ${confY} L ${confNodes[3].x} ${confY}`;
  const bridgePacketPath = `M ${confNodes[3].x} ${confY} L ${confNodes[3].x} ${pubY}`;
  const pubPacketPath = `M ${confNodes[3].x} ${pubY} L ${W - startX + 20} ${pubY}`;

  return (
    <div className="hidden lg:block w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ maxHeight: "420px" }}
      >
        <defs>
          {/* Confidential lane gradient */}
          <linearGradient id="conf-lane-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={ULTRAVIOLET} stopOpacity="0" />
            <stop offset="15%" stopColor={ULTRAVIOLET} stopOpacity="0.5" />
            <stop offset="85%" stopColor={ULTRAVIOLET} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ULTRAVIOLET} stopOpacity="0" />
          </linearGradient>
          {/* Public lane gradient */}
          <linearGradient id="pub-lane-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={CIPHER_MINT} stopOpacity="0" />
            <stop offset="15%" stopColor={CIPHER_MINT} stopOpacity="0.4" />
            <stop offset="85%" stopColor={CIPHER_MINT} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CIPHER_MINT} stopOpacity="0" />
          </linearGradient>
          {/* Bridge gradient */}
          <linearGradient id="bridge-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={ULTRAVIOLET} stopOpacity="0.6" />
            <stop offset="50%" stopColor={PRISM_CYAN} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CIPHER_MINT} stopOpacity="0.6" />
          </linearGradient>
          {/* Glow filters */}
          <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-mint" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Lane labels ── */}
        <motion.text
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          x={startX - 4}
          y={confY - 44}
          fill={ULTRAVIOLET}
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.1em"
          fontFamily="inherit"
        >
          CONFIDENTIAL LANE
        </motion.text>
        <motion.text
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          x={startX - 4}
          y={pubY - 44}
          fill={CIPHER_MINT}
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.1em"
          fontFamily="inherit"
        >
          PUBLIC LANE
        </motion.text>

        {/* ── Confidential lane line ── */}
        <motion.path
          d={confLanePath}
          stroke="url(#conf-lane-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />
        {/* Confidential lane glow */}
        <motion.path
          d={confLanePath}
          stroke={ULTRAVIOLET}
          strokeWidth="8"
          fill="none"
          opacity="0.06"
          filter="url(#glow-violet)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />

        {/* ── Public lane line ── */}
        <motion.path
          d={pubLanePath}
          stroke="url(#pub-lane-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
        />
        {/* Public lane glow */}
        <motion.path
          d={pubLanePath}
          stroke={CIPHER_MINT}
          strokeWidth="8"
          fill="none"
          opacity="0.05"
          filter="url(#glow-mint)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
        />

        {/* ── Bridge (crossover at step 5) ── */}
        <motion.path
          d={bridgePath}
          stroke="url(#bridge-grad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
        />
        {/* Bridge glow */}
        <motion.path
          d={bridgePath}
          stroke={PRISM_CYAN}
          strokeWidth="6"
          fill="none"
          opacity="0.08"
          filter="url(#glow-violet)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
        />
        {/* Bridge arrow indicator */}
        <motion.polygon
          points={`${pubNode.x - 5},${pubY - 34} ${pubNode.x + 5},${pubY - 34} ${pubNode.x},${pubY - 28}`}
          fill={CIPHER_MINT}
          opacity="0.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.4 }}
        />

        {/* ── Animated data packets ── */}
        {/* Packets flowing along confidential lane */}
        <DataPacket path={confPacketPath} color={ULTRAVIOLET} delay={0} duration={4} />
        <DataPacket path={confPacketPath} color={ULTRAVIOLET} delay={1.3} duration={4} />
        <DataPacket path={confPacketPath} color={ULTRAVIOLET} delay={2.6} duration={4} />
        {/* Packet crossing the bridge */}
        <DataPacket path={bridgePacketPath} color={PRISM_CYAN} delay={0.5} duration={2.5} />
        <DataPacket path={bridgePacketPath} color={PRISM_CYAN} delay={2} duration={2.5} />
        {/* Packets flowing along public lane */}
        <DataPacket path={pubPacketPath} color={CIPHER_MINT} delay={0.8} duration={3} />
        <DataPacket path={pubPacketPath} color={CIPHER_MINT} delay={2.3} duration={3} />

        {/* ── Step nodes on confidential lane ── */}
        {confidentialSteps.map((step, i) => (
          <StepNode
            key={step.step}
            step={step.step}
            title={step.title}
            body={step.body}
            x={confNodes[i].x}
            y={confNodes[i].y}
            isPublic={false}
            index={i}
          />
        ))}

        {/* ── Step node on public lane ── */}
        <StepNode
          step={publicStep.step}
          title={publicStep.title}
          body={publicStep.body}
          x={pubNode.x}
          y={pubNode.y}
          isPublic
          index={4}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE SVG — dual vertical lanes
   ═══════════════════════════════════════════════════════════════ */
function MobileDiagram() {
  const W = 360;
  const nodeSpacing = 140;
  const confX = 60; // Confidential track X
  const pubX = 200; // Public track X (offset right)
  const startY = 70;

  // Confidential nodes (steps 01–04)
  const confNodes = confidentialSteps.map((_, i) => ({
    x: confX,
    y: startY + i * nodeSpacing,
  }));

  const lastConfY = confNodes[3].y;
  const pubNodeY = lastConfY + nodeSpacing;
  const totalH = pubNodeY + 130;

  // Lane paths
  const confLanePath = `M ${confX} ${startY - 30} L ${confX} ${lastConfY + 28}`;
  const bridgePath = `M ${confX + 28} ${lastConfY} C ${confX + 60} ${lastConfY + 40}, ${pubX - 60} ${pubNodeY - 40}, ${pubX - 28} ${pubNodeY}`;
  const pubLanePath = `M ${pubX} ${pubNodeY + 28} L ${pubX} ${pubNodeY + 60}`;

  // Packet paths
  const confPacketPath = `M ${confX} ${startY - 40} L ${confX} ${lastConfY}`;
  const bridgePacketPath = `M ${confX} ${lastConfY} C ${confX + 60} ${lastConfY + 40}, ${pubX - 60} ${pubNodeY - 40}, ${pubX} ${pubNodeY}`;

  return (
    <div className="lg:hidden w-full">
      <svg viewBox={`0 0 ${W} ${totalH}`} className="w-full h-auto">
        <defs>
          <linearGradient id="m-conf-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={ULTRAVIOLET} stopOpacity="0" />
            <stop offset="10%" stopColor={ULTRAVIOLET} stopOpacity="0.5" />
            <stop offset="90%" stopColor={ULTRAVIOLET} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ULTRAVIOLET} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="m-bridge-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={ULTRAVIOLET} stopOpacity="0.5" />
            <stop offset="50%" stopColor={PRISM_CYAN} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CIPHER_MINT} stopOpacity="0.5" />
          </linearGradient>
          <filter id="m-glow-v" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* ── Lane labels ── */}
        <motion.text
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          x={confX}
          y={startY - 46}
          textAnchor="middle"
          fill={ULTRAVIOLET}
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.12em"
          fontFamily="inherit"
        >
          CONFIDENTIAL
        </motion.text>
        <motion.text
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          x={pubX}
          y={pubNodeY - 46}
          textAnchor="middle"
          fill={CIPHER_MINT}
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.12em"
          fontFamily="inherit"
        >
          PUBLIC
        </motion.text>

        {/* ── Confidential lane ── */}
        <motion.path
          d={confLanePath}
          stroke="url(#m-conf-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
        <motion.path
          d={confLanePath}
          stroke={ULTRAVIOLET}
          strokeWidth="6"
          fill="none"
          opacity="0.06"
          filter="url(#m-glow-v)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />

        {/* ── Bridge curve ── */}
        <motion.path
          d={bridgePath}
          stroke="url(#m-bridge-grad)"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
        />

        {/* ── Short public lane tail ── */}
        <motion.path
          d={pubLanePath}
          stroke={CIPHER_MINT}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease, delay: 1.2 }}
        />

        {/* ── Data packets ── */}
        <DataPacket path={confPacketPath} color={ULTRAVIOLET} delay={0} duration={3.5} />
        <DataPacket path={confPacketPath} color={ULTRAVIOLET} delay={1.2} duration={3.5} />
        <DataPacket path={bridgePacketPath} color={PRISM_CYAN} delay={0.6} duration={2} />
        <DataPacket path={bridgePacketPath} color={PRISM_CYAN} delay={1.8} duration={2} />

        {/* ── Confidential step nodes ── */}
        {confidentialSteps.map((step, i) => (
          <g key={step.step}>
            <motion.g
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
            >
              {/* Node circle */}
              <circle cx={confNodes[i].x} cy={confNodes[i].y} r="20" fill={VOID} stroke={ULTRAVIOLET} strokeWidth="1.5" />
              <circle cx={confNodes[i].x} cy={confNodes[i].y} r="24" fill="none" stroke={ULTRAVIOLET} strokeWidth="0.5" opacity="0.2" />
              <text
                x={confNodes[i].x}
                y={confNodes[i].y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={ULTRAVIOLET}
                fontSize="10"
                fontWeight="600"
                fontFamily="inherit"
              >
                {step.step}
              </text>
              {/* Title + body to the right */}
              <foreignObject x={confNodes[i].x + 36} y={confNodes[i].y - 24} width="220" height="70">
                <div style={{ fontFamily: "inherit" }}>
                  <div style={{ color: "#F6F8FF", fontSize: "12px", fontWeight: 600, marginBottom: "3px" }}>
                    {step.title}
                  </div>
                  <div style={{ color: MIST, fontSize: "10px", lineHeight: "1.4" }}>
                    {step.body}
                  </div>
                </div>
              </foreignObject>
            </motion.g>
          </g>
        ))}

        {/* ── Public step node ── */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
        >
          <circle cx={pubX} cy={pubNodeY} r="20" fill={VOID} stroke={CIPHER_MINT} strokeWidth="1.5" />
          <circle cx={pubX} cy={pubNodeY} r="24" fill="none" stroke={CIPHER_MINT} strokeWidth="0.5" opacity="0.2" />
          <text
            x={pubX}
            y={pubNodeY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill={CIPHER_MINT}
            fontSize="10"
            fontWeight="600"
            fontFamily="inherit"
          >
            {publicStep.step}
          </text>
          <foreignObject x={pubX - 140} y={pubNodeY + 30} width="280" height="70">
            <div style={{ fontFamily: "inherit", textAlign: "center" }}>
              <div style={{ color: "#F6F8FF", fontSize: "12px", fontWeight: 600, marginBottom: "3px" }}>
                {publicStep.title}
              </div>
              <div style={{ color: MIST, fontSize: "10px", lineHeight: "1.4" }}>
                {publicStep.body}
              </div>
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ArchitectureFlow() {
  return (
    <section id="architecture" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background radial accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-ultraviolet/[0.03] blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] rounded-full bg-cipher-mint/[0.02] blur-[160px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-8">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud text-left mb-4 leading-[1.1]"
        >
          {architecture.headline}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-mist/60 text-sm md:text-base mb-14 lg:mb-20 max-w-xl"
        >
          Encrypted logic flows through the confidential lane, then settles publicly on Solana.
        </motion.p>

        {/* ── Diagrams ── */}
        <DesktopDiagram />
        <MobileDiagram />

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
          className="mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-10 justify-center"
        >
          <span className="flex items-center gap-2.5 text-xs text-mist/60">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ultraviolet/40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ultraviolet" />
            </span>
            {architecture.legend.confidential}
          </span>
          <span className="flex items-center gap-2.5 text-xs text-mist/60">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cipher-mint/40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cipher-mint" />
            </span>
            {architecture.legend.public}
          </span>
          <span className="flex items-center gap-2.5 text-xs text-mist/40">
            <span className="h-px w-5 border-t border-dashed border-prism-cyan/40" />
            Lane crossover
          </span>
        </motion.div>
      </div>
    </section>
  );
}
