"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Arka plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0e1128]" />

      {/* Dekoratif ışık */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#00d4ff]/8 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#00d4ff]/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#00d4ff]/5 blur-2xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#00d4ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Hemen İletişime Geçin
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Cihazınız için<br />
            <span className="text-[#00d4ff]">hemen yardım alalım</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Sorunuzu WhatsApp&apos;tan iletin, size en kısa sürede dönüş yapalım. Ücretsiz ön değerlendirme.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba, cihazımla ilgili yardım almak istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-xl shadow-green-500/20 cursor-pointer group"
            >
              <MessageCircle size={20} />
              WhatsApp&apos;tan Yaz
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 border border-white/20 hover:border-[#00d4ff]/60 text-white hover:text-[#00d4ff] px-8 py-4 rounded-xl font-semibold text-base transition-all"
            >
              <Phone size={18} />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.35}>
          <p className="mt-8 text-gray-500 text-sm">
            Pazartesi–Cumartesi 10:30–21:00 arası hizmetinizdeyiz
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
