import type {
  AiGenerated,
  ExperienceItem,
  ExperienceNarrativeItem,
  ResumeProfile,
} from "@/types/resume";

export function getExperienceForDisplay(
  profile: ResumeProfile,
  aiGenerated: AiGenerated | null,
): ExperienceNarrativeItem[] {
  if (aiGenerated?.experienceNarrative?.length) {
    return aiGenerated.experienceNarrative;
  }
  return profile.experience
    .filter((e) => e.company || e.role)
    .map((e) => ({
      role: e.role,
      company: e.company,
      bullets: e.bullets.filter(Boolean),
    }));
}

export function formatPeriod(item: ExperienceItem): string {
  const end = item.isCurrent ? "наст. время" : item.end || "—";
  const start = item.start || "—";
  return `${start} — ${end}`;
}

export function formatBirthDate(date: string): string {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}
