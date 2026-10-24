"use client";

import type { ExperienceItem } from "@/types/resume";
import { createId } from "@/types/resume";
import { AppleButton } from "@/components/ui/AppleButton";

export function ExperienceEditor({
  items,
  onChange,
}: {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}) {
  const update = (id: string, patch: Partial<ExperienceItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        id: createId(),
        company: "",
        role: "",
        start: "",
        end: "",
        isCurrent: false,
        bullets: [""],
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    onChange(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="grouped-inset">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] font-medium">Опыт {index + 1}</span>
            {items.length > 1 && (
              <button
                type="button"
                className="text-[15px] text-[var(--destructive)]"
                onClick={() => removeItem(item.id)}
              >
                Удалить
              </button>
            )}
          </div>
          <FieldRow label="Компания">
            <input
              className="field-input"
              value={item.company}
              onChange={(e) => update(item.id, { company: e.target.value })}
            />
          </FieldRow>
          <FieldRow label="Должность">
            <input
              className="field-input"
              value={item.role}
              onChange={(e) => update(item.id, { role: e.target.value })}
            />
          </FieldRow>
          <FieldRow label="Начало">
            <input
              className="field-input"
              value={item.start}
              placeholder="мм.гггг"
              onChange={(e) => update(item.id, { start: e.target.value })}
            />
          </FieldRow>
          <FieldRow label="Окончание">
            <input
              className="field-input"
              value={item.end}
              placeholder="мм.гггг"
              disabled={item.isCurrent}
              onChange={(e) => update(item.id, { end: e.target.value })}
            />
          </FieldRow>
          <label className="flex items-center gap-3 px-4 py-3 min-h-[var(--control-min-height)] border-b border-[var(--separator)] text-[15px]">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[var(--tint)]"
              checked={item.isCurrent}
              onChange={(e) =>
                update(item.id, {
                  isCurrent: e.target.checked,
                  end: e.target.checked ? "" : item.end,
                })
              }
            />
            По настоящее время
          </label>
          <div className="p-4 space-y-2">
            <p className="text-[13px] text-[var(--label-secondary)]">
              Достижения
            </p>
            {item.bullets.map((bullet, bi) => (
              <div key={bi} className="flex gap-2">
                <input
                  className="field-input rounded-[8px] bg-[var(--fill-tertiary)]"
                  value={bullet}
                  placeholder="Пункт списка"
                  onChange={(e) => {
                    const bullets = [...item.bullets];
                    bullets[bi] = e.target.value;
                    update(item.id, { bullets });
                  }}
                />
                {item.bullets.length > 1 && (
                  <button
                    type="button"
                    className="text-[var(--label-secondary)] px-2 min-w-[44px]"
                    onClick={() =>
                      update(item.id, {
                        bullets: item.bullets.filter((_, i) => i !== bi),
                      })
                    }
                    aria-label="Удалить пункт"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="text-[15px] text-[var(--tint)]"
              onClick={() =>
                update(item.id, { bullets: [...item.bullets, ""] })
              }
            >
              Добавить пункт
            </button>
          </div>
        </div>
      ))}
      <AppleButton variant="secondary" className="w-full" onClick={addItem}>
        Добавить место работы
      </AppleButton>
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field-row-horizontal">
      <span className="field-label-inline">{label}</span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
