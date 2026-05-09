import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { Wrench, Tags, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAuth();

  const [serviceCount, brandCount, whyUsCount, siteConfig] = await Promise.all([
    prisma.service.count({ where: { isActive: true } }),
    prisma.brand.count({ where: { isActive: true } }),
    prisma.whyUsItem.count({ where: { isActive: true } }),
    prisma.siteConfig.findUnique({ where: { id: "main" } }),
  ]);

  const stats = [
    {
      label: "Aktif Hizmet",
      value: serviceCount,
      icon: Wrench,
      color: "from-[#00d4ff]/20 to-[#00d4ff]/5 border-[#00d4ff]/20",
      iconColor: "text-[#00d4ff]",
      href: "/admin/hizmetler",
    },
    {
      label: "Aktif Marka",
      value: brandCount,
      icon: Tags,
      color: "from-green-500/20 to-green-500/5 border-green-500/20",
      iconColor: "text-green-400",
      href: "/admin/markalar",
    },
    {
      label: "Neden Biz Maddesi",
      value: whyUsCount,
      icon: ThumbsUp,
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
      iconColor: "text-purple-400",
      href: "/admin/neden-biz",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div>
        <h1 className="font-heading font-bold text-3xl text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          techno.cep yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group bg-gradient-to-br ${stat.color} border rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={22} className={stat.iconColor} />
              <ArrowRight
                size={16}
                className="text-gray-600 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <p className="font-heading font-black text-4xl text-white">
              {stat.value}
            </p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Son güncelleme */}
      {siteConfig?.updatedAt && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={18} className="text-[#00d4ff]" />
            <h2 className="font-heading font-bold text-white">
              Son Güncelleme
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Site ayarları:{" "}
            <span className="text-white">
              {new Date(siteConfig.updatedAt).toLocaleString("tr-TR")}
            </span>
          </p>
        </div>
      )}

      {/* Hızlı erişim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Site Ayarlarını Düzenle", href: "/admin/site-ayarlari" },
          { label: "Hero Bölümünü Düzenle", href: "/admin/hero" },
          { label: "Hizmetleri Yönet", href: "/admin/hizmetler" },
          { label: "Hakkımızda Sayfasını Düzenle", href: "/admin/hakkimizda" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/8 hover:border-white/15 transition-all"
          >
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {link.label}
            </span>
            <ArrowRight
              size={16}
              className="text-gray-600 group-hover:text-[#00d4ff] group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
