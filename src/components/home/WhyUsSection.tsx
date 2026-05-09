import { Zap, Shield, Award, Wallet } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Award: <Award size={24} />,
  Wallet: <Wallet size={24} />,
};

const colorMap: Record<string, { accent: string; icon: string }> = {
  cyan: {
    accent: "from-[#00d4ff]/20 to-[#00d4ff]/5 border-[#00d4ff]/20",
    icon: "bg-[#00d4ff]/15 text-[#0891b2]",
  },
  green: {
    accent: "from-green-400/20 to-green-400/5 border-green-400/20",
    icon: "bg-green-500/15 text-green-600",
  },
  purple: {
    accent: "from-purple-400/20 to-purple-400/5 border-purple-400/20",
    icon: "bg-purple-500/15 text-purple-600",
  },
  orange: {
    accent: "from-orange-400/20 to-orange-400/5 border-orange-400/20",
    icon: "bg-orange-500/15 text-orange-600",
  },
};

type WhyUsItemData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export default function WhyUsSection({ items }: { items: WhyUsItemData[] }) {
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
            {items.map((item) => {
              const colors = colorMap[item.color] ?? colorMap.cyan;

              return (
                <StaggerItem key={item.id}>
                  <div
                    className={`bg-gradient-to-br ${colors.accent} border rounded-2xl p-6 space-y-3 group hover:-translate-y-1 transition-transform duration-300`}
                  >
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${colors.icon}`}>
                      {iconMap[item.icon]}
                    </div>
                    <h3 className="font-heading font-bold text-[#1a1a2e]">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
