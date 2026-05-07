# E-budget

E-budget is a private React + Vite starter project for an internal budget tracking and monitoring dashboard.

The first version is frontend-only and uses mock data. It is designed to help teams present and monitor budget planning, approved budget, used budget, remaining budget, payment progress, and budget status before any backend integration is added.

## Security note

- Keep this GitHub repository private.
- Do not commit `.env`, API keys, passwords, tokens, credentials, or private data.
- Use `.env.example` only for placeholder values.
- Store real environment values locally in `.env` or in secure GitHub environment secrets.
- Work on feature branches and open pull requests instead of merging directly into `main`.

## Project structure

```text
.
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
└── src/
    ├── components/
    │   ├── BudgetTable.jsx
    │   ├── KPICard.jsx
    │   └── StatusBadge.jsx
    ├── data/
    │   └── budgetData.js
    ├── pages/
    │   └── Dashboard.jsx
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Features in this starter

- Professional internal dashboard layout for government or corporate budget monitoring.
- KPI cards for total budget, approved budget, used budget, remaining budget, and spending progress percentage.
- Budget monitoring table with budget code, budget name, department, fiscal year, totals, progress, and status.
- Status badges for Planned, Approved, In Progress, Completed, and Over Budget.
- Progress indicators for spending percentage.
- Department and status filters.
- Mock JSON-style JavaScript data only; no backend integration yet.

## Environment variables

Create a local `.env` file only when needed:

```bash
cp .env.example .env
```

The example file contains placeholder values only:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

Do not commit `.env` or replace placeholders in `.env.example` with real values.

## Pull request workflow

Use this branch as a clean replacement pull request for the E-budget frontend starter. Review and merge through GitHub only after the install and build checks pass in an environment with npm registry access.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Then open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```
