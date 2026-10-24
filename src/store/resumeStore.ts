import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AccentColor,
  AiGenerated,
  ResumeProfile,
  TemplateId,
} from "@/types/resume";
import { emptyProfile } from "@/types/resume";

interface ResumeState {
  profile: ResumeProfile;
  aiGenerated: AiGenerated | null;
  previousAi: AiGenerated | null;
  templateId: TemplateId;
  accent: AccentColor;
  generateLoading: boolean;
  generateError: string | null;
  setProfile: (profile: ResumeProfile) => void;
  updateProfile: (patch: Partial<ResumeProfile>) => void;
  setAiGenerated: (data: AiGenerated | null) => void;
  revertAi: () => void;
  setTemplateId: (id: TemplateId) => void;
  setAccent: (accent: AccentColor) => void;
  setGenerateLoading: (loading: boolean) => void;
  setGenerateError: (error: string | null) => void;
  resetProfile: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      profile: emptyProfile(),
      aiGenerated: null,
      previousAi: null,
      templateId: "classic",
      accent: "blue",
      generateLoading: false,
      generateError: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (patch) =>
        set((state) => ({ profile: { ...state.profile, ...patch } })),
      setAiGenerated: (data) =>
        set((state) => ({
          previousAi: state.aiGenerated,
          aiGenerated: data,
        })),
      revertAi: () =>
        set((state) => ({
          aiGenerated: state.previousAi,
          previousAi: null,
        })),
      setTemplateId: (id) => set({ templateId: id }),
      setAccent: (accent) => set({ accent }),
      setGenerateLoading: (loading) => set({ generateLoading: loading }),
      setGenerateError: (error) => set({ generateError: error }),
      resetProfile: () =>
        set({
          profile: emptyProfile(),
          aiGenerated: null,
          previousAi: null,
          generateError: null,
        }),
    }),
    {
      name: "resume-builder-draft",
      partialize: (state) => ({
        profile: state.profile,
        aiGenerated: state.aiGenerated,
        previousAi: state.previousAi,
        templateId: state.templateId,
        accent: state.accent,
      }),
    },
  ),
);
