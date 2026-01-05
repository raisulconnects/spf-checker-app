# SPF Checker Web App

A simple single-page application that allows users to check the SPF (Sender Policy Framework) record of a domain by querying its DNS TXT records.

## Features

- Domain input with validation
- DNS TXT lookup using DNS-over-HTTPS
- SPF record detection (`v=spf1`)
- Highlighted `include:` and `redirect=` mechanisms
- Loading and error states
- Responsive, clean UI

## Tech Stack

- React (Vite)
- Tailwind CSS
- Cloudflare DNS-over-HTTPS API

## How It Works

Browsers cannot perform raw DNS lookups directly.  
This app uses Cloudflare’s public DNS-over-HTTPS API to fetch TXT records and then filters SPF entries on the client side.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/raisulconnects/spf-checker-app.git
cd spf-checker-app
npm install
npm run dev
```

### The app will be available at:

```bash
http://localhost:5173
```

## Assumptions & Limitations

- Frontend-only application, all processing happens client-side (no backend)
- Uses a public DNS-over-HTTPS API (may have rate limits for high-volume usage)
- Only detects SPF records starting with `v=spf1`; does not fully validate SPF syntax or recursively resolve `include:` / `redirect=` domains

# Live Demo

### A working demo is hosted on Netlify: [https://spfchecker.netlify.app](https://spfchecker.netlify.app)
