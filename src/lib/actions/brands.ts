"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBrand(formData: FormData) {
  await requireAuth();

  const maxOrder = await prisma.brand.aggregate({ _max: { order: true } });

  await prisma.brand.create({
    data: {
      name: formData.get("name") as string,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/markalar");
}

export async function deleteBrand(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  await prisma.brand.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/markalar");
}

export async function toggleBrand(formData: FormData) {
  await requireAuth();

  const id = formData.get("id") as string;
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) return;

  await prisma.brand.update({
    where: { id },
    data: { isActive: !brand.isActive },
  });

  revalidatePath("/");
  revalidatePath("/admin/markalar");
}
