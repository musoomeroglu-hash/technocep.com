import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export default function Card({ children, className, glass = false, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        glass
          ? "bg-white/70 backdrop-blur-md border-white/40 shadow-lg"
          : "bg-white border-gray-100 shadow-sm",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#00d4ff]/30",
        className
      )}
    >
      {children}
    </div>
  );
}
