import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { Wrench } from "lucide-react";
import ServicesList from "./ServicesList";

export default async function HizmetlerAdminPage() {
  await requireAuth();

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/15 flex items-center justify-center">
          <Wrench size={20} className="text-[#00d4ff]" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Hizmetler</h1>
          <p className="text-gray-400 text-sm">Hizmetlerinizi ekleyin, düzenleyin veya silin</p>
        </div>
      </div>

      <ServicesList services={services} />
    </div>
  );
}
