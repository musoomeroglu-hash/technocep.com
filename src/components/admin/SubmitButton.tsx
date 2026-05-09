"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";

export default function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 bg-gradient-to-r from-[#00d4ff] to-[#0891b2] text-[#1a1a2e] font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#00d4ff]/20"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Kaydediliyor...
        </>
      ) : (
        <>
          <Save size={16} />
          {label}
        </>
      )}
    </button>
  );
}
