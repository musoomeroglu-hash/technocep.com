"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function FloatingPhone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) / (rect.width / 2));
      rawY.set((e.clientY - cy) / (rect.height / 2));
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Telefon gövdesi */}
        <div className="relative w-52 h-[420px] rounded-[2.5rem] border-4 border-[#1a1a2e] bg-gradient-to-b from-[#1a1a2e] to-[#16162a] shadow-2xl overflow-hidden">
          {/* Ekran */}
          <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-[#0e1a3d] via-[#0d2044] to-[#061020] overflow-hidden">
            {/* Üst çentik */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1a1a2e] rounded-full z-10" />

            {/* Durum çubuğu içeriği */}
            <div className="absolute top-4 left-5 right-5 flex justify-between items-center z-20">
              <span className="text-white/60 text-[10px] font-medium mt-0.5">9:41</span>
              <div className="flex gap-1 mt-0.5">
                <div className="w-3 h-2 border border-white/40 rounded-sm relative">
                  <div className="absolute inset-0.5 bg-white/60 rounded-sm" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            {/* Ekran içeriği */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#0891b2] flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-bold text-sm tracking-wide">techno.cep</p>
              <p className="text-[#00d4ff] text-[10px] text-center opacity-80">Teknolojinin Güvenilir Adresi</p>

              <div className="mt-2 w-full space-y-2">
                {["Ekran Değişimi", "Batarya Tamiri", "Yazılım Hizmeti"].map((s) => (
                  <div key={s} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                    <span className="text-white/70 text-[9px]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Yan butonlar */}
          <div className="absolute right-[-8px] top-24 w-1.5 h-10 bg-[#0d1020] rounded-r-sm" />
          <div className="absolute left-[-8px] top-20 w-1.5 h-8 bg-[#0d1020] rounded-l-sm" />
          <div className="absolute left-[-8px] top-32 w-1.5 h-8 bg-[#0d1020] rounded-l-sm" />
        </div>

        {/* Gölge / yansıma */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full blur-xl bg-[#00d4ff]/20" />

        {/* Parlama efekti */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, transparent 60%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
