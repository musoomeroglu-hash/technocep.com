"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateHero(formData: FormData) {
  await requireAuth();

  await prisma.heroSection.upsert({
    where: { id: "main" },
    update: {
      badge: formData.get("badge") as string,
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      description: formData.get("description") as string,
      ctaText: formData.get("ctaText") as string,
      ctaLink: formData.get("ctaLink") as string,
    },
    create: {
      id: "main",
      badge: formData.get("badge") as string,
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      description: formData.get("description") as string,
      ctaText: formData.get("ctaText") as string,
      ctaLink: formData.get("ctaLink") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hero");
}
