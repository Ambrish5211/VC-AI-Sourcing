# VC Intelligence Sourcing Platform

A premium AI-powered interface for Venture Capitalists to discover, track, and analyze high-growth startups. This monorepo contains both the React frontend and the Node.js/Express backend.

![Project Status](https://img.shields.io/badge/Status-Complete-green)

## 🏗️ Architecture

The project is split into two main parts:

-   **[Client](./client/README.md)**: A modern React application with a premium dark UI.
-   **[Server](./server/README.md)**: A Node.js API that handles data and AI enrichment.

## 🚀 Quick Start

To run the full application, you will need to start both the client and the server in separate terminals.

### 1. Start the Backend
The server provides the API and the AI enrichment capabilities.
```bash
cd server
npm install
# Create .env file with GEMINI_API_KEY
npm run dev
# Running on http://localhost:4000
```
> See [Server Documentation](./server/README.md) for detailed setup.

### 2. Start the Frontend
The client is the user interface you interact with.
```bash
cd client
npm install
npm run dev
# Open http://localhost:5173
```
> See [Client Documentation](./client/README.md) for detailed setup.

## ✨ Core Features

1.  **Global Search**: Unified search bar to find companies instantly.
2.  **Live AI Enrichment**: Scrapes company websites on-demand and uses Google Gemini to generate executive summaries and signals.
3.  **Smart Filtering**: Organize companies by Industry and Stage.
4.  **Personal Library**: Save companies and search configurations for later.
5.  **Mobile Ready**: Fully responsive design with mobile-optimized navigation.

## 📝 License

This project is created for the Xartup Fellowship.
