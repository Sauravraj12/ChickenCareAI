export type AssistantLanguage = "English" | "Hindi" | "Traditional Chinese";

const translations: Record<AssistantLanguage, { greeting: string; outdoors: string; stress: string; low: string; default: string; urgent: string }> = {
  English: {
    greeting: "Thanks for checking in. What is one small thing that would help you feel supported right now?",
    outdoors: "A short, comfortable break outdoors may feel refreshing. You could spend a few quiet minutes noticing the garden or observing the chickens from a respectful distance. Take it at your own pace.",
    stress: "That sounds like a lot to carry. If it feels comfortable, try pausing for a few slow breaths or reaching out to someone you trust. You do not have to work through it alone.",
    low: "I’m sorry today feels difficult. A small, manageable step—like a glass of water, a gentle stretch, or connecting with someone you trust—might be a place to start. Please consider talking with a qualified health professional if this continues.",
    default: "Thank you for sharing that with me. You might try one gentle activity that feels manageable today, such as a short walk, a restful break, or a supervised chicken-care activity. What feels most doable?",
    urgent: "I’m sorry things feel so difficult. I’m a simulated demo and can’t provide crisis care. If you may be in immediate danger, contact your local emergency services now or go to a nearby emergency department. If you can, reach out to someone you trust and stay with them. A qualified mental health professional can provide support."
  },
  Hindi: {
    greeting: "अपनी बात साझा करने के लिए धन्यवाद। अभी आपको सहारा महसूस कराने वाली एक छोटी-सी चीज़ क्या हो सकती है?",
    outdoors: "अगर सुविधाजनक लगे, तो बाहर थोड़ी देर शांत समय बिताना ताज़गी दे सकता है। अपनी गति से बगीचे को देखें या मुर्गियों को उचित दूरी से देखें।",
    stress: "यह बहुत भारी लग सकता है। सहज लगे तो कुछ धीमी साँसें लें या किसी भरोसेमंद व्यक्ति से बात करें। आपको यह अकेले संभालने की ज़रूरत नहीं है।",
    low: "मुझे अफ़सोस है कि आज का दिन कठिन लग रहा है। पानी पीना, हल्का खिंचाव करना या किसी भरोसेमंद व्यक्ति से जुड़ना एक छोटा कदम हो सकता है। परेशानी जारी रहे तो योग्य स्वास्थ्य पेशेवर से बात करें।",
    default: "अपनी बात साझा करने के लिए धन्यवाद। आज अपनी सुविधा के अनुसार कोई छोटा काम चुनें—थोड़ी सैर, आराम या निगरानी में मुर्गियों की देखभाल। इनमें से क्या आसान लगेगा?",
    urgent: "मुझे अफ़सोस है कि आप इतना कठिन महसूस कर रहे हैं। मैं केवल एक डेमो हूँ और संकट सहायता नहीं दे सकता। यदि आपको तुरंत खतरा है, तो स्थानीय आपातकालीन सेवाओं से संपर्क करें या नज़दीकी आपातकालीन विभाग जाएँ। किसी भरोसेमंद व्यक्ति को भी बताएं।"
  },
  "Traditional Chinese": {
    greeting: "謝謝你願意分享。現在有什麼小小的事情能讓你感到多一點支持呢？",
    outdoors: "如果你覺得自在，可以到戶外安靜地休息幾分鐘，看看花園，或保持適當距離觀察雞隻。請依照自己的步調進行。",
    stress: "聽起來你承受了很多。如果覺得合適，可以先慢慢深呼吸幾次，或聯絡一位信任的人。你不必獨自面對。",
    low: "很抱歉今天讓你感到不容易。一個小而容易做到的步驟，例如喝杯水、輕柔伸展，或和信任的人聊聊，也許可以作為開始。如果這種感受持續，請考慮諮詢合格的健康專業人員。",
    default: "謝謝你告訴我。今天可以選擇一件容易做到的小事，例如短暫散步、休息，或在監督下照顧雞隻。哪一件對你來說比較可行呢？",
    urgent: "很抱歉你現在如此難受。我是模擬示範，無法提供危機支援。如果你可能正處於立即危險，請立刻聯絡當地緊急服務或前往附近急診室。如果可以，請聯絡信任的人並與對方待在一起。合格的心理健康專業人員也能提供協助。"
  }
};

export function simulateAssistantReply(message: string, language: AssistantLanguage): string {
  const text = message.toLowerCase();
  const copy = translations[language] ?? translations.English;
  if (/\b(suicid|kill myself|end my life|hurt myself|self harm|self-harm|can't go on|cannot go on)\b/i.test(text)) return copy.urgent;
  if (/\b(stress|overwhelm(?:ed|ing)?|anxious|worried|pressure)\b/i.test(text)) return copy.stress;
  if (/\b(sad|lonely|low|down|unhappy|tired)\b/i.test(text)) return copy.low;
  if (/\b(outside|outdoors|walk|garden|chicken|activity|exercise)\b/i.test(text)) return copy.outdoors;
  if (/\b(hello|hi|hey)\b/i.test(text)) return copy.greeting;
  return copy.default;
}

export function wellnessSuggestions(input: { mood: string; sleep: number; activity: number; stress: number; social: number }, language: "en" | "zh-TW" = "en"): string[] {
  const suggestions: string[] = [];
  if (language === "zh-TW") {
    if (input.sleep < 7) suggestions.push("如果情況允許，可以嘗試平靜的睡前儀式與固定就寢時間。每個人的睡眠需求都不同。");
    if (input.activity < 30) suggestions.push("舒適地伸展一下或輕鬆散步，是增加一點活動量的簡單方式。");
    if (input.stress >= 4) suggestions.push("試著短暫休息，或向信任的人分享感受。請選擇適合自己的方式。");
    if (input.social <= 2) suggestions.push("今天傳訊息或打電話給信任的人，是否能帶給您一些支持？");
    if (input.mood === "Low" || input.mood === "Anxious") suggestions.push("請溫柔地對待自己。如果困難的感受持續或令您擔憂，請考慮諮詢合格的健康專業人員。");
    if (!suggestions.length) suggestions.push("您正為覺察自己的感受留出空間。可以維持溫和的日常，並選擇一項喜歡的活動。");
    return suggestions;
  }
  if (input.sleep < 7) suggestions.push("If possible, consider a calm wind-down routine and a consistent bedtime. Sleep needs vary from person to person.");
  if (input.activity < 30) suggestions.push("A short, comfortable stretch or gentle walk can be a manageable way to add a little movement.");
  if (input.stress >= 4) suggestions.push("Try taking a brief pause or sharing how you feel with someone you trust. Choose what feels right for you.");
  if (input.social <= 2) suggestions.push("Would a low-pressure message or call with someone you trust feel supportive today?");
  if (input.mood === "Low" || input.mood === "Anxious") suggestions.push("Be gentle with yourself. If difficult feelings continue or concern you, consider speaking with a qualified health professional.");
  if (!suggestions.length) suggestions.push("You are making space to notice how you feel. Consider keeping a gentle routine and choosing one activity you enjoy.");
  return suggestions;
}
