"use client";

import type { TemplateId } from "@/types/resume";
import { useResumeStore } from "@/store/resumeStore";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

const options: { value: TemplateId; label: string }[] = [
  { value: "classic", label: "Классика" },
  { value: "sidebar", label: "Колонки" },
  { value: "portfolio", label: "Портфолио" },
];

export function TemplatePicker() {
  const templateId = useResumeStore((s) => s.templateId);
  const setTemplateId = useResumeStore((s) => s.setTemplateId);

  return (
    <SegmentedControl
      ariaLabel="Шаблон резюме"
      value={templateId}
      options={options}
      onChange={setTemplateId}
    />
  );
}
