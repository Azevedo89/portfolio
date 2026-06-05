export type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description?: string;
  skills: string[];
  current?: boolean;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  note?: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Datamentors",
    type: "Full-time",
    period: "Oct 2025 — present",
    location: "Santa Cruz, Madeira",
    description:
      "Software engineering across the company's stack, including work with simulation tooling and internal systems.",
    skills: ["Isaac Sim", "GitHub", "Python", "C++"],
    current: true,
  },
  {
    role: "Full-Stack Developer",
    company: "Universidade da Madeira",
    type: "Summer Internship",
    period: "Jun 2025 — Aug 2025 · 3 months",
    location: "Funchal, Madeira",
    description:
      "Summer internship at UMa working on full-stack development, building features end-to-end from database to UI.",
    skills: ["Java", "GitHub", "React", "REST APIs"],
  },
  {
    role: "Full-Stack Developer",
    company: "Asseco PST",
    type: "Curricular Internship",
    period: "Feb 2024 — Apr 2024 · 3 months",
    location: "Funchal, Madeira",
    description:
      "Curricular internship developing internal features end-to-end, working with Java services and a React.js frontend.",
    skills: ["Java", "React.js", "REST APIs", "Git"],
  },
  {
    role: "Software Developer",
    company: "ARDITI",
    type: "Summer Internship",
    period: "Jul 2022 · 1 month",
    location: "Funchal, Madeira",
    description:
      "Built the EyeGaze project: integrating HTC Vive Pro Eye tracking with Unity3D for the Musiquence platform (serious games for dementia therapy).",
    skills: ["Unity3D", "C#", "VR"],
  },
];

export const education: Education[] = [
  {
    institution: "Universidade da Madeira",
    degree: "Master's degree · Software Engineering",
    period: "Sep 2024 — Present",
    current: true,
  },
  {
    institution: "Univerza v Mariboru",
    degree: "Bachelor's · Erasmus · Software Engineering",
    period: "Sep 2023 — Feb 2024",
    note: "Erasmus exchange in Slovenia",
  },
  {
    institution: "Universidade da Madeira",
    degree: "Bachelor's degree · Software Engineering",
    period: "Oct 2020 — Jun 2024",
  },
];
