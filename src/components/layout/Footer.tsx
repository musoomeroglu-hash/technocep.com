import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { NAV_LINKS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <ScrollReveal direction="up" stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Kolon 1 — Hakkımızda */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-black text-2xl">
                techno<span className="text-[#00d4ff]">.cep</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Bursa Nilüfer&apos;de cep telefonu satış, tamir, aksesuar ve yazılım hizmetleri. Orijinal parça, garantili işçilik.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#00d4ff]/20 hover:text-[#00d4ff] transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-green-500/20 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#00d4ff]/20 hover:text-[#00d4ff] transition-colors"
                aria-label="Telefon"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Kolon 2 — Hızlı Linkler */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-[#00d4ff] mb-4">
              Sayfalar
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolon 3 — Hizmetler */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-[#00d4ff] mb-4">
              Hizmetler
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/hizmetler"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolon 4 — İletişim */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-[#00d4ff] mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-[#00d4ff]" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#00d4ff]" />
                  {SITE_CONFIG.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#00d4ff]" />
                <span>
                  {SITE_CONFIG.workingHours.weekdays}
                  <br />
                  <span className="text-gray-500">{SITE_CONFIG.workingHours.weekend}</span>
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Alt çizgi */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {year} techno.cep — Tüm hakları saklıdır.</p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Merhaba, bilgi almak istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <MessageCircle size={15} />
            Hızlı WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
