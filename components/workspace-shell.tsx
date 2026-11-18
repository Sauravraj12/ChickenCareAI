"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, Bell, CalendarDays, Camera, ChartNoAxesCombined, ChevronRight, ClipboardCheck, Heart, HeartHandshake, Home, Menu, MessageCircle, Moon, Settings, ShieldCheck, Sun, Users, X } from "lucide-react";
import { LanguageSwitch, Localized } from "@/lib/i18n";

const navigation = [
  { title: "Dashboard", href: "/dashboard", icon: Home, group: "OVERVIEW" },
  { title: "AI Health Assistant", href: "/assistant", icon: MessageCircle, group: "OVERVIEW" },
  { title: "Chicken Vision AI", href: "/vision", icon: Camera, group: "CARE & WELLBEING" },
  { title: "Human Wellness", href: "/wellness", icon: Heart, group: "CARE & WELLBEING" },
  { title: "Chicken Welfare", href: "/welfare", icon: ShieldCheck, group: "CARE & WELLBEING" },
  { title: "Activity Planner", href: "/activities", icon: CalendarDays, group: "CARE & WELLBEING" },
  { title: "Family & Caregiver", href: "/family", icon: Users, group: "COMMUNITY" },
  { title: "Analytics & Reports", href: "/analytics", icon: ChartNoAxesCombined, group: "COMMUNITY" },
  { title: "Settings", href: "/settings", icon: Settings, group: "COMMUNITY" }
];

export default function WorkspaceShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    setDark(window.localStorage.getItem("chickencare-dark") === "true");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", dark);
  }, [dark]);

  const active = navigation.find(item => item.href === pathname);
  function toggleTheme() {
    setDark(current => {
      window.localStorage.setItem("chickencare-dark", String(!current));
      return !current;
    });
  }
  function signOut() {
    window.localStorage.removeItem("chickencare-user");
    router.push("/");
  }

  return <Localized><div className="app-shell">
    {mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "#14201855", border: 0, zIndex: 19 }} />}
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <Link href="/dashboard" className="brand" onClick={() => setMobileOpen(false)}>
        <span className="brand-mark">🐔</span><span><span className="brand-name">ChickenCare AI</span><span className="brand-tag" style={{ display: "block" }}>Happy Chickens, Healthier Lives.</span></span>
      </Link>
      {["OVERVIEW", "CARE & WELLBEING", "COMMUNITY"].map(group => <div key={group}>
        <div className="nav-label">{group}</div><nav className="nav-list" aria-label={group}>
          {navigation.filter(item => item.group === group).map(({ title, href, icon: Icon }) =>
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`nav-link ${pathname === href ? "active" : ""}`} aria-current={pathname === href ? "page" : undefined}>
              <Icon size={16} strokeWidth={1.8} /><span>{title}</span>
            </Link>
          )}
        </nav>
      </div>)}
      <div className="sidebar-bottom">
        <div className="demo-badge"><div className="demo-title"><Activity size={13} /> DEMO MODE</div><p className="demo-copy">Sample and simulated content. Not medical advice or veterinary diagnosis.</p></div>
        <button className="profile-mini" onClick={signOut} title="Sign out of demo" style={{ width: "100%", textAlign: "left", border: 0, background: "transparent" }}>
          <div className="avatar">AM</div><div><div className="profile-name">Alex Morgan</div><div className="profile-role">Caregiver · Demo account</div></div><ChevronRight size={14} style={{ marginLeft: "auto", color: "#a1aaa2" }} />
        </button>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-button mobile-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={17} /></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={12} style={{ margin: "0 5px", verticalAlign: "middle" }} /><b>{active?.title ?? "Dashboard"}</b></div></div>
        <div className="top-actions">
          <LanguageSwitch compact />
          <button className="icon-button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <div style={{ position: "relative" }}>
            <button className="icon-button" aria-label="Notifications" onClick={() => setNotifications(value => !value)}><Bell size={16} /><span className="notification-dot" /></button>
            {notifications && <div style={{ position: "absolute", right: 0, top: 44, width: 265, background: "var(--card)", border: "1px solid var(--line)", borderRadius: 13, padding: 14, zIndex: 30, boxShadow: "0 12px 30px #1e38201c" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><strong style={{ fontSize: 12 }}>Notifications</strong><button aria-label="Close notifications" onClick={() => setNotifications(false)} style={{ background: "none", border: 0, color: "var(--muted)" }}><X size={14} /></button></div>
              <div className="notification-row"><div className="row-icon"><ClipboardCheck size={15} /></div><div className="row-main"><div className="row-title">Daily care reminder</div><div className="row-detail">Check fresh water for Clover</div></div></div>
              <div className="notification-row"><div className="row-icon"><Heart size={15} /></div><div className="row-main"><div className="row-title">Your weekly check-in</div><div className="row-detail">A few minutes to reflect?</div></div></div>
            </div>}
          </div>
          <div className="avatar hide-mobile">AM</div>
        </div>
      </header>
      {children}
    </main>
  </div></Localized>;
}
