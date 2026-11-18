import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || !("fileName" in payload) || typeof payload.fileName !== "string") {
    return NextResponse.json({ error: "An uploaded image filename is required." }, { status: 400 });
  }
  const notes = "concern" in payload && typeof payload.concern === "string" ? payload.concern.trim().slice(0, 500) : "";
  const posture = "posture" in payload && typeof payload.posture === "string" ? payload.posture : "Not provided";
  const movement = "movement" in payload && typeof payload.movement === "string" ? payload.movement : "Not provided";
  if ("locale" in payload && payload.locale === "zh-TW") {
    const postureZh = ({ "Comfortable and alert": "姿態自在且警覺", "Hunched or unusually still": "縮著身體或異常靜止", "Unsteady posture": "站姿不穩", "Not sure": "不確定" } as Record<string, string>)[posture] ?? posture;
    const movementZh = ({ "Moving normally": "活動如常", "Less active than usual": "比平常不活躍", "Difficulty moving": "活動困難", "Not observed": "尚未觀察" } as Record<string, string>)[movement] ?? movement;
    const report = `模擬報告 — 未分析上傳影像的像素。此內容不是 AI 預測或獸醫診斷。表單記錄的姿勢為「${postureZh}」，活動狀況為「${movementZh}」。請與這隻雞平常的狀況比較。若發現持續變化、受傷、呼吸困難或食慾不振，請聯絡合格獸醫。${notes ? ` 您的備註：「${notes}」。` : ""}`;
    return NextResponse.json({ report, mode: "模擬；未分析影像" });
  }
  const report = `SIMULATED REPORT — the uploaded image pixels were not analyzed. This is not an AI prediction or veterinary finding. The observation form recorded posture as “${posture}” and movement as “${movement}”.${notes ? ` Your note: “${notes}”.` : ""} Compare observations with this chicken’s usual behavior. If you notice persistent changes, injury, breathing difficulty, or loss of appetite, contact a qualified veterinarian.`;
  return NextResponse.json({ report, mode: "simulated; image not analyzed" });
}
