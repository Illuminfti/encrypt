"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getNavItems, getNavCTAs } from "@/content/navigation";
import SpinningBorderButton from "./SpinningBorderButton";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={[
          "backdrop-blur-md transition-all duration-300",
          scrolled
            ? "bg-abyss/80 border-b border-white/[0.08] py-3"
            : "bg-transparent border-b border-transparent py-5",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark */}
            <Link href="/" className="flex items-center group">
              <span className="font-display text-xl font-bold text-cloud transition-all group-hover:text-ultraviolet">
                <span className="text-gradient-uv">Encrypt</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const active = !item.external && isActive(item.href);
                const classes = [
                  "text-sm transition-colors relative",
                  active
                    ? "text-cloud font-medium"
                    : "text-mist hover:text-cloud",
                ].join(" ");

                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={classes}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-ultraviolet"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {navCTAs.map((cta) =>
                cta.variant === "primary" ? (
                  <SpinningBorderButton key={cta.href} href={cta.href}>
                    {cta.label}
                  </SpinningBorderButton>
                ) : (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="border border-white/10 text-cloud text-sm px-4 py-2 rounded-xl transition-all hover:border-white/25 hover:bg-white/[0.04]"
                  >
                    {cta.label}
                  </Link>
                )
              )}
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
                {navItems.map((item) => {
                  const active = !item.external && isActive(item.href);
                  return item.external ? (
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
                      className={`block rounded-lg px-4 py-3 text-base transition-colors hover:bg-white/[0.04] ${
                        active ? "text-cloud bg-ultraviolet/5" : "text-mist hover:text-cloud"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
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
                        ? "rounded-xl bg-ultraviolet px-4 py-3 text-center text-sm text-cloud transition-all hover:shadow-[0_4px_20px_rgba(122,92,255,0.4)]"
                        : "rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-cloud transition-all hover:bg-white/[0.04]"
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
