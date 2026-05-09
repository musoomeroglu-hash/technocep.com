"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Sparkles,
  Wrench,
  Tags,
  ThumbsUp,
  Info,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-ayarlari", label: "Site Ayarları", icon: Settings },
  { href: "/admin/hero", label: "Hero Bölümü", icon: Sparkles },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Wrench },
  { href: "/admin/markalar", label: "Markalar", icon: Tags },
  { href: "/admin/neden-biz", label: "Neden Biz", icon: ThumbsUp },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin" className="block">
          <span className="font-heading font-black text-xl text-white">
            techno<span className="text-[#00d4ff]">.cep</span>
          </span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Menü */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#00d4ff]/15 text-[#00d4ff]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Alt kısım */}
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Sparkles size={18} />
          Siteyi Görüntüle
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full cursor-pointer"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobil hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-[#1a1a2e] border border-white/10 text-white cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1a1a2e] border-r border-white/10 h-screen fixed left-0 top-0 z-40">
        {navContent}
      </aside>

      {/* Mobil sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-72 bg-[#1a1a2e] h-full shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
