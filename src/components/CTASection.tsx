"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface CTALink {
  label: string;
  href: string;
}

interface CTASectionProps {
  headline: string;
  primaryCTA: CTALink;
  secondaryCTA: CTALink;
}

export default function CTASection({
  headline,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050816 0%, rgba(122,92,255,0.08) 50%, #050816 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <h2 className="font-display text-3xl font-bold leading-tight text-cloud sm:text-4xl lg:text-5xl text-balance">
          {headline}
        </h2>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryCTA.href}
            className="
              inline-flex items-center justify-center rounded-lg
              bg-ultraviolet px-6 py-3 text-sm font-medium text-white
              transition-all duration-200
              hover:bg-ultraviolet/85 hover:shadow-[0_0_24px_rgba(122,92,255,0.35)]
            "
          >
            {primaryCTA.label}
          </Link>

          <Link
            href={secondaryCTA.href}
            className="
              inline-flex items-center justify-center rounded-lg
              border border-white/10 px-6 py-3 text-sm font-medium text-cloud
              transition-all duration-200
              hover:border-white/25 hover:bg-white/[0.04]
            "
          >
            {secondaryCTA.label}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
