import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BadgeRow from "@/components/BadgeRow";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ReFHESection from "@/components/ReFHESection";
import UseCaseGrid from "@/components/UseCaseGrid";
import FHETLSSection from "@/components/FHETLSSection";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import AudienceTabs from "@/components/AudienceTabs";
import ResearchGrid from "@/components/ResearchGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <BadgeRow
        badges={[
          "Built on RE-FHE",
          "Solana-aligned",
          "Confidential compute",
          "Verifiable API actions",
          "Sister network to Ika",
          "Research-led architecture",
        ]}
      />
      <ProblemSection />
      <SolutionSection />
      <ReFHESection />
      <UseCaseGrid />
      <FHETLSSection />
      <ArchitectureFlow />
      <AudienceTabs />
      <ResearchGrid />
      <CTASection
        headline="Build the first Solana apps that can keep a secret."
        primaryCTA={{ label: "Build with Encrypt", href: "/developers" }}
        secondaryCTA={{ label: "Read Research", href: "/research" }}
      />
      <Footer />
    </main>
  );
}
