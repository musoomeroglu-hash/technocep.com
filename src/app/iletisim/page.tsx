import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TextReveal from "@/components/effects/TextReveal";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "techno.cep | İletişim",
  description:
    "techno.cep ile iletişime geçin. Bursa Nilüfer Cumhuriyet Mahallesi Hatun Caddesi No: 52/F. 0501 660 16 26",
};

export default function IletisimPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-[#eff6ff] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00d4ff]/6 blur-3xl pointer-events-none" />
        <Container className="relative text-center">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#00d4ff] bg-[#00d4ff]/10 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              Bize Ulaşın
            </span>
          </ScrollReveal>
          <TextReveal
            text="İletişim"
            tag="h1"
            by="word"
            delay={0.1}
            className="font-heading font-black text-5xl sm:text-6xl text-[#1a1a2e] mb-5"
          />
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Sorularınız için bize WhatsApp&apos;tan, telefonla veya formu doldurarak ulaşabilirsiniz.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* İçerik */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sol — İletişim bilgileri */}
            <div className="space-y-8">
              <ScrollReveal direction="right">
                <SectionHeading
                  label="Bize Ulaşın"
                  title="İletişim Bilgileri"
                  description="Aşağıdaki kanallardan bize doğrudan ulaşabilirsiniz."
                />
              </ScrollReveal>
              <ContactInfo />
            </div>

            {/* Sağ — Form */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="space-y-4">
                <SectionHeading
                  label="Mesaj Gönderin"
                  title="Bize Yazın"
                />
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Harita */}
      <section className="pb-20 bg-white">
        <Container>
          <ScrollReveal direction="up">
            <div className="space-y-5">
              <SectionHeading label="Neredeyiz?" title="Konumumuz" />
              <MapEmbed />
              <p className="text-sm text-gray-400 text-center">
                Cumhuriyet Mahallesi, Hatun Caddesi No: 52/F, Nilüfer / Bursa
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
