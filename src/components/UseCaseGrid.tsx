"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Landmark,
  ArrowRightLeft,
  Bot,
  Globe,
  Users,
} from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    title: "Confidential trading",
    description:
      "Execute strategies without exposing intent or position size.",
  },
  {
    icon: Landmark,
    title: "Private lending",
    description:
      "Score borrowers and manage risk without revealing the model.",
  },
  {
    icon: ArrowRightLeft,
    title: "Hidden intents & RFQs",
    description:
      "Submit orders that can\u2019t be front-run or inspected.",
  },
  {
    icon: Bot,
    title: "Agentic finance",
    description:
      "Autonomous agents that act on encrypted strategies.",
  },
  {
    icon: Globe,
    title: "FHE-TLS API actions",
    description:
      "Read and write to APIs without exposing the request.",
  },
  {
    icon: Users,
    title: "Private consumer apps",
    description:
      "Social, gaming, and identity apps with confidential state.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function UseCaseGrid() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          What you can build
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {useCases.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="group bg-abyss border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] mb-5 group-hover:bg-ultraviolet/10 transition-colors">
                <item.icon className="w-5 h-5 text-mist group-hover:text-ultraviolet transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-cloud mb-2">
                {item.title}
              </h3>
              <p className="text-mist text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
