"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/effects/MagneticButton";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  // Menü açıkken body scroll kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-30 h-16"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Arka plan katmanı */}
        <motion.div
          className="absolute inset-0 bg-white"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gray-200"
          style={{ opacity: borderOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading font-black text-2xl tracking-tight text-[#1a1a2e]">
              techno<span className="text-[#00d4ff]">.cep</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[#1a1a2e]"
                    : "text-gray-600 hover:text-[#1a1a2e]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#16162a] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle size={16} />
              WhatsApp
            </MagneticButton>
          </div>

          {/* Mobil hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-[#1a1a2e]"
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
