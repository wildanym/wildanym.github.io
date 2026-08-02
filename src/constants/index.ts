import type { SiteConfig } from "@/types";

export const STORAGE_KEYS = {
  theme: "theme",
} as const;

export const SITE_CONFIG: SiteConfig = {
  name: "Wildan Yuris",
  tagline: "Frontend Developer",
  navItems: [
    { label: "Profile", to: "#profile" },
    { label: "Experience", to: "#experience" },
    { label: "Skills", to: "#skills" },
    { label: "Education", to: "#education" },
  ],
};
