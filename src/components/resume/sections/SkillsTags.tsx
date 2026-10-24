import { SectionTitle } from "./SectionTitle";

export function SkillsTags({
  skills,
  title = "Навыки",
}: {
  skills: string[];
  title?: string;
}) {
  const filtered = skills.filter(Boolean);
  if (!filtered.length) return null;

  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {filtered.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs font-medium text-[var(--resume-text)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
