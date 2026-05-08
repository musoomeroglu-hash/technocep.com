"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 200, damping: 30, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 192);
      rawY.set(e.clientY - 192);
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[9999] hidden md:block"
      style={{ x, y }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, rgba(0,212,255,0.03) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
