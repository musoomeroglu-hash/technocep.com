"use client";

import type { Metadata } from "next";
import { Shield, Zap, Award, Users, Heart, Target, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";
import TextReveal from "@/components/effects/TextReveal";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const values = [
  {
    icon: <Shield size={22} />,
    title: "Güvenilirlik",
    description: "Her işlemde dürüst ve şeffaf olmak, müşterilerimizin güvenini kazanmak için temel ilkemizdir.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <Zap size={22} />,
    title: "Hız",
    description: "Zamanınızın değerini biliyoruz. Çoğu tamir işlemini aynı gün teslim ederek hayatınıza hız katıyoruz.",
    color: "bg-[#00d4ff]/10 text-[#0891b2]",
  },
  {
    icon: <Award size={22} />,
    title: "Kalite",
    description: "Orijinal ve A+ kalite parçalar kullanarak uzun ömürlü çözümler sunuyoruz.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: <Heart size={22} />,
    title: "Müşteri Odaklılık",
    description: "Her müşterimiz bizim için özeldir. Sorunlarınıza kişisel ilgi göstererek en iyi çözümü buluyoruz.",
    color: "bg-rose-50 text-rose-500",
  },
];

const stats = [
  { target: 500, suffix: "+", label: "Mutlu Müşteri" },
  { target: 1000, suffix: "+", label: "Başarılı Tamir" },
  { target: 50, suffix: "+", label: "Aksesuar Çeşidi" },
  { target: 100, suffix: "%", label: "Garanti" },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-[#eff6ff] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00d4ff]/6 blur-3xl pointer-events-none" />
        <Container className="relative text-center">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#00d4ff] bg-[#00d4ff]/10 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              Bizi Tanıyın
            </span>
          </ScrollReveal>
          <TextReveal
            text="Hakkımızda"
            tag="h1"
            by="word"
            delay={0.1}
            className="font-heading font-black text-5xl sm:text-6xl text-[#1a1a2e] mb-5"
          />
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Bursa Nilüfer&apos;in güvenilir teknoloji servisi olarak her gün yanınızdayız.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Hikaye */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="space-y-5">
                <SectionHeading
                  label="Hikayemiz"
                  title="Teknoloji sevgisiyle başladı"
                />
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    Bursa Nilüfer&apos;de teknoloji sevdalıları için güvenilir bir nokta olmak amacıyla yola çıktık.
                    Cep telefonu kullanıcılarının yaşadığı sorunları yakından bilen bir ekip olarak,
                    kaliteli hizmetin herkes için erişilebilir olması gerektiğine inanıyoruz.
                  </p>
                  <p>
                    Yıllar içinde biriktirdiğimiz deneyim ve uzmanlaşmış teknik bilgimizle,
                    ekran değişiminden anakart tamirine kadar her türlü cihaz sorununa çözüm üretiyoruz.
                    Her tamirde orijinal veya A+ kalite parça kullanarak işimizin arkasında duruyoruz.
                  </p>
                  <p>
                    Müşteri memnuniyeti bizim için bir hedef değil, bir vazgeçilmez. Her cihazı kendi
                    cihazımız gibi özenle tamir ediyor, her müşterimize dürüst ve şeffaf bir hizmet sunuyoruz.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Görsel kart */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] rounded-3xl p-10 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00d4ff]/10 blur-2xl pointer-events-none" />
                  <div className="relative space-y-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00d4ff]/15 text-[#00d4ff]">
                      <Target size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl">Misyonumuz</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Bursa Nilüfer&apos;deki her kullanıcının teknolojik sorunlarına hızlı, uygun fiyatlı
                      ve garantili çözümler sunarak hayatlarını kolaylaştırmak.
                    </p>
                    <ul className="space-y-3">
                      {["Orijinal parça kullanımı", "Garantili işçilik", "Şeffaf fiyatlandırma", "Hızlı teslimat"].map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                          <CheckCircle size={15} className="text-[#00d4ff] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Dekoratif kart arkası */}
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#00d4ff]/10 rounded-3xl -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 bg-[#f8f9fa]">
        <Container>
          <ScrollReveal direction="up" className="mb-14">
            <SectionHeading
              label="İlkelerimiz"
              title="Değerlerimiz"
              description="İşimizi yaparken bizi yönlendiren temel değerler."
              center
            />
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${v.color}`}>
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-[#1a1a2e] mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      {/* Sayılar */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollReveal direction="up" className="mb-14">
            <SectionHeading label="Rakamlarla Biz" title="Güven veren sayılar" center />
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StaggerItem key={stat.label}>
                <div className="text-center space-y-2">
                  <p className="font-heading font-black text-5xl text-[#1a1a2e]">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
