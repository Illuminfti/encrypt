/**
 * Central configuration for external URLs, feature flags, and site metadata.
 * If a URL is undefined, the corresponding link is hidden from nav/footer.
 */

export const siteConfig = {
  name: "Encrypt",
  tagline: "Confidential execution for Solana",
  description:
    "Encrypt is a confidential execution network for Solana. It lets programs compute on encrypted data, keep logic and state private, and perform verifiable API actions.",
  parentCompany: "dWallet Labs",
  sisterProject: "Ika",

  /** Internal routes that actually exist */
  routes: {
    home: "/",
    developers: "/developers",
    research: "/research",
    ecosystem: "/ecosystem",
    blog: "/blog",
  },

  /** External URLs — set to undefined to hide the link */
  urls: {
    docs: undefined as string | undefined,
    github: "https://github.com/nicotsx" as string | undefined,
    x: "https://x.com/nicotsx" as string | undefined,
    discord: undefined as string | undefined,
    ika: "https://ika.xyz" as string | undefined,
    dwalletLabs: "https://www.dwalletlabs.com" as string | undefined,
    primaryResearch: undefined as string | undefined,
    waitlist: undefined as string | undefined,
    mediaKit: undefined as string | undefined,
  },

  metadata: {
    title: "Encrypt | Confidential Execution for Solana",
    description:
      "Encrypt is a confidential execution network for Solana. It lets programs compute on encrypted data, keep logic and state private, and perform verifiable API actions.",
    url: "https://encrypt-sable.vercel.app",
  },
} as const;

/** Helper: check if an external URL is configured */
export function hasUrl(key: keyof typeof siteConfig.urls): boolean {
  return siteConfig.urls[key] !== undefined;
}

/** Helper: get URL or throw (use only when you've checked hasUrl first) */
export function getUrl(key: keyof typeof siteConfig.urls): string {
  const url = siteConfig.urls[key];
  if (!url) throw new Error(`URL not configured: ${key}`);
  return url;
}
