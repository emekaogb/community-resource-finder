# Community Resource Finder (CRF)

CodePath WEB103 Final Project

Designed and developed by: Emeka Ogbuachi, Tasneem Shabana

🔗 Link to deployed app: https://crf-client.onrender.com

## About

### Description and Purpose

Community Resource Finder is a web application that helps people easily find important local services like food banks, homeless shelters, free/lost-cost clinics, mental health support, job training centers, community events, after-school programs, immigration/legal aid, and more. 

### Inspiration

Accessing critical resources can be challenging, especially for those facing financial hardship and other unique circumstances. Information is often scattered across multiple websites or difficult to navigate. A centralized finder with a user-friendly interface would theoretically simplify the process of discovering and accessing these local services.

## Tech Stack

Frontend: React + Typescript

Backend: Node.js + Express + PostgreSQL

Authentication: BetterAuth

External APIs: Google Maps Embed, Google Places

## Features

### Lists all local resources

One page that lists all the local resources in the area, paginated and displayed via cards.

![Video Walkthrough](gifs/viewresources.gif)

### Resource details page

A resource card from the list of all resources links to a details page where you can get more information about accessing the specified resource.

![Video Walkthrough](gifs/resourcedetails.gif)

### Favoriting a resource

Favoriting via main page or details page will result in the specified resource persisting in the favorities section across visits.

![Video Walkthrough](gifs/favoriteresource.gif)

### Creating and reading a review

Review a specific resource and have it show up on the resource details page.

### Edit a review

Edit an existing review authored by the user (verify using authentication), and have it update in the database.

### Delete a review

Delete an existing review authored by the user (verify using authentication), and have it update in the database.

[Review Walkthrough](https://i.imgur.com/1Sq7gE3.mp4)

## Additional Features

### Change location

Can change the location using city/town name or zip to find relevant resources. (ex. using public wifi/computer to find resources but live somewhere else)

### Filter through resources

Can filter through resources based on type. 

### Search for specific resource(s)

Search bar that returns relevant resources based on the user query.

[Additional Features Walkthrough](https://i.imgur.com/FZAd2qy.mp4)

## Installation Instructions

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
