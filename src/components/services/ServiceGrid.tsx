import { SERVICES } from "@/lib/constants";
import ServiceCard from "@/components/services/ServiceCard";
import ScrollReveal, { StaggerItem } from "@/components/effects/ScrollReveal";

export default function ServiceGrid() {
  return (
    <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {SERVICES.map((service) => (
        <StaggerItem key={service.id}>
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </ScrollReveal>
  );
}
