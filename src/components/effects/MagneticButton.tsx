"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const scale = useSpring(hovered ? 1.05 : 1, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y, scale, willChange: "transform" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {inner}
      </a>
    );
  }

  return inner;
}
