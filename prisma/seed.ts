import path from "path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

let prisma: PrismaClient;

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is undefined! Check if .env.local is being loaded correctly.");
  }
  
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  console.log("🌱 Seeding database...");

  // Admin kullanıcı
  const adminEmail = process.env.ADMIN_EMAIL || "admin@technocep.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "technocep2026!";
  const hashedPassword = await hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword },
  });
  console.log(`✅ Admin user created: ${adminEmail}`);

  // Site Config
  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      name: "techno.cep",
      tagline: "Teknolojinin Güvenilir Adresi",
      description:
        "Bursa Nilüfer'de cep telefonu satış, tamir, aksesuar ve yazılım hizmetleri.",
      phone: "0501 660 16 26",
      whatsapp: "905016601626",
      instagram: "techno.cep",
      instagramUrl: "https://instagram.com/techno.cep",
      address:
        "Cumhuriyet Mahallesi, Hatun Caddesi No: 52/F, Nilüfer / Bursa",
      googleMapsUrl:
        "https://maps.google.com/?q=Cumhuriyet+Mahallesi+Hatun+Caddesi+52/F+Nilüfer+Bursa",
      weekdayHours: "Pazartesi – Cumartesi: 10:30 – 21:00",
      weekendHours: "Pazar: Kapalı",
      mapEmbedUrl: "",
    },
  });
  console.log("✅ Site config created");

  // Hero Section
  await prisma.heroSection.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      badge: "Bursa Nilüfer'de Hizmetinizdeyiz",
      title: "techno.cep",
      subtitle: "Teknolojinin Güvenilir Adresi",
      description:
        "Ekran değişiminden anakart tamirine, aksesuar satışından yazılım hizmetine — cihazınız için ihtiyacınız olan her şey tek adreste.",
      ctaText: "Hizmetlerimiz",
      ctaLink: "/hizmetler",
    },
  });
  console.log("✅ Hero section created");

  // Services
  const services = [
    {
      title: "Ekran Değişimi",
      description:
        "Orijinal ve servis kalitesinde ekran değişimi. Tüm marka ve modeller için hızlı çözüm.",
      icon: "Smartphone",
      details: ["Tüm marka ve modeller", "Aynı gün teslimat", "Garantili işçilik"],
      order: 0,
    },
    {
      title: "Batarya Değişimi",
      description:
        "Orijinal batarya ile güç kaybı sorunlarınıza kalıcı çözüm. Aynı gün teslimat.",
      icon: "BatteryCharging",
      details: ["Orijinal batarya", "Aynı gün teslimat", "Uzun ömürlü çözüm"],
      order: 1,
    },
    {
      title: "Anakart Tamiri",
      description:
        "Mikroskop altında profesyonel anakart tamiri. Kısa devre, şarj, sinyal arızaları.",
      icon: "Cpu",
      details: ["Mikroskop altı müdahale", "Kısa devre tamiri", "Sinyal arızası"],
      order: 2,
    },
    {
      title: "Veri Kurtarma",
      description:
        "Bozulan veya açılmayan cihazlardan fotoğraf, video ve dosya kurtarma işlemi.",
      icon: "HardDrive",
      details: ["Fotoğraf kurtarma", "Video kurtarma", "Dosya kurtarma"],
      order: 3,
    },
    {
      title: "Yazılım Hizmeti",
      description:
        "Güncelleme, format atma, virüs temizleme ve yazılımsal arıza çözümü.",
      icon: "Code",
      details: ["Format atma", "Virüs temizleme", "Yazılım güncelleme"],
      order: 4,
    },
    {
      title: "Aksesuar Satışı",
      description:
        "Kılıf, cam, şarj cihazı, kulaklık ve daha fazlası. Tüm modellere uygun aksesuarlar.",
      icon: "ShoppingBag",
      details: ["Kılıf", "Cam", "Şarj cihazı", "Kulaklık"],
      order: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log(`✅ ${services.length} services created`);

  // Brands
  const brands = [
    "Apple", "Samsung", "Xiaomi", "Huawei", "Oppo", "Vivo",
    "Realme", "OnePlus", "Google", "Nothing", "Motorola", "Honor",
  ];

  for (let i = 0; i < brands.length; i++) {
    await prisma.brand.create({
      data: { name: brands[i], order: i },
    });
  }
  console.log(`✅ ${brands.length} brands created`);

  // Why Us
  const whyUs = [
    {
      title: "Hızlı Servis",
      description: "Çoğu tamir işlemi aynı gün tamamlanır.",
      icon: "Zap",
      color: "cyan",
      order: 0,
    },
    {
      title: "Garantili İşçilik",
      description: "Tüm tamir işlemlerimiz garantilidir.",
      icon: "Shield",
      color: "green",
      order: 1,
    },
    {
      title: "Orijinal Parça",
      description: "Orijinal ve A+ kalite yedek parçalar kullanıyoruz.",
      icon: "Award",
      color: "purple",
      order: 2,
    },
    {
      title: "Uygun Fiyat",
      description: "Piyasanın en rekabetçi fiyatları ile hizmetinizdeyiz.",
      icon: "Wallet",
      color: "orange",
      order: 3,
    },
  ];

  for (const item of whyUs) {
    await prisma.whyUsItem.create({ data: item });
  }
  console.log(`✅ ${whyUs.length} why-us items created`);

  // Stats
  const stats = [
    { target: 500, suffix: "+", label: "Mutlu Müşteri", order: 0 },
    { target: 1000, suffix: "+", label: "Başarılı Tamir", order: 1 },
    { target: 50, suffix: "+", label: "Aksesuar Çeşidi", order: 2 },
    { target: 100, suffix: "%", label: "Garanti", order: 3 },
  ];

  for (const stat of stats) {
    await prisma.stat.create({ data: stat });
  }
  console.log(`✅ ${stats.length} stats created`);

  // About Page
  await prisma.aboutPage.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      story: `Bursa Nilüfer'de teknoloji sevdalıları için güvenilir bir nokta olmak amacıyla yola çıktık. Cep telefonu kullanıcılarının yaşadığı sorunları yakından bilen bir ekip olarak, kaliteli hizmetin herkes için erişilebilir olması gerektiğine inanıyoruz.

Yıllar içinde biriktirdiğimiz deneyim ve uzmanlaşmış teknik bilgimizle, ekran değişiminden anakart tamirine kadar her türlü cihaz sorununa çözüm üretiyoruz. Her tamirde orijinal veya A+ kalite parça kullanarak işimizin arkasında duruyoruz.

Müşteri memnuniyeti bizim için bir hedef değil, bir vazgeçilmez. Her cihazı kendi cihazımız gibi özenle tamir ediyor, her müşterimize dürüst ve şeffaf bir hizmet sunuyoruz.`,
      mission:
        "Bursa Nilüfer'deki her kullanıcının teknolojik sorunlarına hızlı, uygun fiyatlı ve garantili çözümler sunarak hayatlarını kolaylaştırmak.",
      missionItems: [
        "Orijinal parça kullanımı",
        "Garantili işçilik",
        "Şeffaf fiyatlandırma",
        "Hızlı teslimat",
      ],
    },
  });
  console.log("✅ About page created");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
