import Link from "next/link";
import { Twitter, MessageCircle, Github } from "lucide-react";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Whitepaper", href: "/research" },
      { label: "Architecture", href: "/research/architecture" },
      { label: "Benchmarks", href: "/research/benchmarks" },
      { label: "Security", href: "/research/security" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/encrypt" },
      { label: "Twitter", href: "https://twitter.com/encrypt" },
      { label: "Forum", href: "/forum" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/encrypt", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg/encrypt", label: "Discord" },
  { icon: Github, href: "https://github.com/encrypt", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-abyss">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top: Wordmark + tagline + socials */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <span
              className="font-display text-xl font-bold text-cloud"
              style={{ textShadow: "0 0 24px rgba(122, 92, 255, 0.35)" }}
            >
              Encrypt
            </span>
            <p className="mt-2 text-sm text-mist">
              Confidential execution for Solana
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-mist transition-colors hover:bg-white/[0.06] hover:text-cloud"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-cloud mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors hover:text-cloud"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist/70">
            From the team behind{" "}
            <a
              href="https://ika.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist transition-colors hover:text-cloud"
            >
              Ika
            </a>
          </p>
          <p className="text-xs text-mist/70">
            &copy; {new Date().getFullYear()} Encrypt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
