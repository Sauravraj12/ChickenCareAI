"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LanguageSwitch, Localized } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("chickencare-user", JSON.stringify({ name: "Alex Morgan", email: "demo@chickencare.ai", role: "Caregiver" }));
    router.push("/dashboard");
  }
  return <Localized><main className="login-page"><section className="login-card">
    <div style={{ display: "flex", justifyContent: "flex-end" }}><LanguageSwitch /></div>
    <Link href="/" className="card-link" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><ArrowLeft size={13} /> Back to home</Link>
    <div className="brand" style={{ padding: 0, margin: "23px 0 0" }}><span className="brand-mark">🐔</span><span><span className="brand-name">ChickenCare AI</span><span className="brand-tag" style={{ display: "block" }}>Happy Chickens, Healthier Lives.</span></span></div>
    <h1>Welcome back</h1><p>Sign in to your ChickenCare demo workspace. No account or real personal information is required.</p>
    <form onSubmit={signIn} className="section-stack">
      <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" defaultValue="demo@chickencare.ai" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" type="password" defaultValue="chickencare-demo" required autoComplete="current-password" /></div>
      <button className="button button-primary" type="submit" style={{ width: "100%", marginTop: 3 }}>Enter demo workspace <ArrowRight size={14} /></button>
    </form>
    <div className="login-demo"><strong>Demo access</strong><br />Email: demo@chickencare.ai<br />Password: chickencare-demo<br />Any valid email and password will start the demo.</div>
  </section></main></Localized>;
}
