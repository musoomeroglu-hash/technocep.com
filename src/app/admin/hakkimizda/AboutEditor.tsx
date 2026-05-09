"use client";

import { useState } from "react";
import { updateAboutPage, createStat, deleteStat } from "@/lib/actions/about";
import SubmitButton from "@/components/admin/SubmitButton";
import { Plus, Trash2 } from "lucide-react";

type AboutData = {
  id: string;
  story: string;
  mission: string;
  missionItems: string[];
} | null;

type StatData = {
  id: string;
  target: number;
  suffix: string;
  label: string;
  order: number;
};

export default function AboutEditor({
  about,
  stats,
}: {
  about: AboutData;
  stats: StatData[];
}) {
  const [showStatForm, setShowStatForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hakkımızda formu */}
      <form action={updateAboutPage} className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="font-heading font-bold text-white text-lg">
            Sayfa İçeriği
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Hikaye
            </label>
            <textarea
              name="story"
              defaultValue={about?.story ?? ""}
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Misyon
            </label>
            <textarea
              name="mission"
              defaultValue={about?.mission ?? ""}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Misyon Maddeleri (her satır bir madde)
            </label>
            <textarea
              name="missionItems"
              defaultValue={about?.missionItems?.join("\n") ?? ""}
              rows={4}
              placeholder={"Orijinal parça kullanımı\nGarantili işçilik\nŞeffaf fiyatlandırma"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none placeholder:text-gray-600"
            />
          </div>
        </div>

        <SubmitButton />
      </form>

      {/* İstatistikler */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-white text-lg">
            İstatistikler
          </h2>
          <button
            onClick={() => setShowStatForm(!showStatForm)}
            className="flex items-center gap-2 bg-orange-500/15 text-orange-400 border border-orange-500/20 px-4 py-2 rounded-xl text-xs font-medium hover:bg-orange-500/25 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            Ekle
          </button>
        </div>

        {showStatForm && (
          <form
            action={async (formData) => {
              await createStat(formData);
              setShowStatForm(false);
            }}
            className="flex flex-wrap gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <input
              name="target"
              type="number"
              required
              placeholder="Sayı (ör: 500)"
              className="flex-1 min-w-[100px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-all"
            />
            <input
              name="suffix"
              type="text"
              required
              placeholder="Sonek (ör: +)"
              defaultValue="+"
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-all"
            />
            <input
              name="label"
              type="text"
              required
              placeholder="Etiket (ör: Mutlu Müşteri)"
              className="flex-1 min-w-[150px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-all"
            />
            <SubmitButton label="Ekle" />
          </form>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center relative group"
            >
              <p className="font-heading font-black text-2xl text-white">
                {stat.target}
                {stat.suffix}
              </p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              <form action={deleteStat} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input type="hidden" name="id" value={stat.id} />
                <button
                  type="submit"
                  className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                  onClick={(e) => {
                    if (!confirm("Bu istatistiği silmek istediğinize emin misiniz?")) e.preventDefault();
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </form>
            </div>
          ))}
        </div>

        {stats.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">
            Henüz istatistik eklenmemiş.
          </p>
        )}
      </div>
    </div>
  );
}
