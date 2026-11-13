"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, ArrowDownToLine, ArrowRight, CalendarCheck, CalendarPlus, Check, CheckCircle2, Clock3, Heart, Leaf, MessageCircle, PawPrint, Plus, Send, ShieldCheck, Sparkles, Upload, Users, X } from "lucide-react";
import { activities, AppData, Assessment, ChatMessage, initialData, Mood } from "@/lib/demo-data";
import { useAppData } from "@/lib/use-app-data";

type View = "dashboard" | "assistant" | "vision" | "wellness" | "welfare" | "activities" | "family" | "analytics" | "settings";
const headings: Record<View, { title: string; subtitle: string; eyebrow: string }> = {
  dashboard: { title: "A little care goes a long way.", subtitle: "Here’s your wellbeing and chicken-care snapshot for today.", eyebrow: "YOUR WELLBEING DASHBOARD" },
  assistant: { title: "Your wellbeing companion", subtitle: "A supportive space for general wellbeing ideas and gentle next steps.", eyebrow: "AI HEALTH ASSISTANT" },
  vision: { title: "A closer look at chicken welfare", subtitle: "Record visible observations and learn when a veterinarian should take a look.", eyebrow: "CHICKEN VISION AI" },
  wellness: { title: "Check in with yourself", subtitle: "Your reflections are personal, self-reported, and not a clinical health score.", eyebrow: "HUMAN WELLNESS" },
  welfare: { title: "Everyday care, thoughtfully tracked", subtitle: "Small, consistent checks help you notice when an animal may need attention.", eyebrow: "CHICKEN WELFARE" },
  activities: { title: "Find your next gentle moment", subtitle: "Choose an activity that fits your day, your energy, and your flock.", eyebrow: "ACTIVITY PLANNER" },
  family: { title: "Care works better together", subtitle: "Share notes and coordinate daily routines with your trusted care circle.", eyebrow: "FAMILY & CAREGIVER" },
  analytics: { title: "Notice the little patterns", subtitle: "Explore demo trends and your own locally saved check-ins and care records.", eyebrow: "ANALYTICS & REPORTS" },
  settings: { title: "Make ChickenCare yours", subtitle: "Manage demo preferences and understand how your information is used.", eyebrow: "SETTINGS" }
};

function PageHeading({ view, action }: { view: View; action?: React.ReactNode }) {
  const heading = headings[view];
  return <div className="page-heading"><div><div className="eyebrow">{heading.eyebrow}</div><h1 className="page-title">{heading.title}</h1><p className="page-subtitle">{heading.subtitle}</p></div>{action}</div>;
}
function Card({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}><div className="card-title-row"><div><h2 className="card-title">{title}</h2>{subtitle && <p className="card-subtitle">{subtitle}</p>}</div>{action}</div>{children}</section>;
}
function Stat({ label, value, note, icon: Icon, tone, up }: { label: string; value: string; note: string; icon: typeof Heart; tone: string; up?: boolean }) {
  return <div className="card stat-card"><div className="stat-top"><span className="stat-label">{label}</span><span className="stat-icon" style={{ background: tone, color: "#496f52" }}><Icon size={15} /></span></div><div className="stat-number">{value}</div><div className="stat-foot"><span className={up ? "positive" : ""}>{note}</span></div></div>;
}
function useToast() {
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return { toast, notify: setToast, Toast: () => toast ? <div className="toast" role="status">{toast}</div> : null };
}
function getMoodColor(mood: Mood) {
  return mood === "Happy" ? "#6d9c71" : mood === "Calm" ? "#80aaa0" : mood === "Anxious" ? "#e5aa66" : mood === "Low" ? "#9ba6b7" : "#b9c68a";
}

export default function WorkspacePage({ view }: { view: View }) {
  const { data, setData, ready } = useAppData();
  const { notify, Toast } = useToast();
  const [period, setPeriod] = useState("This week");

  if (!ready) return <div className="page-content"><div className="card" style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading your saved demo workspace…</div></div>;

  const content = (() => {
    switch (view) {
      case "dashboard": return <Dashboard data={data} period={period} setPeriod={setPeriod} />;
      case "assistant": return <Assistant data={data} setData={setData} notify={notify} />;
      case "vision": return <Vision notify={notify} />;
      case "wellness": return <Wellness data={data} setData={setData} notify={notify} />;
      case "welfare": return <Welfare data={data} setData={setData} notify={notify} />;
      case "activities": return <Planner data={data} setData={setData} notify={notify} />;
      case "family": return <Family data={data} setData={setData} notify={notify} />;
      case "analytics": return <Analytics data={data} period={period} setPeriod={setPeriod} />;
      case "settings": return <SettingsPanel data={data} setData={setData} notify={notify} />;
    }
  })();
  return <div className="page-content"><PageHeading view={view} />{content}<Toast /></div>;
}

function Dashboard({ data, period, setPeriod }: { data: AppData; period: string; setPeriod: (value: string) => void }) {
  const chartData = period === "This week" ? weeklyData(data) : monthlyData(data);
  const upcoming = data.bookings.find(item => item.status === "Booked");
  const welfarePercent = data.welfare.length ? Math.round(data.welfare.reduce((sum, item) => sum + Number(item.feeding) + Number(item.water) + Number(item.cleanliness), 0) / (data.welfare.length * 3) * 100) : 0;
  return <>
    <div className="stat-grid">
      <Stat label="COMMUNITY MEMBERS" value="128" note="↑ 12 this month" up icon={Users} tone="#edf2e8" />
      <Stat label="WELLNESS CHECK-INS" value={`${data.assessments.length}`} note="Your saved reflections" icon={Heart} tone="#f7eee3" />
      <Stat label="CARE OBSERVATIONS" value={`${data.welfare.length}`} note="Across your demo flock" icon={ShieldCheck} tone="#e9f1ed" />
      <Stat label="ACTIVITIES COMPLETED" value={`${data.bookings.filter(item => item.status === "Completed").length}`} note="Small steps add up" icon={CalendarCheck} tone="#f0edf5" />
    </div>
    <div className="dashboard-grid">
      <Card title="Your week at a glance" subtitle="Self-reported wellbeing & gentle activity" action={<select aria-label="Chart period" value={period} onChange={event => setPeriod(event.target.value)} className="search-input" style={{ width: "auto", padding: "7px 9px", fontSize: 10 }}><option>This week</option><option>This month</option></select>}>
        <div className="chart-legend"><span><i className="legend-dot" style={{ background: "#789c76" }} />Wellbeing reflection</span><span><i className="legend-dot" style={{ background: "#d8b27d" }} />Activity minutes</span></div>
        <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ left: -20, right: 5, top: 13, bottom: 0 }}><defs><linearGradient id="wellbeingGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#789c76" stopOpacity={.2} /><stop offset="95%" stopColor="#789c76" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#eef1ec" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><Tooltip contentStyle={{ borderRadius: 9, border: "1px solid #e8eee6", fontSize: 10 }} /><Area type="monotone" dataKey="wellbeing" name="Wellbeing reflection" stroke="#789c76" strokeWidth={2} fill="url(#wellbeingGradient)" /><Area type="monotone" dataKey="activity" name="Activity minutes" stroke="#d8b27d" strokeWidth={2} fill="transparent" /></AreaChart></ResponsiveContainer></div>
      </Card>
      <Card title="Chicken welfare overview" subtitle="Daily care checklist completion">
        <div className="welfare-score"><div className="score-ring" style={{ background: `conic-gradient(#65966c 0 ${welfarePercent}%,#edf1e9 ${welfarePercent}% 100%)` }}><div className="score-inner"><div><div className="score-value">{welfarePercent}%</div><div className="score-label">CHECKLISTS</div></div></div></div><div><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>A caring routine</div><div className="row-detail">Feeding, clean water and cleanliness checks recorded.</div><div style={{ marginTop: 11 }}><span className="status-pill"><Check size={11} /> {data.welfare.length} observations saved</span></div></div></div>
        <div style={{ borderTop: "1px solid var(--line)", marginTop: 17, paddingTop: 12 }}><div className="row-title">Remember to notice changes</div><div className="row-detail">Any persistent change in behavior, appetite, or appearance deserves a conversation with your veterinarian.</div></div>
      </Card>
    </div>
    <div className="dashboard-grid">
      <Card title="A gentle nudge" subtitle="Your next small step">
        <div className="notice-card card" style={{ padding: 19 }}><div className="card-title"><Sparkles size={14} style={{ verticalAlign: "middle", marginRight: 7 }} />Make a little room for fresh air</div><p>A short, unhurried moment outdoors can be a lovely way to reset. Choose a pace that feels comfortable today.</p><a className="button button-small" href="/activities">Explore activities <ArrowRight size={13} /></a></div>
      </Card>
      <Card title="Coming up" subtitle="Your upcoming activity" action={<a href="/activities" className="card-link">View planner</a>}>
        {upcoming ? <div className="activity-row"><div className="row-icon"><CalendarDaysIcon /></div><div className="row-main"><div className="row-title">{upcoming.title}</div><div className="row-detail">{upcoming.date} · Supervised activity</div></div><span className="status-pill">Booked</span></div> : <div className="empty-state">No activities booked yet. Visit the planner to find a gentle activity.</div>}
        <div className="notification-row"><div className="row-icon"><Heart size={15} /></div><div className="row-main"><div className="row-title">Take a wellness moment</div><div className="row-detail">A quick check-in helps you notice how you’re doing.</div></div><a href="/wellness" className="card-link">Check in</a></div>
      </Card>
    </div>
    <div className="dashboard-grid equal">
      <Card title="Mood reflections" subtitle="Your saved self-reported check-ins"><MoodChart assessments={data.assessments.slice(-7)} /></Card>
      <Card title="Recent care notes" subtitle="Latest notes from your care circle" action={<a href="/family" className="card-link">See all</a>}>
        {data.careNotes.slice(-2).reverse().map(note => <div className="history-row" key={note.id}><div className="avatar" style={{ width: 30, height: 30 }}>{note.author.slice(0, 1)}</div><div className="row-main"><div className="row-title">{note.text}</div><div className="row-detail">{note.author} · {note.date}</div></div></div>)}
      </Card>
    </div>
  </>;
}
function CalendarDaysIcon() { return <CalendarPlus size={16} />; }
function weeklyData(data: AppData) {
  return data.assessments.slice(-7).map((item, index) => ({ day: item.date, wellbeing: moodValue(item.mood), activity: item.activity || weeklyChart[index % 7].activity }));
}
const weeklyChart = [
  { activity: 28 }, { activity: 45 }, { activity: 35 }, { activity: 50 }, { activity: 30 }, { activity: 58 }, { activity: 42 }
];
function monthlyData(data: AppData) {
  const entries = data.assessments.slice(-28);
  return Array.from({ length: 4 }, (_, week) => {
    const start = Math.floor(week * entries.length / 4);
    const end = Math.floor((week + 1) * entries.length / 4);
    const periodEntries = entries.slice(start, end);
    const average = (values: number[], fallback: number) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : fallback;
    return {
      day: `Week ${week + 1}`,
      wellbeing: average(periodEntries.map(item => moodValue(item.mood)), [63, 70, 76, 82][week]),
      activity: average(periodEntries.map(item => item.activity), [32, 38, 45, 50][week])
    };
  });
}
function moodValue(mood: Mood) { return ({ Happy: 85, Calm: 78, Okay: 66, Anxious: 48, Low: 42 })[mood]; }
function MoodTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload?: Assessment }> }) {
  const mood = payload?.[0]?.payload?.mood;
  return active && mood ? <div style={{ border: "1px solid var(--line)", background: "var(--card)", borderRadius: 8, padding: "7px 10px", fontSize: 10, color: "var(--ink)" }}>{mood} mood reflection</div> : null;
}
function MoodChart({ assessments }: { assessments: Assessment[] }) {
  return <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={assessments.map(item => ({ ...item, wellness: moodValue(item.mood) }))} margin={{ left: -28, right: 2, top: 5, bottom: 0 }}><CartesianGrid stroke="#eef1ec" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><YAxis hide domain={[0, 100]} /><Tooltip content={<MoodTooltip />} /><Bar dataKey="wellness" radius={[4, 4, 0, 0]}>{assessments.map((entry, index) => <Cell key={index} fill={getMoodColor(entry.mood)} />)}</Bar></BarChart></ResponsiveContainer></div>;
}

function Assistant({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("English");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.chat]);
  async function send(event: FormEvent) {
    event.preventDefault();
    const prompt = text.trim();
    if (!prompt || busy) return;
    const userMessage: ChatMessage = { role: "user", text: prompt, date: new Date().toISOString() };
    setData(current => ({ ...current, chat: [...current.chat, userMessage] }));
    setText("");
    setBusy(true);
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: prompt, language }) });
      if (!response.ok) throw new Error(`Assistant request failed (${response.status}).`);
      const result = await response.json() as { reply: string; mode: string };
      setData(current => ({ ...current, chat: [...current.chat, { role: "assistant", text: result.reply, date: new Date().toISOString() }] }));
      notify(`Demo assistant · ${result.mode}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The assistant could not respond.";
      notify(message);
      setData(current => ({ ...current, chat: [...current.chat, { role: "assistant", text: "I couldn’t reach the demo response service just now. Please try again. If you feel unsafe or need urgent help, contact local emergency services or a trusted professional.", date: new Date().toISOString() }] }));
    } finally { setBusy(false); }
  }
  return <div className="two-column">
    <Card title="A supportive conversation" subtitle="Demo responses are simulated, not generated by a clinical model." action={<select value={language} onChange={event => setLanguage(event.target.value)} aria-label="Assistant language" className="search-input" style={{ width: 135, padding: 8 }}><option>English</option><option>Hindi</option><option>Traditional Chinese</option></select>}>
      <div className="chat-box" aria-live="polite">{data.chat.map((message, index) => <div key={`${message.date}-${index}`} className={`chat-message ${message.role}`}><div className="chat-label">{message.role === "assistant" ? "CHICKENCARE · DEMO" : "YOU"}</div>{message.text}</div>)}{busy && <div className="chat-message assistant"><div className="chat-label">CHICKENCARE · DEMO</div>Thinking of a gentle suggestion…</div>}<div ref={endRef} /></div>
      <form className="chat-form" onSubmit={send}><input aria-label="Your message" value={text} onChange={event => setText(event.target.value)} placeholder="What’s on your mind today?" maxLength={700} /><button className="button button-primary" type="submit" disabled={busy || !text.trim()} aria-label="Send message"><Send size={14} /> <span className="hide-mobile">Send</span></button></form>
      <div className="field-help" style={{ marginTop: 9 }}>This assistant offers general wellbeing ideas only. It cannot diagnose, treat, or replace a health professional. Avoid sharing sensitive personal information.</div>
    </Card>
    <div className="section-stack">
      <div className="card notice-card"><div className="card-title"><Sparkles size={14} style={{ verticalAlign: "middle", marginRight: 7 }} />How the demo assistant works</div><p>Replies are created by a transparent rule-based simulation. No external language model is called in demo mode and no real health predictions are made.</p><span className="status-pill" style={{ background: "#ffffff22", color: "white" }}>SIMULATED RESPONSE ENGINE</span></div>
      <Card title="Helpful reminders" subtitle="A few gentle ideas for today"><div className="checklist"><div className="check-item"><CheckCircle2 size={15} />Take a screen break and stretch gently.</div><div className="check-item"><CheckCircle2 size={15} />Notice your energy and drink some water.</div><div className="check-item"><CheckCircle2 size={15} />Plan a short, supervised animal-care activity.</div></div><div className="field-help" style={{ marginTop: 12 }}>Suggestions are general and may not suit everyone. Follow advice from your healthcare professional.</div></Card>
    </div>
  </div>;
}

function Vision({ notify }: { notify: (message: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [observations, setObservations] = useState({ posture: "Comfortable and alert", movement: "Moving normally", concern: "" });
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);
  async function chooseFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setError(""); setResult("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) { setError("Choose an image file (JPEG, PNG, or WebP)."); return; }
    if (selected.size > 8 * 1024 * 1024) { setError("This image is larger than 8 MB. Choose a smaller image."); return; }
    let decoded: ImageBitmap;
    try {
      decoded = await createImageBitmap(selected);
    } catch {
      setError("This image could not be opened. Try a clear JPEG, PNG, or WebP image.");
      return;
    }
    const hasUsableDimensions = decoded.width >= 160 && decoded.height >= 160;
    decoded.close();
    if (!hasUsableDimensions) { setError("This image is too small for a useful preview. Choose an image at least 160 × 160 pixels."); return; }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }
  async function analyze(event: FormEvent) {
    event.preventDefault();
    if (!file) { setError("Upload an image before starting the demo screening."); return; }
    setBusy(true); setError(""); setResult("");
    try {
      await new Promise(resolve => window.setTimeout(resolve, 900));
      const response = await fetch("/api/vision", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: file.name, size: file.size, ...observations }) });
      if (!response.ok) throw new Error(`Screening request failed (${response.status}).`);
      const payload = await response.json() as { report: string };
      setResult(payload.report);
      notify("Simulated observation report ready");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not complete the simulated screening.");
    } finally { setBusy(false); }
  }
  return <div className="two-column">
    <Card title="Start a demo welfare screening" subtitle="A photo preview and user-entered notes help create an observation report.">
      <form onSubmit={analyze}>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseFile} hidden aria-label="Upload chicken image" />
        <button type="button" className="upload-zone" style={{ width: "100%" }} onClick={() => inputRef.current?.click()} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); const dropped = event.dataTransfer.files[0]; if (dropped && inputRef.current) { const transfer = new DataTransfer(); transfer.items.add(dropped); inputRef.current.files = transfer.files; inputRef.current.dispatchEvent(new Event("change", { bubbles: true })); } }}>
          {preview ? <img src={preview} alt="Uploaded chicken preview" className="upload-preview" /> : <span><span className="upload-icon"><Upload size={19} /></span><strong>Choose a chicken photo</strong><p>JPEG, PNG, or WebP · 160 × 160 px minimum · up to 8 MB</p></span>}
        </button>
        {file && <div className="field-help" style={{ marginTop: 7 }}>Selected: {file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</div>}
        <div className="form-grid" style={{ marginTop: 15 }}>
          <div className="field"><label htmlFor="posture">Posture observation</label><select id="posture" value={observations.posture} onChange={e => setObservations({ ...observations, posture: e.target.value })}><option>Comfortable and alert</option><option>Hunched or unusually still</option><option>Unsteady posture</option><option>Not sure</option></select></div>
          <div className="field"><label htmlFor="movement">Movement observation</label><select id="movement" value={observations.movement} onChange={e => setObservations({ ...observations, movement: e.target.value })}><option>Moving normally</option><option>Less active than usual</option><option>Difficulty moving</option><option>Not observed</option></select></div>
          <div className="field full"><label htmlFor="concern">What have you noticed?</label><textarea id="concern" placeholder="Optional notes: feathers, skin, appetite, or behavior changes…" value={observations.concern} onChange={e => setObservations({ ...observations, concern: e.target.value })} maxLength={500} /></div>
        </div>
        <div className="form-actions"><button type="submit" className="button button-primary" disabled={busy}>{busy ? <><Activity size={14} /> Creating report…</> : <><Sparkles size={14} /> Run demo screening</>}</button></div>
        {error && <p role="alert" style={{ color: "#a34f42", fontSize: 10, marginTop: 10 }}>{error}</p>}
      </form>
    </Card>
    <div className="section-stack">
      <Card title="Screening notes"><div className="result-panel"><h3><ShieldCheck size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />DEMO MODE · SIMULATED</h3><p>Image analysis here is simulated. The app does not inspect the pixels or make an actual veterinary finding. Use the notes below as prompts for human observation only.</p></div>{result && <div className="result-panel" style={{ marginTop: 11 }}><h3>Observation report</h3><p>{result}</p><p style={{ marginTop: 9 }}><strong>Next step:</strong> If you notice persistent changes, pain, injury, breathing difficulty, or loss of appetite, contact a qualified veterinarian promptly.</p></div>}</Card>
      <Card title="What to observe"><div className="checklist"><div className="check-item"><CheckCircle2 size={15} />Feather coverage and visible condition</div><div className="check-item"><CheckCircle2 size={15} />Visible skin or eye changes</div><div className="check-item"><CheckCircle2 size={15} />Posture and movement compared with usual</div><div className="check-item"><AlertTriangle size={15} style={{ color: "#bd874f" }} />Do not treat this report as a veterinary diagnosis</div></div></Card>
    </div>
  </div>;
}

function Wellness({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [mood, setMood] = useState<Mood>("Okay");
  const [sleep, setSleep] = useState("7");
  const [activity, setActivity] = useState("30");
  const [stress, setStress] = useState("3");
  const [social, setSocial] = useState("3");
  const [interaction, setInteraction] = useState("1");
  const [note, setNote] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    const assessment: Assessment = { date: new Date().toLocaleDateString("en-US", { weekday: "short" }), mood, sleep: Number(sleep), activity: Number(activity), stress: Number(stress), social: Number(social), interaction: Number(interaction), note };
    setData(current => ({ ...current, assessments: [...current.assessments, assessment] }));
    setBusy(true);
    try {
      const response = await fetch("/api/wellness", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(assessment) });
      if (!response.ok) throw new Error(`Recommendation request failed (${response.status}).`);
      const output = await response.json() as { suggestions: string[] };
      setSuggestions(output.suggestions);
      notify("Check-in saved to this browser");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Could not generate suggestions");
    } finally { setBusy(false); }
  }
  return <div className="two-column">
    <Card title="Your daily check-in" subtitle="There are no right or wrong answers. Share only what feels comfortable.">
      <form onSubmit={submit}>
        <div className="field"><label>How are you feeling today?</label><div className="choice-row">{(["Happy", "Calm", "Okay", "Anxious", "Low"] as Mood[]).map(option => <button key={option} type="button" className={`choice-chip ${mood === option ? "selected" : ""}`} onClick={() => setMood(option)}>{option}</button>)}</div></div>
        <div className="form-grid" style={{ marginTop: 17 }}>
          <div className="field"><label htmlFor="sleep">Sleep last night (hours)</label><input id="sleep" type="number" min="0" max="24" step="0.5" value={sleep} onChange={e => setSleep(e.target.value)} required /></div>
          <div className="field"><label htmlFor="activity-mins">Movement today (minutes)</label><input id="activity-mins" type="number" min="0" max="1440" value={activity} onChange={e => setActivity(e.target.value)} required /></div>
          <div className="field"><label htmlFor="stress">Stress level (1 = low, 5 = high)</label><select id="stress" value={stress} onChange={e => setStress(e.target.value)}>{[1, 2, 3, 4, 5].map(x => <option key={x}>{x}</option>)}</select></div>
          <div className="field"><label htmlFor="social">Social connection (1–5)</label><select id="social" value={social} onChange={e => setSocial(e.target.value)}>{[1, 2, 3, 4, 5].map(x => <option key={x}>{x}</option>)}</select></div>
          <div className="field"><label htmlFor="interaction">Chicken interactions this week</label><input id="interaction" type="number" min="0" max="99" value={interaction} onChange={e => setInteraction(e.target.value)} /></div>
          <div className="field full"><label htmlFor="wellness-note">Anything else you’d like to remember? (optional)</label><textarea id="wellness-note" maxLength={400} value={note} onChange={e => setNote(e.target.value)} placeholder="A small win, a challenge, or something you’d like to revisit…" /></div>
        </div>
        <div className="form-actions"><button type="submit" className="button button-primary" disabled={busy}>{busy ? "Creating suggestions…" : "Save check-in & get ideas"} <ArrowRight size={14} /></button></div>
      </form>
    </Card>
    <div className="section-stack">
      <Card title="Your gentle suggestions" subtitle="Rule-based demo ideas · not clinical advice">
        {suggestions.length ? <div className="checklist">{suggestions.map((item, index) => <div key={index} className="check-item"><Sparkles size={14} />{item}</div>)}</div> : <div className="empty-state"><Heart size={23} /><br />Complete a check-in to see a few gentle, personalized ideas.</div>}
        <div className="field-help" style={{ marginTop: 13 }}>Your self-reported check-in is not a clinically validated health score or diagnosis. If you are concerned about your wellbeing, consider speaking with a qualified health professional.</div>
      </Card>
      <Card title="Your recent reflections" subtitle="Only visible in this browser"><MoodChart assessments={data.assessments.slice(-7)} />{data.assessments.slice(-3).reverse().map((entry, i) => <div className="history-row" key={`${entry.date}-${i}`}><span className="status-pill" style={{ background: `${getMoodColor(entry.mood)}22`, color: "#45634a" }}>{entry.mood}</span><div className="row-main"><div className="row-detail">{entry.sleep}h sleep · {entry.activity} min activity</div></div><span className="row-right">{entry.date}</span></div>)}</Card>
    </div>
  </div>;
}

function Welfare({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [chicken, setChicken] = useState("Clover");
  const [feeding, setFeeding] = useState(false);
  const [water, setWater] = useState(false);
  const [cleanliness, setCleanliness] = useState(false);
  const [behavior, setBehavior] = useState("Active and curious");
  const [notes, setNotes] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const record = { id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), chicken, feeding, water, cleanliness, behavior, notes };
    setData(current => ({ ...current, welfare: [...current.welfare, record] }));
    setFeeding(false); setWater(false); setCleanliness(false); setNotes("");
    notify("Chicken care observation saved");
  }
  const checklist = [{ label: "Fresh feed offered", value: feeding, set: setFeeding }, { label: "Clean water available", value: water, set: setWater }, { label: "Coop and resting area clean", value: cleanliness, set: setCleanliness }];
  return <div className="two-column">
    <Card title="Daily welfare checklist" subtitle="A routine log, not a substitute for professional care">
      <form onSubmit={submit} className="section-stack">
        <div className="field"><label htmlFor="chicken-name">Chicken</label><select id="chicken-name" value={chicken} onChange={e => setChicken(e.target.value)}><option>Clover</option><option>Poppy</option><option>Sunny</option><option>Other / flock</option></select></div>
        <div className="checklist">{checklist.map(item => <label key={item.label} className={`check-item ${item.value ? "done" : ""}`}><input type="checkbox" checked={item.value} onChange={e => item.set(e.target.checked)} />{item.label}</label>)}</div>
        <div className="field"><label htmlFor="behavior">Observed behavior</label><select id="behavior" value={behavior} onChange={e => setBehavior(e.target.value)}><option>Active and curious</option><option>Resting as usual</option><option>Less active than usual</option><option>Eating or drinking less</option><option>Unusual behavior noticed</option></select></div>
        <div className="field"><label htmlFor="welfare-note">Feathers, skin, or other observations</label><textarea id="welfare-note" value={notes} onChange={e => setNotes(e.target.value)} maxLength={500} placeholder="Record what you observed without diagnosing…" /></div>
        <button className="button button-primary" type="submit"><Plus size={14} /> Save observation</button>
      </form>
    </Card>
    <div className="section-stack">
      <Card title="Care overview" subtitle="Your recent records">
        <div className="welfare-score"><div className="score-ring"><div className="score-inner"><div><div className="score-value">{data.welfare.length}</div><div className="score-label">RECORDS</div></div></div></div><div><div style={{ fontSize: 12, fontWeight: 700 }}>Your flock’s care log</div><div className="row-detail" style={{ marginTop: 5 }}>Last updated {data.welfare.at(-1)?.date ?? "No records yet"}</div></div></div>
        <div className="result-panel" style={{ marginTop: 16 }}><p>If a chicken seems persistently unwell, injured, has difficulty breathing, or stops eating or drinking, contact a qualified veterinarian. Do not rely on an AI-generated observation as a confirmed finding.</p></div>
      </Card>
      <Card title="Care history" subtitle="Feeding · water · cleanliness · observations">
        {data.welfare.slice(-5).reverse().map(record => <div className="history-row" key={record.id}><div className="row-icon"><PawPrint size={15} /></div><div className="row-main"><div className="row-title">{record.chicken} · {record.behavior}</div><div className="row-detail">{record.date} · Feed {record.feeding ? "✓" : "–"} · Water {record.water ? "✓" : "–"} · Clean {record.cleanliness ? "✓" : "–"}</div>{record.notes && <div className="row-detail" style={{ marginTop: 4 }}>{record.notes}</div>}</div></div>)}
      </Card>
    </div>
  </div>;
}

function Planner({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [search, setSearch] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = activities.filter(item => `${item.title} ${item.difficulty} ${item.benefit}`.toLowerCase().includes(search.toLowerCase()));
  function book(event: FormEvent) {
    event.preventDefault();
    if (!selected || !bookingDate) return;
    setData(current => ({ ...current, bookings: [...current.bookings, { id: crypto.randomUUID(), title: selected, date: bookingDate, status: "Booked" }] }));
    notify(`${selected} added to your activity plan`);
    setSelected(null);
  }
  function complete(id: string) {
    setData(current => ({ ...current, bookings: current.bookings.map(item => item.id === id ? { ...item, status: "Completed" as const } : item) }));
    notify("Activity marked as completed");
  }
  return <div className="section-stack">
    <Card title="Explore activities" subtitle="Always prioritize consent, supervision, accessibility, and animal welfare." action={<input className="search-input" style={{ width: 180, padding: 8 }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activities…" aria-label="Search activities" />}>
      <div className="activity-cards">{filtered.map(item => <article className="activity-card" key={item.title}><span className="status-pill"><Leaf size={11} /> Chicken-assisted</span><h3>{item.title}</h3><p>{item.benefit}</p><div className="activity-meta"><span><Clock3 size={10} style={{ verticalAlign: "middle" }} /> {item.duration}</span><span>{item.difficulty}</span></div><details><summary style={{ fontSize: 10, color: "#5b765f", cursor: "pointer", marginBottom: 10 }}>Safety, equipment & participants</summary><p><strong>Safety:</strong> {item.safety}</p><p><strong>Equipment:</strong> {item.equipment}</p><p><strong>Participants:</strong> {item.participants}</p></details><button className="button button-light button-small" onClick={() => setSelected(item.title)}><CalendarPlus size={13} /> Plan this activity</button></article>)}</div>
      {filtered.length === 0 && <div className="empty-state">No activities match that search.</div>}
    </Card>
    <Card title="Your activity calendar" subtitle="Bookings and completed activities">
      {selected && <form onSubmit={book} className="result-panel" style={{ marginBottom: 12, display: "flex", alignItems: "end", gap: 12, flexWrap: "wrap" }}><div style={{ flex: 1 }}><strong style={{ fontSize: 11 }}>Plan: {selected}</strong><div className="field" style={{ marginTop: 8 }}><label htmlFor="booking-date">Date</label><input id="booking-date" type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} required /></div></div><button className="button button-primary button-small" type="submit">Confirm booking</button><button className="button button-outline button-small" type="button" onClick={() => setSelected(null)}>Cancel</button></form>}
      {data.bookings.length ? data.bookings.slice().sort((a, b) => a.date.localeCompare(b.date)).map(item => <div className="activity-row" key={item.id}><div className="row-icon"><CalendarDaysIcon /></div><div className="row-main"><div className="row-title">{item.title}</div><div className="row-detail">{item.date}</div></div>{item.status === "Booked" ? <button className="button button-light button-small" onClick={() => complete(item.id)}>Mark done</button> : <span className="status-pill"><Check size={11} /> Completed</span>}</div>) : <div className="empty-state">No activities booked yet.</div>}
    </Card>
  </div>;
}

function Family({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [note, setNote] = useState("");
  const [role, setRole] = useState("Caregiver");
  function addNote(event: FormEvent) {
    event.preventDefault();
    const value = note.trim();
    if (!value) return;
    setData(current => ({ ...current, careNotes: [...current.careNotes, { id: crypto.randomUUID(), text: value, author: `Alex Morgan · ${role}`, date: new Date().toISOString().slice(0, 10) }] }));
    setNote(""); notify("Care note added");
  }
  return <div className="two-column">
    <div className="section-stack">
      <Card title="Your care circle" subtitle="Demo members · roles shown for demonstration">
        {[
          { initials: "AM", name: "Alex Morgan", role: "Administrator · You", status: "Active" },
          { initials: "MC", name: "Maya Chen", role: "Caregiver · Daily routines", status: "Active" },
          { initials: "JL", name: "Jordan Lee", role: "Family member · Reports", status: "Invited" }
        ].map(member => <div className="history-row" key={member.name}><div className="avatar">{member.initials}</div><div className="row-main"><div className="row-title">{member.name}</div><div className="row-detail">{member.role}</div></div><span className={`status-pill ${member.status === "Invited" ? "amber" : ""}`}>{member.status}</span></div>)}
        <div className="field-help" style={{ marginTop: 11 }}>Role-based access is illustrated with demo profiles; this MVP does not provide production account permissions.</div>
      </Card>
      <Card title="Shared care notes" subtitle="Progress updates from your demo care circle">
        {data.careNotes.slice().reverse().map(item => <div className="history-row" key={item.id}><div className="avatar" style={{ width: 29, height: 29 }}>{item.author[0]}</div><div className="row-main"><div className="row-title">{item.text}</div><div className="row-detail">{item.author} · {item.date}</div></div></div>)}
        {!data.careNotes.length && <div className="empty-state">No care notes yet.</div>}
      </Card>
    </div>
    <div className="section-stack">
      <Card title="Add a care note" subtitle="Keep notes practical and respectful of privacy">
        <form onSubmit={addNote} className="section-stack"><div className="field"><label htmlFor="note-role">Posting as</label><select id="note-role" value={role} onChange={e => setRole(e.target.value)}><option>Caregiver</option><option>Family member</option><option>Administrator</option></select></div><div className="field"><label htmlFor="care-note">Note</label><textarea id="care-note" value={note} onChange={e => setNote(e.target.value)} maxLength={400} required placeholder="Share an activity update or care reminder…" /></div><button type="submit" className="button button-primary"><Plus size={13} /> Add note</button></form>
      </Card>
      <Card title="Emergency contact" subtitle="Demo-only information"><div className="result-panel"><h3>Local support contact</h3><p>For a health emergency, contact your local emergency services or your healthcare provider. For urgent animal health concerns, contact a qualified veterinarian.</p></div><p className="field-help" style={{ marginTop: 10 }}>No emergency contact details are stored in this demo. Add a verified contact in your secure production system.</p></Card>
    </div>
  </div>;
}

function Analytics({ data, period, setPeriod }: { data: AppData; period: string; setPeriod: (value: string) => void }) {
  const moodCounts = ["Happy", "Calm", "Okay", "Anxious", "Low"].map(mood => ({ name: mood, value: data.assessments.filter(item => item.mood === mood).length })).filter(item => item.value > 0);
  const colors = ["#6d9c71", "#80aaa0", "#b9c68a", "#e5aa66", "#9ba6b7"];
  const exportCsv = () => {
    const rows = [["date", "mood_self_report", "sleep_hours", "activity_minutes", "stress_1_to_5", "social_connection_1_to_5", "chicken_interactions"], ...data.assessments.map(item => [item.date, item.mood, item.sleep, item.activity, item.stress, item.social, item.interaction])];
    const csv = rows.map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "chickencare-wellbeing-demo.csv"; link.click(); URL.revokeObjectURL(link.href);
  };
  return <div className="section-stack">
    <div className="page-heading" style={{ marginBottom: 0 }}><div className="field-help">All wellbeing entries are self-reported; trends are descriptive and not clinical measures.</div><div style={{ display: "flex", gap: 8 }}><select value={period} onChange={e => setPeriod(e.target.value)} className="search-input" style={{ width: 120, padding: 8 }} aria-label="Analytics period"><option>This week</option><option>This month</option></select><button className="button button-outline button-small no-print" onClick={() => window.print()}><ArrowDownToLine size={13} /> Save as PDF</button><button className="button button-primary button-small no-print" onClick={exportCsv}><ArrowDownToLine size={13} /> Export CSV</button></div></div>
    <div className="stat-grid"><Stat label="CHECK-INS SAVED" value={`${data.assessments.length}`} note="Self-reported" icon={Heart} tone="#f7eee3" /><Stat label="ACTIVITY BOOKINGS" value={`${data.bookings.length}`} note="Across all statuses" icon={CalendarCheck} tone="#e9f1ed" /><Stat label="CARE LOG ENTRIES" value={`${data.welfare.length}`} note="Demo flock records" icon={ShieldCheck} tone="#edf2e8" /><Stat label="CARE NOTES" value={`${data.careNotes.length}`} note="Shared locally" icon={MessageCircle} tone="#f0edf5" /></div>
    <div className="dashboard-grid">
      <Card title={`${period} wellbeing reflections`} subtitle="Values shown on an illustrative 0–100 scale; not clinically validated."><div className="chart-wrap" style={{ height: 255 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={period === "This week" ? weeklyData(data) : monthlyData(data)} margin={{ left: -20, right: 5, top: 12, bottom: 0 }}><CartesianGrid stroke="#eef1ec" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><Tooltip contentStyle={{ borderRadius: 9, border: "1px solid #e8eee6", fontSize: 10 }} /><Area type="monotone" dataKey="wellbeing" stroke="#789c76" fill="#789c7625" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></Card>
      <Card title="Mood distribution" subtitle="Based on saved check-ins"><div className="chart-wrap" style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={moodCounts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} paddingAngle={3}>{moodCounts.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip contentStyle={{ borderRadius: 9, border: "1px solid #e8eee6", fontSize: 10 }} /></PieChart></ResponsiveContainer></div><div className="chart-legend" style={{ justifyContent: "center", flexWrap: "wrap" }}>{moodCounts.map((entry, index) => <span key={entry.name}><i className="legend-dot" style={{ background: colors[index % colors.length] }} />{entry.name} ({entry.value})</span>)}</div></Card>
    </div>
    <div className="dashboard-grid equal"><Card title="Activity participation" subtitle="Minutes of self-reported movement"><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyData(data)} margin={{ left: -20, right: 5, top: 10 }}><CartesianGrid stroke="#eef1ec" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><Tooltip contentStyle={{ borderRadius: 9, border: "1px solid #e8eee6", fontSize: 10 }} /><Bar dataKey="activity" name="Minutes" fill="#d8b27d" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></Card><Card title="Chicken welfare records" subtitle="Daily care checklists saved"><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.welfare.slice(-7).map(item => ({ date: item.date.slice(5), completed: Number(item.feeding) + Number(item.water) + Number(item.cleanliness) }))} margin={{ left: -20, right: 5, top: 10 }}><CartesianGrid stroke="#eef1ec" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><YAxis domain={[0, 3]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#98a198" }} /><Tooltip contentStyle={{ borderRadius: 9, border: "1px solid #e8eee6", fontSize: 10 }} /><Bar dataKey="completed" name="Checks completed (of 3)" fill="#789c76" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></Card></div>
  </div>;
}

function SettingsPanel({ data, setData, notify }: { data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; notify: (message: string) => void }) {
  const [language, setLanguage] = useState("English");
  const [reminders, setReminders] = useState(true);
  const [role, setRole] = useState("Caregiver");
  function reset() {
    if (!window.confirm("Reset your local demo data to the original sample? This cannot be undone.")) return;
    setData(initialData);
    notify("Demo data restored");
  }
  return <div className="two-column">
    <div className="section-stack">
      <Card title="Workspace preferences" subtitle="These demo preferences apply only in this browser">
        <div className="section-stack">
          <div className="field"><label htmlFor="settings-language">Assistant language</label><select id="settings-language" value={language} onChange={e => setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Traditional Chinese</option></select></div>
          <div className="field"><label htmlFor="settings-role">Demo role</label><select id="settings-role" value={role} onChange={e => setRole(e.target.value)}><option>Administrator</option><option>Caregiver</option><option>Family member</option></select><span className="field-help">Role switching is illustrative only; it does not enforce production access controls.</span></div>
          <label className="check-item"><input type="checkbox" checked={reminders} onChange={e => setReminders(e.target.checked)} />Show gentle reminder prompts</label>
          <label className="check-item"><input type="checkbox" checked readOnly />Use simulated AI responses in demo mode</label>
        </div>
      </Card>
      <Card title="Your demo data" subtitle={`${data.assessments.length} check-ins · ${data.welfare.length} welfare logs · ${data.bookings.length} activities`}>
        <p className="field-help" style={{ marginBottom: 13 }}>This MVP stores information in this browser’s local storage. It is not sent to a database. Avoid entering sensitive or personally identifying information.</p>
        <button className="button button-outline" onClick={reset}><X size={13} /> Restore sample data</button>
      </Card>
    </div>
    <div className="section-stack">
      <Card title="Privacy & safety">
        <div className="checklist"><div className="check-item"><ShieldCheck size={15} />Wellbeing check-ins are self-reported, not medical assessments.</div><div className="check-item"><Sparkles size={15} />AI assistant and image screening use simulation only.</div><div className="check-item"><PawPrint size={15} />A veterinarian should assess health concerns about chickens.</div><div className="check-item"><Heart size={15} />Seek qualified health support when you have personal health concerns.</div></div>
        <div className="result-panel" style={{ marginTop: 13 }}><h3>Demo mode is always on</h3><p>No paid AI keys or external model calls are needed for the demo. Uploaded image previews remain in memory; no image is sent to an AI service.</p></div>
      </Card>
      <Card title="About this project"><div className="row-title">ChickenCare AI</div><p className="row-detail" style={{ lineHeight: 1.7 }}>Team 1 · Theme A: Chicken-Assisted Happy Life Combined with AI Health Applications · Taiwan Social Enterprise Startup Proposal Competition · SDG 3: Good Health and Well-being.</p></Card>
    </div>
  </div>;
}
