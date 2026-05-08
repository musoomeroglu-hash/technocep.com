"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const topics = [
  { value: "", label: "Konu seçin..." },
  { value: "Ekran Tamiri", label: "Ekran Tamiri" },
  { value: "Batarya Değişimi", label: "Batarya Değişimi" },
  { value: "Anakart Tamiri", label: "Anakart Tamiri" },
  { value: "Veri Kurtarma", label: "Veri Kurtarma" },
  { value: "Yazılım Hizmeti", label: "Yazılım Hizmeti" },
  { value: "Aksesuar", label: "Aksesuar" },
  { value: "Fiyat Bilgisi", label: "Fiyat Bilgisi" },
  { value: "Diğer", label: "Diğer" },
];

interface FormData {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

interface Errors {
  name?: string;
  phone?: string;
  topic?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "İsim gereklidir.";
    if (!form.phone.trim()) e.phone = "Telefon gereklidir.";
    if (!form.topic) e.topic = "Konu seçiniz.";
    if (!form.message.trim()) e.message = "Mesaj gereklidir.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const text = encodeURIComponent(
      `Merhaba! Form üzerinden mesaj:\n\n*İsim:* ${form.name}\n*Telefon:* ${form.phone}\n*Konu:* ${form.topic}\n*Mesaj:* ${form.message}`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const inputClass = (field: keyof Errors) =>
    cn(
      "w-full px-4 py-3 rounded-xl border bg-white text-[#1a1a2e] text-sm placeholder:text-gray-400 outline-none transition-all duration-200",
      "focus:ring-2 focus:ring-[#00d4ff]/30 focus:border-[#00d4ff]",
      errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-gray-300"
    );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-2xl border border-green-100 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1a1a2e] mb-2">WhatsApp&apos;a yönlendirildiniz!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Mesajınız hazırlandı. WhatsApp&apos;ta onaylayıp gönderin, en kısa sürede dönüş yapalım.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", topic: "", message: "" }); }}
              className="text-sm text-[#0891b2] hover:underline"
            >
              Yeni mesaj gönder
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">İsim Soyisim</label>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass("name")}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Telefon</label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass("phone")}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Konu</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className={cn(inputClass("topic"), "cursor-pointer")}
              >
                {topics.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.topic && <p className="mt-1 text-xs text-red-500">{errors.topic}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Mesajınız</label>
              <textarea
                rows={4}
                placeholder="Cihazınız ve sorun hakkında kısaca bilgi verin..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={cn(inputClass("message"), "resize-none")}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <MagneticButton className="w-full cursor-pointer">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#16162a] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <Send size={16} />
                WhatsApp ile Gönder
              </button>
            </MagneticButton>

            <p className="text-center text-xs text-gray-400">
              Form WhatsApp&apos;a yönlendirecek — arka uç sunucu gerektirmez.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
