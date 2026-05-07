# ASC

Starter repository for the ASC project.

## Environment setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with local values for your machine.

3. Keep real secrets out of Git. The `.gitignore` file excludes local `.env` files while keeping `.env.example` committed as documentation for required variables.

## GitHub project environment

For a new GitHub project, store production or deployment secrets in GitHub instead of committing them:

1. Open the repository on GitHub.
2. Go to **Settings** → **Environments**.
3. Create an environment such as `development`, `staging`, or `production`.
4. Add required variables and secrets from `.env.example` as GitHub environment variables or secrets.
5. Reference those values from GitHub Actions workflows when deployment automation is added.
