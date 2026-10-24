import type { LanguageItem } from "@/types/resume";
import { SectionTitle } from "./SectionTitle";

export function LanguagesList({ items }: { items: LanguageItem[] }) {
  const filtered = items.filter((l) => l.name);
  if (!filtered.length) return null;

  return (
    <section>
      <SectionTitle>Языки</SectionTitle>
      <ul className="space-y-1 text-sm text-[var(--resume-muted)]">
        {filtered.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <span className="text-[var(--resume-text)]">{item.name}</span>
            <span>{item.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
