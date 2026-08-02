export type Theme = 'light' | 'dark'

export interface NavItem {
  label: string
  to: string
}

export interface SiteConfig {
  name: string
  tagline: string
  navItems: NavItem[]
}

export interface SocialLink {
  label: string
  href: string
}

export type Achievement = string | { subtitle: string }

export interface ProjectShowcase {
  title: string
  description: string
  imageUrl: string
  url?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description?: string
  achievements: Achievement[]
  projects?: ProjectShowcase[]
}

export interface Education {
  institution: string
  degree: string
  period?: string
  description?: string
  certificateUrl?: string
}

export interface Skill {
  name: string
}

export interface SkillCategory {
  title: string
  description: string
  skills: Skill[]
}
