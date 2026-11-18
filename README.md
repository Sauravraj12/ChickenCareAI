# ChickenCare AI

**Happy Chickens, Healthier Lives.**

ChickenCare AI is a responsive MVP exploring how chicken-assisted activities, human wellbeing reflection, animal welfare, and AI-powered support can work together. It was created for **Team 1 — Theme A** and **SDG 3: Good Health and Well-being** at the Taiwan Social Enterprise Startup Proposal Competition.

> **Safety and demo notice:** This project is a competition prototype, not a medical or veterinary service. The assistant and chicken-image screening are simulated; no real language or computer-vision model is called. Uploaded image pixels are previewed in the browser and are not submitted to the screening API. Wellness information is self-reported, not a clinically validated score. The application cannot diagnose, treat, or replace a qualified professional.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Quick start on Windows](#quick-start-on-windows)
- [Quick start on macOS and Linux](#quick-start-on-macos-and-linux)
- [Demo account](#demo-account)
- [How to use the application](#how-to-use-the-application)
- [Demo data and privacy](#demo-data-and-privacy)
- [API routes](#api-routes)
- [Optional PostgreSQL and Prisma setup](#optional-postgresql-and-prisma-setup)
- [Optional FastAPI service](#optional-fastapi-service)
- [Environment variables](#environment-variables)
- [Checks and production build](#checks-and-production-build)
- [Troubleshooting](#troubleshooting)
- [Production readiness](#production-readiness)

## Features

- Public landing page and demo sign-in.
- Dashboard with sample metrics, wellbeing and activity charts, care overview, and weekly/monthly filters.
- AI Health Assistant with simulated English and Traditional Chinese responses, browser-local conversation history, and a safety escalation message for crisis language.
- Chicken Vision workflow with photo preview, JPEG/PNG/WebP validation, a size and image-dimension check, observation form, progress state, and explicitly simulated report. The API does not receive image bytes.
- Human wellness check-ins with rule-based suggestions, mood trends, and browser-local progress history.
- Chicken welfare checklists, behavior and appearance notes, and care history.
- Activity search, date-based booking, and completion tracking.
- Family and caregiver demo profiles, illustrative role selector, and shared care notes.
- Analytics charts, CSV export, and print-to-PDF via the browser’s print dialog.
- Responsive navigation, dark mode, loading and empty states, and a demo-data reset.
- App-wide English and Traditional Chinese (Taiwan) interface with a persistent language preference.
- Next.js API routes, PostgreSQL Prisma schema and seed script, and an optional FastAPI integration boundary.

## Technology

- Next.js 15 App Router, React 19, and TypeScript
- Tailwind CSS, Lucide React, Recharts, and Framer Motion
- Next.js route handlers for demo assistant, vision observation, and wellness suggestions
- Prisma schema for PostgreSQL
- Optional Python FastAPI service boundary

## Requirements

For the browser demo:

- Node.js **20.9 or newer** (Node 22 is recommended)
- npm
- Git is optional, only needed to clone the repository

For the optional integrations:

- PostgreSQL for Prisma schema setup and seed data
- Python 3.10+ and pip for FastAPI

Check your installed tools:

```powershell
node --version
npm --version
```

```bash
node --version
npm --version
```

## Quick start on Windows

Open PowerShell in the project folder. If you cloned the repository using Git:

```powershell
git clone https://github.com/Sauravraj12/ChickenCareAI.git
cd ChickenCareAI
```

If you already have the project locally, change to its folder instead:

```powershell
cd "C:\Users\admin\Desktop\Chicken Assisted happy life"
```

Install dependencies and run the development server:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Keep the terminal open while using the development server; press **Ctrl+C** in that terminal to stop it.

### Run a production build on Windows

```powershell
npm run lint
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000). `npm start` serves the production build and requires `npm run build` to have completed first.

## Quick start on macOS and Linux

```bash
git clone https://github.com/Sauravraj12/ChickenCareAI.git
cd ChickenCareAI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To run a production build:

```bash
npm run lint
npm run build
npm start
```

## Demo account

Use the sign-in link on the homepage:

- **Email:** `demo@chickencare.ai`
- **Password:** `chickencare-demo`

This is a convenience-only demo login. The current MVP does not verify passwords or authenticate against a database; any valid email and non-empty password can enter the demo workspace. Do not use this login pattern in a deployed application.

The homepage’s **Explore demo** button opens the dashboard directly.

## How to use the application

The workspace navigation remains available on desktop. On mobile, use the menu button in the header to open the navigation drawer.

1. **Dashboard** — review sample community counts, saved check-ins and observations, chart filters, welfare overview, reminders, activities, and care notes.
2. **AI Health Assistant** — ask a general wellbeing question, choose English or Traditional Chinese, and send it to the simulated rule-based assistant. Replies are not clinical advice and are not generated by a paid LLM.
3. **Chicken Vision AI** — choose or drop a JPEG, PNG, or WebP image (up to 8 MB and at least 160 × 160 pixels), inspect its browser preview, fill in observations, and run the demo screening. The generated report is based on your form values; it does not analyze the photo.
4. **Human Wellness** — select a mood, enter sleep, activity, stress and social-connection values, then save the check-in to see general rule-based suggestions. Entries and mood trends are self-reported and not validated health scores.
5. **Chicken Welfare** — choose a chicken, complete the feeding, water, and cleanliness checklist, note behavior or appearance, then save the observation.
6. **Activity Planner** — search and review activities, including duration, difficulty, safety, equipment, participants, and expected benefits. Select **Plan this activity**, choose a date, and confirm the booking. Mark a booked activity as complete when finished.
7. **Family & Caregiver** — inspect illustrative demo members and roles, add a care note, and view the shared note history. The profiles are examples, not real accounts.
8. **Analytics & Reports** — compare check-in and care trends, export wellbeing entries as CSV, or choose **Save as PDF** to open the browser print dialog. From there, select a PDF destination if available.
9. **Settings** — review demo preferences and safety information or restore the original sample data. Use the moon/sun button in the header to switch the theme.

### Change the application language

Use the language selector on the homepage, sign-in page, workspace header, or **Settings** to switch between **English** and **繁體中文** (Traditional Chinese for Taiwan). The selection is saved in this browser and remains active as you navigate between pages or reload the application. Assistant replies, wellness suggestions, and simulated chicken-image reports follow the selected language. Some sample names and user-entered content remain as originally entered; the demo’s AI and image-screening results remain simulated in both languages.

## Demo data and privacy

The current UI saves assessments, activity bookings, welfare entries, assistant messages, care notes, and the theme choice in the **current browser’s local storage**. This demo persistence is local to that browser profile; it does not sync across devices and does not currently use PostgreSQL.

The image preview uses a temporary browser object URL. Image bytes are not sent to the vision API or an external model. The AI API routes return explicitly marked simulated/rule-based outputs and do not call paid services. Avoid entering sensitive or personally identifying information.

To clear saved workspace data, open **Settings → Restore sample data** and confirm. This restores the app’s demo data. To clear the local demo sign-in, use the profile control at the bottom of the sidebar to sign out.

## API routes

The Next.js app provides these same-origin route handlers:

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/assistant` | Validates a text question and returns a rule-based simulated response. Accepts `message` and optional `language` (`English`, `Hindi`, or `Traditional Chinese`). |
| `POST` | `/api/wellness` | Validates a self-reported check-in and returns general rule-based suggestions. It does not calculate a clinical score. |
| `POST` | `/api/vision` | Creates a simulated report from user-entered observation fields. It does not accept or analyze the uploaded image. |

Example assistant request:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/assistant" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"message":"I feel stressed today","language":"English"}'
```

The route handlers validate malformed JSON, missing fields, message length, allowed values, and numeric ranges. Demo APIs are not authenticated; add authentication, authorization, rate limiting, and privacy protections before exposing them to real users.

## Optional PostgreSQL and Prisma setup

The web demo runs without PostgreSQL. The Prisma schema and seed script are an integration path and are not yet wired to the browser UI.

1. Install and start PostgreSQL, then create an empty database named `chickencare` (or choose another name).
2. Copy the example environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

   On macOS/Linux:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and set `DATABASE_URL` to your own PostgreSQL user, password, host, port, and database. For example:

   ```dotenv
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/chickencare?schema=public"
   DEMO_MODE="true"
   LLM_API_KEY=""
   ```

   Replace the placeholder password; do not commit `.env` or real credentials.
4. From the project folder, generate Prisma Client, create/update database tables, and seed sample records:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

`db:push` synchronizes the Prisma schema to the configured database. The seed script creates the demo user, chickens, and sample activities. It does not connect UI login or browser-local records to the database.

## Optional FastAPI service

The optional service is a separate integration boundary. Its endpoints return placeholders and rule-based suggestions; it does not load AI or vision models.

### Windows PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r ai-service\requirements.txt
python -m uvicorn main:app --app-dir ai-service --reload --port 8000
```

If PowerShell blocks activation, allow it only for the current terminal process and activate again:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### macOS and Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r ai-service/requirements.txt
python -m uvicorn main:app --app-dir ai-service --reload --port 8000
```

When the server is running:

- Health check: [http://localhost:8000/health](http://localhost:8000/health)
- Interactive API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

Stop the service with **Ctrl+C**. The FastAPI service runs independently from Next.js; the current UI API handlers do not proxy requests to it.

## Environment variables

| Variable | Required? | Description |
|---|---|---|
| `DATABASE_URL` | Only for Prisma | PostgreSQL connection string used by Prisma CLI and seed/setup commands. |
| `DEMO_MODE` | No | Example flag set to `true`; simulation is the current default. |
| `LLM_API_KEY` | No | Reserved for future provider integration. It is intentionally unused by the demo and should remain empty for local demo use. |

Copy `.env.example` to `.env` only when configuring the optional database. Never commit secrets, API keys, or the real `.env` file.

## Checks and production build

Run TypeScript validation:

```bash
npm run lint
```

Create an optimized Next.js production build:

```bash
npm run build
```

Serve the production build locally:

```bash
npm start
```

Validate the Prisma schema (the placeholder URL is sufficient for schema validation; a database connection is not required):

```powershell
$env:DATABASE_URL = "postgresql://demo:demo@localhost:5432/chickencare"
npx prisma validate
```

No automated browser-test suite is currently configured. Manually verify the main journeys after changes: sign in, save a wellness check-in, chat with the assistant, upload and screen a supported image, save a welfare observation, book and complete an activity, add a care note, and export analytics.

## Troubleshooting

### `npm` or `node` is not recognized

Install Node.js 20.9 or newer, close and reopen the terminal, then verify `node --version` and `npm --version`.

### Port 3000 is already in use

Stop the other development server, or choose another port:

```powershell
npm run dev -- --port 3001
```

Then open [http://localhost:3001](http://localhost:3001).

### A change does not appear in the browser

Check the terminal for compile errors and wait for Next.js to finish rebuilding. Refresh the browser. If a browser contains stale demo data, use **Settings → Restore sample data**.

### Prisma cannot connect to PostgreSQL

Confirm PostgreSQL is running, the database exists, and `DATABASE_URL` has the correct username, password, port, and database name. `npm run dev` does not require the database.

### Python virtual-environment activation is blocked

Use the process-scoped PowerShell execution-policy command in [Optional FastAPI service](#optional-fastapi-service), or run the environment's Python executable directly without activation.

### Upload is rejected

Use a valid JPEG, PNG, or WebP file that is no larger than 8 MB and has dimensions of at least 160 × 160 pixels. The image is for preview only; the demo does not perform visual analysis.

## Production readiness

This repository is an MVP and should not be deployed as a real health or animal-care service without further work. Before using real accounts or sensitive data, implement and review:

- Real authentication, secure sessions, role-based authorization, and account recovery.
- Database-backed persistence, access controls, retention and deletion policies, backups, and migrations.
- Consent, privacy notices, data minimization, transport/storage security, and applicable regulatory review.
- Secure upload storage, content validation, malware controls, and a vetted computer-vision provider if image analysis is ever added.
- A replaceable, authenticated LLM/provider adapter with output validation, safety review, monitoring, rate limits, and cost controls.
- Qualified medical and veterinary review of any health-related content and clear escalation pathways.

Never present generated or simulated output as a medical diagnosis, veterinary finding, or clinically validated prediction.
