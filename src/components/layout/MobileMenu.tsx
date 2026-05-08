"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.25, ease: "easeIn" as const } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 flex flex-col shadow-2xl"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Üst */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-heading font-bold text-xl text-[#1a1a2e]">
                techno<span className="text-[#00d4ff]">.cep</span>
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Menüyü kapat"
              >
                <X size={18} className="text-[#1a1a2e]" />
              </button>
            </div>

            {/* Nav linkleri */}
            <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-[#1a1a2e] text-white"
                        : "text-[#1a1a2e] hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Alt iletişim */}
            <motion.div
              className="px-6 py-6 border-t border-gray-100 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            >
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp&apos;tan Yaz
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 w-full border border-[#1a1a2e] text-[#1a1a2e] px-4 py-3 rounded-xl font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                <Phone size={18} />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-500 hover:text-[#00d4ff] transition-colors text-sm px-4"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                @{SITE_CONFIG.instagram}
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
