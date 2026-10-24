import type { EducationItem } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

export function EducationList({ items }: { items: EducationItem[] }) {
  const filtered = items.filter((e) => e.institution || e.degree);
  if (!filtered.length) return null;

  return (
    <section>
      <SectionTitle>Образование</SectionTitle>
      <ul className="space-y-2 text-sm">
        {filtered.map((item) => (
          <li key={item.id}>
            <p className="font-semibold text-[var(--resume-text)]">
              {item.institution}
            </p>
            <p className="text-[var(--resume-muted)]">
              {item.degree}
              {item.year ? ` · ${item.year}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
