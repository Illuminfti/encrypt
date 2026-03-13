import { siteConfig } from "@/lib/site-config";

/* ── Developers Page ──────────────────────────────────────── */

export const developersPage = {
  eyebrow: "Developers",
  headline: "Build confidential programs for Solana",
  subheadline:
    "Encrypted inputs, encrypted state, comparisons, policy-based reveal, and verifiable API actions.",

  primitives: [
    {
      title: "Encrypted inputs",
      body: "Submit data that only the program can decrypt during confidential execution.",
    },
    {
      title: "Encrypted state",
      body: "Store application state that remains confidential at rest and during computation.",
    },
    {
      title: "Comparisons",
      body: "Evaluate conditions on encrypted values — greater-than, equality, range checks — without decryption.",
    },
    {
      title: "Policy-based reveal",
      body: "Define who sees what, and when. Outputs are revealed only when policy allows.",
    },
    {
      title: "API actions",
      body: "Read from and write to external APIs through encrypted channels without exposing payloads.",
    },
  ],

  codePanel: {
    title: "Illustrative API shape",
    note: "This is a conceptual example. The SDK is not yet public.",
    lines: [
      "// Illustrative API shape — not a published package",
      "",
      "const program = confidentialProgram({",
      '  network: "solana-mainnet",',
      "  encryptionScheme: \"re-fhe\",",
      "});",
      "",
      "// Encrypt inputs client-side",
      "const encInput = await program.encrypt({",
      "  amount: 1000,",
      "  strategy: \"limit-buy\",",
      "});",
      "",
      "// Submit to confidential execution",
      "const result = await program.execute({",
      "  input: encInput,",
      '  action: "evaluate-and-route",',
      "});",
      "",
      "// Reveal only what policy allows",
      "const output = await result.authorizedReveal({",
      '  revealTo: "settlement-program",',
      "});",
    ],
  },

  architectureLanes: {
    confidential: "Confidential execution lane",
    public: "Solana settlement lane",
  },

  integrationSteps: [
    "Encrypt inputs client-side",
    "Submit to confidential program",
    "Evaluate encrypted logic",
    "Reveal or act by policy",
    "Settle on Solana",
  ],

  primaryCTA: { label: "Build on Encrypt", href: siteConfig.routes.developers },
  secondaryCTA: { label: "Read Research", href: siteConfig.routes.research },
} as const;

/* ── Research Page ────────────────────────────────────────── */

export const researchPage = {
  eyebrow: "Research",
  headline: "Research-led confidential execution",
  subheadline:
    "Encrypt is built on original cryptographic work around RE-FHE and threshold-FHE network design.",

  sections: [
    {
      title: "RE-FHE",
      body: "RE-FHE is a fully homomorphic encryption scheme designed for arithmetic and logical operations over large machine words, such as 64-bit values. Unlike earlier FHE approaches that operate on individual bits or small plaintext spaces, RE-FHE can perform comparisons, branching, and scoring operations efficiently. This makes it suitable for real application logic rather than toy encrypted math.",
    },
    {
      title: "Threshold-FHE",
      body: "Encrypt uses threshold FHE to distribute decryption authority across a network of participants. No single party holds a complete decryption key. The threshold design supports asynchronous deployment and scalable overhead in multi-party settings, making it practical for a real distributed network rather than a lab demonstration.",
    },
  ],

  benchmarks: {
    label: "Coming soon",
    body: "Benchmarks will ship with methodology. The homepage should not carry isolated performance claims.",
  },

  securityModel: {
    title: "Security model",
    points: [
      "Encrypted state: application data remains encrypted at rest and during computation.",
      "Reveal policy: outputs are only decrypted or exposed when explicit policy conditions are met.",
      "Threshold decryption: no single party can decrypt — a threshold of network participants must cooperate.",
      "Public settlement on Solana: final state transitions settle on Solana's public ledger, preserving composability and auditability.",
    ],
  },

  faq: [
    {
      question: "What is FHE?",
      answer:
        "Fully Homomorphic Encryption lets programs compute on encrypted data without decrypting it first. The result, when decrypted, is the same as if the computation had been performed on the plaintext. This means sensitive data can be processed without ever being exposed.",
    },
    {
      question: "Why does word-level logic matter?",
      answer:
        "Most FHE schemes operate on individual bits or very small values. RE-FHE works on full machine words — 64-bit integers — which means it can handle the kind of arithmetic, comparisons, and branching that real programs actually need, not just toy addition on small numbers.",
    },
    {
      question: "Is Encrypt a separate chain?",
      answer:
        "No. Encrypt is a confidential execution network designed to work with Solana. Computation happens on encrypted data in the Encrypt network, and final settlement occurs on Solana's public ledger. This preserves Solana's composability and performance.",
    },
    {
      question: "What does authorized reveal mean?",
      answer:
        "After confidential computation, the encrypted result can be selectively revealed to specific parties or programs according to a policy defined by the application. This means you control exactly who sees what, and when — rather than making all outputs public by default.",
    },
  ],
} as const;

/* ── Ecosystem Page ───────────────────────────────────────── */

export const ecosystemPage = {
  eyebrow: "Ecosystem",
  headline: "Where confidential execution fits first",
  subheadline:
    "Encrypt unlocks new categories of Solana applications across markets, APIs, and private-state consumer software.",

  categories: [
    {
      title: "Markets",
      body: "Sealed-bid auctions, confidential order books, and MEV-resistant trade execution.",
      example: "Confidential limit orders with hidden size and strategy",
      status: "Design partner opportunity",
    },
    {
      title: "Credit",
      body: "Private credit scoring, encrypted collateral evaluation, and confidential risk models.",
      example: "Lending protocols with private borrower assessment",
      status: "Design partner opportunity",
    },
    {
      title: "Intents",
      body: "Hidden intents, private RFQs, and encrypted order matching.",
      example: "Intent networks where order flow stays confidential",
      status: "Design partner opportunity",
    },
    {
      title: "Agents",
      body: "Autonomous agents acting on encrypted strategies and private external signals.",
      example: "Portfolio agents with confidential rebalancing logic",
      status: "Design partner opportunity",
    },
    {
      title: "Consumer",
      body: "Identity, reputation, social, and gaming with confidential user state.",
      example: "Reputation systems without public behavior logs",
      status: "Design partner opportunity",
    },
    {
      title: "Enterprise",
      body: "Compliance workflows, treasury operations, and API-connected private automation.",
      example: "Automated treasury with encrypted policy rules",
      status: "Design partner opportunity",
    },
  ],

  closingPanel: {
    headline: "Build with us early",
    body: "We are looking for protocols and product teams that need confidential logic, confidential state, or API-connected private workflows.",
  },
} as const;

/* ── Blog Page ────────────────────────────────────────────── */

export const blogPage = {
  headline: "Blog",
  subheadline: "Ideas and updates from the Encrypt team.",

  posts: [
    {
      title: "Why confidential execution matters on Solana",
      label: "Foundational brief",
      excerpt:
        "Solana is the fastest settlement layer in crypto — but speed without confidentiality leaves an entire category of applications unbuilt.",
      gradient: "from-ultraviolet to-prism-cyan",
    },
    {
      title: "Built for real application logic",
      label: "Foundational brief",
      excerpt:
        "Most FHE implementations can barely add two encrypted numbers. RE-FHE is designed for the kind of logic real programs actually need.",
      gradient: "from-cipher-mint to-prism-cyan",
    },
    {
      title: "Public settlement, encrypted logic",
      label: "Foundational brief",
      excerpt:
        "The goal is not a separate privacy chain. The goal is confidential execution that settles on Solana's public ledger.",
      gradient: "from-prism-cyan to-ultraviolet",
    },
  ],
} as const;
