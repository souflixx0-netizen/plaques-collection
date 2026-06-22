import Hero from "@/components/home/Hero";
import FormatsSection from "@/components/home/FormatsSection";
import SavoirFaire from "@/components/home/SavoirFaire";
import CTASection from "@/components/home/CTASection";
import ReassuranceBar from "@/components/ReassuranceBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ReassuranceBar />
      <FormatsSection />
      <SavoirFaire />
      <CTASection />
    </>
  );
}
