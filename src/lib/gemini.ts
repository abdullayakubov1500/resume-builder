import type { AiGenerated } from "@/types/resume";
import { aiGeneratedSchema } from "@/lib/validation";

const DEFAULT_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-1.5-flash",
] as const;

export function readGeminiApiKey(): string {
  return (process.env.GEMINI_API_KEY ?? "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

export function getGeminiModelCandidates(): string[] {
  const fromEnv = process.env.GEMINI_MODEL?.trim();
  const list = fromEnv ? [fromEnv, ...DEFAULT_MODELS] : [...DEFAULT_MODELS];
  return [...new Set(list)];
}

function formatGeminiError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function parseGoogleError(payload: unknown, status: number): string {
  if (payload && typeof payload === "object" && "error" in payload) {
    const err = (payload as { error?: { message?: string; status?: string } })
      .error;
    if (err?.message) {
      return `${err.status ?? status}: ${err.message}`;
    }
  }
  return `HTTP ${status}`;
}

const PROMPT_PREFIX = `Ты профессиональный карьерный консультант. На основе данных кандидата подготовь тексты для резюме на русском языке.

Правила:
- Не выдумывай факты, компании, даты и навыки — используй только переданные данные.
- Улучши формулировки опыта: конкретика, достижения, сильные стороны там, где это логично из контекста.
- Тон: профессиональный, уверенный, без клише и воды.
- Ответ строго в JSON по схеме:
{
  "summary": "краткое описание 3-5 предложений",
  "highlightedStrengths": ["сильная сторона 1", "..."],
  "experienceNarrative": [
    { "role": "", "company": "", "bullets": ["улучшенный пункт", "..."] }
  ],
  "seoTagline": "короткий слоган для портфолио, одна строка"
}

Данные кандидата:
`;

async function generateWithModel(
  apiKey: string,
  modelName: string,
  prompt: string,
): Promise<AiGenerated> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  const payload = (await res.json()) as unknown;
  if (!res.ok) {
    throw new Error(parseGoogleError(payload, res.status));
  }

  const text = (
    payload as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    }
  ).candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Пустой ответ модели");
  }

  const json = JSON.parse(text) as unknown;
  const aiParsed = aiGeneratedSchema.safeParse(json);
  if (!aiParsed.success) {
    throw new Error("Некорректный JSON ответа");
  }

  return aiParsed.data;
}

export async function generateResumeWithGemini(
  apiKey: string,
  profileJson: string,
): Promise<{ data: AiGenerated } | { error: string }> {
  const prompt = PROMPT_PREFIX + profileJson;
  const models = getGeminiModelCandidates();
  let lastError = "Неизвестная ошибка";

  for (const modelName of models) {
    try {
      const data = await generateWithModel(apiKey, modelName, prompt);
      return { data };
    } catch (error) {
      lastError = formatGeminiError(error);
      if (process.env.NODE_ENV === "development") {
        console.error(`[gemini] ${modelName}:`, lastError);
      }
    }
  }

  return { error: lastError };
}
