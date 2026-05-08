import type { Metadata } from "next";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import ServiceGrid from "@/components/services/ServiceGrid";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TextReveal from "@/components/effects/TextReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "techno.cep | Hizmetlerimiz",
  description:
    "Ekran değişimi, batarya tamiri, anakart tamiri, veri kurtarma, yazılım hizmetleri ve aksesuar satışı. Bursa Nilüfer'de profesyonel cep telefonu servisi.",
};

export default function HizmetlerPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-[#eff6ff] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00d4ff]/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#1a1a2e]/4 blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#00d4ff] bg-[#00d4ff]/10 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              Profesyonel Çözümler
            </span>
          </ScrollReveal>
          <TextReveal
            text="Hizmetlerimiz"
            tag="h1"
            by="word"
            delay={0.1}
            className="font-heading font-black text-5xl sm:text-6xl text-[#1a1a2e] mb-5"
          />
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Cihazınızla ilgili her türlü sorun için profesyonel, hızlı ve garantili çözümler sunuyoruz.
              Orijinal parça kullanımı ve deneyimli teknik ekibimizle yanınızdayız.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Hizmet kartları */}
      <section className="py-20 bg-white">
        <Container>
          <ServiceGrid />
        </Container>
      </section>

      {/* Alt CTA */}
      <section className="py-20 bg-[#f8f9fa]">
        <Container>
          <ScrollReveal direction="up">
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16162a] rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/8 to-transparent rounded-3xl pointer-events-none" />

              <h2 className="relative font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Sorularınız mı var?
              </h2>
              <p className="relative text-gray-400 text-base mb-8 max-w-lg mx-auto">
                Cihazınızın sorunundan emin değil misiniz? Bize ulaşın, ücretsiz ön değerlendirme yapalım.
              </p>

              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer group"
                >
                  <MessageCircle size={17} />
                  WhatsApp&apos;tan Sor
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </MagneticButton>

                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 border border-white/20 hover:border-[#00d4ff]/50 text-white hover:text-[#00d4ff] px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
                >
                  <Phone size={16} />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
