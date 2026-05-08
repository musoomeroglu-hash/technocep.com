import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "techno.cep",
    short_name: "techno.cep",
    description: "Bursa Nilüfer'de cep telefonu satış, tamir ve aksesuar hizmetleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1a2e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
