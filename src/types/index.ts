export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon: string;
}

export type ScrollRevealDirection = "up" | "down" | "left" | "right";
