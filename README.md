# 🏥 MediSense
> **Tap, don't type** — AI-powered symptom analysis that speaks your language and respects your heritage.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://medisense-rouge.vercel.app)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Google%20Gemini-blue?style=flat-square)](https://ai.google.dev/)
[![Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)](https://www.mongodb.com/mern-stack)
[![Privacy](https://img.shields.io/badge/Privacy-Zero%20Data%20Storage-red?style=flat-square)](https://github.com/MugheesRashid/Medisense)
[![Language](https://img.shields.io/badge/Language-JavaScript-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Who Is This For](#who-is-this-for)
- [Traditional Medicine Integration](#traditional-medicine-integration)
- [Privacy & Security](#privacy--security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

**MediSense** is an advanced AI-powered medical symptom checker that mimics clinical reasoning. Unlike traditional chatbot-style symptom checkers where users struggle to describe symptoms in medical terms, MediSense uses an **organ-first flow**, **interactive body diagrams**, and **adaptive AI questioning** to guide users through a structured, tap-based assessment.

The platform intelligently gathers only the data needed for accurate results — no guessing, no typing, no medical jargon. It delivers comprehensive results that include potential conditions, severity levels, and personalized suggestions from both modern medicine and Asian traditional healing systems.

---

## ✨ Features

- **🫀 Interactive Body Diagram** — Tap directly on the affected body part. No need to know muscle or organ names.
- **🧠 Intelligent Triage** — Gemini AI determines whether medical history is needed before proceeding — no unnecessary steps.
- **📝 Adaptive Follow-up Questions** — Dynamic, context-aware questions delivered entirely through taps and selections. Zero typing.
- **📊 Iterative AI Analysis** — Two-stage deep analysis using all collected data for accurate, confident results.
- **🏯 Traditional Medicine Integration** — Sasang Constitution Medicine and Chinese Traditional Medicine (TCM) recommendations alongside modern medical insights.
- **🌏 Bilingual Support** — Built for non-English speakers across Asia, not just English users.
- **🔒 Zero Data Storage** — Completely privacy-first. No database. No saved data. Ever.

---

## 🔄 How It Works

```
┌──────────────────┐
│  Body Diagram    │  ← Tap the affected organ/area on the body map
│  Selection       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  AI Analysis     │  ← Gemini decides: is medical history needed?
│  (Stage 1)       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Medical History │  ← Optional. User can skip entirely.
│  (if needed)     │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Follow-up       │  ← AI-driven, tap-based contextual questions
│  Questions       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  AI Analysis     │  ← Deep analysis using all gathered data
│  (Stage 2)       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Results         │  ← Diseases + Severity + Sasang & TCM Suggestions
└──────────────────┘
```

---

## 🛠️ Tech Stack

| Layer              | Technology                                  |
|--------------------|---------------------------------------------|
| **Frontend**       | React.js, Interactive SVG Body Diagrams     |
| **Backend**        | Node.js, Express.js                         |
| **AI Engine**      | Google Gemini (Latest Version)              |
| **Database**       | None — privacy-first, zero storage          |
| **Deployment**     | Vercel                                      |
| **Language**       | JavaScript (99.6%)                          |

---

## 📂 Project Structure

```
Medisense/
├── backend/                  # Node.js + Express server
│   ├── routes/               # API route handlers
│   ├── services/             # Gemini AI service layer
│   ├── app.js                # Express app setup
│   ├── server.js             # Server entry point
│   └── package.json
│
├── client/                   # React.js frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── BodyDiagram/      # Interactive SVG body map
│       │   ├── SymptomSelector/  # Tap-based symptom selection
│       │   ├── MedicalHistory/   # Optional history intake
│       │   ├── FollowUp/         # AI-driven follow-up questions
│       │   └── Results/          # Final analysis & TCM suggestions
│       ├── pages/
│       ├── i18n/                 # Bilingual language files
│       ├── App.js
│       └── index.js
│       └── package.json
│
├── .env.example
└── README.md
```

> **Note:** The inner folder breakdown reflects the logical component structure of the app. Actual file names inside `backend/` and `client/` may vary slightly.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn
- A [Google Gemini API Key](https://ai.google.dev/)

### 1. Clone the Repository
```bash
git clone https://github.com/MugheesRashid/Medisense.git
cd Medisense
```

### 2. Set Up the Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see [Environment Variables](#environment-variables)):
```bash
cp .env.example .env
```

Start the server:
```bash
npm start
```

### 3. Set Up the Frontend
```bash
cd ../client
npm install
npm start
```

### 4. Open in Browser
```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

> ⚠️ **Never commit your `.env` file.** Make sure it's listed in `.gitignore`.

---

## 👥 Who Is This For

| User Group            | How MediSense Helps                                                      |
|-----------------------|--------------------------------------------------------------------------|
| **Students**          | Late-night symptom worries? Get instant guidance — no clinic wait times. |
| **Parents**           | Concerned about your child? Know urgency levels instantly.              |
| **Elderly**           | Manage chronic conditions with guided symptom assessment.                |
| **Rural Communities** | Limited healthcare access? Get guidance before a distant clinic visit.   |

---

## 🏯 Traditional Medicine Integration

MediSense doesn't just diagnose — it bridges modern science with centuries of Asian healing wisdom.

**Sasang Constitution Medicine** is a Korean traditional system that classifies individuals into four constitution types, each with unique health strengths and vulnerabilities. MediSense maps symptom patterns to these types for personalized, culturally-informed guidance.

**Chinese Traditional Medicine (TCM)** integrates principles such as Qi balance, organ meridian analysis, and herbal recommendations — all tailored to the user's specific symptom profile.

This integration isn't an afterthought. It's a cultural bridge — honoring the traditional medical knowledge of Asia while pairing it with the precision of modern AI. For many users across the region, this makes the results feel not just accurate, but *relevant*.

---

## 🔒 Privacy & Security

| Feature                      | Detail                                                                 |
|------------------------------|------------------------------------------------------------------------|
| **Zero Database**            | No database connection. No user data is stored anywhere.              |
| **Real-time Processing**     | All AI analysis happens live and is discarded after the session ends. |
| **No Account Required**      | No sign-up, no login, no tracking.                                     |
| **Sensitive Symptom Safety** | Users can assess any symptom without fear of data exposure.           |

---

## 🗺️ Roadmap

### Immediate
- Full public deployment and stability
- Expanded language support beyond current bilingual setup
- Refined traditional medicine recommendation engine

### Short-term
- Telemedicine integration for seamless doctor consultations
- Symptom tracking over time for chronic condition management
- Anonymous community health insights

### Long-term
- Partnerships with healthcare providers in underserved rural regions
- Expansion to Ayurveda and Unani traditional medicine systems
- AI fine-tuning on region-specific health patterns
- Making quality health guidance accessible to everyone

---

> 💚 *Built to make healthcare guidance accessible to everyone — regardless of language, location, or background.*
