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
  const report = `SIMULATED REPORT — the uploaded image pixels were not analyzed. This is not an AI prediction or veterinary finding. The observation form recorded posture as “${posture}” and movement as “${movement}”.${notes ? ` Your note: “${notes}”.` : ""} Compare observations with this chicken’s usual behavior. If you notice persistent changes, injury, breathing difficulty, or loss of appetite, contact a qualified veterinarian.`;
  return NextResponse.json({ report, mode: "simulated; image not analyzed" });
}
