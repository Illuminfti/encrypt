"use client";

import { credibilityBadges } from "@/content/home";
import Marquee from "./Marquee";

export default function BadgeRow() {
  const badges = credibilityBadges.map((badge) => (
    <span
      key={badge}
      className="shrink-0 text-xs text-mist/70 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] whitespace-nowrap"
    >
      {badge}
    </span>
  ));

  return (
    <section id="credibility" className="py-10 border-y border-white/[0.04]">
      <Marquee speed={40} pauseOnHover>
        {badges}
      </Marquee>
    </section>
  );
}
