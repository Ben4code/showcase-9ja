# Showcase Nigeria — Features

## Core Quiz Experience

- **9 categories**: Nigerian Food, Music & Dance, Culture & Traditions, Sports, Geography, Nollywood, History, Fashion, Languages.
- **Solo quiz mode**: 10 shuffled questions per round, 30-second timer per question, points scale with difficulty and answer speed.
- **Answer feedback**: correct/incorrect states, explanation ("Did you know?") shown after each question.
- **Results screen**: score, percentage rank (e.g. "Naija Legend!", "Sharp Sharp!"), correct count, time taken, confetti on strong scores.
- **Category picker**: per-category progress (high score, play count, completion badge) shown before starting.

## Progress & Identity

- **Local progress** (per device, `localStorage`): total score, games played, per-category high scores/completion, daily play streak (current + longest).
- **Username prompt**: first-time players are asked to set a display name just before their first quiz starts (required to play; shown on badges and the leaderboard).
- **Optional email capture**: shown alongside the username prompt. Never displayed publicly — stored only for potential score-related contact, and auto-deleted after 7 days (see Privacy below).
- **Badges** (11 total): first win, 6 per-category mastery badges (80%+ score), all-rounder (complete all categories), 3-day and 7-day streaks, and a 20-games "Naija Guru" badge.
- **Profile page**: avatar, editable username, streak display, stats grid, earned/locked badge galleries, dark mode toggle.

## Global Leaderboard

- Every completed solo quiz posts `{ username, email?, score, category }` to a **Neon (serverless Postgres)** backed `/api/leaderboard` endpoint — persisted centrally, not just on-device, so scores carry across devices under the same username.
- Public leaderboard view shows top 50 by score; email is stored server-side only and never returned by the read endpoint.
- **7-day retention**: a server-side job purges all leaderboard rows (username, score, email) older than 7 days, run at boot and every 24 hours.

## About & Privacy

- Dedicated in-app "About & Privacy Policy" page (linked from Profile) explaining what's local-only vs. sent to the server, the optional/private nature of email, and the 7-day auto-delete policy.

## UI/UX

- Mobile-first layout (bottom tab nav: Home, Play, Scores, Profile), fully responsive shell capped at a consistent max-width across all breakpoints.
- Full **dark mode** support (system-preference aware, manual toggle, persisted), tuned across every page and component.
- Nigerian-themed branding: custom logo, green/gold color system, Naija-flavored copy and emoji throughout.
- Framer Motion micro-interactions (page transitions, button taps, staggered list reveals, confetti bursts) with `prefers-reduced-motion` respected.
- Accessible interactive elements: focus-visible rings, aria-labels on icon-only buttons/inputs.
- Home page leads with a rotating hero image carousel and a "Why Showcase Nigeria?" value-prop section (categories, multiplayer, badges, leaderboard) instead of a raw category grid.

## Multiplayer (built, currently disabled)

- Real-time room-based multiplayer exists in the codebase (Socket.IO): create/join room by code, host-controlled start, synchronized countdown and per-question timer, live scoreboard, speed-based bonus scoring, end-of-game results with final rankings.
- Currently wired off in `App.tsx` (Socket provider and tab commented out) pending re-enablement.

## Deployment & Infrastructure

- Single Docker image: multi-stage build (client → server → production), Express serves the compiled React app and API from one process/port.
- Environment-driven config (`.env`): server port, CORS origin, Neon `DATABASE_URL`.
- Health check endpoint (`/api/health`) for container orchestration.
