"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fheTls } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Animated typing effect ── */
function TypeWriter({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <span ref={ref}>
      {displayed}
      <span className="animate-pulse text-prism-cyan">|</span>
    </span>
  );
}

/* ── SVG Pipeline Diagram ── */
function PipelineDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      {/* Desktop horizontal pipeline */}
      <svg
        viewBox="0 0 1000 260"
        className="hidden md:block w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FHE-TLS encrypted API flow diagram"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#46CFFF" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#7A5CFF" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          {/* Tunnel gradient */}
          <linearGradient id="tunnel-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#46CFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="tunnel-border" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#46CFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Packet gradient */}
          <radialGradient id="packet-glow">
            <stop offset="0%" stopColor="#46CFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#46CFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#46CFFF" stopOpacity="0" />
          </radialGradient>

          {/* Data packet animation paths */}
          <path id="tunnel1-path" d="M 195 130 L 400 130" />
          <path id="tunnel2-path" d="M 600 130 L 805 130" />
        </defs>

        {/* Background ambient glow */}
        <ellipse cx="500" cy="130" rx="400" ry="100" fill="#7A5CFF" opacity="0.03" filter="url(#soft-glow)" />

        {/* ── Tunnel 1: Encrypt Program → External API ── */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.8s ease 0.3s" }}>
          {/* Tunnel body */}
          <rect x="195" y="100" width="205" height="60" rx="30" fill="url(#tunnel-grad)" />
          <rect x="195" y="100" width="205" height="60" rx="30" fill="none" stroke="url(#tunnel-border)" strokeWidth="1" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* Inner glow line */}
          <line x1="210" y1="130" x2="385" y2="130" stroke="#46CFFF" strokeWidth="1" opacity="0.15" />

          {/* Flowing data packets */}
          <circle r="4" fill="#46CFFF" filter="url(#glow-cyan)" opacity="0.9">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="0s" />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#7A5CFF" filter="url(#glow-violet)" opacity="0.7">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="0.7s" />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="3.5" fill="#46CFFF" filter="url(#glow-cyan)" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="1.3s" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Label */}
          <text x="297" y="92" textAnchor="middle" fill="#91A2C7" fontSize="10" fontFamily="monospace" opacity="0.6">
            encrypted tunnel
          </text>
        </g>

        {/* ── Tunnel 2: External API → Solana ── */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.8s ease 0.5s" }}>
          <rect x="600" y="100" width="205" height="60" rx="30" fill="url(#tunnel-grad)" />
          <rect x="600" y="100" width="205" height="60" rx="30" fill="none" stroke="url(#tunnel-border)" strokeWidth="1" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </rect>

          <line x1="615" y1="130" x2="790" y2="130" stroke="#46CFFF" strokeWidth="1" opacity="0.15" />

          <circle r="4" fill="#46CFFF" filter="url(#glow-cyan)" opacity="0.9">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="0.2s" />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#7A5CFF" filter="url(#glow-violet)" opacity="0.7">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="0.9s" />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle r="3.5" fill="#46CFFF" filter="url(#glow-cyan)" opacity="0.8">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 0,0 L 205,0" begin="1.5s" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.2s" repeatCount="indefinite" />
          </circle>

          <text x="702" y="92" textAnchor="middle" fill="#91A2C7" fontSize="10" fontFamily="monospace" opacity="0.6">
            encrypted tunnel
          </text>
        </g>

        {/* ── Node: Encrypt Program ── */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.1s" }}>
          {/* Glow behind */}
          <rect x="40" y="96" width="155" height="68" rx="16" fill="#7A5CFF" opacity="0.08" filter="url(#soft-glow)" />
          {/* Card */}
          <rect x="40" y="96" width="155" height="68" rx="16" fill="#0B1123" stroke="#7A5CFF" strokeWidth="1.5" />
          {/* Icon: lock */}
          <g transform="translate(68, 118)">
            <rect x="0" y="6" width="14" height="11" rx="2" fill="none" stroke="#7A5CFF" strokeWidth="1.5" />
            <path d="M3 6V4a4 4 0 0 1 8 0v2" fill="none" stroke="#7A5CFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <text x="92" y="136" textAnchor="start" fill="#F6F8FF" fontSize="12" fontWeight="600" fontFamily="system-ui">
            Encrypt
          </text>
          <text x="92" y="149" textAnchor="start" fill="#91A2C7" fontSize="10" fontFamily="system-ui">
            Program
          </text>
        </g>

        {/* ── Node: External API ── */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.4s" }}>
          <rect x="400" y="96" width="200" height="68" rx="16" fill="#46CFFF" opacity="0.06" filter="url(#soft-glow)" />
          <rect x="400" y="96" width="200" height="68" rx="16" fill="#0B1123" stroke="#46CFFF" strokeWidth="1.5" />
          {/* Icon: globe/api */}
          <g transform="translate(426, 118)">
            <circle cx="8" cy="8" r="7" fill="none" stroke="#46CFFF" strokeWidth="1.2" />
            <ellipse cx="8" cy="8" rx="3" ry="7" fill="none" stroke="#46CFFF" strokeWidth="1" />
            <line x1="1" y1="8" x2="15" y2="8" stroke="#46CFFF" strokeWidth="1" />
          </g>
          <text x="450" y="136" textAnchor="start" fill="#F6F8FF" fontSize="12" fontWeight="600" fontFamily="system-ui">
            External API
          </text>
          <text x="450" y="149" textAnchor="start" fill="#91A2C7" fontSize="10" fontFamily="system-ui">
            Private read/write
          </text>
        </g>

        {/* ── Node: Solana ── */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.6s" }}>
          <rect x="805" y="96" width="155" height="68" rx="16" fill="#7A5CFF" opacity="0.08" filter="url(#soft-glow)" />
          <rect x="805" y="96" width="155" height="68" rx="16" fill="#0B1123" stroke="#7A5CFF" strokeWidth="1.5" />
          {/* Icon: chain/block */}
          <g transform="translate(833, 117)">
            <rect x="0" y="2" width="8" height="14" rx="2" fill="none" stroke="#1CF2C7" strokeWidth="1.2" />
            <rect x="6" y="2" width="8" height="14" rx="2" fill="none" stroke="#1CF2C7" strokeWidth="1.2" />
          </g>
          <text x="855" y="136" textAnchor="start" fill="#F6F8FF" fontSize="12" fontWeight="600" fontFamily="system-ui">
            Solana
          </text>
          <text x="855" y="149" textAnchor="start" fill="#91A2C7" fontSize="10" fontFamily="system-ui">
            Verifiable action
          </text>
        </g>

        {/* Directional arrows on tunnels */}
        <g opacity={inView ? 0.5 : 0} style={{ transition: "opacity 0.8s ease 0.6s" }}>
          <polygon points="390,130 380,124 380,136" fill="#46CFFF" opacity="0.6" />
          <polygon points="795,130 785,124 785,136" fill="#46CFFF" opacity="0.6" />
        </g>
      </svg>

      {/* Mobile vertical pipeline */}
      <svg
        viewBox="0 0 320 580"
        className="block md:hidden w-full max-w-[320px] mx-auto h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FHE-TLS encrypted API flow diagram"
      >
        <defs>
          <filter id="m-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#46CFFF" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="m-glow-violet" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#7A5CFF" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="m-tunnel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#46CFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="m-tunnel-border" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5CFF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#46CFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Node: Encrypt Program */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.1s" }}>
          <rect x="60" y="10" width="200" height="60" rx="14" fill="#0B1123" stroke="#7A5CFF" strokeWidth="1.5" />
          <g transform="translate(82, 28)">
            <rect x="0" y="6" width="12" height="10" rx="2" fill="none" stroke="#7A5CFF" strokeWidth="1.3" />
            <path d="M2.5 6V4a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="#7A5CFF" strokeWidth="1.3" strokeLinecap="round" />
          </g>
          <text x="106" y="44" fill="#F6F8FF" fontSize="13" fontWeight="600" fontFamily="system-ui">Encrypt Program</text>
        </g>

        {/* Tunnel 1 */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.8s ease 0.3s" }}>
          <rect x="130" y="70" width="60" height="140" rx="30" fill="url(#m-tunnel-grad)" />
          <rect x="130" y="70" width="60" height="140" rx="30" fill="none" stroke="url(#m-tunnel-border)" strokeWidth="1" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </rect>
          <circle r="3.5" fill="#46CFFF" filter="url(#m-glow-cyan)" opacity="0.9">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 0,0 L 0,140" begin="0s" />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#7A5CFF" filter="url(#m-glow-violet)" opacity="0.7">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 0,0 L 0,140" begin="0.6s" />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="210" y="145" fill="#91A2C7" fontSize="9" fontFamily="monospace" opacity="0.5">encrypted</text>
        </g>

        {/* Node: External API */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.4s" }}>
          <rect x="60" y="210" width="200" height="60" rx="14" fill="#0B1123" stroke="#46CFFF" strokeWidth="1.5" />
          <g transform="translate(82, 228)">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="#46CFFF" strokeWidth="1.2" />
            <ellipse cx="8" cy="8" rx="2.5" ry="6.5" fill="none" stroke="#46CFFF" strokeWidth="0.9" />
            <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#46CFFF" strokeWidth="0.9" />
          </g>
          <text x="106" y="246" fill="#F6F8FF" fontSize="13" fontWeight="600" fontFamily="system-ui">External API</text>
        </g>

        {/* Tunnel 2 */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.8s ease 0.5s" }}>
          <rect x="130" y="270" width="60" height="140" rx="30" fill="url(#m-tunnel-grad)" />
          <rect x="130" y="270" width="60" height="140" rx="30" fill="none" stroke="url(#m-tunnel-border)" strokeWidth="1" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </rect>
          <circle r="3.5" fill="#46CFFF" filter="url(#m-glow-cyan)" opacity="0.9">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 0,0 L 0,140" begin="0.2s" />
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#7A5CFF" filter="url(#m-glow-violet)" opacity="0.7">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 0,0 L 0,140" begin="0.8s" />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="210" y="345" fill="#91A2C7" fontSize="9" fontFamily="monospace" opacity="0.5">encrypted</text>
        </g>

        {/* Node: Solana */}
        <g opacity={inView ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.6s" }}>
          <rect x="60" y="410" width="200" height="60" rx="14" fill="#0B1123" stroke="#7A5CFF" strokeWidth="1.5" />
          <g transform="translate(82, 428)">
            <rect x="0" y="2" width="7" height="12" rx="1.5" fill="none" stroke="#1CF2C7" strokeWidth="1.1" />
            <rect x="5" y="2" width="7" height="12" rx="1.5" fill="none" stroke="#1CF2C7" strokeWidth="1.1" />
          </g>
          <text x="106" y="446" fill="#F6F8FF" fontSize="13" fontWeight="600" fontFamily="system-ui">Solana</text>
        </g>

        {/* Directional arrows */}
        <g opacity={inView ? 0.5 : 0} style={{ transition: "opacity 0.8s ease 0.6s" }}>
          <polygon points="160,205 154,195 166,195" fill="#46CFFF" opacity="0.6" />
          <polygon points="160,405 154,395 166,395" fill="#46CFFF" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

/* ── Main Section ── */
export default function FHETLSSection() {
  return (
    <section
      id="fhe-tls"
      className="relative py-24 lg:py-36 overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-void" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-ultraviolet/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-prism-cyan/[0.03] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-ultraviolet/[0.02] blur-[150px]" />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="text-xs uppercase tracking-[0.25em] text-prism-cyan mb-4 font-medium"
          >
            {fheTls.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-[3.25rem] text-cloud leading-[1.1]"
          >
            {fheTls.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-base lg:text-lg text-mist mt-5 leading-relaxed"
          >
            {fheTls.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {fheTls.chips.map((chip) => (
              <span
                key={chip}
                className="text-xs px-3.5 py-1.5 rounded-full border border-prism-cyan/20 text-prism-cyan/80 bg-prism-cyan/[0.06] backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Pipeline Diagram — dominant visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="relative rounded-3xl border border-white/[0.06] bg-abyss/50 backdrop-blur-sm p-6 md:p-10 lg:p-14 mb-12 lg:mb-16"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-6 w-16 h-px bg-gradient-to-r from-ultraviolet/50 to-transparent" />
          <div className="absolute top-0 right-6 w-16 h-px bg-gradient-to-l from-prism-cyan/50 to-transparent" />
          <div className="absolute bottom-0 left-6 w-16 h-px bg-gradient-to-r from-prism-cyan/50 to-transparent" />
          <div className="absolute bottom-0 right-6 w-16 h-px bg-gradient-to-l from-ultraviolet/50 to-transparent" />

          <PipelineDiagram />
        </motion.div>

        {/* Steps — compact horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 lg:mb-14">
          {fheTls.steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="group relative rounded-2xl bg-abyss/60 border border-white/[0.06] p-6 hover:border-prism-cyan/20 transition-all duration-500"
            >
              {/* Step number accent */}
              <div className="absolute -top-px left-6 h-px w-8 bg-gradient-to-r from-prism-cyan/60 to-transparent" />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[2rem] font-display font-bold leading-none bg-gradient-to-b from-prism-cyan/40 to-ultraviolet/30 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <h3 className="font-display font-semibold text-base text-cloud">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-mist/80 leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Example — monospace typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-xl bg-void/80 border border-white/[0.06] px-6 py-4 overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 text-[10px] text-mist/40 font-mono uppercase tracking-wider">execution trace</span>
            </div>
            <p className="font-mono text-sm md:text-base text-prism-cyan/90 leading-relaxed">
              <span className="text-ultraviolet/60 select-none">$ </span>
              <TypeWriter text={fheTls.example} speed={35} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
