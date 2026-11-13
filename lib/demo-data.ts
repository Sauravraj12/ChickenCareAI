export type Mood = "Calm" | "Happy" | "Okay" | "Anxious" | "Low";
export type Assessment = { date: string; mood: Mood; sleep: number; activity: number; stress: number; social: number; interaction: number; note: string };
export type Booking = { id: string; title: string; date: string; status: "Booked" | "Completed" };
export type WelfareEntry = { id: string; date: string; chicken: string; feeding: boolean; water: boolean; cleanliness: boolean; behavior: string; notes: string };
export type ChatMessage = { role: "user" | "assistant"; text: string; date: string };
export type CareNote = { id: string; text: string; author: string; date: string };
export type AppData = {
  assessments: Assessment[];
  bookings: Booking[];
  welfare: WelfareEntry[];
  chat: ChatMessage[];
  careNotes: CareNote[];
  notificationsRead: boolean;
};

export const storageKey = "chickencare-demo-v1";
export const initialData: AppData = {
  assessments: [
    { date: "Mon", mood: "Okay", sleep: 7, activity: 35, stress: 5, social: 3, interaction: 1, note: "" },
    { date: "Tue", mood: "Happy", sleep: 8, activity: 50, stress: 3, social: 4, interaction: 2, note: "" },
    { date: "Wed", mood: "Calm", sleep: 7.5, activity: 40, stress: 4, social: 4, interaction: 1, note: "" },
    { date: "Thu", mood: "Happy", sleep: 8, activity: 55, stress: 2, social: 5, interaction: 2, note: "" },
    { date: "Fri", mood: "Okay", sleep: 6.5, activity: 30, stress: 5, social: 3, interaction: 1, note: "" },
    { date: "Sat", mood: "Calm", sleep: 8, activity: 60, stress: 3, social: 5, interaction: 3, note: "" },
    { date: "Sun", mood: "Happy", sleep: 7.5, activity: 45, stress: 2, social: 4, interaction: 2, note: "" }
  ],
  bookings: [
    { id: "b-1", title: "Gentle garden time", date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), status: "Booked" },
    { id: "b-2", title: "Observe & learn", date: new Date(Date.now() - 86400000).toISOString().slice(0, 10), status: "Completed" }
  ],
  welfare: [
    { id: "w-1", date: new Date().toISOString().slice(0, 10), chicken: "Clover", feeding: true, water: true, cleanliness: true, behavior: "Active and curious", notes: "Feathers look tidy; moving comfortably." },
    { id: "w-2", date: new Date(Date.now() - 86400000).toISOString().slice(0, 10), chicken: "Poppy", feeding: true, water: true, cleanliness: false, behavior: "Resting more than usual", notes: "Monitor activity and keep the coop clean." }
  ],
  chat: [
    { role: "assistant", text: "Hello! I’m your ChickenCare wellbeing companion. I can offer general wellbeing ideas, activity suggestions, and reminders. I’m a demo assistant, not a medical professional. How are you feeling today?", date: new Date().toISOString() }
  ],
  careNotes: [{ id: "c-1", text: "Clover enjoyed the supervised garden visit today.", author: "Maya Chen · Caregiver", date: new Date().toISOString().slice(0, 10) }],
  notificationsRead: false
};

export const activities = [
  { title: "Supervised chicken feeding", duration: "15–20 min", difficulty: "Easy", safety: "Wash hands before and after; feed only approved portions.", equipment: "Approved feed, handwashing station", participants: "All ages with supervision", benefit: "A gentle routine that can encourage focus and connection." },
  { title: "Observe chicken behaviour", duration: "10–15 min", difficulty: "Easy", safety: "Observe quietly from a comfortable distance; let chickens approach.", equipment: "Observation journal", participants: "Solo or small group", benefit: "Mindful observation and curiosity in a calm outdoor setting." },
  { title: "Outdoor nature interaction", duration: "20–30 min", difficulty: "Easy", safety: "Use a shaded, secure area and take breaks for comfort.", equipment: "Weather-appropriate clothing, water", participants: "Individual or family", benefit: "A low-pressure opportunity to spend time outdoors." },
  { title: "Gentle gardening", duration: "20 min", difficulty: "Gentle", safety: "Use accessible tools and avoid plants unsafe for animals.", equipment: "Gloves, small hand tools", participants: "Individual or caregiver-supported", benefit: "Light movement and a sense of accomplishment." },
  { title: "Group chicken-care circle", duration: "30 min", difficulty: "Moderate", safety: "Keep groups small; respect each animal’s space and signals.", equipment: "Activity guide, handwashing supplies", participants: "2–6 people with a facilitator", benefit: "Shared participation and friendly social connection." },
  { title: "Animal-care learning session", duration: "25 min", difficulty: "Easy", safety: "Use age-appropriate materials and adult supervision for children.", equipment: "Illustrated care guide", participants: "Families, classes, community groups", benefit: "Build empathy and learn responsible animal care." }
];

export const weeklyChart = [
  { day: "Mon", interactions: 2, wellbeing: 62, activity: 28 },
  { day: "Tue", interactions: 3, wellbeing: 70, activity: 45 },
  { day: "Wed", interactions: 2, wellbeing: 67, activity: 35 },
  { day: "Thu", interactions: 4, wellbeing: 78, activity: 50 },
  { day: "Fri", interactions: 2, wellbeing: 71, activity: 30 },
  { day: "Sat", interactions: 5, wellbeing: 84, activity: 58 },
  { day: "Sun", interactions: 3, wellbeing: 82, activity: 42 }
];
