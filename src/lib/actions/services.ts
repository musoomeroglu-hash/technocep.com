"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
  await requireAuth();

  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    ? detailsRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  const maxOrder = await prisma.service.aggregate({ _max: { order: true } });

  await prisma.service.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      details,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/admin/hizmetler");
}

export async function updateService(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    ? detailsRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  await prisma.service.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      details,
    },
  });

  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/admin/hizmetler");
}

export async function deleteService(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  await prisma.service.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/admin/hizmetler");
}

export async function toggleService(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return;

  await prisma.service.update({
    where: { id },
    data: { isActive: !service.isActive },
  });

  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/admin/hizmetler");
}

export async function reorderService(id: string, newOrder: number) {
  await requireAuth();

  await prisma.service.update({
    where: { id },
    data: { order: newOrder },
  });

  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/admin/hizmetler");
}
