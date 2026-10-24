import type { ResumeTemplateProps } from "@/types/resume";
import { getExperienceForDisplay } from "@/lib/resumeDisplay";
import { ExperienceList } from "@/components/resume/sections/ExperienceList";
import { SkillsTags } from "@/components/resume/sections/SkillsTags";
import { EducationList } from "@/components/resume/sections/EducationList";
import { ContactsBlock } from "@/components/resume/sections/ContactsBlock";

export function PortfolioTemplate({ profile, aiGenerated }: ResumeTemplateProps) {
  const experience = getExperienceForDisplay(profile, aiGenerated);
  const { personal, contacts } = profile;
  const tagline =
    aiGenerated?.seoTagline ||
    personal.position ||
    "Профессиональное портфолио";

  return (
    <div className="text-[var(--resume-text)]">
      <header
        className="px-8 py-12 text-center text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white/40 mb-4"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight">
          {personal.fullName || "Ваше имя"}
        </h1>
        <p className="mt-2 text-xl text-white/90">{personal.position}</p>
        <p className="mt-4 text-sm text-white/80 max-w-lg mx-auto">{tagline}</p>
      </header>

      <div className="p-8 space-y-10">
        {aiGenerated?.summary && (
          <section className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[var(--accent)] mb-3">
              Обо мне
            </h2>
            <p className="text-[var(--resume-muted)] leading-relaxed">
              {aiGenerated.summary}
            </p>
            {aiGenerated.highlightedStrengths?.length ? (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {aiGenerated.highlightedStrengths.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold text-[var(--accent)] mb-4 text-center">
            Опыт
          </h2>
          <ExperienceList items={experience} showTitle={false} />
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <SkillsTags skills={profile.skills} />
          <EducationList items={profile.education} />
        </div>
      </div>

      <footer className="border-t border-[var(--border)] px-8 py-6 bg-[var(--accent-muted)]/30">
        <p className="text-sm font-semibold text-[var(--accent)] mb-2">
          Связаться
        </p>
        <ContactsBlock contacts={contacts} />
      </footer>
    </div>
  );
}
