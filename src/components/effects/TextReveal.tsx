"use client";

import { motion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  by?: "word" | "char";
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function TextReveal({
  text,
  className,
  delay = 0,
  by = "word",
  tag: Tag = "h2",
}: TextRevealProps) {
  const tokens = by === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
        custom={delay}
        aria-hidden
      >
        {tokens.map((token, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={itemVariants}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {token}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
