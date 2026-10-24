"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { profileForApi } from "@/types/resume";
import { validateProfileForGenerate } from "@/lib/validation";
import type { AiGenerated } from "@/types/resume";
import { exportResumeToPdf } from "@/lib/exportPdf";
import { TemplatePicker } from "@/components/preview/TemplatePicker";
import { ThemeControls } from "@/components/preview/ThemeControls";
import { AppleButton } from "@/components/ui/AppleButton";

export function BuilderToolbar() {
  const profile = useResumeStore((s) => s.profile);
  const generateLoading = useResumeStore((s) => s.generateLoading);
  const generateError = useResumeStore((s) => s.generateError);
  const previousAi = useResumeStore((s) => s.previousAi);
  const setGenerateLoading = useResumeStore((s) => s.setGenerateLoading);
  const setGenerateError = useResumeStore((s) => s.setGenerateError);
  const setAiGenerated = useResumeStore((s) => s.setAiGenerated);
  const revertAi = useResumeStore((s) => s.revertAi);
  const resetProfile = useResumeStore((s) => s.resetProfile);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleGenerate = async () => {
    const validationError = validateProfileForGenerate(profile);
    if (validationError) {
      setGenerateError(validationError);
      return;
    }

    setGenerateLoading(true);
    setGenerateError(null);

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForApi(profile)),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail =
          typeof data.detail === "string" ? ` ${data.detail}` : "";
        setGenerateError(`${data.error ?? "Не удалось сгенерировать текст."}${detail}`);
        return;
      }
      setAiGenerated(data as AiGenerated);
    } catch {
      setGenerateError("Нет сети. Проверьте подключение и повторите.");
    } finally {
      setGenerateLoading(false);
    }
  };

  const handlePdf = async () => {
    setPdfError(null);
    setPdfLoading(true);
    try {
      await exportResumeToPdf(
        "resume-export-root",
        profile.personal.fullName || "resume",
      );
    } catch {
      setPdfError("Не удалось создать PDF. Повторите попытку.");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch lg:items-end gap-2">
      <div className="flex flex-wrap items-center gap-1 justify-end">
        <AppleButton
          variant="primary"
          onClick={handleGenerate}
          disabled={generateLoading}
          className="min-h-[36px] h-9 text-[15px] px-4"
        >
          {generateLoading ? "Пишет текст…" : "Сгенерировать"}
        </AppleButton>
        <AppleButton
          variant="plain"
          onClick={handlePdf}
          disabled={pdfLoading}
          className="min-h-[36px] h-9 text-[15px]"
        >
          {pdfLoading ? "PDF…" : "PDF"}
        </AppleButton>
        <AppleButton
          variant="plain"
          aria-expanded={showMore}
          aria-haspopup="true"
          onClick={() => setShowMore((v) => !v)}
          className="min-h-[36px] h-9 text-[15px]"
        >
          Ещё
        </AppleButton>
      </div>

      {showMore && (
        <div className="grouped-inset p-3 flex flex-col gap-3 w-full sm:w-[320px]">
          <TemplatePicker />
          <ThemeControls />
          {previousAi && (
            <AppleButton variant="plain" className="self-start" onClick={revertAi}>
              Вернуть прошлый текст ИИ
            </AppleButton>
          )}
          <AppleButton
            variant="destructive"
            className="self-start"
            onClick={() => {
              if (confirm("Удалить все введённые данные?")) resetProfile();
            }}
          >
            Сбросить форму
          </AppleButton>
        </div>
      )}

      {(generateError || pdfError) && (
        <div className="alert-inline w-full sm:w-[320px]" role="alert">
          {generateError || pdfError}
        </div>
      )}
    </div>
  );
}
