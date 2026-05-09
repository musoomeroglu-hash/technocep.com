import {
  Smartphone, BatteryCharging, Cpu, HardDrive, Code, ShoppingBag,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={36} />,
  BatteryCharging: <BatteryCharging size={36} />,
  Cpu: <Cpu size={36} />,
  HardDrive: <HardDrive size={36} />,
  Code: <Code size={36} />,
  ShoppingBag: <ShoppingBag size={36} />,
};

type ServiceData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
};

export default function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#00d4ff]/40 transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Hover arka plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/4 via-transparent to-[#1a1a2e]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Glassmorphism üst şerit */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* İkon */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a2e]/8 to-[#1a1a2e]/4 text-[#1a1a2e] mb-6 group-hover:from-[#00d4ff]/15 group-hover:to-[#00d4ff]/5 group-hover:text-[#0891b2] transition-all duration-300">
        {iconMap[service.icon]}
      </div>

      <h3 className="relative font-heading font-bold text-xl text-[#1a1a2e] mb-3">
        {service.title}
      </h3>
      <p className="relative text-gray-500 text-sm leading-relaxed mb-6 flex-1">
        {service.description}
      </p>

      {/* Detay listesi */}
      {service.details.length > 0 && (
        <ul className="relative space-y-2">
          {service.details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
