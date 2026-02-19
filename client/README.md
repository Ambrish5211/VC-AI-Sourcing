# VC Intelligence - Frontend Client

The user interface for the VC Intelligence Platform. A premium, dark-themed React application designed for discovering and analyzing high-growth startups.

## 🛠️ Tech Stack

-   **Framework**: React (Vite)
-   **Styling**: TailwindCSS v4
-   **Icons**: Lucide React
-   **Animations**: Framer Motion
-   **Routing**: React Router v7
-   **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)

### Installation

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env` file (optional, defaults are set in code):
    ```env
    VITE_API_BASE_URL=http://localhost:4000/api/v1
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

## ✨ Key Features

-   **Market Discovery**: Filterable grid/list view of startups.
-   **Live Enrichment**: "Enrich Profile" button triggers real-time AI analysis.
-   **Global Search**: Instant search across the entire dataset with autocomplete.
-   **User Library**: Save interesting companies and filter combinations (persisted in `localStorage`).
-   **Mobile Responsive**: Fully adaptive layout with a touch-friendly drawer navigation on mobile devices.
-   **Placeholder System**: Custom 404 and "In Progress" pages for future feature expansion.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (buttons, cards, etc.)
├── layout/         # App shell (Sidebar, Global Header)
├── pages/          # Page components (Home, Companies, Profile, Lists)
├── services/       # API configuration and service calls
└── index.css       # Tailwind directives and global styles
```
