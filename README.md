# Community Resource Finder

A full-stack web app that helps users find local community resources — food banks, shelters, clinics, and more — by searching a zip code or city. Built with React, Node.js/Express, PostgreSQL, and Google Places API.

## Installation

### Prerequisites
- Node.js v18+
- A PostgreSQL database
- A [Google Cloud](https://console.cloud.google.com) project with the following APIs enabled:
  - Google Places API
  - Google Maps Embed API
  - Google OAuth 2.0 (for sign-in)

---

### 1. Clone the repository

```bash
git clone https://github.com/emekaogb/community-resource-finder.git
cd community-resource-finder
```

---

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_PLACES_KEY=
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console → APIs & Services → Credentials |
| `GOOGLE_PLACES_KEY` | An API key with Places API enabled |
| `DATABASE_URL` | Your PostgreSQL connection string (e.g. `postgresql://user:password@host:5432/dbname`) |
| `BETTER_AUTH_SECRET` | Any long random string (e.g. run `openssl rand -hex 32`) |
| `BETTER_AUTH_URL` | The URL this server is reachable at |

Set up the database tables:

```bash
npm run reset
```

Start the server:

```bash
node server.js
```

---

### 3. Set up the client

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_MAPS_KEY=
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | The server URL |
| `VITE_GOOGLE_MAPS_KEY` | An API key with Maps Embed API enabled |

Start the client:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

### 4. Google OAuth setup

In Google Cloud Console, add the following to your OAuth 2.0 client:

| Field | Value |
|---|---|
| Authorised JavaScript origins | `http://localhost:5173` |
| Authorised redirect URIs | `http://localhost:3000/api/auth/callback/google` |
