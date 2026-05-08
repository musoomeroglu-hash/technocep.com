import { Zap, Shield, Award, Wallet } from "lucide-react";
import { WHY_US } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Award: <Award size={24} />,
  Wallet: <Wallet size={24} />,
};

const accentColors = [
  "from-[#00d4ff]/20 to-[#00d4ff]/5 border-[#00d4ff]/20",
  "from-green-400/20 to-green-400/5 border-green-400/20",
  "from-purple-400/20 to-purple-400/5 border-purple-400/20",
  "from-orange-400/20 to-orange-400/5 border-orange-400/20",
];

const iconColors = [
  "bg-[#00d4ff]/15 text-[#0891b2]",
  "bg-green-500/15 text-green-600",
  "bg-purple-500/15 text-purple-600",
  "bg-orange-500/15 text-orange-600",
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Sol — başlık */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <SectionHeading
                label="Neden Biz?"
                title="Farkımızı Hissettiriyoruz"
                description="Müşteri memnuniyetini her şeyin önünde tutarak Bursa Nilüfer'in en güvenilir cep telefonu servisi olmayı hedefliyoruz."
              />
              <div className="flex gap-6 pt-4">
                <div className="text-center">
                  <p className="font-heading font-black text-4xl text-[#1a1a2e]">500+</p>
                  <p className="text-xs text-gray-400 mt-1">Mutlu Müşteri</p>
                </div>
                <div className="w-px bg-gray-100" />
                <div className="text-center">
                  <p className="font-heading font-black text-4xl text-[#1a1a2e]">1000+</p>
                  <p className="text-xs text-gray-400 mt-1">Başarılı Tamir</p>
                </div>
                <div className="w-px bg-gray-100" />
                <div className="text-center">
                  <p className="font-heading font-black text-4xl text-[#00d4ff]">%100</p>
                  <p className="text-xs text-gray-400 mt-1">Garanti</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Sağ — kartlar */}
          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_US.map((item, i) => (
              <StaggerItem key={item.title}>
                <div
                  className={`bg-gradient-to-br ${accentColors[i]} border rounded-2xl p-6 space-y-3 group hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${iconColors[i]}`}>
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="font-heading font-bold text-[#1a1a2e]">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
