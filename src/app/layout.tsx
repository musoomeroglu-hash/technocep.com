import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/effects/CursorGlow";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "techno.cep | Teknolojinin Güvenilir Adresi",
  description:
    "Bursa Nilüfer'de cep telefonu satış, tamir, aksesuar ve yazılım hizmetleri. Orijinal parça, garantili işçilik, hızlı servis.",
  openGraph: {
    title: "techno.cep | Teknolojinin Güvenilir Adresi",
    description:
      "Bursa Nilüfer'de cep telefonu satış, tamir, aksesuar ve yazılım hizmetleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${sora.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body antialiased bg-white text-gray-900">
        <CursorGlow />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
