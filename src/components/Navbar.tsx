"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getNavItems, getNavCTAs } from "@/content/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = getNavItems();
  const navCTAs = getNavCTAs();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={[
          "backdrop-blur-md transition-all duration-200",
          scrolled
            ? "bg-abyss/80 border-b border-white/[0.1] py-3"
            : "bg-abyss/60 border-b border-white/[0.06] py-4",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="flex h-8 items-center justify-between">
            {/* Wordmark */}
            <Link href="/" className="flex items-center">
              <span
                className="font-display text-lg font-bold text-cloud"
                style={{ textShadow: "0 0 20px rgba(122,92,255,0.3)" }}
              >
                Encrypt
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-mist transition-colors hover:text-cloud"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-cloud"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {navCTAs.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={
                    cta.variant === "primary"
                      ? "bg-ultraviolet text-cloud text-sm px-4 py-2 rounded-lg transition-all hover:shadow-[0_4px_20px_rgba(122,92,255,0.4)]"
                      : "border border-ultraviolet/40 text-cloud text-sm px-4 py-2 rounded-lg transition-all hover:bg-ultraviolet/10"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-mist hover:text-cloud transition-colors"
              aria-label="Open menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
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
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-abyss border-l border-white/[0.06] p-6 md:hidden z-50"
            >
              {/* Close button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-mist hover:text-cloud transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex flex-col gap-1">
                {navItems.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base text-mist transition-colors hover:bg-white/[0.04] hover:text-cloud"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base text-mist transition-colors hover:bg-white/[0.04] hover:text-cloud"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              {/* Mobile CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                {navCTAs.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      cta.variant === "primary"
                        ? "rounded-lg bg-ultraviolet px-4 py-3 text-center text-sm text-cloud transition-all hover:shadow-[0_4px_20px_rgba(122,92,255,0.4)]"
                        : "rounded-lg border border-ultraviolet/40 px-4 py-3 text-center text-sm text-cloud transition-all hover:bg-ultraviolet/10"
                    }
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
