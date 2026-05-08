import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

const items = [
  {
    icon: <Phone size={20} />,
    label: "Telefon",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <MessageCircle size={20} />,
    label: "WhatsApp",
    value: SITE_CONFIG.phone,
    href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba, bilgi almak istiyorum.`,
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
    value: `@${SITE_CONFIG.instagram}`,
    href: SITE_CONFIG.instagramUrl,
    color: "bg-pink-50 text-pink-500",
    external: true,
  },
  {
    icon: <MapPin size={20} />,
    label: "Adres",
    value: SITE_CONFIG.address,
    href: SITE_CONFIG.googleMapsUrl,
    color: "bg-orange-50 text-orange-500",
    external: true,
  },
  {
    icon: <Clock size={20} />,
    label: "Çalışma Saatleri",
    value: `${SITE_CONFIG.workingHours.weekdays}\n${SITE_CONFIG.workingHours.weekend}`,
    href: null,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ContactInfo() {
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
