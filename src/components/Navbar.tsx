"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Research", href: "/research" },
  { label: "Developers", href: "/developers" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-abyss/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-2">
              <span
                className="font-display text-xl font-bold text-cloud"
                style={{
                  textShadow: "0 0 24px rgba(122, 92, 255, 0.45)",
                }}
              >
                Encrypt
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-mist transition-colors hover:text-cloud"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/research"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-cloud transition-all hover:border-white/25 hover:bg-white/[0.04]"
              >
                Read Research
              </Link>
              <Link
                href="/developers"
                className="rounded-lg bg-ultraviolet px-4 py-2 text-sm font-medium text-white transition-all hover:bg-ultraviolet/85 hover:shadow-[0_0_20px_rgba(122,92,255,0.3)]"
              >
                Build on Encrypt
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-mist hover:text-cloud transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-void/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-abyss border-l border-white/[0.06] p-6 md:hidden z-50"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-mist hover:text-cloud transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base text-mist transition-colors hover:bg-white/[0.04] hover:text-cloud"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/research"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-medium text-cloud transition-all hover:border-white/25"
                >
                  Read Research
                </Link>
                <Link
                  href="/developers"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-ultraviolet px-4 py-3 text-center text-sm font-medium text-white transition-all hover:bg-ultraviolet/85"
                >
                  Build on Encrypt
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
