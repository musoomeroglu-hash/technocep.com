import type { Metadata } from "next";
import { prisma } from "@/lib/db";
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

export default async function HomePage() {
  const [hero, services, brands, whyUs, siteConfig] = await Promise.all([
    prisma.heroSection.findUnique({ where: { id: "main" } }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.whyUsItem.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.siteConfig.findUnique({ where: { id: "main" } }),
  ]);

  return (
    <>
      <HeroSection hero={hero} siteConfig={siteConfig} />
      <ServicesPreview services={services} />
      <BrandsSection brands={brands} />
      <WhyUsSection items={whyUs} />
      <CTASection siteConfig={siteConfig} />
    </>
  );
}
