# E-budget project

Clean starter project for building the E-budget application safely.

## Security rules

- Keep the GitHub repository private unless you intentionally decide otherwise.
- Never commit `.env`, `.env.local`, API keys, passwords, tokens, database credentials, or private data.
- Use `.env.example` only for placeholder values and required variable names.
- Work on feature branches and open pull requests instead of merging directly into `main`.

## Recommended project structure

```text
.
├── .env.example       # Placeholder environment variables only
├── .gitignore         # Keeps secrets, dependencies, build outputs, logs, and OS files out of Git
├── README.md          # Project overview and setup instructions
├── package.json       # Node.js scripts and project metadata
├── src/               # Application source code
│   ├── config.js      # Environment-backed configuration helpers
│   └── index.js       # Starter application entry point
└── test/              # Automated tests
    └── config.test.js # Configuration tests
```

This structure keeps the starter project small while leaving room to add UI, API, database, and deployment folders later.

## Local setup

1. Clone the private repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file from the placeholder template:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` for your local machine only. Do not commit `.env`.
5. Run the starter app:

   ```bash
   npm start
   ```

## Environment variables

`.env.example` documents the variable names the project expects. It intentionally contains placeholder values only:

- `PROJECT_NAME`
- `APP_ENV`
- `APP_HOST`
- `APP_PORT`
- `OPENAI_API_KEY`
- `DATABASE_URL`

If you add a new required environment variable, add its name to `.env.example` with a safe placeholder value such as `your_value_here`.

## GitHub environment setup

For deployment or CI/CD secrets, use GitHub environments instead of committed files:

1. Open the private repository on GitHub.
2. Go to **Settings** → **Environments**.
3. Create environments such as `development`, `staging`, and `production`.
4. Add deployment values from `.env.example` as GitHub environment variables or secrets.
5. Reference those GitHub secrets from Actions workflows when automation is added.

## Checks

Run these commands before opening a pull request:

```bash
npm run build
npm test
```
