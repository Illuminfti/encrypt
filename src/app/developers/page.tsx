"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { developersPage } from "@/content/pages";
import SpinningBorderButton from "@/components/SpinningBorderButton";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, ease, delay },
  };
}

function animateUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

const keywords = new Set([
  "const",
  "await",
  "import",
  "from",
  "new",
  "async",
  "function",
  "return",
  "let",
  "var",
]);

function renderToken(token: string, idx: number) {
  if (keywords.has(token)) {
    return (
      <span key={idx} className="text-ultraviolet/80">
        {token}
      </span>
    );
  }
  if (/^["'].*["']/.test(token)) {
    return (
      <span key={idx} className="text-cipher-mint/80">
        {token}
      </span>
    );
  }
  return <span key={idx}>{token}</span>;
}

function renderCodeLine(line: string) {
  if (!line) return "\u00A0";
  if (line.trimStart().startsWith("//")) {
    return <span className="text-mist/40">{line}</span>;
  }

  // Tokenize: split on word boundaries and string literals
  const parts = line.match(/"[^"]*"|'[^']*'|[a-zA-Z_$]+|[^a-zA-Z_$"']+/g) || [
    line,
  ];

  return (
    <span className="text-cloud/80">
      {parts.map((part, i) => renderToken(part, i))}
    </span>
  );
}

export default function DevelopersPage() {
  const { primaryCTA, secondaryCTA } = developersPage;

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(122,92,255,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(28,242,199,0.06),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            {...animateUp(0)}
            className="text-sm font-medium text-cipher-mint tracking-[0.2em] uppercase mb-4 block"
          >
            {developersPage.eyebrow}
          </motion.span>

          <motion.h1
            {...animateUp(0.1)}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-cloud max-w-3xl"
          >
            {developersPage.headline}
          </motion.h1>

          <motion.p
            {...animateUp(0.2)}
            className="text-lg text-mist mt-4 max-w-xl"
          >
            {developersPage.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Primitives grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {developersPage.primitives.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.08)}
                className="group relative rounded-3xl bg-abyss/40 border border-white/[0.06] p-7 transition-colors hover:border-ultraviolet/15"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(28,242,199,0.04),transparent_70%)]" />
                <div className="relative">
                  <h3 className="font-display font-semibold text-base text-cloud mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-mist">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code panel */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUp(0)}
            className="font-display font-semibold text-xl text-cloud mb-2"
          >
            {developersPage.codePanel.title}
          </motion.h2>

          <motion.p
            {...fadeUp(0.05)}
            className="text-xs text-signal-coral/80 mb-6"
          >
            {developersPage.codePanel.note}
          </motion.p>

          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl bg-[#0a0e1a] border border-ultraviolet/10 p-6 overflow-x-auto"
          >
            <pre className="text-sm font-mono leading-relaxed">
              <code>
                {developersPage.codePanel.lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 shrink-0 text-right text-mist/30 select-none pr-4">
                      {i + 1}
                    </span>
                    {renderCodeLine(line)}
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Architecture lanes */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <motion.div
            {...fadeUp(0)}
            className="rounded-2xl bg-ultraviolet/10 border border-ultraviolet/20 px-6 py-5 shadow-[0_0_20px_rgba(122,92,255,0.06)]"
          >
            <span className="font-display font-semibold text-sm text-cloud">
              {developersPage.architectureLanes.confidential}
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="rounded-2xl bg-cipher-mint/10 border border-cipher-mint/20 px-6 py-5 shadow-[0_0_20px_rgba(28,242,199,0.06)]"
          >
            <span className="font-display font-semibold text-sm text-cloud">
              {developersPage.architectureLanes.public}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Integration steps */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="space-y-5">
            {developersPage.integrationSteps.map((step, i) => (
              <motion.li
                key={i}
                {...fadeUp(i * 0.06)}
                className="flex items-start gap-4"
              >
                <span className="text-xs font-display text-ultraviolet/60 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-mist">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA row */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4">
          {primaryCTA.href && (
            <SpinningBorderButton href={primaryCTA.href}>
              {primaryCTA.label}
            </SpinningBorderButton>
          )}
          {secondaryCTA.href && (
            <Link
              href={secondaryCTA.href}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-cloud transition-all hover:border-white/25 hover:bg-white/[0.04]"
            >
              {secondaryCTA.label}
              <svg className="w-4 h-4 text-mist group-hover:text-cloud group-hover:translate-x-0.5 transition-all" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
