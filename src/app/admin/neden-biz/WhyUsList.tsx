"use client";

import { useState } from "react";
import {
  createWhyUsItem, updateWhyUsItem, deleteWhyUsItem, toggleWhyUsItem,
} from "@/lib/actions/why-us";
import IconPicker from "@/components/admin/IconPicker";
import SubmitButton from "@/components/admin/SubmitButton";
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from "lucide-react";

const COLORS = [
  { value: "cyan", label: "Cyan", css: "bg-[#00d4ff]/20 border-[#00d4ff]/30" },
  { value: "green", label: "Yeşil", css: "bg-green-500/20 border-green-500/30" },
  { value: "purple", label: "Mor", css: "bg-purple-500/20 border-purple-500/30" },
  { value: "orange", label: "Turuncu", css: "bg-orange-500/20 border-orange-500/30" },
];

type WhyUsItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
};

export default function WhyUsList({ items }: { items: WhyUsItem[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formIcon, setFormIcon] = useState("Zap");
  const [formColor, setFormColor] = useState("cyan");

  const editingItem = editingId ? items.find((i) => i.id === editingId) : null;

  const openEdit = (item: WhyUsItem) => {
    setEditingId(item.id);
    setFormIcon(item.icon);
    setFormColor(item.color);
    setShowForm(true);
  };

  const openNew = () => {
    setEditingId(null);
    setFormIcon("Zap");
    setFormColor("cyan");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <>
      <button
        onClick={openNew}
        className="flex items-center gap-2 bg-purple-500/15 text-purple-400 border border-purple-500/20 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-500/25 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Yeni Madde Ekle
      </button>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-white">
              {editingId ? "Maddeyi Düzenle" : "Yeni Madde"}
            </h2>
            <button onClick={closeForm} className="text-gray-500 hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form
            action={async (formData) => {
              if (editingId) {
                formData.set("id", editingId);
                await updateWhyUsItem(formData);
              } else {
                await createWhyUsItem(formData);
              }
              closeForm();
            }}
            className="space-y-4"
          >
            <input type="hidden" name="icon" value={formIcon} />
            <input type="hidden" name="color" value={formColor} />

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Başlık</label>
              <input
                name="title"
                defaultValue={editingItem?.title ?? ""}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Açıklama</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description ?? ""}
                required
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">İkon</label>
              <IconPicker value={formIcon} onChange={setFormIcon} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Renk</label>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setFormColor(c.value)}
                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${c.css} ${
                      formColor === c.value ? "ring-2 ring-white/30" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <SubmitButton label={editingId ? "Güncelle" : "Ekle"} />
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 transition-opacity ${
              !item.isActive ? "opacity-50" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs truncate">{item.description}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <form action={toggleWhyUsItem}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 cursor-pointer">
                  {item.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </form>
              <button onClick={() => openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 cursor-pointer">
                <Edit2 size={14} />
              </button>
              <form action={deleteWhyUsItem}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                  onClick={(e) => {
                    if (!confirm("Bu maddeyi silmek istediğinize emin misiniz?")) e.preventDefault();
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-10">Henüz madde eklenmemiş.</p>
      )}
    </>
  );
}
