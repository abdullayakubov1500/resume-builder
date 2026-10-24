import { SectionTitle } from "./SectionTitle";

export function StrengthsList({ strengths }: { strengths: string[] }) {
  if (!strengths.length) return null;

  return (
    <section>
      <SectionTitle>Сильные стороны</SectionTitle>
      <ul className="list-disc pl-5 text-sm text-[var(--resume-muted)] space-y-1">
        {strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
