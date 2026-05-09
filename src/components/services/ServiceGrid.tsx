import { prisma } from "@/lib/db";
import ServiceCard from "@/components/services/ServiceCard";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

export default async function ServiceGrid() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {services.map((service) => (
        <StaggerItem key={service.id}>
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </ScrollReveal>
  );
}
