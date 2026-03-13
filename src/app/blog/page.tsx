"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { blogPage } from "@/content/pages";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
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

const barColors = [
  "bg-cipher-mint/60",
  "bg-ultraviolet/50",
  "bg-prism-cyan/40",
  "bg-cipher-mint/30",
  "bg-ultraviolet/70",
  "bg-prism-cyan/60",
  "bg-cipher-mint/40",
  "bg-ultraviolet/30",
  "bg-prism-cyan/50",
  "bg-cipher-mint/50",
  "bg-ultraviolet/40",
  "bg-prism-cyan/70",
  "bg-cipher-mint/70",
  "bg-ultraviolet/60",
  "bg-prism-cyan/30",
  "bg-cipher-mint/20",
  "bg-ultraviolet/20",
  "bg-prism-cyan/20",
];

function WordBarThumbnail({
  gradient,
  seed,
}: {
  gradient: string;
  seed: number;
}) {
  return (
    <div
      className={`h-40 bg-gradient-to-br ${gradient} flex items-end justify-center gap-1 px-6 pb-4`}
    >
      {barColors.map((color, i) => {
        // Deterministic height based on seed and index
        const h = 8 + (((seed + 1) * (i + 3) * 7) % 20);
        return (
          <div
            key={i}
            className={`w-[3px] rounded-sm ${color}`}
            style={{ height: `${h}px` }}
          />
        );
      })}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            {...animateUp(0)}
            className="font-display font-bold text-4xl md:text-5xl text-cloud"
          >
            {blogPage.headline}
          </motion.h1>

          <motion.p {...animateUp(0.1)} className="text-lg text-mist mt-4">
            {blogPage.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Post cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPage.posts.map((post, i) => (
              <motion.div
                key={post.title}
                {...fadeUp(i * 0.08)}
                className="rounded-3xl bg-abyss/40 border border-white/[0.06] overflow-hidden transition-colors hover:border-white/[0.1]"
              >
                <WordBarThumbnail gradient={post.gradient} seed={i} />

                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-wider text-ultraviolet/60 mb-2 block">
                    {post.label}
                  </span>
                  <h2 className="font-display font-semibold text-base text-cloud mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-mist leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
