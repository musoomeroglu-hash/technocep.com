import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#00d4ff] mb-3">
          {label}
        </span>
      )}
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1a1a2e] leading-tight">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-gray-500 text-base sm:text-lg leading-relaxed", center ? "max-w-2xl mx-auto" : "max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
