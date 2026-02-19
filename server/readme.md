# VC Intelligence - Backend Server

The backend service for the VC Intelligence Platform. It handles data serving, search logic, and live company enrichment using Google Gemini and Cheerio.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **AI Engine**: Google Gemini (`@google/generative-ai`)
-   **Scraping**: Cheerio + Axios
-   **Data Storage**: Mock JSON Database (`src/data/companies.json`)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   A Google Gemini API Key

### Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env` file in the `server/` root:
    ```env
    PORT=4000
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:4000`.

## 🔌 API Endpoints

### Companies
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/companies` | List all companies. Supports `page`, `limit`, `search`, `industry`, `stage`. |
| `GET` | `/api/v1/companies/:id` | Get details for a specific company by ID. |

### Enrichment
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/enrich` | Scrapes a website and uses AI to generate an intel brief. |
|      | Body | `{ "websiteUrl": "https://example.com" }` |

## 📂 Project Structure

```
src/
├── controllers/    # Route handlers (Business logic)
├── data/           # Mock database JSON
├── routes/         # Express route definitions
├── utils/          # Helper functions (Gemini AI, Scraping)
└── index.js        # Entry point
```
