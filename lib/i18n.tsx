"use client";

import { cloneElement, createContext, isValidElement, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "zh-TW";
const localeStorageKey = "chickencare-language";

const traditionalChinese: Record<string, string> = {
  "Happy Chickens, Healthier Lives.": "雞隻更快樂，生活更健康。",
  "A human-and-animal wellbeing companion for chicken-assisted care.": "結合雞隻照護與人和動物福祉的陪伴平台。",
  "DEMO MODE": "示範模式",
  "Sample and simulated content. Not medical advice or veterinary diagnosis.": "範例與模擬內容。非醫療建議或獸醫診斷。",
  "Caregiver · Demo account": "照護者 · 示範帳戶",
  "Sign out of demo": "登出示範帳戶",
  "OVERVIEW": "總覽",
  "CARE & WELLBEING": "照護與福祉",
  "COMMUNITY": "社群",
  "Dashboard": "儀表板",
  "AI Health Assistant": "AI 健康助理",
  "Chicken Vision AI": "雞隻影像 AI",
  "Human Wellness": "身心福祉",
  "Chicken Welfare": "雞隻福祉",
  "Activity Planner": "活動規劃",
  "Family & Caregiver": "家人與照護者",
  "Analytics & Reports": "分析與報告",
  "Settings": "設定",
  "Workspace": "工作區",
  "Open menu": "開啟選單",
  "Close navigation": "關閉導覽",
  "Switch to light mode": "切換至淺色模式",
  "Switch to dark mode": "切換至深色模式",
  "Notifications": "通知",
  "Close notifications": "關閉通知",
  "Daily care reminder": "每日照護提醒",
  "Check fresh water for Clover": "請確認 Clover 有乾淨飲水",
  "Your weekly check-in": "每週身心記錄",
  "A few minutes to reflect?": "花幾分鐘記錄一下近況？",
  "Happy Chickens, Healthier Lives": "雞隻更快樂，生活更健康",
  "ChickenCare AI": "ChickenCare AI",
  "A gentler kind of wellbeing": "更溫柔的身心照護",
  "Small moments.": "珍惜每個小時刻。",
  "Meaningful care.": "用心照護，有所不同。",
  "A thoughtful space where human wellbeing and responsible chicken care come together — with practical guidance, gentle routines, and AI-powered support.": "在這個貼心的平台中，結合人類福祉與負責任的雞隻照護，提供實用指引、溫和日常與 AI 輔助。",
  "Explore the demo": "體驗示範",
  "The demo": "示範體驗",
  "Discover how it works": "了解運作方式",
  "How it works": "運作方式",
  "Our impact": "我們的影響",
  "Features": "功能特色",
  "Sign in": "登入",
  "Get started": "開始使用",
  "Animal welfare first": "動物福祉優先",
  "Wellbeing, not diagnosis": "關注福祉，不作診斷",
  "Illustration of chicken-assisted wellbeing": "雞隻陪伴福祉插圖",
  "Chicken": "雞隻",
  "Care, together": "一起用心照護",
  "People + animals + community": "人類 + 動物 + 社群",
  "✦ Small steps count": "✦ 每個小步驟都重要",
  "Gentle routines, your way": "依照自己的步調，建立溫和日常",
  "How ChickenCare works": "ChickenCare 的運作方式",
  "Care that sees the whole picture.": "從整體角度看見照護需求。",
  "Support personal wellbeing while keeping chicken welfare at the heart of every interaction. Tools are designed to inform and encourage — never diagnose.": "支持個人身心福祉，並將雞隻福祉放在每次互動的核心。這些工具旨在提供資訊與鼓勵，絕不作出診斷。",
  "Track how you’re feeling, notice patterns, and build a small activity routine that feels achievable.": "記錄感受、留意變化，並建立容易實踐的小型活動習慣。",
  "Get thoughtful guidance": "取得貼心指引",
  "Explore clearly labeled AI demo suggestions that encourage reflection, movement, and connection.": "探索清楚標示為 AI 示範的建議，鼓勵自我覺察、活動與連結。",
  "Care for every chicken": "照顧每一隻雞",
  "Log daily welfare observations and learn when a concern deserves attention from a veterinarian.": "記錄每日福祉觀察，並了解何時應向獸醫尋求協助。",
  "Team 1 · Theme A · SDG 3": "第一組 · 主題 A · 永續發展目標 3",
  "Wellbeing is connected.": "福祉彼此相連。",
  "ChickenCare AI is a competition MVP exploring how chicken-assisted activities, supportive communities, and practical care habits can contribute to good health and well-being. This demo is not a clinical or veterinary service.": "ChickenCare AI 是一項競賽 MVP，探索雞隻陪伴活動、互助社群與實用照護習慣如何促進健康與福祉。本示範並非醫療或獸醫服務。",
  "For people": "為人們而設",
  "Mindful activities, self-reported check-ins, social participation, and gentle reminders — without clinical claims.": "正念活動、自我回報、社交參與與溫和提醒，不作臨床宣稱。",
  "For chickens": "為雞隻而設",
  "Daily care checklists, behavior notes, and clear escalation to qualified veterinary professionals.": "每日照護清單、行為紀錄，以及明確的獸醫轉介建議。",
  "For communities": "為社群而設",
  "Family and caregiver coordination built around consent, safety, and respectful animal handling.": "以知情同意、安全與尊重動物為核心，協助家人和照護者協調。",
  "A vision for shared care": "共同照護的願景",
  "Designed around small, caring moments.": "以日常關懷時刻為設計核心。",
  "The following are illustrative demo personas and fictional feedback for this prototype — not real testimonials or research evidence.": "以下為本原型的示範人物與虛構回饋，並非真實推薦或研究證據。",
  "ILLUSTRATIVE DEMO · CAREGIVER": "示範內容 · 照護者",
  "ILLUSTRATIVE DEMO · FAMILY MEMBER": "示範內容 · 家人",
  "ILLUSTRATIVE DEMO · COMMUNITY FACILITATOR": "示範內容 · 社群帶領者",
  "“Having a simple place for routines and notes could help our family feel more connected in everyday care.”": "「有個簡單的地方記錄日常與備註，或許能讓家人在平日照護中更緊密。」",
  "“I like the gentle approach: it invites reflection without pretending to diagnose how someone feels.”": "「我喜歡這種溫和的方式：鼓勵自我覺察，而不是假裝能診斷人的感受。」",
  "“Putting animal welfare alongside wellbeing reminds us that care should work for everyone involved.”": "「同時重視動物福祉與人的福祉，提醒我們照護必須讓所有參與者都受益。」",
  "Try the interactive prototype": "體驗互動原型",
  "See what a little care can grow into.": "看看一點點用心，可以帶來什麼改變。",
  "Explore the dashboard, complete a check-in, and try the clearly labeled AI demo flows.": "探索儀表板、完成身心記錄，並體驗清楚標示的 AI 示範流程。",
  "Explore ChickenCare AI": "體驗 ChickenCare AI",
  "© 2026 ChickenCare AI · Team 1 — Competition demo": "© 2026 ChickenCare AI · 第一組 — 競賽示範",
  "Back to home": "返回首頁",
  "Welcome back": "歡迎回來",
  "Sign in to your ChickenCare demo workspace. No account or real personal information is required.": "登入 ChickenCare 示範工作區。無需帳戶或真實個人資料。",
  "Email address": "電子郵件地址",
  "Password": "密碼",
  "Enter demo workspace": "進入示範工作區",
  "Demo access": "示範登入資訊",
  "Email: demo@chickencare.ai": "電子郵件：demo@chickencare.ai",
  "Password: chickencare-demo": "密碼：chickencare-demo",
  "Any valid email and password will start the demo.": "輸入任何有效電子郵件與密碼即可開始示範。",
  "YOUR WELLBEING DASHBOARD": "身心福祉儀表板",
  "A little care goes a long way.": "一點用心，帶來長遠改變。",
  "Here’s your wellbeing and chicken-care snapshot for today.": "查看今日的身心福祉與雞隻照護摘要。",
  "Your wellbeing companion": "您的身心福祉夥伴",
  "A supportive space for general wellbeing ideas and gentle next steps.": "提供一般身心福祉建議與溫和下一步的空間。",
  "A closer look at chicken welfare": "更仔細地觀察雞隻福祉",
  "Record visible observations and learn when a veterinarian should take a look.": "記錄可見狀況，並了解何時應請獸醫檢查。",
  "Check in with yourself": "記錄自己的狀態",
  "Your reflections are personal, self-reported, and not a clinical health score.": "您的回應是個人自我回報，並非臨床健康評分。",
  "Everyday care, thoughtfully tracked": "用心記錄每日照護",
  "Small, consistent checks help you notice when an animal may need attention.": "持續進行簡單檢查，幫助您留意動物是否需要關注。",
  "Find your next gentle moment": "安排下一個輕鬆時刻",
  "Choose an activity that fits your day, your energy, and your flock.": "選擇符合今日時間、精力與雞群狀況的活動。",
  "Care works better together": "一起照護，效果更好",
  "Share notes and coordinate daily routines with your trusted care circle.": "與信任的照護夥伴分享備註並協調日常照護。",
  "Notice the little patterns": "留意細微變化",
  "Explore demo trends and your own locally saved check-ins and care records.": "查看示範趨勢，以及儲存在本機的身心記錄與照護紀錄。",
  "Make ChickenCare yours": "打造專屬的 ChickenCare",
  "Manage demo preferences and understand how your information is used.": "管理示範偏好設定，並了解資訊的使用方式。",
  "COMMUNITY MEMBERS": "社群成員",
  "WELLNESS CHECK-INS": "身心記錄",
  "CARE OBSERVATIONS": "照護觀察",
  "ACTIVITIES COMPLETED": "已完成活動",
  "↑ 12 this month": "↑ 本月增加 12 位",
  "Your saved reflections": "您儲存的自我回報",
  "Across your demo flock": "示範雞群紀錄",
  "Small steps add up": "點滴累積，逐步進展",
  "Your week at a glance": "本週概覽",
  "Self-reported wellbeing & gentle activity": "自我回報的身心狀態與輕度活動",
  "Chart period": "圖表期間",
  "This week": "本週",
  "This month": "本月",
  "Wellbeing reflection": "身心回報",
  "Activity minutes": "活動分鐘數",
  "Chicken welfare overview": "雞隻福祉概覽",
  "Daily care checklist completion": "每日照護清單完成度",
  "CHECKLISTS": "清單",
  "A caring routine": "用心照護日常",
  "Feeding, clean water and cleanliness checks recorded.": "已記錄餵食、乾淨飲水與環境清潔檢查。",
  "observations saved": "筆觀察已儲存",
  "Remember to notice changes": "請留意變化",
  "Any persistent change in behavior, appetite, or appearance deserves a conversation with your veterinarian.": "若行為、食慾或外觀持續改變，請諮詢獸醫。",
  "A gentle nudge": "溫和提醒",
  "Your next small step": "您的下一個小步驟",
  "Make a little room for fresh air": "留一點時間呼吸新鮮空氣",
  "A short, unhurried moment outdoors can be a lovely way to reset. Choose a pace that feels comfortable today.": "在戶外悠閒地待一會兒，或許能讓心情重新調整。今天請選擇自在的步調。",
  "Coming up": "即將開始",
  "Your upcoming activity": "您即將參加的活動",
  "View planner": "查看活動規劃",
  "Gentle garden time": "輕鬆的花園時光",
  "Observe & learn": "觀察與學習",
  "Supervised activity": "需在監督下進行的活動",
  "Take a wellness moment": "留一刻關心自己",
  "A quick check-in helps you notice how you’re doing.": "簡短記錄有助於留意自己的狀態。",
  "Check in": "開始記錄",
  "Mood reflections": "心情回顧",
  "Your saved self-reported check-ins": "您儲存的自我回報",
  "Recent care notes": "近期照護備註",
  "Latest notes from your care circle": "照護夥伴的最新備註",
  "See all": "查看全部",
  " mood reflection": " 心情回報",
  "A supportive conversation": "溫暖的對話",
  "Demo responses are simulated, not generated by a clinical model.": "示範回覆為模擬內容，並非臨床模型生成。",
  "English": "English",
  "Traditional Chinese": "繁體中文",
  "CHICKENCARE · DEMO": "CHICKENCARE · 示範",
  "YOU": "您",
  "Thinking of a gentle suggestion…": "正在思考溫和的建議…",
  "Your message": "您的訊息",
  "Send message": "傳送訊息",
  "What’s on your mind today?": "今天有什麼想聊聊的？",
  "Send": "傳送",
  "This assistant offers general wellbeing ideas only. It cannot diagnose, treat, or replace a health professional. Avoid sharing sensitive personal information.": "此助理僅提供一般福祉建議，不能診斷、治療或取代健康專業人員。請勿分享敏感個人資訊。",
  "How the demo assistant works": "示範助理的運作方式",
  "Replies are created by a transparent rule-based simulation. No external language model is called in demo mode and no real health predictions are made.": "回覆由透明的規則式模擬產生。示範模式不會呼叫外部語言模型，也不會作出真實健康預測。",
  "SIMULATED RESPONSE ENGINE": "模擬回覆引擎",
  "Helpful reminders": "貼心提醒",
  "A few gentle ideas for today": "今天的幾個溫和小建議",
  "Take a screen break and stretch gently.": "放下螢幕休息一下，輕輕伸展身體。",
  "Notice your energy and drink some water.": "留意自己的精神狀態，記得喝水。",
  "Plan a short, supervised animal-care activity.": "安排一個簡短且有人監督的動物照護活動。",
  "Suggestions are general and may not suit everyone. Follow advice from your healthcare professional.": "這些是一般建議，不一定適合每個人。請遵循健康專業人員的指示。",
  "Start a demo welfare screening": "開始雞隻福祉示範檢視",
  "A photo preview and user-entered notes help create an observation report.": "透過照片預覽與您填寫的備註產生觀察報告。",
  "Upload chicken image": "上傳雞隻照片",
  "Choose a chicken photo": "選擇雞隻照片",
  "JPEG, PNG, or WebP · 160 × 160 px minimum · up to 8 MB": "JPEG、PNG 或 WebP · 至少 160 × 160 像素 · 最大 8 MB",
  "Selected: ": "已選取：",
  "Posture observation": "姿勢觀察",
  "Comfortable and alert": "姿態自在且警覺",
  "Hunched or unusually still": "縮著身體或異常靜止",
  "Unsteady posture": "站姿不穩",
  "Not sure": "不確定",
  "Movement observation": "活動觀察",
  "Moving normally": "活動如常",
  "Difficulty moving": "活動困難",
  "Not observed": "尚未觀察",
  "What have you noticed?": "您觀察到什麼？",
  "Optional notes: feathers, skin, appetite, or behavior changes…": "選填備註：羽毛、皮膚、食慾或行為變化…",
  "Creating report…": "正在建立報告…",
  "Run demo screening": "執行示範檢視",
  "Screening notes": "檢視說明",
  "DEMO MODE · SIMULATED": "示範模式 · 模擬內容",
  "image/": "image/",
  "Image analysis here is simulated. The app does not inspect the pixels or make an actual veterinary finding. Use the notes below as prompts for human observation only.": "此處的影像分析為模擬內容。本應用程式不會檢視影像像素，也不會作出實際獸醫判斷。以下內容僅供人工觀察參考。",
  "Observation report": "觀察報告",
  "Next step:": "下一步：",
  "If you notice persistent changes, pain, injury, breathing difficulty, or loss of appetite, contact a qualified veterinarian promptly.": "若發現持續變化、疼痛、受傷、呼吸困難或食慾不振，請儘速聯絡合格獸醫。",
  "What to observe": "觀察重點",
  "Feather coverage and visible condition": "羽毛覆蓋與可見狀況",
  "Visible skin or eye changes": "可見的皮膚或眼睛變化",
  "Posture and movement compared with usual": "與平常相比的姿勢與活動狀況",
  "Do not treat this report as a veterinary diagnosis": "請勿將此報告視為獸醫診斷",
  "There are no right or wrong answers. Share only what feels comfortable.": "答案沒有對錯，請只分享讓您感到自在的內容。",
  "How are you feeling today?": "您今天感覺如何？",
  "Happy": "愉快",
  "Calm": "平靜",
  "Okay": "還好",
  "Anxious": "焦慮",
  "Low": "低落",
  "Sleep last night (hours)": "昨晚睡眠時間（小時）",
  "Movement today (minutes)": "今日活動時間（分鐘）",
  "Stress level (1 = low, 5 = high)": "壓力程度（1 = 低，5 = 高）",
  "Social connection (1–5)": "社交連結（1–5）",
  "Chicken interactions this week": "本週與雞隻互動次數",
  "Anything else you’d like to remember? (optional)": "還有什麼想記下來？（選填）",
  "A small win, a challenge, or something you’d like to revisit…": "一件小小的成就、一項挑戰，或之後想再回想的事…",
  "Creating suggestions…": "正在整理建議…",
  "Save check-in & get ideas": "儲存記錄並取得建議",
  "Rule-based demo ideas · not clinical advice": "規則式示範建議 · 非臨床建議",
  "Complete a check-in to see a few gentle, personalized ideas.": "完成身心記錄，查看為您整理的溫和建議。",
  "Your self-reported check-in is not a clinically validated health score or diagnosis. If you are concerned about your wellbeing, consider speaking with a qualified health professional.": "您的自我回報並非經臨床驗證的健康評分或診斷。如對身心狀態感到擔憂，請考慮諮詢合格的健康專業人員。",
  "Your recent reflections": "近期身心回顧",
  "Only visible in this browser": "僅在此瀏覽器中可見",
  "h sleep · ": " 小時睡眠 · ",
  " min activity": " 分鐘活動",
  "Daily welfare checklist": "每日雞隻福祉清單",
  "A routine log, not a substitute for professional care": "日常紀錄，不能取代專業照護",
  "Fresh feed offered": "已提供新鮮飼料",
  "Clean water available": "備有乾淨飲水",
  "Coop and resting area clean": "雞舍與休息區保持清潔",
  "Observed behavior": "觀察到的行為",
  "Active and curious": "活躍且好奇",
  "Resting as usual": "休息狀況如常",
  "Less active than usual": "比平常不活躍",
  "Eating or drinking less": "進食或飲水較少",
  "Unusual behavior noticed": "觀察到異常行為",
  "Feathers, skin, or other observations": "羽毛、皮膚或其他觀察",
  "Record what you observed without diagnosing…": "記錄觀察到的狀況，請勿自行診斷…",
  "Save observation": "儲存觀察",
  "Care overview": "照護概覽",
  "Your recent records": "近期紀錄",
  "RECORDS": "筆紀錄",
  "Your flock’s care log": "您的雞群照護紀錄",
  "Last updated ": "上次更新：",
  "If a chicken seems persistently unwell, injured, has difficulty breathing, or stops eating or drinking, contact a qualified veterinarian. Do not rely on an AI-generated observation as a confirmed finding.": "若雞隻持續不適、受傷、呼吸困難，或停止進食飲水，請聯絡合格獸醫。請勿將 AI 產生的觀察視為確定診斷。",
  "Care history": "照護歷史",
  "Feeding · water · cleanliness · observations": "餵食 · 飲水 · 清潔 · 觀察",
  "Explore activities": "探索活動",
  "Always prioritize consent, supervision, accessibility, and animal welfare.": "請始終優先考量同意、監督、無障礙與動物福祉。",
  "Search activities…": "搜尋活動…",
  "Chicken-assisted": "雞隻陪伴活動",
  "Easy": "簡單",
  "Gentle": "輕鬆",
  "Moderate": "中等",
  "Safety, equipment & participants": "安全、裝備與參與者",
  "Safety:": "安全：",
  "Equipment:": "裝備：",
  "Participants:": "參與者：",
  "Plan this activity": "規劃此活動",
  "No activities match that search.": "找不到符合搜尋條件的活動。",
  "Your activity calendar": "您的活動行事曆",
  "Bookings and completed activities": "已預約與已完成的活動",
  "Date": "日期",
  "Confirm booking": "確認預約",
  "Cancel": "取消",
  "Mark done": "標記為已完成",
  "Completed": "已完成",
  "Booked": "已預約",
  "No activities booked yet.": "目前尚未預約活動。",
  "Your care circle": "您的照護夥伴",
  "Demo members · roles shown for demonstration": "示範成員 · 角色僅供展示",
  "Administrator · You": "管理員 · 您",
  "Caregiver · Daily routines": "照護者 · 日常照護",
  "Family member · Reports": "家人 · 報告",
  "Active": "啟用中",
  "Invited": "已邀請",
  "Role-based access is illustrated with demo profiles; this MVP does not provide production account permissions.": "示範帳戶僅用於說明角色權限；此 MVP 尚未提供正式帳戶權限控管。",
  "Shared care notes": "共享照護備註",
  "Progress updates from your demo care circle": "示範照護夥伴的進度更新",
  "No care notes yet.": "目前沒有照護備註。",
  "Add a care note": "新增照護備註",
  "Keep notes practical and respectful of privacy": "請記錄實用資訊並尊重隱私",
  "Posting as": "發佈身分",
  "Caregiver": "照護者",
  "Family member": "家人",
  "Administrator": "管理員",
  "Note": "備註",
  "Share an activity update or care reminder…": "分享活動更新或照護提醒…",
  "Add note": "新增備註",
  "Emergency contact": "緊急聯絡資訊",
  "Demo-only information": "僅供示範的資訊",
  "Local support contact": "當地支援聯絡方式",
  "For a health emergency, contact your local emergency services or your healthcare provider. For urgent animal health concerns, contact a qualified veterinarian.": "遇到健康緊急狀況，請聯絡當地緊急服務或醫療服務提供者。若動物健康狀況緊急，請聯絡合格獸醫。",
  "No emergency contact details are stored in this demo. Add a verified contact in your secure production system.": "此示範不會儲存緊急聯絡資料。正式系統應新增經確認的聯絡人。",
  "CHECK-INS SAVED": "已儲存身心記錄",
  "Self-reported": "自我回報",
  "ACTIVITY BOOKINGS": "活動預約",
  "Across all statuses": "所有狀態",
  "CARE LOG ENTRIES": "照護紀錄",
  "Demo flock records": "示範雞群紀錄",
  "CARE NOTES": "照護備註",
  "Shared locally": "儲存在本機",
  "All wellbeing entries are self-reported; trends are descriptive and not clinical measures.": "所有身心資料均為自我回報；趨勢僅供描述，不屬於臨床測量。",
  "Save as PDF": "另存為 PDF",
  "Export CSV": "匯出 CSV",
  "This week wellbeing reflections": "本週身心回報",
  "This month wellbeing reflections": "本月身心回報",
  "Values shown on an illustrative 0–100 scale; not clinically validated.": "數值以示意性的 0–100 刻度呈現，未經臨床驗證。",
  "Mood distribution": "心情分布",
  "Based on saved check-ins": "根據已儲存的身心記錄",
  "Activity participation": "活動參與",
  "Minutes of self-reported movement": "自我回報的活動分鐘數",
  "Chicken welfare records": "雞隻福祉紀錄",
  "Daily care checklists saved": "已儲存的每日照護清單",
  "Minutes": "分鐘",
  "Checks completed (of 3)": "已完成檢查（共 3 項）",
  "Workspace preferences": "工作區偏好設定",
  "These demo preferences apply only in this browser": "這些示範偏好設定僅適用於此瀏覽器",
  "Assistant language": "助理語言",
  "Demo role": "示範角色",
  "Role switching is illustrative only; it does not enforce production access controls.": "切換角色僅供展示，不代表正式的存取權限控管。",
  "Show gentle reminder prompts": "顯示溫和提醒",
  "Use simulated AI responses in demo mode": "在示範模式中使用模擬 AI 回覆",
  "Your demo data": "您的示範資料",
  "SETTINGS": "設定",
  "check-ins": "筆身心記錄",
  "welfare logs": "筆福祉紀錄",
  "activities": "項活動",
  "This MVP stores information in this browser’s local storage. It is not sent to a database. Avoid entering sensitive or personally identifying information.": "此 MVP 將資訊儲存在本瀏覽器的本機儲存空間，不會傳送至資料庫。請避免輸入敏感或可識別個人身分的資訊。",
  "Restore sample data": "還原範例資料",
  "Privacy & safety": "隱私與安全",
  "Wellbeing check-ins are self-reported, not medical assessments.": "身心記錄為自我回報，並非醫療評估。",
  "AI assistant and image screening use simulation only.": "AI 助理與影像檢視僅使用模擬內容。",
  "A veterinarian should assess health concerns about chickens.": "雞隻健康疑慮應由獸醫評估。",
  "Seek qualified health support when you have personal health concerns.": "若您有個人健康疑慮，請尋求合格的健康專業支援。",
  "Demo mode is always on": "示範模式持續啟用",
  "No paid AI keys or external model calls are needed for the demo. Uploaded image previews remain in memory; no image is sent to an AI service.": "此示範不需要付費 AI 金鑰或呼叫外部模型。上傳照片僅供預覽，會暫存在記憶體中，不會傳送至 AI 服務。",
  "About this project": "關於本專案",
  "Team 1 · Theme A: Chicken-Assisted Happy Life Combined with AI Health Applications · Taiwan Social Enterprise Startup Proposal Competition · SDG 3: Good Health and Well-being.": "Team 1 · 主題 A：結合雞隻照護與 AI 健康應用，打造幸福生活 · 臺灣社會企業創業提案競賽 · SDG 3：健康與福祉。",
  "Taiwan Social Enterprise Startup Proposal Competition": "臺灣社會企業創業提案競賽",
  "Good Health and Well-being": "健康與福祉",
  "SIMULATED": "模擬內容",
  "SIMULATED REPORT — the uploaded image pixels were not analyzed. This is not an AI prediction or veterinary finding.": "模擬報告 — 未分析上傳影像的像素。此內容不是 AI 預測或獸醫診斷。",
  "Supervised chicken feeding": "在監督下餵食雞隻",
  "Observe chicken behaviour": "觀察雞隻行為",
  "Outdoor nature interaction": "戶外自然體驗",
  "Gentle gardening": "輕鬆園藝",
  "Group chicken-care circle": "團體雞隻照護活動",
  "Animal-care learning session": "動物照護學習課程",
  "Wash hands before and after; feed only approved portions.": "餵食前後請洗手，並只餵食適當份量。",
  "Observe quietly from a comfortable distance; let chickens approach.": "保持適當距離安靜觀察，讓雞隻自行靠近。",
  "Use a shaded, secure area and take breaks for comfort.": "選擇安全、有遮蔭的區域，並適時休息。",
  "Use accessible tools and avoid plants unsafe for animals.": "使用方便操作的工具，避免種植對動物有害的植物。",
  "Keep groups small; respect each animal’s space and signals.": "保持小團體，尊重每隻動物的空間與訊號。",
  "Use age-appropriate materials and adult supervision for children.": "使用符合年齡的教材，並由成人陪同兒童參與。",
  "Approved feed, handwashing station": "合適的飼料、洗手設備",
  "Approved feed": "合適的飼料",
  "Observation journal": "觀察日誌",
  "Weather-appropriate clothing, water": "合適天氣的衣物、飲用水",
  "Gloves, small hand tools": "手套、小型園藝工具",
  "Activity guide, handwashing supplies": "活動指南、洗手用品",
  "Illustrated care guide": "圖解照護指南",
  "All ages with supervision": "各年齡層，需有人監督",
  "Solo or small group": "個人或小團體",
  "Individual or family": "個人或家庭",
  "Individual or caregiver-supported": "個人參與或由照護者協助",
  "2–6 people with a facilitator": "2–6 人，並由帶領者陪同",
  "Families, classes, community groups": "家庭、班級、社群團體",
  "A gentle routine that can encourage focus and connection.": "溫和的日常活動，有助於專注與建立連結。",
  "Mindful observation and curiosity in a calm outdoor setting.": "在寧靜的戶外環境中練習專注觀察與好奇心。",
  "A low-pressure opportunity to spend time outdoors.": "以輕鬆自在的方式享受戶外時光。",
  "Light movement and a sense of accomplishment.": "輕度活動，並帶來完成事情的成就感。",
  "Shared participation and friendly social connection.": "一起參與，建立友善的社交連結。",
  "Build empathy and learn responsible animal care.": "培養同理心，學習負責任的動物照護。",
  "A supervised garden visit today.": "今天在監督下進行了花園活動。",
  "Feathers look tidy; moving comfortably.": "羽毛整潔，活動自在。",
  "Resting more than usual": "比平常休息更多",
  "Monitor activity and keep the coop clean.": "留意活動狀況並保持雞舍清潔。",
  "Alex Morgan": "Alex Morgan",
  "Maya Chen": "Maya Chen",
  "Jordan Lee": "Jordan Lee",
  "Maya Chen · Caregiver": "Maya Chen · 照護者",
  "Alex Morgan · Caregiver": "Alex Morgan · 照護者",
  "SIMULATED REPORT": "模擬報告",
  "Could not generate suggestions": "無法產生建議",
  "The assistant could not respond.": "助理目前無法回覆。",
  "Could not complete the simulated screening.": "無法完成模擬檢視。",
  "Choose an image file (JPEG, PNG, or WebP).": "請選擇圖片檔案（JPEG、PNG 或 WebP）。",
  "This image is larger than 8 MB. Choose a smaller image.": "圖片超過 8 MB，請選擇較小的圖片。",
  "This image could not be opened. Try a clear JPEG, PNG, or WebP image.": "無法開啟此圖片。請改用有效的 JPEG、PNG 或 WebP 圖片。",
  "This image is too small for a useful preview. Choose an image at least 160 × 160 pixels.": "圖片尺寸太小，無法有效預覽。請選擇至少 160 × 160 像素的圖片。",
  "Upload an image before starting the demo screening.": "請先上傳圖片，再開始示範檢視。",
  "Application language": "應用程式語言",
  "English responses": "以英文回覆",
  "繁體中文回覆": "以繁體中文回覆",
  " check-ins · ": " 筆身心記錄 · ",
  " welfare logs · ": " 筆福祉紀錄 · ",
  " activities": " 項活動",
  "Demo assistant · simulated rule-based demo": "示範助理 · 模擬規則式回覆",
  "Hello! I’m your ChickenCare wellbeing companion. I can offer general wellbeing ideas, activity suggestions, and reminders. I’m a demo assistant, not a medical professional. How are you feeling today?": "您好！我是 ChickenCare 身心福祉助理。我可以提供一般福祉建議、活動靈感與提醒。我是示範助理，並非醫療專業人員。您今天感覺如何？",
  "That sounds like a lot to carry. If it feels comfortable, try pausing for a few slow breaths or reaching out to someone you trust. You do not have to work through it alone.": "聽起來您承受了很多。如果覺得合適，可以先慢慢深呼吸幾次，或聯絡一位信任的人。您不必獨自面對。",
  "If possible, consider a calm wind-down routine and a consistent bedtime. Sleep needs vary from person to person.": "如果情況允許，可以嘗試平靜的睡前儀式與固定就寢時間。每個人的睡眠需求都不同。",
  "Be gentle with yourself. If difficult feelings continue or concern you, consider speaking with a qualified health professional.": "請溫柔地對待自己。如果困難的感受持續或令您擔憂，請考慮諮詢合格的健康專業人員。",
  "This assistant is a simulated demo and cannot provide crisis care.": "此助理為模擬示範，無法提供危機支援。",
  "You do not have to work through it alone.": "您不必獨自面對。",
  "Chicken care observation saved": "已儲存雞隻照護觀察",
  "Care note added": "已新增照護備註",
  "Simulated observation report ready": "模擬觀察報告已完成",
  "Check-in saved to this browser": "身心記錄已儲存至此瀏覽器",
  "Activity marked as completed": "活動已標記為完成",
  "No activities booked yet. Visit the planner to find a gentle activity.": "目前尚未預約活動。前往活動規劃，尋找適合的輕鬆活動。",
  "Thank you for sharing that with me. You might try one gentle activity that feels manageable today, such as a short walk, a restful break, or a supervised chicken-care activity. What feels most doable?": "謝謝你願意分享。今天可以試試一項輕鬆可行的活動，例如短暫散步、休息一下，或在監督下照顧雞隻。你覺得哪一項最容易開始？",
  "A short, comfortable stretch or gentle walk can be a manageable way to add a little movement.": "舒適地伸展一下或輕鬆散步，是增加一點活動量的簡單方式。",
  "Try taking a brief pause or sharing how you feel with someone you trust. Choose what feels right for you.": "試著短暫休息，或向信任的人分享感受。請選擇適合自己的方式。",
  "Would a low-pressure message or call with someone you trust feel supportive today?": "今天傳訊息或打電話給信任的人，是否能帶給您一些支持？",
  "You are making space to notice how you feel. Consider keeping a gentle routine and choosing one activity you enjoy.": "您正為覺察自己的感受留出空間。可以維持溫和的日常，並選擇一項喜歡的活動。",
  "Week 1": "第 1 週",
  "Week 2": "第 2 週",
  "Week 3": "第 3 週",
  "Week 4": "第 4 週"
};

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (text: string) => string };
const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => undefined,
  t: text => text
});

export function translate(text: string, locale: Locale): string {
  if (locale === "en") return text;
  const trimmed = text.trim();
  if (trimmed.length > 0 && trimmed !== text) return text.replace(trimmed, translate(trimmed, locale));
  if (text.startsWith("Selected: ")) return `已選取：${translate(text.slice("Selected: ".length), locale)}`;
  if (text.startsWith("Last updated ")) return `上次更新：${translate(text.slice("Last updated ".length), locale)}`;
  const exact = traditionalChinese[text];
  if (exact) return exact;
  const week = /^Week (\d+)$/.exec(text);
  if (week) return `第 ${week[1]} 週`;
  const duration = /^(\d+)[–-](\d+) min$/.exec(text);
  if (duration) return `${duration[1]}–${duration[2]} 分鐘`;
  const oneDuration = /^(\d+) min$/.exec(text);
  if (oneDuration) return `${oneDuration[1]} 分鐘`;
  const month = /^↑ (\d+) this month$/.exec(text);
  if (month) return `↑ 本月增加 ${month[1]} 位`;
  const saved = /^(\d+) observations saved$/.exec(text);
  if (saved) return `已儲存 ${saved[1]} 筆觀察`;
  const selected = /^Selected: (.+) · ([\d.]+) MB$/.exec(text);
  if (selected) return `已選取：${selected[1]} · ${selected[2]} MB`;
  const settingsCounts = /^(\d+) check-ins · (\d+) welfare logs · (\d+) activities$/.exec(text);
  if (settingsCounts) return `${settingsCounts[1]} 筆身心記錄 · ${settingsCounts[2]} 筆福祉紀錄 · ${settingsCounts[3]} 項活動`;
  const plan = /^Plan: (.+)$/.exec(text);
  if (plan) return `規劃：${translate(plan[1], locale)}`;
  const planned = /^(.+) added to your activity plan$/.exec(text);
  if (planned) return `已將「${translate(planned[1], locale)}」加入活動規劃`;
  const weeks = /^This (week|month) wellbeing reflections$/.exec(text);
  if (weeks) return `本${weeks[1] === "week" ? "週" : "月"}身心回報`;
  return text;
}

export function LocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(localeStorageKey);
      if (saved === "en" || saved === "zh-TW") setLocaleState(saved);
    } catch (error) {
      console.error("Could not read the saved ChickenCare language preference.", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh-TW" ? "zh-Hant-TW" : "en";
    document.title = locale === "zh-TW"
      ? "ChickenCare AI — 雞隻更快樂，生活更健康"
      : "ChickenCare AI — Happy Chickens, Healthier Lives";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute(
      "content",
      locale === "zh-TW"
        ? "結合雞隻照護與人和動物福祉的陪伴平台。"
        : "A human-and-animal wellbeing companion for chicken-assisted care."
    );
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(localeStorageKey, nextLocale);
    } catch (error) {
      console.error("Could not save the ChickenCare language preference.", error);
    }
  };

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (text: string) => translate(text, locale)
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

function translateTree(node: ReactNode, t: (text: string) => string): ReactNode {
  if (typeof node === "string") return t(node);
  if (Array.isArray(node)) return node.map(child => translateTree(child, t));
  if (!isValidElement<Record<string, unknown>>(node)) return node;

  const props: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node.props)) {
    if (key === "children") props.children = translateTree(value as ReactNode, t);
    else if (typeof value === "string" && ["aria-label", "alt", "title", "placeholder", "subtitle", "label", "note"].includes(key)) props[key] = t(value);
    else props[key] = value;
  }
  return cloneElement(node, props);
}

export function Localized({ children }: Readonly<{ children: ReactNode }>) {
  const { t } = useLocale();
  return <>{translateTree(children, t)}</>;
}

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  return <label className="language-switch">
    {!compact && <span className="language-switch-label">{locale === "zh-TW" ? "語言" : "Language"}</span>}
    <select value={locale} onChange={event => setLocale(event.target.value as Locale)} aria-label={locale === "zh-TW" ? "應用程式語言" : "Application language"}>
      <option value="en">English</option>
      <option value="zh-TW">繁體中文</option>
    </select>
  </label>;
}
