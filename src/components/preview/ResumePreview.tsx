"use client";

import { useResumeStore } from "@/store/resumeStore";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { SidebarTemplate } from "@/components/templates/SidebarTemplate";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";

const templates = {
  classic: ClassicTemplate,
  sidebar: SidebarTemplate,
  portfolio: PortfolioTemplate,
};

export function ResumePreview() {
  const profile = useResumeStore((s) => s.profile);
  const aiGenerated = useResumeStore((s) => s.aiGenerated);
  const templateId = useResumeStore((s) => s.templateId);
  const Template = templates[templateId];

  return (
    <div className="mx-auto w-full max-w-[794px]">
      <div className="paper-sheet overflow-hidden rounded-[2px]">
        <div
          id="resume-export-root"
          className="mx-auto bg-[var(--resume-bg)] text-left"
        >
          <Template profile={profile} aiGenerated={aiGenerated} />
        </div>
      </div>
    </div>
  );
}
