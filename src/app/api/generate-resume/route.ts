import { NextResponse } from "next/server";
import { generateResumeWithGemini, readGeminiApiKey } from "@/lib/gemini";
import { generateRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const apiKey = readGeminiApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY не найден. Добавьте ключ из Google AI Studio в .env.local и перезапустите сервер.",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const parsed = generateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Проверьте обязательные поля формы" },
      { status: 400 },
    );
  }

  const profile = parsed.data;
  if (!profile.personal.fullName.trim() || !profile.personal.position.trim()) {
    return NextResponse.json(
      { error: "Имя и должность обязательны для генерации" },
      { status: 400 },
    );
  }

  const result = await generateResumeWithGemini(
    apiKey,
    JSON.stringify(profile, null, 2),
  );

  if ("error" in result) {
    const isAuth =
      /API_KEY|api key|invalid|PERMISSION|UNAUTHENTICATED/i.test(result.error);
    return NextResponse.json(
      {
        error: isAuth
          ? "Gemini отклонил ключ. Нужен ключ Google AI Studio (обычно AIzaSy…): https://aistudio.google.com/apikey"
          : "Не удалось получить ответ от Gemini. Проверьте модель и лимиты API.",
        ...(process.env.NODE_ENV === "development" && { detail: result.error }),
      },
      { status: isAuth ? 401 : 502 },
    );
  }

  return NextResponse.json(result.data);
}
