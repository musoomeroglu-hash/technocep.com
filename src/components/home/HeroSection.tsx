"use client";

import Link from "next/link";
import { MessageCircle, ChevronRight, Phone } from "lucide-react";
import ParticleBackground from "@/components/effects/ParticleBackground";
import FloatingPhone from "@/components/effects/FloatingPhone";
import TextReveal from "@/components/effects/TextReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-white to-[#eff6ff]">
      {/* Particle arka plan */}
      <ParticleBackground />

      {/* Dekoratif büyük daire */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00d4ff]/8 to-[#1a1a2e]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[#1a1a2e]/5 to-[#00d4ff]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Sol — metin */}
          <div className="space-y-8">
            {/* Üst badge */}
            <ScrollReveal direction="down" delay={0.1}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0891b2] bg-[#00d4ff]/10 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                Bursa Nilüfer&apos;de Hizmetinizdeyiz
              </span>
            </ScrollReveal>

            {/* Ana başlık */}
            <div>
              <TextReveal
                text="techno.cep"
                tag="h1"
                by="char"
                delay={0.15}
                className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-[#1a1a2e]"
              />
              <ScrollReveal direction="up" delay={0.4}>
                <p className="mt-3 font-heading font-semibold text-2xl sm:text-3xl text-[#00d4ff]">
                  Teknolojinin Güvenilir Adresi
                </p>
              </ScrollReveal>
            </div>

            {/* Açıklama */}
            <ScrollReveal direction="up" delay={0.5}>
              <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                Ekran değişiminden anakart tamirine, aksesuar satışından yazılım hizmetine — cihazınız için ihtiyacınız olan her şey tek adreste.
              </p>
            </ScrollReveal>

            {/* Butonlar */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="cursor-pointer">
                  <Link
                    href="/hizmetler"
                    className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#16162a] transition-colors shadow-lg shadow-[#1a1a2e]/20"
                  >
                    Hizmetlerimiz
                    <ChevronRight size={16} />
                  </Link>
                </MagneticButton>

                <MagneticButton className="cursor-pointer">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba, bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors shadow-lg shadow-green-500/25"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Alt bilgi şeridi */}
            <ScrollReveal direction="up" delay={0.75}>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} className="text-[#00d4ff]" />
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="hover:text-[#1a1a2e] transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-[#00d4ff] font-medium">Pzt–Cmt</span> 10:30–21:00
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ — 3D telefon */}
          <ScrollReveal direction="left" delay={0.3} className="relative h-[480px] lg:h-[560px]">
            {/* Glow çemberi */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-72 h-72 rounded-full bg-gradient-to-br from-[#00d4ff]/15 to-[#1a1a2e]/10 blur-2xl"
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <FloatingPhone />
          </ScrollReveal>
        </div>
      </div>

      {/* Alt geçiş */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
