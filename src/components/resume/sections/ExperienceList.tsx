import type { ExperienceNarrativeItem } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

export function ExperienceList({
  items,
  title = "Опыт работы",
  showTitle = true,
}: {
  items: ExperienceNarrativeItem[];
  title?: string;
  showTitle?: boolean;
}) {
  if (!items.length) return null;

  return (
    <section>
      {showTitle && <SectionTitle>{title}</SectionTitle>}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={`${item.company}-${item.role}-${index}`}>
            <div className="flex flex-wrap justify-between gap-1">
              <p className="font-semibold text-[var(--resume-text)]">
                {item.role}
                {item.company ? ` · ${item.company}` : ""}
              </p>
            </div>
            {item.bullets.length > 0 && (
              <ul className="mt-1 list-disc pl-5 text-sm text-[var(--resume-muted)] space-y-0.5">
                {item.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
