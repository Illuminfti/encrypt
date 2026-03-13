"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Lock,
  Database,
  Scale,
  Eye,
  Zap,
  ArrowRight,
  Terminal,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const primitives = [
  {
    icon: Lock,
    title: "Encrypted inputs",
    description: "Submit data that only the program can decrypt",
  },
  {
    icon: Database,
    title: "Encrypted state",
    description: "Store application state that remains confidential",
  },
  {
    icon: Scale,
    title: "Comparisons",
    description: "Evaluate conditions on encrypted values without decryption",
  },
  {
    icon: Eye,
    title: "Policy-based reveal",
    description: "Define who sees what, and when",
  },
  {
    icon: Zap,
    title: "API actions",
    description: "Read and write to external APIs through encrypted channels",
  },
];

const codeLines = [
  '// SDK coming soon',
  '',
  'import { EncryptClient } from "@aspect/encrypt-sdk";',
  'import { Connection } from "@solana/web3.js";',
  '',
  'const client = new EncryptClient({',
  '  connection: new Connection("https://api.mainnet-beta.solana.com"),',
  '  programId: ENCRYPT_PROGRAM_ID,',
  '});',
  '',
  '// Submit encrypted input to a confidential program',
  'const tx = await client.submitEncrypted({',
  '  data: sensitivePayload,',
  '  policy: "owner-only",',
  '});',
];

const archBoxes = [
  { label: "Your dApp", sublabel: "Solana program" },
  { label: "Encrypt Runtime", sublabel: "Confidential execution" },
  { label: "Solana L1", sublabel: "Public settlement" },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-ultraviolet/15 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal size={18} className="text-cipher-mint" />
            <span className="text-sm font-medium text-cipher-mint tracking-wide uppercase">
              Developer Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cloud leading-tight max-w-3xl"
          >
            Build with Encrypt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-mist max-w-2xl leading-relaxed"
          >
            Confidential execution primitives for Solana developers
          </motion.p>
        </div>
      </section>

      {/* Primitives */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-4"
          >
            Primitives
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-xl mb-14"
          >
            A minimal set of building blocks for confidential applications on Solana.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {primitives.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className="group relative rounded-2xl border border-white/[0.06] bg-abyss/60 p-7 transition-all hover:border-ultraviolet/30 hover:bg-abyss/80"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ultraviolet/10">
                  <p.icon size={20} className="text-ultraviolet" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cloud mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Block */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-4"
          >
            Quick start
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-xl mb-10"
          >
            The Encrypt SDK gives you a clean interface to confidential execution. Here is what it will look like.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-white/[0.06] bg-[#0a0e1a] overflow-hidden"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <span className="ml-3 text-xs text-mist/50 font-mono">encrypt-demo.ts</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 shrink-0 text-right text-mist/25 select-none pr-4">
                    {i + 1}
                  </span>
                  <span
                    className={
                      line.startsWith("//")
                        ? "text-mist/50"
                        : line.startsWith("import")
                        ? "text-prism-cyan"
                        : "text-cloud/80"
                    }
                  >
                    {line || "\u00A0"}
                  </span>
                </div>
              ))}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-bold text-cloud mb-4"
          >
            Architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-xl mb-14"
          >
            Encrypt sits between your application and Solana, adding a confidential execution layer without changing the settlement model.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-stretch gap-4"
          >
            {archBoxes.map((box, i) => (
              <div key={box.label} className="flex items-center gap-4 flex-1">
                <div className="flex-1 rounded-2xl border border-white/[0.06] bg-abyss/60 p-8 text-center">
                  <h3 className="font-display text-lg font-semibold text-cloud mb-1">
                    {box.label}
                  </h3>
                  <p className="text-sm text-mist">{box.sublabel}</p>
                </div>
                {i < archBoxes.length - 1 && (
                  <ChevronRight
                    size={24}
                    className="text-ultraviolet shrink-0 hidden md:block"
                  />
                )}
                {i < archBoxes.length - 1 && (
                  <div className="md:hidden flex justify-center w-full">
                    <ArrowRight size={20} className="text-ultraviolet rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
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
            Start building
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mist max-w-lg mx-auto mb-10"
          >
            Encrypt is in developer preview. Get early access and start building confidential applications on Solana.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-ultraviolet px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ultraviolet/85 hover:shadow-[0_0_24px_rgba(122,92,255,0.3)]"
            >
              Join the developer preview
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
