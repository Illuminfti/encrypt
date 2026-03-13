import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
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
import GradientDivider from "@/components/GradientDivider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen page-flow">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <BadgeRow />
      <ProblemSection />
      <GradientDivider color="ultraviolet" />
      <SolutionSection />
      <GradientDivider color="mint" />
      <ReFHESection />
      <UseCaseGrid />
      <GradientDivider color="cyan" />
      <FHETLSSection />
      <ArchitectureFlow />
      <GradientDivider color="ultraviolet" />
      <AudienceTabs />
      <ResearchGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
