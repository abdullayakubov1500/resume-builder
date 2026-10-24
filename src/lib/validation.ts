import { z } from "zod";

export const generateRequestSchema = z.object({
  personal: z.object({
    photo: z.string().optional(),
    fullName: z.string().min(1),
    position: z.string().min(1),
    birthDate: z.string().optional(),
  }),
  contacts: z.object({
    email: z.union([z.string().email(), z.literal("")]),
    phone: z.string().optional(),
    city: z.string().optional(),
    telegram: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  experience: z.array(
    z.object({
      id: z.string(),
      company: z.string(),
      role: z.string(),
      start: z.string(),
      end: z.string(),
      isCurrent: z.boolean(),
      bullets: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string(),
      degree: z.string(),
      year: z.string(),
    }),
  ),
  skills: z.array(z.string()),
  languages: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      level: z.string(),
    }),
  ),
});

export const aiGeneratedSchema = z.object({
  summary: z.string(),
  highlightedStrengths: z.array(z.string()),
  experienceNarrative: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  seoTagline: z.string(),
});

export function validateProfileForGenerate(profile: {
  personal: { fullName: string; position: string };
}): string | null {
  if (!profile.personal.fullName.trim()) {
    return "Укажите имя и фамилию";
  }
  if (!profile.personal.position.trim()) {
    return "Укажите желаемую должность";
  }
  return null;
}
