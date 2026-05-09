import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { ThumbsUp } from "lucide-react";
import WhyUsList from "./WhyUsList";

export default async function NedenBizAdminPage() {
  await requireAuth();

  const items = await prisma.whyUsItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <ThumbsUp size={20} className="text-purple-400" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Neden Biz</h1>
          <p className="text-gray-400 text-sm">Avantaj kartlarınızı düzenleyin</p>
        </div>
      </div>

      <WhyUsList items={items} />
    </div>
  );
}
