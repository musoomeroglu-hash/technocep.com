import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { Tags } from "lucide-react";
import BrandsList from "./BrandsList";

export default async function MarkalarAdminPage() {
  await requireAuth();

  const brands = await prisma.brand.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
          <Tags size={20} className="text-green-400" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Markalar</h1>
          <p className="text-gray-400 text-sm">Desteklenen markaları yönetin</p>
        </div>
      </div>

      <BrandsList brands={brands} />
    </div>
  );
}
