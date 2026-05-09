import Sidebar from "@/components/admin/Sidebar";
import { ToastProvider } from "@/components/admin/Toast";
import { headers } from "next/headers";

export const metadata = {
  title: "Admin Panel | techno.cep",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") ?? "";
  const isLoginPage = pathname === "/admin/giris";

  // Giriş sayfasında sidebar gösterme
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0e0e22] text-white">
      <ToastProvider>
        <Sidebar />
        <main className="lg:ml-64 min-h-screen">
          <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
        </main>
      </ToastProvider>
    </div>
  );
}
