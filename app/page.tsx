"use client";

import Link from "next/link";
import { Activity, ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { LanguageSwitch, Localized } from "@/lib/i18n";

export default function HomePage() {
  return <Localized><main className="landing">
    <nav className="landing-nav">
      <Link href="/" className="brand" style={{ padding: 0, margin: 0 }}>
        <span className="brand-mark"><span>🐔</span></span><span><span className="brand-name">ChickenCare AI</span><span className="brand-tag" style={{ display: "block" }}>Happy Chickens, Healthier Lives.</span></span>
      </Link>
      <div className="landing-links"><a href="#how">How it works</a><a href="#impact">Our impact</a><a href="#features">Features</a><Link href="/login">Sign in</Link><LanguageSwitch /><Link href="/dashboard" className="button button-primary button-small">Explore demo <ArrowRight size={14} /></Link></div>
      <Link href="/login" className="button button-primary button-small" style={{ display: "none" }}>Get started</Link>
    </nav>
    <section className="hero">
      <div>
        <div className="eyebrow">A gentler kind of wellbeing</div>
        <h1>Small moments.<br /><span>Meaningful care.</span></h1>
        <p className="hero-copy">A thoughtful space where human wellbeing and responsible chicken care come together — with practical guidance, gentle routines, and AI-powered support.</p>
        <div className="hero-actions"><Link href="/dashboard" className="button button-primary">Explore the demo <ArrowRight size={15} /></Link><a className="button button-outline" href="#how">Discover how it works</a></div>
        <div className="hero-proof"><span><ShieldCheck size={14} /> Animal welfare first</span><span>·</span><span><HeartHandshake size={14} /> Wellbeing, not diagnosis</span></div>
      </div>
      <div className="hero-visual" aria-label="Illustration of chicken-assisted wellbeing"><span className="hero-art" role="img" aria-label="Chicken">🐓</span><div className="floating-card float-one"><strong>Care, together</strong><span>People + animals + community</span></div><div className="floating-card float-two"><strong>✦ &nbsp;Small steps count</strong><span>Gentle routines, your way</span></div></div>
    </section>
    <section className="landing-section" id="how">
      <div className="eyebrow">How ChickenCare works</div><h2>Care that sees the whole picture.</h2><p>Support personal wellbeing while keeping chicken welfare at the heart of every interaction. Tools are designed to inform and encourage — never diagnose.</p>
      <div className="feature-grid" id="features">
        <article className="feature-card"><div className="row-icon"><Activity size={18} /></div><h3>Check in with yourself</h3><p>Track how you’re feeling, notice patterns, and build a small activity routine that feels achievable.</p></article>
        <article className="feature-card"><div className="row-icon"><Sparkles size={18} /></div><h3>Get thoughtful guidance</h3><p>Explore clearly labeled AI demo suggestions that encourage reflection, movement, and connection.</p></article>
        <article className="feature-card"><div className="row-icon"><HeartHandshake size={18} /></div><h3>Care for every chicken</h3><p>Log daily welfare observations and learn when a concern deserves attention from a veterinarian.</p></article>
      </div>
    </section>
    <section className="landing-section" id="impact" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="eyebrow">Team 1 · Theme A · SDG 3</div><h2>Wellbeing is connected.</h2><p>ChickenCare AI is a competition MVP exploring how animal-assisted activities, supportive communities, and practical care habits can contribute to good health and well-being. This demo is not a clinical or veterinary service.</p>
      <div className="feature-grid"><article className="feature-card"><h3>For people</h3><p>Mindful activities, self-reported check-ins, social participation, and gentle reminders — without clinical claims.</p></article><article className="feature-card"><h3>For chickens</h3><p>Daily care checklists, behavior notes, and clear escalation to qualified veterinary professionals.</p></article><article className="feature-card"><h3>For communities</h3><p>Family and caregiver coordination built around consent, safety, and respectful animal handling.</p></article></div>
    </section>
    <section className="landing-section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="eyebrow">A vision for shared care</div><h2>Designed around small, caring moments.</h2><p>The following are illustrative demo personas and fictional feedback for this prototype — not real testimonials or research evidence.</p>
      <div className="feature-grid"><article className="feature-card"><div className="status-pill">ILLUSTRATIVE DEMO · CAREGIVER</div><p style={{ marginTop: 13 }}>“Having a simple place for routines and notes could help our family feel more connected in everyday care.”</p></article><article className="feature-card"><div className="status-pill">ILLUSTRATIVE DEMO · FAMILY MEMBER</div><p style={{ marginTop: 13 }}>“I like the gentle approach: it invites reflection without pretending to diagnose how someone feels.”</p></article><article className="feature-card"><div className="status-pill">ILLUSTRATIVE DEMO · COMMUNITY FACILITATOR</div><p style={{ marginTop: 13 }}>“Putting animal welfare alongside wellbeing reminds us that care should work for everyone involved.”</p></article></div>
    </section>
    <section className="landing-section" style={{ textAlign: "center", paddingTop: 40, paddingBottom: 75 }}>
      <div className="eyebrow">Try the interactive prototype</div><h2>See what a little care can grow into.</h2><p style={{ margin: "0 auto" }}>Explore the dashboard, complete a check-in, and try the clearly labeled AI demo flows.</p><div style={{ marginTop: 20 }}><Link href="/dashboard" className="button button-primary">Explore ChickenCare AI <ArrowRight size={15} /></Link></div>
    </section>
    <footer className="landing-footer"><div style={{ maxWidth: 1160, margin: "auto", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><span>© 2026 ChickenCare AI · Team 1 — Competition demo</span><span>Happy Chickens, Healthier Lives.</span></div></footer>
  </main></Localized>;
}
