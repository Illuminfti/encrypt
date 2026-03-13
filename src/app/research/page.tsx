"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const researchCards = [
  {
    tag: "Core scheme",
    title: "RE-FHE",
    description:
      "A new FHE scheme supporting arithmetic and logical operations over large machine words. Designed for real application logic, not toy encrypted math.",
    color: "ultraviolet" as const,
  },
  {
    tag: "Network design",
    title: "Threshold FHE",
    description:
      "Scalable multi-party FHE with asynchronous deployment. Architected for a real distributed network, not a lab demo.",
    color: "cipher-mint" as const,
  },
];

const faqs = [
  {
    question: "What is FHE?",
    answer:
      "Fully Homomorphic Encryption (FHE) allows computation on encrypted data without decrypting it first. The result of the computation, when decrypted, matches the result you would get from computing on the plaintext data. This makes it possible to process sensitive information while keeping it confidential throughout the entire computation.",
  },
  {
    question: "How does RE-FHE differ from other FHE schemes?",
    answer:
      "Most FHE schemes operate on individual bits or small integers, making real application logic impractical. RE-FHE is designed to operate over large machine words (e.g. 64-bit integers), enabling arithmetic, comparisons, and branching logic at the scale real programs need. This means you can build real applications, not just academic demonstrations.",
  },
  {
    question: "Is Encrypt a separate blockchain?",
    answer:
      "No. Encrypt is Solana-native. It adds a confidential execution layer that integrates directly with Solana programs and settles on Solana L1. There is no separate chain, bridge, or token. Your programs compose with the rest of the Solana ecosystem as they normally would.",
  },
  {
    question: "Who is behind Encrypt?",
    answer:
      "Encrypt is built by dWallet Labs, the research and development team behind the dWallet Network and a sister project to Ika. The team has deep expertise in applied cryptography, distributed systems, and blockchain infrastructure.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fade}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-lg font-medium text-cloud group-hover:text-ultraviolet transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-mist" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-mist leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cipher-mint/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <FlaskConical size={18} className="text-cipher-mint" />
            <span className="text-sm font-medium text-cipher-mint tracking-wide uppercase">
              Research
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cloud leading-tight max-w-3xl"
          >
            Research-led architecture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-mist max-w-2xl leading-relaxed"
          >
            Encrypt is built on original cryptographic research in fully homomorphic encryption
          </motion.p>
        </div>
      </section>

      {/* Research Cards */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {researchCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className={`relative rounded-2xl border bg-abyss/60 p-8 sm:p-10 ${
                  card.color === "ultraviolet"
                    ? "border-ultraviolet/20"
                    : "border-cipher-mint/20"
                }`}
              >
                <span
                  className={`inline-block text-xs font-semibold tracking-wider uppercase mb-4 ${
                    card.color === "ultraviolet"
                      ? "text-ultraviolet"
                      : "text-cipher-mint"
                  }`}
                >
                  {card.tag}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-cloud mb-4">
                  {card.title}
                </h3>
                <p className="text-mist leading-relaxed text-base sm:text-lg">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <BarChart3 size={22} className="text-prism-cyan" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cloud">
              Benchmarks
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-xl mb-10"
          >
            Detailed benchmarks with full methodology are coming soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-abyss/40 p-12 sm:p-16 flex flex-col items-center justify-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-prism-cyan/10 border border-prism-cyan/20 px-4 py-1.5 text-xs font-semibold text-prism-cyan mb-4">
              Coming soon
            </span>
            <p className="text-mist text-sm max-w-md">
              We are preparing comprehensive benchmarks comparing RE-FHE performance across key operations. Check back soon, or follow us for updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Model */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <ShieldCheck size={22} className="text-cipher-mint" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cloud">
              Security model
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-abyss/40 p-8 sm:p-10 max-w-3xl"
          >
            <p className="text-mist leading-relaxed mb-4">
              Encrypt&apos;s security model is grounded in the cryptographic hardness of its underlying FHE scheme. Data remains encrypted throughout execution and is never exposed to any single party, including network operators.
            </p>
            <p className="text-mist leading-relaxed mb-4">
              Threshold decryption ensures that no single node can access plaintext data. A configurable quorum of decryption key holders must cooperate to reveal any result, and reveal only happens when the program&apos;s policy explicitly allows it.
            </p>
            <p className="text-mist leading-relaxed">
              Settlement remains on Solana L1, inheriting its consensus guarantees. Encrypt adds confidentiality without compromising the integrity or liveness properties of the base layer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-10"
          >
            Frequently asked questions
          </motion.h2>

          <div className="max-w-3xl rounded-2xl border border-white/[0.06] bg-abyss/40 px-6 sm:px-8">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-5"
          >
            Dive deeper
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-lg mx-auto mb-10"
          >
            Read the full research or start building on the Encrypt developer preview.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 rounded-lg bg-ultraviolet px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ultraviolet/85 hover:shadow-[0_0_24px_rgba(122,92,255,0.3)]"
            >
              Start building
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-cloud transition-all hover:border-white/25 hover:bg-white/[0.04]"
            >
              Read the docs
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
