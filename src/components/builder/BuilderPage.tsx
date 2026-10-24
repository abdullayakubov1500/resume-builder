"use client";

import { useEffect, useState } from "react";
import { ResumeForm } from "@/components/form/ResumeForm";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { BuilderToolbar } from "./BuilderToolbar";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { useResumeStore } from "@/store/resumeStore";

type CompactPane = "form" | "preview";

export function BuilderPage() {
  const [ready, setReady] = useState(false);
  const [pane, setPane] = useState<CompactPane>("form");
  const fullName = useResumeStore((s) => s.profile.personal.fullName);

  useEffect(() => {
    setReady(true);
  }, []);
  const generateLoading = useResumeStore((s) => s.generateLoading);
  const aiGenerated = useResumeStore((s) => s.aiGenerated);
  const title = fullName.trim() || "Черновик";

  if (!ready) {
    return <div className="min-h-screen bg-[var(--bg-grouped)]" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-bar sticky top-0 z-20 border-b border-[var(--separator)]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 lg:px-5">
          <div className="min-w-0">
            <h1 className="text-[17px] font-semibold truncate">{title}</h1>
            <p className="text-[13px] text-[var(--label-secondary)] truncate">
              {generateLoading
                ? "Составляет описание по вашим фактам"
                : aiGenerated
                  ? "Текст ИИ можно править в форме"
                  : "Заполните форму, затем сгенерируйте текст"}
            </p>
          </div>
          <BuilderToolbar />
        </div>
      </header>

      <div className="flex-1 lg:grid lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:min-h-0">
        <section
          className={`${pane === "form" ? "block" : "hidden"} lg:block lg:overflow-y-auto lg:border-r lg:border-[var(--separator)] bg-[var(--bg-grouped)]`}
        >
          <div className="px-4 pt-5 pb-24 lg:pb-10">
            <ResumeForm />
            <p className="section-footer px-0 pt-2">
              Текст пишет Gemini по введённым данным. Фото остаётся на устройстве.
              Сгенерированный текст может содержать неточности — проверьте факты.
            </p>
          </div>
        </section>

        <section
          className={`${pane === "preview" ? "block" : "hidden"} lg:block bg-[var(--bg-canvas)] lg:overflow-y-auto`}
        >
          <div className="px-3 py-6 pb-24 lg:px-10 lg:py-10">
            {generateLoading && (
              <p className="text-center text-[13px] text-[var(--label-secondary)] mb-4">
                Составляет описание и сильные стороны…
              </p>
            )}
            <ResumePreview />
          </div>
        </section>
      </div>

      <BottomTabBar
        value={pane}
        onChange={setPane}
        options={[
          { value: "form", label: "Данные" },
          { value: "preview", label: "Лист" },
        ]}
      />
    </div>
  );
}
