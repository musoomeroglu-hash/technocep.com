"use client";

import { useState } from "react";
import { createBrand, deleteBrand, toggleBrand } from "@/lib/actions/brands";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

type Brand = {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
};

export default function BrandsList({ brands }: { brands: Brand[] }) {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      {/* Ekle */}
      {showInput ? (
        <form
          action={async (formData) => {
            await createBrand(formData);
            setShowInput(false);
          }}
          className="flex gap-3"
        >
          <input
            name="name"
            required
            placeholder="Marka adı girin"
            autoFocus
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all"
          />
          <button
            type="submit"
            className="bg-green-500/15 text-green-400 border border-green-500/20 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-500/25 transition-colors cursor-pointer"
          >
            Ekle
          </button>
          <button
            type="button"
            onClick={() => setShowInput(false)}
            className="text-gray-500 hover:text-white px-3 cursor-pointer"
          >
            İptal
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-green-500/15 text-green-400 border border-green-500/20 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-500/25 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Yeni Marka Ekle
        </button>
      )}

      {/* Liste */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 transition-opacity ${
              !brand.isActive ? "opacity-50" : ""
            }`}
          >
            <span className="text-white text-sm font-medium">{brand.name}</span>
            <div className="flex items-center gap-1">
              <form action={toggleBrand}>
                <input type="hidden" name="id" value={brand.id} />
                <button
                  type="submit"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {brand.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </form>
              <form action={deleteBrand}>
                <input type="hidden" name="id" value={brand.id} />
                <button
                  type="submit"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  onClick={(e) => {
                    if (!confirm(`"${brand.name}" markasını silmek istediğinize emin misiniz?`)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {brands.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-10">
          Henüz marka eklenmemiş.
        </p>
      )}
    </>
  );
}
