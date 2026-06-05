export const skillGroups = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Java",
      "Spring Boot",
      "Python",
      "C#",
      ".NET",
      "PHP",
      "C++",
      "REST APIs",
      "JWT Auth",
      "WebSockets",
    ],
  },
  {
    category: "Database",
    items: [
      "SQL",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "Prisma ORM",
      "Schema design",
      "Migrations",
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Linux CLI",
      "Postman",
      "Unity3D",
      "Isaac Sim",
      "VS Code",
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.items);
