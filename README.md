# Analytics App

A minimal analytics dashboard that tracks page views and click events, stores them in a MongoDB backend, and visualises click heatmaps.

---

## 📦 Tech Stack

- **Frontend** – React (Vite), TypeScript, CSS (custom design system)
- **Backend** – Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Tracking Script** – Vanilla JavaScript (injectable on any site)
- **Deployment** – Frontend on Vercel, Backend on Render, Tracking script on Vercel

---

## 🛠️ Setup Steps

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Analytics App"
```

### 2. Backend
```bash
cd backend
npm install          # install dependencies
cp .env.example .env  # configure environment variables
# Edit .env if you need custom ports or DB URI
npm run dev          # starts the API on http://localhost:5000 (or PORT defined in .env)
```
- The backend exposes `/api/events`, `/api/clicks`, and `/api/sessions` endpoints.
- CORS is configured to allow only the frontend origins (localhost dev and production).

### 3. Frontend
```bash
cd ../frontend
npm install
# .env contains the API base URL (default http://localhost:5000/api)
# For production, set VITE_API_URL in Vercel dashboard to https://analytics-app-8sov.onrender.com/api
npm run dev   # runs on http://localhost:5173
```
- The UI shows a list of sessions, events for a selected session, and a heat‑map.
- The heat‑map now embeds the target site in an `<iframe>` (when allowed) and overlays click markers.

### 4. Tracking Script
- The script lives at `tracking/analytics.js`. Deploy it (or copy the file) and include it on any page you want to monitor:
```html
<script src="https://analytics-app-fpa5.vercel.app/analytics.js"></script>
```
- It sends events to **both** development (`http://localhost:3000/api/events`) and production (`https://analytics-app-8sov.onrender.com/api/events`).

---

## 🤔 Assumptions & Trade‑offs
- **CORS whitelist** – Only the two known origins are allowed. Add more origins to `backend/src/index.ts` if needed.
- **Click coordinates** – Stored as percentages so they work regardless of the page size.
- **No external UI libraries** – Styling is pure CSS to keep the bundle lightweight and fully customizable.
- **Deployment URLs are hard‑coded** in the README for reference; the actual code uses environment variables for flexibility.

---

## 🚀 Deployed Links
- **Frontend:** https://analytics-app-beryl.vercel.app/
- **Backend:** https://analytics-app-8sov.onrender.com
- **Tracking Script:** https://analytics-app-fpa5.vercel.app/analytics.js

---

Enjoy tracking!
