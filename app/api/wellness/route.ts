import { NextResponse } from "next/server";
import { wellnessSuggestions } from "@/lib/ai-adapter";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "Assessment details are required." }, { status: 400 });
  const input = payload as Record<string, unknown>;
  if (typeof input.mood !== "string" || !["Happy", "Calm", "Okay", "Anxious", "Low"].includes(input.mood)) {
    return NextResponse.json({ error: "Choose one of the available mood options." }, { status: 400 });
  }
  if (![input.sleep, input.activity, input.stress, input.social].every(value => typeof value === "number" && Number.isFinite(value))) {
    return NextResponse.json({ error: "Sleep, activity, stress, and social values must be valid numbers." }, { status: 400 });
  }
  const sleep = input.sleep as number;
  const activity = input.activity as number;
  const stress = input.stress as number;
  const social = input.social as number;
  if (sleep < 0 || sleep > 24 || activity < 0 || activity > 1440 || stress < 1 || stress > 5 || social < 1 || social > 5) {
    return NextResponse.json({ error: "One or more assessment values are outside the allowed range." }, { status: 400 });
  }
  const language = input.language === "zh-TW" ? "zh-TW" : "en";
  return NextResponse.json({
    suggestions: wellnessSuggestions({ mood: input.mood, sleep, activity, stress, social }, language),
    mode: language === "zh-TW" ? "繁體中文規則式示範；非臨床評估" : "rule-based demo; not a clinical assessment"
  });
}
