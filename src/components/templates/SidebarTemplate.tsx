import type { ResumeTemplateProps } from "@/types/resume";
import { getExperienceForDisplay, formatBirthDate } from "@/lib/resumeDisplay";
import { ContactsBlock } from "@/components/resume/sections/ContactsBlock";
import { ExperienceList } from "@/components/resume/sections/ExperienceList";
import { EducationList } from "@/components/resume/sections/EducationList";
import { SectionTitle } from "@/components/resume/sections/SectionTitle";

export function SidebarTemplate({ profile, aiGenerated }: ResumeTemplateProps) {
  const experience = getExperienceForDisplay(profile, aiGenerated);
  const { personal, contacts } = profile;

  return (
    <div className="flex flex-col md:flex-row min-h-[600px]">
      <aside
        className="md:w-[32%] shrink-0 p-6 text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="mx-auto md:mx-0 h-28 w-28 rounded-full object-cover border-4 border-white/30 mb-4"
          />
        )}
        <h1 className="text-xl font-bold break-words">
          {personal.fullName || "Ваше имя"}
        </h1>
        <p className="text-white/90 text-sm mt-1">
          {personal.position || "Должность"}
        </p>
        {personal.birthDate && (
          <p className="text-white/75 text-xs mt-3">
            {formatBirthDate(personal.birthDate)}
          </p>
        )}
        <div className="mt-6 space-y-6 text-sm">
          <div>
            <p className="font-bold uppercase text-xs tracking-wide mb-2">
              Контакты
            </p>
            <div className="text-white/90 [&_span]:text-white">
              <ContactsBlock contacts={contacts} />
            </div>
          </div>
          {profile.skills.filter(Boolean).length > 0 && (
            <div>
              <p className="font-bold uppercase text-xs tracking-wide mb-2">
                Навыки
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.filter(Boolean).map((s) => (
                  <span
                    key={s}
                    className="rounded bg-white/20 px-2 py-0.5 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {profile.languages.filter((l) => l.name).length > 0 && (
            <div>
              <p className="font-bold uppercase text-xs tracking-wide mb-2">
                Языки
              </p>
              <ul className="space-y-1 text-white/90">
                {profile.languages
                  .filter((l) => l.name)
                  .map((l) => (
                    <li key={l.id} className="flex justify-between gap-2">
                      <span>{l.name}</span>
                      <span className="text-white/70">{l.level}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 text-[var(--resume-text)]">
        {aiGenerated?.summary && (
          <section className="mb-6">
            <SectionTitle>Профиль</SectionTitle>
            <p className="text-sm text-[var(--resume-muted)] leading-relaxed">
              {aiGenerated.summary}
            </p>
          </section>
        )}
        {aiGenerated?.highlightedStrengths?.length ? (
          <section className="mb-6">
            <SectionTitle>Ключевые компетенции</SectionTitle>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--resume-muted)]">
              {aiGenerated.highlightedStrengths.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--accent)]">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <ExperienceList items={experience} />
        <div className="mt-6">
          <EducationList items={profile.education} />
        </div>
      </main>
    </div>
  );
}
