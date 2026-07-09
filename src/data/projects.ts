export type Project = {
  title: string;
  description: string;
  stack: string[];
  role: string;
  demoUrl?: string;
  codeUrl: string;
  imageLabel: string;
  accent: string;
  glow: string;
  metrics: string[];
};

export const projects: Project[] = [
  {
    title: "SG Consultoria",
    description:
      "Institutional website for a consulting and advisory firm with offices in Portugal, Brazil, and Cape Verde. Built with React + Vite, deployed via GitHub Pages on a custom domain. Includes scroll-spy navigation, animated entrances, PT/EN language support, contact form via FormSubmit, embedded Google Maps per office, full SEO setup (Open Graph, sitemap, JSON-LD), and static legal pages.",
    stack: ["React", "Vite", "JavaScript", "CSS", "GitHub Pages"],
    role: "Full project: architecture, content, SEO, deploy & custom domain",
    demoUrl: "https://sgconsultoria.pt/",
    codeUrl: "https://github.com/Azevedo89/SG_consultoria",
    imageLabel: "Consulting & advisory",
    accent: "#22D3EE",
    glow: "rgba(34, 211, 238, 0.32)",
    metrics: ["PT / EN i18n", "SEO + sitemap", "Custom domain"]
  },
  {
    title: "GestPrime",
    description:
      "Institutional website for GestPrime, a Lisbon-based property management and short-term rental (Alojamento Local) company. Built with React + Vite, deployed via GitHub Pages on gestprime.online. Bilingual PT/EN, with hero, services, company info, FAQ, and a contact form via FormSubmit (client-side validation + honeypot anti-spam). Navy & gold identity, fully responsive, content-driven layout with automatic deploy via GitHub Actions.",
    stack: ["React", "Vite", "JavaScript", "CSS", "GitHub Pages"],
    role: "Full project: identity, layout, content, contact form & deploy",
    demoUrl: "https://gestprime.online/",
    codeUrl: "https://github.com/Azevedo89/gestprime",
    imageLabel: "Property management",
    accent: "#F0B429",
    glow: "rgba(240, 180, 41, 0.32)",
    metrics: ["PT / EN i18n", "Custom domain", "CI deploy"]
  },
  {
    title: "PrimeSystems",
    description:
      "Institutional website for PrimeSystems, the web development brand I build under. Built with React + Vite, deployed via GitHub Pages on primesystems.pt. Acts as the home for client work and the source of the SG Consultoria credit footer.",
    stack: ["React", "Vite", "JavaScript", "CSS", "GitHub Pages"],
    role: "Brand site: identity, layout, deploy & custom domain",
    demoUrl: "https://primesystems.pt/",
    codeUrl: "https://github.com/Azevedo89/primeSystems",
    imageLabel: "Brand website",
    accent: "#6D5DFC",
    glow: "rgba(109, 93, 252, 0.35)",
    metrics: ["Production site", "Custom domain", "Static deploy"]
  },
  {
    title: "EyeGaze · Musiquence VR",
    description:
      "Internship research project integrating eye-tracking with virtual reality using the HTC Vive Pro Eye and Unity3D. Built a system that lets users interact with 2D and 3D objects through gaze, and integrated it into Musiquence — a serious-games platform for dementia therapy.",
    stack: ["Unity3D", "C#", "HTC Vive Pro Eye", "SRanipal SDK", "VR"],
    role: "R&D: eye-tracking integration, gaze interaction & Musiquence integration",
    codeUrl: "https://github.com/Azevedo89/EyeGaze",
    imageLabel: "VR · Eye-tracking",
    accent: "#A78BFA",
    glow: "rgba(167, 139, 250, 0.3)",
    metrics: ["Eye-tracking", "Unity3D + VR", "Research project"]
  }
];
