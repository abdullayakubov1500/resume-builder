"use client";

import { useResumeStore } from "@/store/resumeStore";
import {
  createId,
  type EducationItem,
  type LanguageItem,
} from "@/types/resume";
import { PhotoUpload } from "./PhotoUpload";
import { ExperienceEditor } from "./ExperienceEditor";
import { FormSection } from "@/components/ui/FormSection";

export function ResumeForm() {
  const profile = useResumeStore((s) => s.profile);
  const setProfile = useResumeStore((s) => s.setProfile);

  const setPersonal = (patch: Partial<typeof profile.personal>) => {
    setProfile({
      ...profile,
      personal: { ...profile.personal, ...patch },
    });
  };

  const setContacts = (patch: Partial<typeof profile.contacts>) => {
    setProfile({
      ...profile,
      contacts: { ...profile.contacts, ...patch },
    });
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || profile.skills.includes(trimmed)) return;
    setProfile({ ...profile, skills: [...profile.skills, trimmed] });
  };

  return (
    <form className="pb-4" onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Профиль">
        <PhotoUpload
          value={profile.personal.photo}
          onChange={(photo) => setPersonal({ photo })}
        />
        <HorizontalField
          label="Имя"
          value={profile.personal.fullName}
          onChange={(v) => setPersonal({ fullName: v })}
          required
        />
        <HorizontalField
          label="Должность"
          value={profile.personal.position}
          onChange={(v) => setPersonal({ position: v })}
          required
        />
        <HorizontalField
          label="Дата рождения"
          type="date"
          value={profile.personal.birthDate}
          onChange={(v) => setPersonal({ birthDate: v })}
        />
      </FormSection>

      <FormSection title="Контакты">
        <HorizontalField
          label="Email"
          type="email"
          value={profile.contacts.email}
          onChange={(v) => setContacts({ email: v })}
        />
        <HorizontalField
          label="Телефон"
          value={profile.contacts.phone}
          onChange={(v) => setContacts({ phone: v })}
        />
        <HorizontalField
          label="Город"
          value={profile.contacts.city}
          onChange={(v) => setContacts({ city: v })}
        />
        <HorizontalField
          label="Telegram"
          value={profile.contacts.telegram ?? ""}
          onChange={(v) => setContacts({ telegram: v })}
        />
        <HorizontalField
          label="LinkedIn"
          value={profile.contacts.linkedin ?? ""}
          onChange={(v) => setContacts({ linkedin: v })}
        />
      </FormSection>

      <section className="mb-5">
        <h3 className="section-header">Опыт</h3>
        <ExperienceEditor
          items={profile.experience}
          onChange={(experience) => setProfile({ ...profile, experience })}
        />
        <p className="section-footer">
          После генерации формулировки опыта перепишутся по этим фактам.
        </p>
      </section>

      <FormSection title="Навыки">
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full bg-[var(--tint-muted)] px-3 py-1 text-[15px]"
              >
                {s}
                <button
                  type="button"
                  className="text-[var(--label-secondary)] min-w-[28px] min-h-[28px]"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      skills: profile.skills.filter((x) => x !== s),
                    })
                  }
                  aria-label={`Удалить ${s}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            className="field-input rounded-[8px] bg-[var(--fill-tertiary)]"
            placeholder="Навык и Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
      </FormSection>

      <FormSection title="Образование">
        <EducationEditor
          items={profile.education}
          onChange={(education) => setProfile({ ...profile, education })}
        />
      </FormSection>

      <FormSection title="Языки">
        <LanguagesEditor
          items={profile.languages}
          onChange={(languages) => setProfile({ ...profile, languages })}
        />
      </FormSection>
    </form>
  );
}

function HorizontalField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="field-row-horizontal">
      <span className="field-label-inline">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function EducationEditor({
  items,
  onChange,
}: {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}) {
  const update = (id: string, patch: Partial<EducationItem>) => {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <HorizontalField
            label="Вуз"
            value={item.institution}
            onChange={(v) => update(item.id, { institution: v })}
          />
          <HorizontalField
            label="Специальность"
            value={item.degree}
            onChange={(v) => update(item.id, { degree: v })}
          />
          <HorizontalField
            label="Год"
            value={item.year}
            onChange={(v) => update(item.id, { year: v })}
          />
        </div>
      ))}
      <button
        type="button"
        className="w-full py-3 text-[15px] text-[var(--tint)] border-t border-[var(--separator)]"
        onClick={() =>
          onChange([
            ...items,
            { id: createId(), institution: "", degree: "", year: "" },
          ])
        }
      >
        Добавить образование
      </button>
    </>
  );
}

function LanguagesEditor({
  items,
  onChange,
}: {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}) {
  const update = (id: string, patch: Partial<LanguageItem>) => {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <HorizontalField
            label="Язык"
            value={item.name}
            onChange={(v) => update(item.id, { name: v })}
          />
          <HorizontalField
            label="Уровень"
            value={item.level}
            onChange={(v) => update(item.id, { level: v })}
          />
        </div>
      ))}
      <button
        type="button"
        className="w-full py-3 text-[15px] text-[var(--tint)] border-t border-[var(--separator)]"
        onClick={() =>
          onChange([...items, { id: createId(), name: "", level: "" }])
        }
      >
        Добавить язык
      </button>
    </>
  );
}
