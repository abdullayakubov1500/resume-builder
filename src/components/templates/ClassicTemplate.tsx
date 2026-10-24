import type { ResumeTemplateProps } from "@/types/resume";
import { getExperienceForDisplay, formatBirthDate } from "@/lib/resumeDisplay";
import { ContactsBlock } from "@/components/resume/sections/ContactsBlock";
import { ExperienceList } from "@/components/resume/sections/ExperienceList";
import { SkillsTags } from "@/components/resume/sections/SkillsTags";
import { EducationList } from "@/components/resume/sections/EducationList";
import { LanguagesList } from "@/components/resume/sections/LanguagesList";
import { StrengthsList } from "@/components/resume/sections/StrengthsList";
import { SectionTitle } from "@/components/resume/sections/SectionTitle";

export function ClassicTemplate({ profile, aiGenerated }: ResumeTemplateProps) {
  const experience = getExperienceForDisplay(profile, aiGenerated);
  const { personal, contacts } = profile;

  return (
    <div className="p-8 text-[var(--resume-text)]">
      <header className="flex gap-6 border-b border-[var(--border)] pb-6 mb-6">
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="h-24 w-24 rounded-lg object-cover shrink-0"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-[var(--accent)]">
            {personal.fullName || "Ваше имя"}
          </h1>
          <p className="text-lg text-[var(--resume-muted)] mt-1">
            {personal.position || "Должность"}
          </p>
          {personal.birthDate && (
            <p className="text-sm text-[var(--resume-muted)] mt-2">
              Дата рождения: {formatBirthDate(personal.birthDate)}
            </p>
          )}
        </div>
      </header>

      {aiGenerated?.summary && (
        <section className="mb-6">
          <SectionTitle>О себе</SectionTitle>
          <p className="text-sm leading-relaxed text-[var(--resume-muted)]">
            {aiGenerated.summary}
          </p>
        </section>
      )}

      {aiGenerated?.highlightedStrengths?.length ? (
        <div className="mb-6">
          <StrengthsList strengths={aiGenerated.highlightedStrengths} />
        </div>
      ) : null}

      <div className="mb-6">
        <SectionTitle>Контакты</SectionTitle>
        <ContactsBlock contacts={contacts} />
      </div>

      <div className="space-y-6">
        <ExperienceList items={experience} />
        <SkillsTags skills={profile.skills} />
        <EducationList items={profile.education} />
        <LanguagesList items={profile.languages} />
      </div>
    </div>
  );
}
