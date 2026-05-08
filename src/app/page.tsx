import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import BrandsSection from "@/components/home/BrandsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "techno.cep | Teknolojinin Güvenilir Adresi",
  description:
    "Bursa Nilüfer'de cep telefonu satış, tamir, aksesuar ve yazılım hizmetleri. Orijinal parça, garantili işçilik, hızlı servis.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <BrandsSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
