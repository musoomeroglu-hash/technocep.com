export default function AdminGirisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Giriş sayfası admin sidebar olmadan gösterilir
  return <>{children}</>;
}
