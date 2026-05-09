"use client";

import { useState } from "react";
import {
  createService, updateService, deleteService, toggleService,
} from "@/lib/actions/services";
import IconPicker from "@/components/admin/IconPicker";
import SubmitButton from "@/components/admin/SubmitButton";
import {
  Plus, Edit2, Trash2, Eye, EyeOff, X,
  Smartphone, BatteryCharging, Cpu, HardDrive, Code, ShoppingBag,
  Zap, Shield, Award, Wallet, Heart, Target, Star, Package,
  Wrench, Settings, Monitor, Wifi, Bluetooth, Camera,
  Headphones, Speaker, MapPin, Clock, Phone, Mail,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Smartphone, BatteryCharging, Cpu, HardDrive, Code, ShoppingBag,
  Zap, Shield, Award, Wallet, Heart, Target, Star, Package,
  Wrench, Settings, Monitor, Wifi, Bluetooth, Camera,
  Headphones, Speaker, MapPin, Clock, Phone, Mail,
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  order: number;
  isActive: boolean;
};

export default function ServicesList({ services }: { services: Service[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formIcon, setFormIcon] = useState("Smartphone");

  const editingService = editingId
    ? services.find((s) => s.id === editingId)
    : null;

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setFormIcon(service.icon);
    setShowForm(true);
  };

  const openNew = () => {
    setEditingId(null);
    setFormIcon("Smartphone");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <>
      {/* Ekle butonu */}
      <button
        onClick={openNew}
        className="flex items-center gap-2 bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/20 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#00d4ff]/25 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Yeni Hizmet Ekle
      </button>

      {/* Form modal */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-white">
              {editingId ? "Hizmeti Düzenle" : "Yeni Hizmet"}
            </h2>
            <button onClick={closeForm} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form
            action={async (formData) => {
              if (editingId) {
                formData.set("id", editingId);
                await updateService(formData);
              } else {
                await createService(formData);
              }
              closeForm();
            }}
            className="space-y-4"
          >
            <input type="hidden" name="icon" value={formIcon} />

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Başlık
              </label>
              <input
                name="title"
                defaultValue={editingService?.title ?? ""}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Açıklama
              </label>
              <textarea
                name="description"
                defaultValue={editingService?.description ?? ""}
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                İkon
              </label>
              <IconPicker value={formIcon} onChange={setFormIcon} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Detaylar (her satır bir madde)
              </label>
              <textarea
                name="details"
                defaultValue={editingService?.details?.join("\n") ?? ""}
                rows={4}
                placeholder={"Tüm marka ve modeller\nAynı gün teslimat\nGarantili işçilik"}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all resize-none placeholder:text-gray-600"
              />
            </div>

            <SubmitButton label={editingId ? "Güncelle" : "Ekle"} />
          </form>
        </div>
      )}

      {/* Hizmet listesi */}
      <div className="space-y-3">
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? Smartphone;

          return (
            <div
              key={service.id}
              className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 transition-opacity ${
                !service.isActive ? "opacity-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs truncate">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <form action={toggleService}>
                  <input type="hidden" name="id" value={service.id} />
                  <button
                    type="submit"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={service.isActive ? "Pasife al" : "Aktifleştir"}
                  >
                    {service.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </form>
                <button
                  onClick={() => openEdit(service)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors cursor-pointer"
                  title="Düzenle"
                >
                  <Edit2 size={15} />
                </button>
                <form action={deleteService}>
                  <input type="hidden" name="id" value={service.id} />
                  <button
                    type="submit"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Sil"
                    onClick={(e) => {
                      if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>
          );
        })}

        {services.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-10">
            Henüz hizmet eklenmemiş. Yukarıdan yeni ekleyin.
          </p>
        )}
      </div>
    </>
  );
}
