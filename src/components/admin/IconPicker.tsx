"use client";

import { useState } from "react";
import {
  Smartphone, BatteryCharging, Cpu, HardDrive, Code, ShoppingBag,
  Zap, Shield, Award, Wallet, Heart, Target, Star, Package,
  Wrench, Settings, Monitor, Wifi, Bluetooth, Camera,
  Headphones, Speaker, MapPin, Clock, Phone, Mail,
} from "lucide-react";

const ICONS = [
  { name: "Smartphone", icon: Smartphone },
  { name: "BatteryCharging", icon: BatteryCharging },
  { name: "Cpu", icon: Cpu },
  { name: "HardDrive", icon: HardDrive },
  { name: "Code", icon: Code },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Zap", icon: Zap },
  { name: "Shield", icon: Shield },
  { name: "Award", icon: Award },
  { name: "Wallet", icon: Wallet },
  { name: "Heart", icon: Heart },
  { name: "Target", icon: Target },
  { name: "Star", icon: Star },
  { name: "Package", icon: Package },
  { name: "Wrench", icon: Wrench },
  { name: "Settings", icon: Settings },
  { name: "Monitor", icon: Monitor },
  { name: "Wifi", icon: Wifi },
  { name: "Bluetooth", icon: Bluetooth },
  { name: "Camera", icon: Camera },
  { name: "Headphones", icon: Headphones },
  { name: "Speaker", icon: Speaker },
  { name: "MapPin", icon: MapPin },
  { name: "Clock", icon: Clock },
  { name: "Phone", icon: Phone },
  { name: "Mail", icon: Mail },
];

export default function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const SelectedIcon = ICONS.find((i) => i.name === value)?.icon ?? Smartphone;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm hover:border-white/20 transition-colors cursor-pointer"
      >
        <SelectedIcon size={18} className="text-[#00d4ff]" />
        <span>{value || "İkon seçin"}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-full bg-[#16162a] border border-white/10 rounded-xl p-3 shadow-2xl z-50 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onChange(item.name);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-center w-full aspect-square rounded-lg transition-colors cursor-pointer ${
                    value === item.name
                      ? "bg-[#00d4ff]/20 text-[#00d4ff]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                  title={item.name}
                >
                  <item.icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { ICONS };
