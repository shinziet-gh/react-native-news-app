# NewsApp

A React Native news app with a Node.js backend that fetches and displays the latest news from the News API.

## Tools

- **React Native** — frontend
- **Node.js** — backend server
- **News API** — news content via REST API

## Setup

### Backend

1. Create a `.env` file in the `api/` folder.
2. Add your News API key:

   ```env
   NEWS_API_KEY="insert_api_key_here"
   ```
3. Install dependencies:

   ```bash
   cd api
   npm install
   ```
4. Start the backend server:

   ```bash
   npm run start
   ```

The backend will run at `http://localhost:3000`.

### Frontend


1. Navigate to the `app/` folder.

   ```bash
   cd app
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```
3. Start the frontend app:

   ```bash
   npm run start
   ```

The frontend should run on `http://localhost:8081`.
