import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veldbrand Radio",
    short_name: "Veldbrand",
    description: "Jou Afrikaanse stasie in beeld en klank.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0908",
    theme_color: "#0B0908",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}