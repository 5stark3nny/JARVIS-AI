# JARVIS-AI — Frontend

A responsive, Iron Man-inspired personal AI assistant dashboard built with React and Vite.

## Current features
- Responsive dashboard with sidebar navigation
- Animated JARVIS core visualizer
- Status cards and system activity timeline
- Chat interface with clearly labelled preview responses
- Browser speech recognition where supported (Chrome / Edge)
- Mobile navigation and responsive layout

## Important
This is the frontend preview only. AI replies are simulated. It does not yet connect to an AI model, access computer files, launch applications, or execute desktop commands. Those features require a separately built and secured backend/desktop agent.

## Run locally (Windows 10)
Install Node.js LTS from https://nodejs.org/ and restart your terminal.

Open Command Prompt in this project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

To test a production build:

```bash
npm run build
npm run preview
```

## Deploy with GitHub Pages
This project can be deployed using GitHub Pages with GitHub Actions. In your repository:
1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Add a workflow file at `.github/workflows/deploy.yml` using the workflow below.
4. Commit the file. Open the **Actions** tab and wait for the Pages deployment to finish.

Workflow file:

```yaml
name: Deploy JARVIS frontend to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The Vite configuration uses `base: './'` so built assets use relative paths.

## Next development stages
1. Build the Node.js backend and secure AI API connection.
2. Add persistent conversations and user memory.
3. Add text-to-speech and a more complete voice workflow.
4. Build a permission-controlled desktop agent and package the app for Windows using Electron.
