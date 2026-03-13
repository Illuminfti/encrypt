"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const posts = [
  {
    title: "Why confidential execution matters on Solana",
    date: "Jan 2025",
    excerpt:
      "Solana is the fastest settlement layer in crypto -- but speed without confidentiality leaves an entire category of applications unbuilt. Here is why encrypted execution changes that.",
    gradient: "from-ultraviolet to-prism-cyan",
  },
  {
    title: "Built for real application logic",
    date: "Feb 2025",
    excerpt:
      "Most FHE implementations can barely add two encrypted numbers. Encrypt's RE-FHE scheme is designed for the kind of logic real programs actually need: comparisons, branching, and large integers.",
    gradient: "from-cipher-mint to-ultraviolet",
  },
  {
    title: "Public settlement, encrypted logic",
    date: "Mar 2025",
    excerpt:
      "How Encrypt separates the settlement layer from the execution layer, giving you the transparency guarantees of Solana with the privacy guarantees of FHE.",
    gradient: "from-signal-coral to-ultraviolet",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-ultraviolet/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cloud"
          >
            Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-mist max-w-xl"
          >
            Thoughts on confidential execution, FHE research, and building on Solana.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
              >
                <Link
                  href="#"
                  className="group block rounded-2xl border border-white/[0.06] bg-abyss/60 overflow-hidden transition-all hover:border-ultraviolet/30 hover:bg-abyss/80"
                >
                  {/* Thumbnail placeholder */}
                  <div
                    className={`h-44 bg-gradient-to-br ${post.gradient} opacity-30 group-hover:opacity-50 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-mist/60 mb-3">
                      <Calendar size={13} />
                      <time>{post.date}</time>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-cloud mb-3 group-hover:text-ultraviolet transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-mist leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ultraviolet group-hover:gap-2.5 transition-all">
                      Read more
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
