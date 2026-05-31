# Deployment and CI/CD

This repository is equipped with robust GitHub workflows to automatically handle the testing and deployment lifecycle.

## GitHub Actions Workflows

We use native GitHub Actions located in `.github/workflows/`

1. **Continuous Integration (`angular-ci.yml`)**
   - Triggers on: Pull Requests and pushes to `main`.
   - Actions: Installs Node.js, cleans dependency install via `npm ci`, runs tests continuously via headless Chrome, and performs a production build to guarantee compilation stability.

2. **Deployment to GitHub Pages (`deploy-pages.yml`)**
   - Triggers on: Pushes to `main`.
   - Actions: Builds the project with `--base-href` set specifically for GitHub Pages deployment. Uploads the generated artifacts and publishes them directly to the repository's `.github.io` domain.

3. **Maintenance Workflows**
   - **Dependabot**: Found at `.github/dependabot.yml`, performs weekly dependency bumps.
   - **Labeler**: Found at `.github/workflows/label.yml`, categorizes PRs automatically.

## Custom Hosting

If you choose to deploy outside of GitHub Pages (e.g. AWS S3, Vercel, Netlify):
1. Run `npm run build:prod`
2. Upload the `dist/luxelle-landing-page/browser/` content to your static hosting provider.
