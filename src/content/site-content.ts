import { site } from "@/site";

/** The site's copy, shared by Home and the Features and Pricing pages. */

export const pillars = [
  { word: "Track", line: "Workouts, meals, weight and how you slept — in seconds." },
  { word: "Train", line: "A programme that tells you the next weight and the next rep." },
  { word: "Fuel", line: "Targets from your goal, Indian food and your mess menu." },
  { word: "Improve", line: "Trend weight, strength, records and a weekly report." },
];

export const sections = [
  {
    id: "training",
    eyebrow: "Train",
    title: "A programme that progresses with you",
    body: "Let FITOS build your week from your goal, level, days and equipment, pick a proven split like Push / Pull / Legs, or build your own. Every exercise shows the weight and reps to aim for next, and why.",
    points: [
      "Generated, professional or custom programmes",
      "The next load for each lift, from what you logged",
      "Planned deloads, and volume per muscle each week",
      "Missed a day? Skip it — the whole week moves one day",
    ],
    screen: "/screens/training.webp",
    alt: "The FITOS Training tab: the day's session with its exercises",
  },
  {
    id: "nutrition",
    eyebrow: "Fuel",
    title: "Food the way you actually eat",
    body: "Calorie and protein targets from your goal, and a food library that knows dal, roti, idly and sambhar — 1,775 foods from India's IFCT 2017, the Indian Nutrient Databank, UK CoFID and USDA, plus FITOS estimates, each shown as one honest number. At VIT, your mess menu is already in the app.",
    points: [
      "Remaining calories and protein at a glance",
      "Your hostel mess menu, and what to eat from it",
      "Diet and allergies respected in every suggestion",
      "Saved meals, quick add, or just describe your meal",
    ],
    screen: "/screens/nutrition.webp",
    alt: "The FITOS Nutrition tab: calories and protein left for the day",
  },
  {
    id: "progress",
    eyebrow: "Improve",
    title: "Progress you can trust",
    body: "Daily weight jumps around with water and food. FITOS shows the trend instead, with your weekly rate, body measurements, best lifts, records and how consistently you trained.",
    points: [
      "Trend weight, never day-to-day noise",
      "Estimated one-rep max for every lift",
      "Records and training consistency",
      "A weekly report on one page (Premium)",
    ],
    screen: "/screens/progress.webp",
    alt: "The FITOS Progress tab: trend weight with weekly rate and change",
  },
  {
    id: "ai",
    eyebrow: "FITOS AI",
    title: "Ask about your own training",
    body: "FITOS AI answers from your plan, your sessions, your progression and your targets — what to do today, why your volume is high, what to eat. It only ever sees what you allow.",
    points: [
      "Answers from your data, not generic tips",
      "Explain any suggestion in plain words",
      "Describe a meal in words; check it before it's logged",
      "Part of Premium — free while FITOS is in beta",
    ],
    screen: "/screens/ai.webp",
    alt: "FITOS AI: suggested questions about your training",
  },
];

export const more = [
  { title: "Today, decided", body: "Home shows your next move: today's session, what's left to eat, how you recovered." },
  { title: "Recovery", body: "A ten-second daily check-in, a readiness score, and sleep and heart rate from Health Connect." },
  { title: "Works offline", body: "Log a whole workout in a gym basement; it syncs when you're back online." },
  { title: "Reminders that learn", body: "At most two a day, timed around when you usually train and eat. Cheeky or gentle." },
  { title: "Your data is yours", body: "Health Connect data never leaves your phone. Download or delete everything in one tap." },
  { title: "Made to look good", body: "FITOS Dark and FITOS Light — plus Night, Forest and Ocean with Premium." },
];

export const faq = [
  {
    q: "Is FITOS free?",
    a: "Yes. The app is free, and while FITOS is in beta, Premium is free too — request it in the app and it's switched on for you.",
  },
  {
    q: "Which phones does it run on?",
    a: `Android phones running ${site.apk.minAndroid} with a 64-bit processor — almost every phone from the last few years. An iPhone version isn't available yet.`,
  },
  {
    q: "Why do I download an APK instead of using the Play Store?",
    a: "FITOS is in beta and not on the Play Store yet. The APK is the same app; Android asks once for permission to install it. The Download page walks you through it.",
  },
  {
    q: "Do I need to be a VIT student?",
    a: "No. Anyone 18 or over can use FITOS. VIT students also get their hostel mess menus built in.",
  },
  {
    q: "What happens to my health data?",
    a: "Steps, sleep and heart rate from Health Connect are read and shown on your phone only — they're never sent to the FITOS server or to any AI. FITOS AI only runs if you allow it.",
  },
  {
    q: "How do I update?",
    a: "Download the newest APK from this site and open it. It installs over the old version and keeps your data.",
  },
];

export const freePlan = [
  "Generated, professional or custom programmes",
  "Workout logging with next-load suggestions",
  "Skip today without breaking your routine",
  "Targets, Indian food library and mess menus",
  "Trend weight, strength, records, recovery",
  "Reminders that learn your routine",
  "FITOS Dark and FITOS Light themes",
];

export const premiumPlan = [
  "FITOS AI — chat, explain, describe a meal",
  "Higher AI limits",
  "A weekly report on one page",
  "Night, Forest and Ocean themes",
  "Premium profile pictures and a gold rim",
];
