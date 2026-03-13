"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { fheTls } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FHETLSSection() {
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  const step0InView = useInView(step0Ref, { once: true, margin: "-80px" });
  const step1InView = useInView(step1Ref, { once: true, margin: "-80px" });
  const step2InView = useInView(step2Ref, { once: true, margin: "-80px" });

  const stepInView = [step0InView, step1InView, step2InView];
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  return (
    <section
      id="fhe-tls"
      className="relative py-24 lg:py-36 bg-gradient-to-b from-void via-ultraviolet/[0.03] to-void"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex gap-12">
          {/* Left — sticky column */}
          <div className="lg:w-[45%]">
            <div className="sticky top-32">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
                className="text-xs uppercase tracking-[0.2em] text-prism-cyan mb-4 font-medium"
              >
                {fheTls.eyebrow}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.05 }}
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cloud leading-[1.1]"
              >
                {fheTls.headline}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
                className="text-base lg:text-lg text-mist mt-4 max-w-md leading-relaxed"
              >
                {fheTls.body}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.15 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {fheTls.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-xs px-3 py-1.5 rounded-full border border-prism-cyan/20 text-prism-cyan/80 bg-prism-cyan/5"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/research"
                  className="group inline-flex items-center gap-1.5 text-sm text-ultraviolet hover:text-cloud transition-colors"
                >
                  Read Research
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right — scrolling step panels */}
          <div className="lg:w-[55%] relative">
            {/* Vertical beam rail */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 pointer-events-none">
              {fheTls.steps.map((_, i) => (
                <div
                  key={i}
                  className="transition-colors duration-700"
                  style={{
                    height: `${100 / fheTls.steps.length}%`,
                    background: stepInView[i]
                      ? "linear-gradient(to bottom, rgba(0,224,255,0.5), rgba(124,58,237,0.5))"
                      : "linear-gradient(to bottom, rgba(0,224,255,0.1), rgba(124,58,237,0.1))",
                  }}
                />
              ))}
            </div>

            <div className="space-y-8 pl-16">
              {fheTls.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  ref={stepRefs[i]}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  className="group rounded-3xl bg-abyss/60 border border-white/[0.06] p-8 hover:border-prism-cyan/15 transition-all duration-500"
                >
                  <p className="text-xs font-display text-prism-cyan/60 mb-2">
                    Step {step.step}
                  </p>
                  <h3 className="font-display font-semibold text-lg text-cloud mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}

              {/* Example panel */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                className="rounded-2xl bg-ultraviolet/5 border border-ultraviolet/10 p-6"
              >
                <p className="text-sm text-mist font-mono">
                  {fheTls.example}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden space-y-8">
          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="text-xs uppercase tracking-[0.2em] text-prism-cyan mb-4 font-medium"
            >
              {fheTls.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="font-display font-bold text-3xl text-cloud"
            >
              {fheTls.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="text-base text-mist mt-4 max-w-md"
            >
              {fheTls.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {fheTls.chips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs px-3 py-1.5 rounded-full border border-prism-cyan/20 text-prism-cyan/80 bg-prism-cyan/5"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="mt-8"
            >
              <Link
                href="/research"
                className="text-sm text-ultraviolet hover:text-cloud transition-colors"
              >
                Read Research &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Step panels (no rail on mobile) */}
          <div className="space-y-6">
            {fheTls.steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="group rounded-3xl bg-abyss/60 border border-white/[0.06] p-8 hover:border-prism-cyan/15 transition-all duration-500"
              >
                <p className="text-xs font-display text-prism-cyan/60 mb-2">
                  Step {step.step}
                </p>
                <h3 className="font-display font-semibold text-lg text-cloud mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="rounded-2xl bg-ultraviolet/5 border border-ultraviolet/10 p-6"
            >
              <p className="text-sm text-mist font-mono">
                {fheTls.example}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
