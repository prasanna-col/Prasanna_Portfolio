export interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  teamSize: number;
}

export interface Experience {
  company: string;
  designation: string;
  duration: string;
  responsibilities: string[];
  url?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  yearsOfExperience: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
    phone: string;
  };
}
