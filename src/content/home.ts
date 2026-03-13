import { siteConfig } from "@/lib/site-config";

/* ── Hero ─────────────────────────────────────────────────── */

export const hero = {
  eyebrow: `From ${siteConfig.parentCompany}`,
  headline: "The confidential execution network for Solana",
  subheadline:
    "Compute on encrypted data. Keep strategies, user data, and API actions private.",
  primaryCTA: { label: "Build on Encrypt", href: siteConfig.routes.developers },
  secondaryCTA: { label: "Read Research", href: siteConfig.routes.research },
  microLine: "Public settlement. Encrypted logic.",
  caption: "Built on RE-FHE and threshold-FHE research.",
} as const;

/* ── Credibility Ribbon ───────────────────────────────────── */

export const credibilityBadges = [
  "Built on RE-FHE",
  "Threshold-FHE research",
  "Solana-aligned",
  `Sister network to ${siteConfig.sisterProject}`,
  "Confidential compute",
  "Verifiable API actions",
] as const;

/* ── Problem ──────────────────────────────────────────────── */

export const problem = {
  eyebrow: "Why confidentiality matters",
  headline: "Everything composable. Everything visible.",
  body: "Public blockchains made coordination easy. They also made every edge inspectable.",
  cards: [
    {
      title: "Public execution leaks strategy",
      body: "Every transaction reveals intent before and after settlement. Strategies, routing logic, and timing become public information.",
    },
    {
      title: "Public state leaks user data",
      body: "Globally readable state turns balances, positions, behavior, and application context into open data.",
    },
    {
      title: "API-connected apps leak secrets",
      body: "Offchain workflows expose the data and intent that drive real advantage, even when settlement happens onchain.",
    },
  ],
} as const;

/* ── Solution ─────────────────────────────────────────────── */

export const solution = {
  headline: "Now programs can keep secrets.",
  body: "Encrypt gives Solana apps confidential execution without giving up composability or public settlement.",
  cards: [
    {
      step: "01",
      title: "Encrypted inputs",
      body: "Sensitive inputs are encrypted before execution.",
    },
    {
      step: "02",
      title: "Encrypted state",
      body: "Application state stays confidential at rest.",
    },
    {
      step: "03",
      title: "Confidential execution",
      body: "Logic runs directly on encrypted data.",
    },
    {
      step: "04",
      title: "Authorized reveal",
      body: "Outputs are revealed or acted on only when policy allows.",
    },
  ],
  footnote:
    "Confidential inputs and state matter only if the program logic can stay confidential too.",
} as const;

/* ── RE-FHE ───────────────────────────────────────────────── */

export const reFhe = {
  eyebrow: "Research primitive",
  headline: "Built for real application logic",
  paragraphs: [
    "RE-FHE is designed for arithmetic and logic over encrypted machine-word data.",
    "That matters because real applications need more than toy encrypted math. They need comparisons, branching, scoring, and policy decisions on confidential inputs.",
  ],
  chips: ["comparisons", "branching", "scoring", "policy logic"],
  proofBullets: [
    "arithmetic + logic",
    "machine-word compute",
    "designed for distributed execution",
  ],
} as const;

/* ── Use Cases ────────────────────────────────────────────── */

export const useCases = {
  headline: "What you can build",
  cards: [
    {
      category: "Markets",
      title: "Confidential trading",
      body: "Hide order logic, strategy parameters, and position information until execution is complete.",
      example: "Sealed-bid DEX orders",
    },
    {
      category: "Credit",
      title: "Private lending and risk logic",
      body: "Compute scores, collateral rules, and policies without exposing the model or the inputs.",
      example: "Private credit scoring",
    },
    {
      category: "Routing",
      title: "Hidden intents / RFQs",
      body: "Submit orders and requests that cannot be publicly inspected before matching.",
      example: "MEV-resistant order flow",
    },
    {
      category: "Agents",
      title: "Agentic finance",
      body: "Let agents act on encrypted strategies, permissions, and external signals.",
      example: "Autonomous portfolio rebalancing",
    },
    {
      category: "APIs",
      title: "FHE-TLS / API workflows",
      body: "Read from APIs and trigger actions without exposing payloads or intent.",
      example: "Private credit checks",
    },
    {
      category: "Consumer",
      title: "Consumer apps with private state",
      body: "Build identity, social, and gaming experiences without making user state globally readable.",
      example: "Private reputation systems",
    },
  ],
} as const;

/* ── FHE-TLS ──────────────────────────────────────────────── */

export const fheTls = {
  eyebrow: "API primitive",
  headline: "Read private. Write verifiable.",
  body: "Encrypt extends confidential execution beyond onchain state. Programs can interact with external APIs without exposing the data or intent that drives the action.",
  chips: [
    "policy checks",
    "credit routing",
    "treasury automation",
    "agent permissions",
  ],
  steps: [
    {
      step: "01",
      title: "Encrypted policy",
      body: "A program defines rules, thresholds, or credentials without exposing them.",
    },
    {
      step: "02",
      title: "Private API read/write",
      body: "The runtime interacts with external APIs without revealing the payload, the intent, or the policy.",
    },
    {
      step: "03",
      title: "Verifiable outcome",
      body: "The result can be proven and optionally revealed or used to trigger an onchain action.",
    },
  ],
  example:
    "Private policy → API credit check → authorized onchain action",
} as const;

/* ── Architecture ─────────────────────────────────────────── */

export const architecture = {
  headline: "How Encrypt fits with Solana",
  steps: [
    {
      step: "01",
      title: "Encrypt data",
      body: "Inputs are encrypted client-side before submission.",
    },
    {
      step: "02",
      title: "Dispatch confidential job",
      body: "Encrypted work is routed to the execution network.",
    },
    {
      step: "03",
      title: "Compute on encrypted state",
      body: "Programs evaluate logic without decrypting state.",
    },
    {
      step: "04",
      title: "Reveal or act by policy",
      body: "Only approved outputs are revealed or trigger external actions.",
    },
    {
      step: "05",
      title: "Settle on Solana",
      body: "Final state transitions and settlement remain public and composable.",
    },
  ],
  legend: {
    confidential: "Confidential execution lane",
    public: "Public settlement lane",
  },
} as const;

/* ── Audience ─────────────────────────────────────────────── */

export const audience = {
  headline: "Who Encrypt is for",
  proofChips: [
    "Built for Solana",
    "RE-FHE research",
    "Threshold-FHE network design",
    "Verifiable API actions",
  ],
  tabs: [
    {
      id: "builders" as const,
      label: "Builders",
      headline: "Build Solana apps with encrypted inputs, state, and logic.",
      body: "Use confidential execution as an application primitive: hidden strategies, private scoring, policy logic, and API-connected workflows.",
      bullets: [
        "encrypted inputs",
        "encrypted state",
        "comparisons and branching",
        "policy-based reveal",
        "API actions",
      ],
    },
    {
      id: "traders" as const,
      label: "Traders / Users",
      headline: "Your edge should not be public by default.",
      body: "Use Solana apps without exposing strategy, balances, intent, or API-connected actions just because the chain is transparent.",
      bullets: [
        "private strategies",
        "reduced information leakage",
        "confidential balances and timing",
        "selective reveal when required",
      ],
    },
    {
      id: "investors" as const,
      label: "Investors",
      headline: "Internet capital markets need a confidentiality layer.",
      body: "Solana already owns performance and settlement. Encrypt adds confidential execution for markets, agents, enterprise workflows, and applications with sensitive state.",
      bullets: [
        "Solana-native fit",
        "research-led architecture",
        "confidential logic, not just confidential balances",
        "API-connected execution as a new category",
      ],
    },
  ],
} as const;

/* ── Research Cards ───────────────────────────────────────── */

export type ResearchCardStatus =
  | "Paper"
  | "Research"
  | "Coming soon"
  | "Technical note"
  | "Docs";

export interface ResearchCard {
  title: string;
  status: ResearchCardStatus;
  description: string;
  href?: string;
  note?: string;
}

export const researchCards: ResearchCard[] = [
  {
    title: "RE-FHE",
    status: "Paper",
    description:
      "A new FHE scheme supporting arithmetic and logical operations over encrypted machine-word data.",
    href: siteConfig.routes.research,
  },
  {
    title: "Threshold-FHE",
    status: "Research",
    description:
      "Scalable multi-party FHE with asynchronous deployment for distributed network execution.",
    href: siteConfig.routes.research,
  },
  {
    title: "Benchmarks",
    status: "Coming soon",
    description:
      "Benchmarks will be published with methodology. No cherry-picked numbers on the homepage.",
  },
  {
    title: "Security model",
    status: "Technical note",
    description:
      "Encrypted state, reveal policy, threshold decryption, and public settlement on Solana.",
    href: siteConfig.routes.research,
  },
  {
    title: "Developer docs",
    status: "Docs",
    description:
      "Primitives, integration guides, and API reference for building confidential programs.",
    href: siteConfig.urls.docs ?? siteConfig.routes.developers,
  },
];

/* ── Final CTA ────────────────────────────────────────────── */

export const finalCTA = {
  headline: "Build the first Solana apps that can keep a secret.",
  body: "Encrypt gives programs confidential execution without giving up public settlement.",
  primaryCTA: { label: "Build on Encrypt", href: siteConfig.routes.developers },
  secondaryCTA: { label: "Read Research", href: siteConfig.routes.research },
  footnote: `From ${siteConfig.parentCompany}. Sister network to ${siteConfig.sisterProject}.`,
} as const;
