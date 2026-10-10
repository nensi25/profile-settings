# MindMate 🧠

### An AI that learns how you learn.

MindMate is a personalized AI learning companion that understands how a learner learns and continuously adapts explanations, practice, feedback, recommendations, and study plans to their needs.

## 🎯 What is MindMate?

Traditional learning platforms provide the same learning experience to everyone.

MindMate creates an evolving **Learning Twin** that understands:

- Knowledge and mastery
- Strengths and weaknesses
- Learning preferences
- Learning pace
- Performance and mistakes
- Retention and progress

It then uses this information to personalize the learning experience.

## 🔄 Core Learning Loop

```text
LEARN → MEASURE → UNDERSTAND → ADAPT → IMPROVE
                         ↑              ↓
                         └──────────────┘
✨ Key Features
🧠 Learning Twin — An evolving model of how the learner learns.
🤖 AI Tutor — Personalized explanations based on the learner's level and preferences.
📝 Adaptive Practice — Questions adjust based on performance.
📊 Progress & Mastery — Track mastery, strengths, weaknesses and learning efficiency.
📅 Personalized Planner — Adaptive study plans based on goals and progress.
💡 Proactive AI — Detects mistakes, knowledge gaps and learning patterns.
🔄 Knowledge Recovery — Identifies forgotten concepts and creates revision sessions.
📄 Learning Materials — Turn notes and PDFs into summaries, flashcards and quizzes.
📱 Offline Learning — Core learning features remain available without internet.
🔐 Privacy — Privacy-first approach with local processing where possible.
👥 Social Learning — Friends, challenges and adaptive learning battles.


🖥️ Application
Main Navigation
Home
Learn
Practice
Learning Twin
Progress
Planner
Materials
Insights

Friends
Settings
Page	Purpose
Home	What should I do next?
Learn	How can MindMate teach me?
Practice	What should I practice?
Learning Twin	How does MindMate understand me?
Progress	How am I improving?
Planner	What should I study?
Materials	What can I learn from my materials?
Insights	What did MindMate notice?

Less information. More clarity. One purpose per screen.

🎨 Design System
Desktop target: 1440 × 1024
Consistent sidebar across all authenticated pages
Same MindMate logo throughout the application
Clean, modern AI/SaaS interface
Light lavender / indigo visual language
Dark navy typography
Rounded cards
Subtle borders and shadows
Generous whitespace
Responsive layouts
No horizontal overflow or clipped content


🛠️ Tech Stack
React
TypeScript
Vite
Tailwind CSS
React Router
Lucide React
Recharts
LocalStorage
Mock Data


📁 Project Structure
src/
├── components/
├── layouts/
├── pages/
├── data/
├── hooks/
├── types/
├── App.tsx
└── main.tsx


🚀 Getting Started
git clone <repository-url>
cd mindmate
npm install
npm run dev

Build for production:

npm run build
👤 Demo Learner

Alex

Goal: Computer Science Final Exam
Overall Mastery: 72%
Strongest: DBMS — 82%
Weakest: OOP — 31%
Learning Preference: Examples First
Preferred Session: 30–45 minutes
Streak: 12 days
Learning Efficiency: 84/100


🧠 Product Architecture
Learner Activity
       ↓
Learning Twin
       ↓
Personalization Engine
       ↓
┌─────────┬──────────┬────────────┐
│  Learn  │ Practice │ Recommend  │
└─────────┴──────────┴────────────┘
       ↓
New Learning Data
       ↓
Updated Learning Twin


🏆 Vision

MindMate is not just an AI chatbot for education.

It is an adaptive learning system that continuously learns about the learner and improves how it teaches them.

MindMate — An AI that learns how you learn.


## Study Together prototype

The Friends page now includes email/WhatsApp invite drafts, a referral link, a 10-question practice battle, local XP, badges, and local battle history. This is a frontend prototype: sample opponents are not live users, email is opened as a draft rather than sent automatically, and referral events are not server-verified. For real cross-device live battles, verified referrals, persistent accounts, and email Accept/Reject tracking, connect a backend, database, realtime transport (such as Socket.IO), and an email provider.


## Global search

The header search now suggests relevant MindMate pages and common topics. Select a result or press Enter to open the top result. This searches a curated catalog of app sections/topics, not the full contents of uploaded documents or every historical record.


## Profile and appearance settings

Settings now supports editing the local display name and email, selecting an emoji avatar, and switching between Light, Dark, and the signature Aurora Glow theme. Theme preference persists in this browser. Delete Account clears MindMate-prefixed localStorage entries and signs the user out on this browser only; there is no connected server account to delete in this frontend demo.


## Profile, privacy, and Aurora Nexus
- Profile editing is available at `/profile`; appearance, privacy preferences, learning preferences, and local data deletion are in `/settings`.
- Aurora Nexus is a signature animated aurora/glass visual theme. Motion is reduced when the device requests reduced motion.
- Privacy controls are prototype preferences stored locally; remote visibility enforcement and server-side deletion require a backend.
