# VC Intelligence Sourcing Platform

A premium AI-powered interface for Venture Capitalists to discover, track, and analyze high-growth startups.

## 🚀 Features

-   **Premium UI/UX**: Modern, dark-themed interface built with React, TailwindCSS, and Framer Motion.
-   **Live AI Enrichment**: Integration with **Google Gemini** to scrape and analyze company websites in real-time.
-   **Global Search**: Unified search bar to quickly find companies across the database.
-   **Smart Filtering**: Filter companies by Industry and Stage with a responsive grid/list view.
-   **User Library**:
    -   **Lists**: Bookmark interesting companies.
    -   **Saved Searches**: Save your favorite filter combinations for quick access.
    -   *Persisted locally via LocalStorage.*

## 🛠️ Tech Stack

### Client
-   **Framework**: React (Vite)
-   **Styling**: TailwindCSS v4, Lucide React (Icons), clsx/tailwind-merge
-   **Animation**: Framer Motion
-   **Routing**: React Router v7

### Server
-   **Runtime**: Node.js + Express
-   **AI**: Google Gemini SDK (`@google/generative-ai`)
-   **Scraping**: Cheerio + Axios
-   **Data**: Mock JSON database (simulating a real DB)

## 🏃‍♂️ Getting Started

### Prerequisites
-   Node.js (v18+)
-   NPM or Yarn
-   Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd xartup-fellowship
    ```

2.  **Setup Server**
    ```bash
    cd server
    npm install
    cp .env.example .env
    # Add your GEMINI_API_KEY to .env
    npm run dev
    # Server runs on http://localhost:4000
    ```

3.  **Setup Client**
    ```bash
    cd ../client
    npm install
    npm run dev
    # Client runs on http://localhost:5173
    ```

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layout/         # Shell, Sidebar, Header
│   │   ├── pages/          # Route pages (Home, Companies, Profile...)
│   │   └── services/       # API integration (Axios)
│   └── ...
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/    # Request logic (Enrichment, Companies)
│   │   ├── data/           # Mock database
│   │   └── utils/          # AI and Scraping utilities
│   └── ...
└── ...
```

## ✨ usage

1.  **Discover**: Go to the **Market Intelligence** page to browse startups.
2.  **Analyze**: Click on a company to view its profile. Click **"Enrich Profile"** to trigger the live AI agent.
3.  **Organize**: Use "Save to List" to track companies or "Save Search" to bookmark your filters.
