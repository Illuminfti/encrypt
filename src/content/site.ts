// ─────────────────────────────────────────────────────────────
// Encrypt — Site Content
// All copy for every section, typed and exported as constants.
// ─────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface CTA {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctas: CTA[];
  supportingLine: string;
}

export interface CredibilityBadge {
  label: string;
  icon: string;
}

export interface ProblemCard {
  title: string;
  description: string;
  icon: string;
}

export interface ProblemSection {
  headline: string;
  cards: ProblemCard[];
}

export interface SolutionCard {
  title: string;
  description: string;
  icon: string;
  color: "ultraviolet" | "cipher-mint" | "prism-cyan" | "signal-coral";
}

export interface SolutionSection {
  headline: string;
  subheadline: string;
  cards: SolutionCard[];
}

export interface ReFHESection {
  eyebrow: string;
  headline: string;
  description: string;
  features: { title: string; description: string }[];
}

export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export interface FHETLSSection {
  eyebrow: string;
  headline: string;
  description: string;
  features: { title: string; description: string }[];
}

export interface ArchitectureStep {
  step: number;
  title: string;
  description: string;
}

export interface AudienceTab {
  id: string;
  label: string;
  headline: string;
  description: string;
  bullets: string[];
}

export interface ResearchCard {
  title: string;
  description: string;
  tag: string;
  href: string;
}

export interface CTASection {
  headline: string;
  subheadline: string;
  ctas: CTA[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  bottomLine: string;
  socials: { label: string; href: string; icon: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tag: string;
  readTime: string;
}

export interface PageContent {
  eyebrow: string;
  headline: string;
  description: string;
}

// ── Navigation ───────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "Technology", href: "/#technology" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Developers", href: "/developers" },
  { label: "Research", href: "/research" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Blog", href: "/blog" },
];

// ── Hero ─────────────────────────────────────────────────────

export const HERO: HeroContent = {
  eyebrow: "Confidential Execution for Solana",
  headline: "Compute on encrypted data.\nNo decryption. No exposure. No compromise.",
  subheadline:
    "Encrypt brings fully homomorphic encryption to Solana, enabling confidential DeFi, private AI inference, and sealed computation \u2014 all at the speed of light.",
  ctas: [
    { label: "Start Building", href: "/developers", variant: "primary" },
    { label: "Read the Docs", href: "https://docs.encrypt.xyz", variant: "secondary" },
  ],
  supportingLine: "Backed by leading cryptography researchers and Solana ecosystem partners.",
};

// ── Credibility Badges ───────────────────────────────────────

export const CREDIBILITY_BADGES: CredibilityBadge[] = [
  { label: "Built on Solana", icon: "solana" },
  { label: "Peer-Reviewed FHE", icon: "shield" },
  { label: "Open Source", icon: "github" },
  { label: "Audited Cryptography", icon: "lock" },
  { label: "Sub-second Latency", icon: "zap" },
];

// ── Problem Section ──────────────────────────────────────────

export const PROBLEM: ProblemSection = {
  headline: "Blockchain is transparent. That\u2019s the problem.",
  cards: [
    {
      title: "Front-Running & MEV",
      description:
        "Every pending transaction is visible. Searchers extract value before your trade even confirms, costing DeFi users billions annually.",
      icon: "eye",
    },
    {
      title: "Exposed Strategies",
      description:
        "On-chain trading strategies, portfolio allocations, and AI model inputs are fully public \u2014 giving competitors a free playbook.",
      icon: "file-search",
    },
    {
      title: "Privacy as an Afterthought",
      description:
        "Existing solutions sacrifice composability, introduce trusted intermediaries, or move computation off-chain. Privacy shouldn\u2019t mean compromise.",
      icon: "shield-off",
    },
    {
      title: "Regulatory Dead Zones",
      description:
        "Without confidential execution, protocols cannot satisfy data protection requirements while remaining transparent enough for compliance.",
      icon: "scale",
    },
  ],
};

// ── Solution Section ─────────────────────────────────────────

export const SOLUTION: SolutionSection = {
  headline: "The encryption layer Solana has been missing.",
  subheadline:
    "Encrypt introduces two breakthrough primitives \u2014 RE-FHE and FHE-TLS \u2014 that bring confidential execution to the fastest blockchain without sacrificing what makes it fast.",
  cards: [
    {
      title: "RE-FHE",
      description:
        "Re-Encryption Fully Homomorphic Encryption enables computation on encrypted data with selective disclosure. Process, transform, and validate \u2014 all without ever decrypting.",
      icon: "cpu",
      color: "ultraviolet",
    },
    {
      title: "FHE-TLS",
      description:
        "FHE-secured Transport Layer Security brings encrypted off-chain data on-chain with cryptographic proof of authenticity. Trustless data access, verified at the protocol level.",
      icon: "globe",
      color: "cipher-mint",
    },
    {
      title: "Solana-Native Performance",
      description:
        "Purpose-built for Solana\u2019s parallel execution model. Confidential transactions settle in under a second with full composability across the ecosystem.",
      icon: "zap",
      color: "prism-cyan",
    },
    {
      title: "Developer-First Design",
      description:
        "Drop-in SDKs, familiar APIs, and comprehensive documentation. Add confidential execution to your Solana program in hours, not months.",
      icon: "code",
      color: "signal-coral",
    },
  ],
};

// ── RE-FHE Section ───────────────────────────────────────────

export const RE_FHE: ReFHESection = {
  eyebrow: "Core Primitive",
  headline: "RE-FHE: Compute without compromise",
  description:
    "Re-Encryption Fully Homomorphic Encryption is the next evolution of FHE. It enables arbitrary computation on encrypted data while allowing selective re-encryption for authorized parties \u2014 combining the strongest privacy guarantees with practical access control.",
  features: [
    {
      title: "Encrypted Computation",
      description:
        "Perform addition, multiplication, comparison, and complex logic directly on ciphertexts. Data never needs to be decrypted during processing.",
    },
    {
      title: "Selective Disclosure",
      description:
        "Re-encrypt results for specific parties without exposing the underlying data. Perfect for compliance, auditing, and multi-party workflows.",
    },
    {
      title: "Composable Privacy",
      description:
        "Encrypted outputs from one program become encrypted inputs for another. Build complex confidential pipelines across the Solana ecosystem.",
    },
    {
      title: "Verifiable Correctness",
      description:
        "Every encrypted computation produces a proof of correct execution. Validators confirm results without seeing the data.",
    },
  ],
};

// ── Use Cases ────────────────────────────────────────────────

export const USE_CASES: UseCase[] = [
  {
    title: "Private DeFi Trading",
    description:
      "Execute trades, manage positions, and rebalance portfolios without exposing your strategy. Eliminate front-running and MEV extraction at the protocol level.",
    icon: "trending-up",
  },
  {
    title: "Sealed-Bid Auctions",
    description:
      "Run truly sealed auctions where bids remain encrypted until the reveal phase. No information leakage, no bid manipulation, no trusted auctioneer required.",
    icon: "gavel",
  },
  {
    title: "Encrypted AI Inference",
    description:
      "Run machine learning models on encrypted inputs and produce encrypted outputs. Users get predictions without revealing their data; model owners protect their IP.",
    icon: "brain",
  },
  {
    title: "Confidential Governance",
    description:
      "Vote on proposals without revealing individual choices until tallying. Prevent vote-buying, last-minute bandwagoning, and social pressure in DAO governance.",
    icon: "vote",
  },
  {
    title: "Private Identity & Credentials",
    description:
      "Prove attributes about yourself \u2014 age, accreditation, jurisdiction \u2014 without revealing the underlying data. Encrypted credential verification on-chain.",
    icon: "fingerprint",
  },
  {
    title: "Trustless Data Oracles",
    description:
      "Bring Web2 data on-chain with FHE-TLS proofs. API responses, price feeds, and private datasets arrive encrypted and authenticated \u2014 no trusted intermediary.",
    icon: "database",
  },
];

// ── FHE-TLS Section ──────────────────────────────────────────

export const FHE_TLS: FHETLSSection = {
  eyebrow: "Data Primitive",
  headline: "FHE-TLS: Trustless off-chain data",
  description:
    "FHE-TLS extends the TLS handshake with fully homomorphic encryption, enabling smart contracts to consume off-chain data without trusting any oracle or intermediary. The data arrives encrypted, authenticated, and ready for on-chain computation.",
  features: [
    {
      title: "Authenticated Data Ingestion",
      description:
        "Pull data from any HTTPS endpoint with cryptographic proof of origin. Smart contracts verify the TLS session was genuine without seeing the plaintext.",
    },
    {
      title: "No Trusted Intermediary",
      description:
        "Unlike traditional oracles, FHE-TLS requires no trusted party between the data source and the blockchain. The cryptographic proof is the trust.",
    },
    {
      title: "Encrypted in Transit & at Rest",
      description:
        "Data remains encrypted from the source through computation to the final result. At no point does any single party see the plaintext.",
    },
    {
      title: "Composable with RE-FHE",
      description:
        "FHE-TLS outputs feed directly into RE-FHE computations. Ingest encrypted off-chain data, process it confidentially, and produce verifiable on-chain results.",
    },
  ],
};

// ── Architecture Steps ───────────────────────────────────────

export const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    step: 1,
    title: "Encrypt",
    description:
      "Users or programs encrypt inputs using Encrypt\u2019s SDK. Data is transformed into FHE ciphertexts that are computationally indistinguishable from random noise.",
  },
  {
    step: 2,
    title: "Submit",
    description:
      "Encrypted inputs are submitted to the Solana network as standard transactions. The encrypted payload is opaque to validators, searchers, and observers.",
  },
  {
    step: 3,
    title: "Compute",
    description:
      "Encrypt\u2019s confidential execution layer performs homomorphic operations on the ciphertexts. Complex logic runs directly on encrypted data without decryption.",
  },
  {
    step: 4,
    title: "Verify",
    description:
      "A proof of correct computation is generated and submitted on-chain. Validators confirm the result is correct without accessing the underlying data.",
  },
  {
    step: 5,
    title: "Reveal",
    description:
      "Results are re-encrypted for authorized parties using RE-FHE. Only designated recipients can decrypt the output \u2014 selective disclosure by design.",
  },
];

// ── Audience Tabs ────────────────────────────────────────────

export const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "builders",
    label: "Builders",
    headline: "Ship confidential apps on Solana",
    description:
      "Encrypt gives you the primitives to build privacy-preserving applications without learning cryptography from scratch. Our SDK integrates with your existing Solana development workflow.",
    bullets: [
      "TypeScript & Rust SDKs with comprehensive type definitions",
      "Anchor-compatible program macros for confidential instructions",
      "Local test validator with FHE simulation mode",
      "Pre-built encrypted token, auction, and governance templates",
      "Detailed guides, API references, and example repositories",
    ],
  },
  {
    id: "traders",
    label: "Traders",
    headline: "Trade without information leakage",
    description:
      "Every on-chain action reveals your strategy. Encrypt makes your trades, positions, and rebalancing logic invisible to front-runners, searchers, and competitors.",
    bullets: [
      "Submit encrypted orders that settle without MEV extraction",
      "Run confidential liquidation strategies on-chain",
      "Shield portfolio composition from public view",
      "Execute multi-leg strategies atomically and privately",
      "Maintain full self-custody throughout",
    ],
  },
  {
    id: "investors",
    label: "Investors",
    headline: "The confidential execution layer for crypto",
    description:
      "Privacy is the missing infrastructure layer for institutional adoption. Encrypt is the base layer that makes blockchain compliant, private, and enterprise-ready.",
    bullets: [
      "Addresses the $4B+ MEV extraction problem at the protocol level",
      "Enables regulatory-compliant DeFi with selective disclosure",
      "Built on peer-reviewed cryptography, not trusted hardware",
      "Solana-native: taps into the fastest-growing L1 ecosystem",
      "Open-source with a clear path to decentralization",
    ],
  },
];

// ── Research Cards ───────────────────────────────────────────

export const RESEARCH_CARDS: ResearchCard[] = [
  {
    title: "RE-FHE: A Practical Framework for Re-Encryption FHE on Solana",
    description:
      "Our foundational paper introducing re-encryption fully homomorphic encryption and its application to confidential smart contract execution.",
    tag: "Whitepaper",
    href: "/research/re-fhe-paper",
  },
  {
    title: "FHE-TLS: Trustless Data Ingestion via Homomorphic TLS",
    description:
      "How extending the TLS protocol with FHE enables cryptographically authenticated off-chain data for smart contracts.",
    tag: "Technical Report",
    href: "/research/fhe-tls-paper",
  },
  {
    title: "Benchmarking FHE on Solana: Latency, Throughput, and Cost Analysis",
    description:
      "Comprehensive performance analysis of Encrypt\u2019s confidential execution layer across different workloads and FHE parameter sets.",
    tag: "Benchmark",
    href: "/research/benchmarks",
  },
  {
    title: "Encrypted Orderbooks: Eliminating MEV with Confidential DeFi",
    description:
      "A deep dive into how encrypted order matching eliminates front-running and sandwich attacks in decentralized exchanges.",
    tag: "Research",
    href: "/research/encrypted-orderbooks",
  },
];

// ── CTA Section ──────────────────────────────────────────────

export const CTA_SECTION: CTASection = {
  headline: "The future of execution is encrypted.",
  subheadline:
    "Join the builders, researchers, and protocols bringing confidential computation to Solana.",
  ctas: [
    { label: "Start Building", href: "/developers", variant: "primary" },
    { label: "Join the Community", href: "https://discord.gg/encrypt", variant: "secondary" },
  ],
};

// ── Footer ───────────────────────────────────────────────────

export const FOOTER: FooterContent = {
  tagline: "Confidential execution for Solana.",
  columns: [
    {
      title: "Technology",
      links: [
        { label: "RE-FHE", href: "/#re-fhe" },
        { label: "FHE-TLS", href: "/#fhe-tls" },
        { label: "Architecture", href: "/#architecture" },
        { label: "Use Cases", href: "/#use-cases" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "https://docs.encrypt.xyz" },
        { label: "SDK Reference", href: "https://docs.encrypt.xyz/sdk" },
        { label: "GitHub", href: "https://github.com/encrypt-xyz" },
        { label: "Examples", href: "https://github.com/encrypt-xyz/examples" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: "https://discord.gg/encrypt" },
        { label: "Twitter", href: "https://twitter.com/encrypt_xyz" },
        { label: "Blog", href: "/blog" },
        { label: "Research", href: "/research" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Brand Assets", href: "/brand" },
        { label: "Contact", href: "mailto:hello@encrypt.xyz" },
      ],
    },
  ],
  bottomLine: "\u00A9 2024 Encrypt Labs. All rights reserved.",
  socials: [
    { label: "Twitter", href: "https://twitter.com/encrypt_xyz", icon: "twitter" },
    { label: "Discord", href: "https://discord.gg/encrypt", icon: "discord" },
    { label: "GitHub", href: "https://github.com/encrypt-xyz", icon: "github" },
  ],
};

// ── Short Product Description ────────────────────────────────

export const PRODUCT_DESCRIPTION =
  "Encrypt is the confidential execution layer for Solana, powered by RE-FHE and FHE-TLS. We enable computation on encrypted data without decryption, bringing private DeFi, sealed auctions, encrypted AI, and trustless data access to the fastest blockchain.";

// ── Developers Page ──────────────────────────────────────────

export const DEVELOPERS_PAGE: PageContent & {
  sections: {
    title: string;
    description: string;
    icon: string;
    cta: CTA;
  }[];
  quickstart: {
    title: string;
    steps: string[];
  };
} = {
  eyebrow: "For Developers",
  headline: "Build confidential applications on Solana",
  description:
    "Everything you need to add encrypted computation to your Solana programs. SDKs, documentation, templates, and a local development environment purpose-built for FHE.",
  sections: [
    {
      title: "TypeScript SDK",
      description:
        "Full-featured client SDK for encrypting inputs, submitting confidential transactions, and decrypting results. Works with any Solana wallet adapter.",
      icon: "code",
      cta: { label: "View SDK Docs", href: "https://docs.encrypt.xyz/sdk/typescript", variant: "secondary" },
    },
    {
      title: "Rust SDK & Anchor Macros",
      description:
        "On-chain program macros that make writing confidential instructions as natural as writing standard Anchor programs. Encrypted types, homomorphic operations, and re-encryption built in.",
      icon: "terminal",
      cta: { label: "View Rust Docs", href: "https://docs.encrypt.xyz/sdk/rust", variant: "secondary" },
    },
    {
      title: "Local Validator",
      description:
        "A modified Solana test validator with FHE simulation mode. Develop and test confidential programs locally without a network connection.",
      icon: "server",
      cta: { label: "Get Started", href: "https://docs.encrypt.xyz/quickstart", variant: "secondary" },
    },
    {
      title: "Templates & Examples",
      description:
        "Production-ready templates for encrypted tokens, sealed-bid auctions, confidential governance, and private DeFi strategies.",
      icon: "layout",
      cta: { label: "Browse Examples", href: "https://github.com/encrypt-xyz/examples", variant: "secondary" },
    },
  ],
  quickstart: {
    title: "Get started in 5 minutes",
    steps: [
      "npm install @encrypt-xyz/sdk",
      "Initialize the Encrypt client with your Solana connection",
      "Encrypt your inputs using the SDK",
      "Submit a confidential transaction",
      "Decrypt the result with your private key",
    ],
  },
};

// ── Research Page ────────────────────────────────────────────

export const RESEARCH_PAGE: PageContent & {
  papers: ResearchCard[];
} = {
  eyebrow: "Research",
  headline: "Advancing the state of encrypted computation",
  description:
    "Our research pushes the boundaries of fully homomorphic encryption for blockchain applications. Every primitive in Encrypt is backed by peer-reviewed cryptography.",
  papers: [
    ...RESEARCH_CARDS,
    {
      title: "Threshold RE-FHE: Decentralized Key Management for Confidential Execution",
      description:
        "How threshold cryptography enables decentralized FHE key management without a single trusted party.",
      tag: "Working Paper",
      href: "/research/threshold-re-fhe",
    },
    {
      title: "The Economics of Confidential Execution: MEV, Privacy, and Market Efficiency",
      description:
        "An economic analysis of how confidential execution affects market microstructure, MEV extraction, and overall DeFi efficiency.",
      tag: "Research",
      href: "/research/economics",
    },
  ],
};

// ── Ecosystem Page ───────────────────────────────────────────

export const ECOSYSTEM_PAGE: PageContent & {
  categories: {
    title: string;
    description: string;
    partners: { name: string; description: string; logo: string; href: string }[];
  }[];
} = {
  eyebrow: "Ecosystem",
  headline: "A growing network of confidential applications",
  description:
    "Protocols, infrastructure providers, and applications building on Encrypt\u2019s confidential execution layer.",
  categories: [
    {
      title: "DeFi Protocols",
      description: "Decentralized exchanges, lending protocols, and yield aggregators using confidential execution.",
      partners: [
        {
          name: "Cipher DEX",
          description: "Encrypted orderbook DEX eliminating front-running on Solana.",
          logo: "/logos/cipher-dex.svg",
          href: "#",
        },
        {
          name: "Veil Lending",
          description: "Private lending protocol with encrypted collateral positions.",
          logo: "/logos/veil-lending.svg",
          href: "#",
        },
      ],
    },
    {
      title: "Infrastructure",
      description: "Tools, services, and middleware powering the confidential execution stack.",
      partners: [
        {
          name: "Encrypt Validator Network",
          description: "Decentralized FHE computation validators securing the network.",
          logo: "/logos/validators.svg",
          href: "#",
        },
        {
          name: "Key Custodians",
          description: "Threshold key management for enterprise FHE deployments.",
          logo: "/logos/custodians.svg",
          href: "#",
        },
      ],
    },
    {
      title: "Applications",
      description: "Consumer and enterprise applications leveraging confidential execution.",
      partners: [
        {
          name: "SealVote",
          description: "Confidential governance platform for DAOs and on-chain organizations.",
          logo: "/logos/sealvote.svg",
          href: "#",
        },
        {
          name: "Prism AI",
          description: "Encrypted AI inference marketplace running models on private data.",
          logo: "/logos/prism-ai.svg",
          href: "#",
        },
      ],
    },
  ],
};

// ── Blog Posts ────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "introducing-encrypt",
    title: "Introducing Encrypt: Confidential Execution for Solana",
    excerpt:
      "Today we\u2019re publicly unveiling Encrypt, the confidential execution layer for Solana. Built on RE-FHE and FHE-TLS, Encrypt enables computation on encrypted data without ever decrypting it.",
    date: "2024-12-15",
    author: "Encrypt Team",
    tag: "Announcement",
    readTime: "8 min read",
  },
  {
    slug: "why-fhe-matters-for-defi",
    title: "Why FHE Matters for DeFi: Beyond Simple Privacy",
    excerpt:
      "Fully homomorphic encryption isn\u2019t just about hiding transactions. It fundamentally changes what\u2019s possible in decentralized finance \u2014 from eliminating MEV to enabling compliant institutional participation.",
    date: "2024-12-08",
    author: "Encrypt Research",
    tag: "Research",
    readTime: "12 min read",
  },
  {
    slug: "building-sealed-auctions-with-encrypt",
    title: "Building Sealed-Bid Auctions with Encrypt: A Developer Guide",
    excerpt:
      "A step-by-step technical guide to building a sealed-bid auction using Encrypt\u2019s SDK. From encrypting bids to revealing the winner \u2014 with full code examples.",
    date: "2024-12-01",
    author: "Developer Relations",
    tag: "Tutorial",
    readTime: "15 min read",
  },
];
