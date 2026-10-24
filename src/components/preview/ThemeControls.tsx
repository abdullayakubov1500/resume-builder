"use client";

import type { AccentColor } from "@/types/resume";
import { useResumeStore } from "@/store/resumeStore";

const accents: { id: AccentColor; label: string; swatch: string }[] = [
  { id: "blue", label: "Синий", swatch: "#007AFF" },
  { id: "green", label: "Зелёный", swatch: "#34C759" },
  { id: "purple", label: "Фиолетовый", swatch: "#AF52DE" },
  { id: "terracotta", label: "Оранжевый", swatch: "#FF9500" },
  { id: "rose", label: "Розовый", swatch: "#FF2D55" },
  { id: "teal", label: "Голубой", swatch: "#32ADE6" },
];

export function ThemeControls() {
  const accent = useResumeStore((s) => s.accent);
  const setAccent = useResumeStore((s) => s.setAccent);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] text-[var(--label-secondary)]">Акцент</span>
      <div
        className="flex gap-1.5 p-1 rounded-full bg-[var(--fill-tertiary)]"
        role="group"
        aria-label="Цвет акцента"
      >
        {accents.map((a) => (
          <button
            key={a.id}
            type="button"
            title={a.label}
            onClick={() => setAccent(a.id)}
            className={`h-7 w-7 rounded-full border-2 transition-transform ${
              accent === a.id
                ? "border-[var(--label-primary)] scale-105"
                : "border-transparent"
            }`}
            style={{ backgroundColor: a.swatch }}
          />
        ))}
      </div>
    </div>
  );
}
