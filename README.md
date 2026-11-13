# ChickenCare AI

**Happy Chickens, Healthier Lives.** A responsive MVP exploring chicken-assisted activities, human wellbeing reflection, animal welfare, and responsible AI support. Built for Team 1 — Theme A / SDG 3, Taiwan Social Enterprise Startup Proposal Competition.

> **Safety and demo notice:** The assistant and chicken-image screening are simulated. Uploaded image pixels are not sent to or interpreted by a model. Wellbeing entries are self-reported, not clinically validated scores. This application does not diagnose, treat, or replace a health professional or veterinarian.

## What works in the MVP

- Public product homepage and one-click demo sign-in (`demo@chickencare.ai` / `chickencare-demo`; any non-empty valid credentials open the local demo).
- Dashboard with sample metrics, mood and activity charts, care overview, and week/month filter.
- AI assistant chat simulation with English, Hindi, and Traditional Chinese responses, local conversation history, and a safety escalation message for crisis language.
- Chicken Vision workflow with image preview, JPEG/PNG/WebP and 8 MB validation, observation fields, progress state, and an explicitly simulated report. The API does not receive image bytes.
- Human wellness check-ins, browser persistence, rule-based suggestions, and self-reported trend charts.
- Chicken welfare checklists, behavior/appearance notes, and care history.
- Activity search, date-based booking, and completion tracking.
- Family/caregiver demo profiles, role selector, and persistent care notes.
- Analytics with charts, CSV export, and print-to-PDF.
- Dark mode, responsive navigation, settings, empty/error/loading states, and local demo reset.
- Next.js route handlers for demo assistant, vision observation, and wellness recommendation workflows.
- PostgreSQL Prisma schema and repeatable seed script for the production integration path.
- Optional FastAPI service boundary for future AI model integrations.

## Requirements

- Node.js 20.9 or newer (tested target: Node 22)
- npm
- Python 3.10+ only if running the optional FastAPI service
- PostgreSQL only if using Prisma/database setup; the UI demo works without it

## Run the web demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Choose **Explore the demo**, or sign in with the demo credentials above. Demo entries persist in the current browser using local storage; use **Settings → Restore sample data** to reset them.

## Production database setup

1. Create a PostgreSQL database and copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your PostgreSQL connection string.
3. Generate the Prisma client and apply the schema:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

The Prisma schema is an integration-ready data model. The current UI intentionally uses browser-local demo persistence and does **not** yet authenticate users against the database. Do not deploy the demo login as production authentication.

## Optional FastAPI integration boundary

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install -r ai-service/requirements.txt
uvicorn main:app --app-dir ai-service --reload --port 8000
```

Check `http://localhost:8000/docs`. Endpoints return explicit demo placeholders and do not load or call AI/vision models. To connect a real model, implement an authenticated provider adapter, privacy/consent controls, output validation, clinical and veterinary review, and monitoring before enabling it. Never present model output as a diagnosis.

## AI/provider architecture

- `lib/ai-adapter.ts` isolates rule-based assistant and wellness responses.
- `app/api/assistant` and `app/api/wellness` validate input and return clearly labeled demo outputs.
- `app/api/vision` reports only user-entered observations; it does not accept or analyze image bytes.
- `ai-service/main.py` provides a separate future FastAPI boundary.
- `LLM_API_KEY` is intentionally unused in demo mode. No paid key is required.

## Build and validation

```bash
npm run build
```

For a deploy, provide the database connection, generate Prisma, and build the Next.js application. Configure authentication, access control, consent, data-retention policy, secure image handling, and professional review before processing real users’ health or animal-care information.
