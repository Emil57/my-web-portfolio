# My Web Portfolio

A personal portfolio site with pages for About, Experience, Projects and Contact.

- **Frontend**: Next.js 14, exported as static files and deployed to GitHub Pages.
- **Backend** (`server/`): a small Node.js API with no dependencies. It receives contact form messages, saves them and can ping you on Slack or Discord.

## Editing your content

All text lives in **`data/profile.js`**: your name, bio, jobs, skills, projects and links. Edit that file; you don't need to touch the page code.

To offer a résumé download, put `resume.pdf` in `public/` and set `resume: "resume.pdf"` in `data/profile.js`.

## Running locally

```bash
# Frontend: http://localhost:3000
npm install
BASE_PATH="" npm run dev

# Backend: http://localhost:4000
cd server
npm start
npm test
```

To use the contact form locally, start both and run the frontend with
`NEXT_PUBLIC_CONTACT_API_URL=http://localhost:4000`.

## Project structure

```
app/            Pages (home, about, experience, projects, contact)
components/     Reusable UI: Nav, Footer, Timeline, ProjectCard, ContactForm
data/profile.js Your content
server/         Contact form API (Node, no dependencies)
```

## Deploying

### Frontend (GitHub Pages)

The workflow in `.github/workflows/deploy-pages.yaml` builds and publishes the site
when you push to the `gh-pages` branch, or when you run it from the Actions tab.

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Once the backend is live, add a repository **variable** `CONTACT_API_URL`
   (Settings → Secrets and variables → Actions → Variables) with its URL.
   Until then, the contact page shows an "Email me" button.

### Backend

GitHub Pages can't run server code, so the API needs a separate host, such as
Render, Railway or Fly.io (all have free or cheap tiers). Point the host at the `server/`
folder, set the start command to `npm start`, and set these environment variables:

| Variable | Example | Purpose |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | `https://emil57.github.io` | Sites allowed to call the API (comma-separated) |
| `TRUST_PROXY` | `true` | Set on hosts that sit behind a proxy, so rate limiting sees real visitor IPs |
| `NOTIFY_WEBHOOK_URL` | Slack or Discord webhook URL | Optional: get a message for each submission |
| `DATA_DIR` | `/var/data` | Where messages are saved (`messages.jsonl`) |
| `PORT` | `4000` | Usually set by the host |

On most free tiers the disk is wiped on restart, so set `NOTIFY_WEBHOOK_URL`
(or attach a persistent disk) to avoid losing messages.

### API

- `GET /api/health` returns `{ "ok": true }`
- `POST /api/contact` with JSON `{ name, email, message }` returns `201`. It returns `400` for invalid input and `429` if one visitor sends more than 5 messages in 15 minutes.
