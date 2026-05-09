"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdminGirisPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e0e22] via-[#1a1a2e] to-[#0e1128] relative overflow-hidden">
      {/* Dekoratif ışıklar */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00d4ff]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#00d4ff]/8 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-black text-4xl text-white mb-2">
            techno<span className="text-[#00d4ff]">.cep</span>
          </h1>
          <p className="text-gray-400 text-sm">Yönetim Paneli</p>
        </div>

        {/* Kart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/15 flex items-center justify-center">
              <Lock size={18} className="text-[#00d4ff]" />
            </div>
            <div>
              <h2 className="text-white font-heading font-bold text-lg">
                Giriş Yap
              </h2>
              <p className="text-gray-500 text-xs">
                Admin paneline erişmek için giriş yapın
              </p>
            </div>
          </div>

          {/* Hata mesajı */}
          {state?.error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {state.error}
            </div>
          )}

          <form action={action} className="space-y-5">
            {/* E-posta */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"
              >
                E-posta
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@technocep.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"
              >
                Şifre
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Giriş butonu */}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#0891b2] text-[#1a1a2e] font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#00d4ff]/20 cursor-pointer"
            >
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>

        {/* Alt bilgi */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} techno.cep — Admin Panel
        </p>
      </div>
    </div>
  );
}
