"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createWhyUsItem(formData: FormData) {
  await requireAuth();

  const maxOrder = await prisma.whyUsItem.aggregate({ _max: { order: true } });

  await prisma.whyUsItem.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      color: formData.get("color") as string,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/neden-biz");
}

export async function updateWhyUsItem(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;

  await prisma.whyUsItem.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      color: formData.get("color") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/neden-biz");
}

export async function deleteWhyUsItem(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  await prisma.whyUsItem.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/neden-biz");
}

export async function toggleWhyUsItem(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  const item = await prisma.whyUsItem.findUnique({ where: { id } });
  if (!item) return;

  await prisma.whyUsItem.update({
    where: { id },
    data: { isActive: !item.isActive },
  });

  revalidatePath("/");
  revalidatePath("/admin/neden-biz");
}
