export interface Contacts {
  email: string;
  phone: string;
  city: string;
  telegram?: string;
  linkedin?: string;
}

export interface PersonalInfo {
  photo: string;
  fullName: string;
  position: string;
  birthDate: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface ExperienceNarrativeItem {
  role: string;
  company: string;
  bullets: string[];
}

export interface AiGenerated {
  summary: string;
  highlightedStrengths: string[];
  experienceNarrative: ExperienceNarrativeItem[];
  seoTagline: string;
}

export interface ResumeProfile {
  personal: PersonalInfo;
  contacts: Contacts;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
}

export type TemplateId = "classic" | "sidebar" | "portfolio";

export type AccentColor =
  | "blue"
  | "green"
  | "purple"
  | "terracotta"
  | "rose"
  | "teal";

export interface ResumeTemplateProps {
  profile: ResumeProfile;
  aiGenerated: AiGenerated | null;
}

export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export const emptyProfile = (): ResumeProfile => ({
  personal: {
    photo: "",
    fullName: "",
    position: "",
    birthDate: "",
  },
  contacts: {
    email: "",
    phone: "",
    city: "",
    telegram: "",
    linkedin: "",
  },
  experience: [
    {
      id: "experience-0",
      company: "",
      role: "",
      start: "",
      end: "",
      isCurrent: false,
      bullets: [""],
    },
  ],
  education: [
    {
      id: "education-0",
      institution: "",
      degree: "",
      year: "",
    },
  ],
  skills: [],
  languages: [{ id: "language-0", name: "", level: "" }],
});

export function profileForApi(profile: ResumeProfile): ResumeProfile {
  return {
    ...profile,
    personal: { ...profile.personal, photo: "" },
  };
}
