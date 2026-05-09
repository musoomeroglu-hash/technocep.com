import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { Info } from "lucide-react";
import AboutEditor from "./AboutEditor";

export default async function HakkimizdaAdminPage() {
  await requireAuth();

  const [about, stats] = await Promise.all([
    prisma.aboutPage.findUnique({ where: { id: "main" } }),
    prisma.stat.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
          <Info size={20} className="text-orange-400" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Hakkımızda</h1>
          <p className="text-gray-400 text-sm">Hakkımızda sayfası içeriğini düzenleyin</p>
        </div>
      </div>

      <AboutEditor about={about} stats={stats} />
    </div>
  );
}
