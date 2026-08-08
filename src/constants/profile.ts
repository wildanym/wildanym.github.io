import type { Education, Experience, SkillCategory, SocialLink } from "@/types";
import wildanPhoto from "@/assets/images/wildan.webp";
import wildanDarkPhoto from "@/assets/images/wildan-dark.webp";
import melangkahImg from "@/assets/images/melangkah.webp";
import pakmoImg from "@/assets/images/pakmo.webp";
import cloamiImg from "@/assets/images/cloami.webp";
import mydigilearnImg from "@/assets/images/mydigilearn.webp";
import jccPdf from "@/assets/doc/jcc.pdf";

export const PROFILE = {
  name: "Wildan Yuris",
  role: "Frontend Developer",
  bio: "Frontend Developer with 4+ years of experience building scalable web applications with React, Next.js, Vue.js, and TypeScript. Focused on performance, maintainability, and creating products users love.",
  tagline: "breaking complex problems, not production",
  photoUrl: wildanPhoto,
  photoDarkUrl: wildanDarkPhoto,
  isOpenToWork: false,
  availability: "Open to work",
  email: "wildan@example.com",
  location: "Indonesia",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/wildanym" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wildanyuris/" },
  { label: "Instagram", href: "https://www.instagram.com/wildanyuris/" },
  { label: "Email", href: "mailto:wildanym@gmail.com" },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Frontend Developer",
    company: "PT Bank Raya",
    period: "Oct 2025 - Present",
    achievements: [
      "Developed and maintained Pinang Dana Talangan web applications using React.js, Next.js, and TypeScript.",
      "Maintain clean, readable, and well-structured code following best practices.",
      "Write clean, maintainable, and scalable code.",
      "Collaborated closely with UI/UX designers and backend developers to ensure seamless integration and responsive design across all devices.",
      "Participated in Agile sprints, code reviews, and version control using Git.",
      "Maintained high code quality by ensuring SonarQube quality gate scans passed without critical issues.",
      "Ensured project dependencies were free from known vulnerabilities through routine security audits.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Melangkah Ads",
    period: "Jul 2025 - Aug 2025",
    achievements: [
      "Continuing development of the Melangkah Ads web dashboard using React.js, Vue.js, Next.js, Nuxt.js, TypeScript, and RESTful APIs.",
      "Led the refactoring of legacy code to improve maintainability and performance.",
      "Revamp Melangkah Ads dashboard using Next.js.",
      "Introduced reusable UI component library to standardize design across modules.",
      "Implemented CI/CD pipelines using GitLab to automate deployment processes.",
      "Deployed and maintained applications on Google Cloud Platform (GCP) and Amazon Web Services (AWS) environments.",
    ],
    projects: [
      {
        title: "Melangkah Ads",
        imageUrl: melangkahImg,
        url: "https://www.melangkah.id/",
        description:
          "Melangkah Ads is a dashboard for managing Meta Ads accounts, including ad account top-ups, ad budget management, optimization, and performance monitoring.",
      },
    ],
  },
  {
    role: "Frontend Developer",
    company: "PT Digital Laskar Pelangi",
    period: "May 2024 - Jul 2025",
    achievements: [
      "Built and enhanced scalable web applications using Vue.js, Nuxt.js, and RESTful APIs.",
      "Focused on improving user experience, reusability of components, and performance optimization.",
      "Integrated third-party libraries and worked closely with QA for testing and debugging.",
      "Introduced reusable UI component library to standardize design across modules.",
      "Implemented CI/CD pipelines using GitLab to automate deployment processes.",
      "Deployed and maintained applications on Google Cloud Platform (GCP) and Amazon Web Services (AWS) environments.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PT Sahaware Teknologi Indonesia",
    period: "May 2022 - May 2024",
    achievements: [
      "Developed and maintained web applications using React.js, Vue.js, Next.js, and RESTful APIs.",
      "Collaborated closely with UI/UX designers and backend developers to ensure seamless integration and responsive design across all devices.",
      "Participated in Agile sprints, code reviews, and version control using Git.",
      { subtitle: "Key Projects:" },
      "Mydigilearn (Telkom Indonesia): A Learning Management System (LMS) — built dynamic course pages, user dashboards, and integrated secure authentication.",
      "PAKMO (Disdukcapil Mojokerto): A digital public service portal — implemented real-time service tracking and form submission workflows.",
      "CLOAMI: Garment Management System — handled inventory modules, real-time data visualization, and optimized UI performance for large datasets.",
    ],
    projects: [
      {
        title: "PAK MO",
        imageUrl: pakmoImg,
        url: "https://pakmo.mojokertokota.go.id/",
        description:
          "PAK MO stands for Pelayanan Administrasi Kependudukan Mojokerto Online. It is an online service for public administration of population records (administrasi kependudukan) for the residents of Mojokerto City, Indonesia.",
      },
      {
        title: "CLOAMI",
        imageUrl: cloamiImg,
        description:
          "Garment Management System is a proprietary platform developed by Cloami to manage and streamline the entire workflow of incoming orders. The system is designed to cover key stages of the garment production lifecycle, starting from Planning, Sampling, and continuing through to Production.",
      },
      {
        title: "MyDigilearn",
        imageUrl: mydigilearnImg,
        url: "https://mydigilearn.id/",
        description:
          "MyDigiLearn is a digital learning platform developed by Telkom Corporate University (CorpU) to support corporate and public sector learning initiatives. It's designed to prepare and develop digital talent, offering personalized learning for users across organizations.",
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Technologies and tools for building end-to-end web applications.",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "TailwindCSS" },
      { name: "SASS" },
      { name: "React.js" },
      { name: "Vue.js" },
      { name: "Next.js" },
      { name: "Nuxt.js" },
      { name: "Redux" },
      { name: "Zustand" },
      { name: "Pinia" },
      { name: "Axios" },
      { name: "Firebase" },
      { name: "Google Cloud Platform (GCP)" },
      { name: "AWS" },
    ],
  },
  {
    title: "Tools & Testing",
    description: "Testing, workflow tools, and development methodologies.",
    skills: [
      { name: "Jest" },
      { name: "Git" },
      { name: "Visual Studio Code" },
      { name: "AI Vibe code" },
      { name: "Agile Methodology" },
    ],
  },
];

export const EDUCATIONS: Education[] = [
  {
    institution: "Universitas Komputer Indonesia",
    degree: "S1 Sistem Informasi",
  },
  {
    institution: "Candradimuka Jabar Coding Camp",
    degree: "Pelatihan Vue.js Web Frontend Development",
    certificateUrl: jccPdf,
  },
];
