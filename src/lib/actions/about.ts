"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateAboutPage(formData: FormData) {
  await requireAuth();

  const missionItemsRaw = formData.get("missionItems") as string;
  const missionItems = missionItemsRaw
    ? missionItemsRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  await prisma.aboutPage.upsert({
    where: { id: "main" },
    update: {
      story: formData.get("story") as string,
      mission: formData.get("mission") as string,
      missionItems,
    },
    create: {
      id: "main",
      story: formData.get("story") as string,
      mission: formData.get("mission") as string,
      missionItems,
    },
  });

  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
}

export async function createStat(formData: FormData) {
  await requireAuth();

  const maxOrder = await prisma.stat.aggregate({ _max: { order: true } });

  await prisma.stat.create({
    data: {
      target: parseInt(formData.get("target") as string),
      suffix: formData.get("suffix") as string,
      label: formData.get("label") as string,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
}

export async function deleteStat(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  await prisma.stat.delete({ where: { id } });

  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
}
