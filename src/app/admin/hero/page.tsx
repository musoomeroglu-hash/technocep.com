import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { updateHero } from "@/lib/actions/hero";
import { Sparkles } from "lucide-react";
import SubmitButton from "@/components/admin/SubmitButton";

export default async function HeroAdminPage() {
  await requireAuth();

  const hero = await prisma.heroSection.findUnique({ where: { id: "main" } });

  const fields = [
    { name: "badge", label: "Üst Badge Metni", value: hero?.badge ?? "" },
    { name: "title", label: "Ana Başlık", value: hero?.title ?? "" },
    { name: "subtitle", label: "Alt Başlık", value: hero?.subtitle ?? "" },
    { name: "description", label: "Açıklama", value: hero?.description ?? "", type: "textarea" },
    { name: "ctaText", label: "CTA Buton Metni", value: hero?.ctaText ?? "" },
    { name: "ctaLink", label: "CTA Buton Linki", value: hero?.ctaLink ?? "" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/15 flex items-center justify-center">
          <Sparkles size={20} className="text-[#00d4ff]" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Hero Bölümü</h1>
          <p className="text-gray-400 text-sm">Ana sayfa hero alanını düzenleyin</p>
        </div>
      </div>

      <form action={updateHero} className="space-y-6">
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
