import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

export default async function ContactInfo() {
  const config = await prisma.siteConfig.findUnique({ where: { id: "main" } });

  const phone = config?.phone ?? "0501 660 16 26";
  const whatsapp = config?.whatsapp ?? "905016601626";
  const instagram = config?.instagram ?? "techno.cep";
  const instagramUrl = config?.instagramUrl ?? "https://instagram.com/techno.cep";
  const address = config?.address ?? "Cumhuriyet Mahallesi, Hatun Caddesi No: 52/F, Nilüfer / Bursa";
  const googleMapsUrl = config?.googleMapsUrl ?? "";
  const weekdayHours = config?.weekdayHours ?? "Pazartesi – Cumartesi: 10:30 – 21:00";
  const weekendHours = config?.weekendHours ?? "Pazar: Kapalı";

  const items = [
    {
      icon: <Phone size={20} />,
      label: "Telefon",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      value: phone,
      href: `https://wa.me/${whatsapp}?text=Merhaba, bilgi almak istiyorum.`,
      color: "bg-green-50 text-green-600",
      external: true,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
      label: "Instagram",
      value: `@${instagram}`,
      href: instagramUrl,
      color: "bg-pink-50 text-pink-500",
      external: true,
    },
    {
      icon: <MapPin size={20} />,
      label: "Adres",
      value: address,
      href: googleMapsUrl,
      color: "bg-orange-50 text-orange-500",
      external: true,
    },
    {
      icon: <Clock size={20} />,
      label: "Çalışma Saatleri",
      value: `${weekdayHours}\n${weekendHours}`,
      href: null as string | null,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <ScrollReveal stagger className="space-y-4">
      {items.map((item) => (
        <StaggerItem key={item.label}>
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
            <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-[#1a1a2e] font-medium text-sm hover:text-[#00d4ff] transition-colors whitespace-pre-line"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-[#1a1a2e] font-medium text-sm whitespace-pre-line">{item.value}</p>
              )}
            </div>
          </div>
        </StaggerItem>
      ))}
    </ScrollReveal>
  );
}
