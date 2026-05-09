"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateSiteConfig(formData: FormData) {
  await requireAuth();

  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      instagram: formData.get("instagram") as string,
      instagramUrl: formData.get("instagramUrl") as string,
      address: formData.get("address") as string,
      googleMapsUrl: formData.get("googleMapsUrl") as string,
      weekdayHours: formData.get("weekdayHours") as string,
      weekendHours: formData.get("weekendHours") as string,
      mapEmbedUrl: formData.get("mapEmbedUrl") as string,
    },
    create: {
      id: "main",
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      instagram: formData.get("instagram") as string,
      instagramUrl: formData.get("instagramUrl") as string,
      address: formData.get("address") as string,
      googleMapsUrl: formData.get("googleMapsUrl") as string,
      weekdayHours: formData.get("weekdayHours") as string,
      weekendHours: formData.get("weekendHours") as string,
      mapEmbedUrl: formData.get("mapEmbedUrl") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/iletisim");
  revalidatePath("/admin/site-ayarlari");
}
