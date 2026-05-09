import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const publicRoutes = ["/admin/giris"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Admin rotaları değilse devam et
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(path);
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // Yanıta pathname header'ı ekle (layout'ta kullanmak için)
  const response = NextResponse.next();
  response.headers.set("x-next-pathname", path);

  // Korumalı rota + session yok → giriş sayfasına yönlendir
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/admin/giris", req.nextUrl));
  }

  // Giriş sayfası + session var → admin'e yönlendir
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
