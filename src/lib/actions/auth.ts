"use server";

import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth";
import { compare } from "bcryptjs";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
} | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-posta ve şifre gereklidir." };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Geçersiz e-posta veya şifre." };
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return { error: "Geçersiz e-posta veya şifre." };
  }

  await createSession(user.id, user.email);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/giris");
}
