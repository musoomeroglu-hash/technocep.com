import Link from "next/link";
import {
  Smartphone, BatteryCharging, Cpu, HardDrive, Code, ShoppingBag, ChevronRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={28} />,
  BatteryCharging: <BatteryCharging size={28} />,
  Cpu: <Cpu size={28} />,
  HardDrive: <HardDrive size={28} />,
  Code: <Code size={28} />,
  ShoppingBag: <ShoppingBag size={28} />,
};

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <ScrollReveal direction="up" className="mb-14">
          <SectionHeading
            label="Ne Yapıyoruz?"
            title="Hizmetlerimiz"
            description="Cihazınızla ilgili her sorunda yanınızdayız. Hızlı, garantili ve uygun fiyatlı çözümler."
            center
          />
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <div className="group relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#00d4ff]/40 transition-all duration-300 overflow-hidden h-full">
                {/* Hover arka plan */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* İkon */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#1a1a2e]/5 text-[#1a1a2e] mb-5 group-hover:bg-[#00d4ff]/10 group-hover:text-[#0891b2] transition-colors duration-300">
                  {iconMap[service.icon]}
                </div>

                <h3 className="relative font-heading font-bold text-lg text-[#1a1a2e] mb-2">
                  {service.title}
                </h3>
                <p className="relative text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3} className="mt-12 text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-[#1a1a2e] font-semibold hover:text-[#0891b2] transition-colors group"
          >
            Tüm Hizmetleri Gör
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
