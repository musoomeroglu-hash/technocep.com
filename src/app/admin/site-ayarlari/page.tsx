import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { updateSiteConfig } from "@/lib/actions/site-config";
import { Settings } from "lucide-react";
import SubmitButton from "@/components/admin/SubmitButton";

export default async function SiteAyarlariPage() {
  await requireAuth();

  const config = await prisma.siteConfig.findUnique({ where: { id: "main" } });

  const fields = [
    { name: "name", label: "Site Adı", value: config?.name ?? "", type: "text" },
    { name: "tagline", label: "Slogan", value: config?.tagline ?? "", type: "text" },
    { name: "description", label: "Açıklama", value: config?.description ?? "", type: "textarea" },
    { name: "phone", label: "Telefon", value: config?.phone ?? "", type: "text" },
    { name: "whatsapp", label: "WhatsApp Numarası", value: config?.whatsapp ?? "", type: "text", placeholder: "905XXXXXXXXX" },
    { name: "instagram", label: "Instagram Kullanıcı Adı", value: config?.instagram ?? "", type: "text" },
    { name: "instagramUrl", label: "Instagram URL", value: config?.instagramUrl ?? "", type: "text" },
    { name: "address", label: "Adres", value: config?.address ?? "", type: "textarea" },
    { name: "googleMapsUrl", label: "Google Maps URL", value: config?.googleMapsUrl ?? "", type: "text" },
    { name: "weekdayHours", label: "Hafta İçi Çalışma Saatleri", value: config?.weekdayHours ?? "", type: "text" },
    { name: "weekendHours", label: "Hafta Sonu", value: config?.weekendHours ?? "", type: "text" },
    { name: "mapEmbedUrl", label: "Harita Embed URL (iframe src)", value: config?.mapEmbedUrl ?? "", type: "text" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/15 flex items-center justify-center">
          <Settings size={20} className="text-[#00d4ff]" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Site Ayarları</h1>
          <p className="text-gray-400 text-sm">Genel site bilgilerini düzenleyin</p>
        </div>
      </div>

      <form action={updateSiteConfig} className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  defaultValue={field.value}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  defaultValue={field.value}
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all"
                />
              )}
            </div>
          ))}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
