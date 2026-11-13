import { NextResponse } from "next/server";
import { AssistantLanguage, simulateAssistantReply } from "@/lib/ai-adapter";

const languages: AssistantLanguage[] = ["English", "Hindi", "Traditional Chinese"];

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || !("message" in payload) || typeof payload.message !== "string") {
    return NextResponse.json({ error: "A text message is required." }, { status: 400 });
  }
  const message = payload.message.trim();
  if (!message || message.length > 700) return NextResponse.json({ error: "Message must be between 1 and 700 characters." }, { status: 400 });
  const language = "language" in payload && typeof payload.language === "string" && languages.includes(payload.language as AssistantLanguage) ? payload.language as AssistantLanguage : "English";
  return NextResponse.json({ reply: simulateAssistantReply(message, language), mode: "simulated rule-based demo" });
}
