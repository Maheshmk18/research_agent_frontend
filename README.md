# Research Agent Frontend

A React + Vite frontend for generating, browsing, and reviewing research reports from a connected backend API.

This app lets a user:

- submit a research topic
- view the generated report immediately
- browse previously created reports in a history page
- open a full report detail view
- delete reports from the frontend history list

## Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Plain CSS modules by page/feature style files

## Features

### 1. Research generation

The home page sends a topic to the backend and displays the generated report in a structured format.

### 2. History page

The history page fetches saved reports from the backend and shows them as cards with:

- title/topic
- status
- created date
- short preview
- view action
- delete action

### 3. Report detail page

Each report can be opened on its own route for a fuller readable view.

### 4. Local fallback storage

The frontend stores report snapshots in `localStorage` so recent reports can still appear even if the history API is unavailable.

### 5. Friendly report formatting

Generated report text is cleaned before rendering:

- removes repeated `==` and `--` style markers
- preserves bold inline emphasis like `**text**`
- renders content into headings, paragraphs, and lists where possible

### 6. Resilient delete behavior

When a report is deleted from the history page:

- it is removed from local snapshots
- its ID is tracked locally so it stays hidden in the UI
- if the backend delete call fails, the report still remains hidden on the frontend

## Screens and Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Submit a topic and generate a report |
| `/history` | History | Browse previously generated reports |
| `/history/:reportId` | Report Detail | View one report in full |

Routing is defined in [src/routes.jsx](d:/Research_Agent_Frontend/src/routes.jsx).

## Project Structure

```text
src/
  api/
    researchApi.js
  components/
    ErrorMessage.jsx
    HistoryList.jsx
    LoadingSpinner.jsx
    Navbar.jsx
    ReportCard.jsx
    ResearchForm.jsx
  pages/
    History.jsx
    Home.jsx
    ReportDetail.jsx
  styles/
    global.css
    history.css
    home.css
  utils/
    formatDate.js
    reportFormatting.jsx
  App.jsx
  main.jsx
  routes.jsx
```

## Getting Started

### Prerequisites

Make sure you have:

- Node.js 18+ recommended
- npm
- the backend API running locally or on an accessible server

### Installation

```bash
npm install
```

### Environment Variables

Create or update your `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

This value is currently read in [src/api/researchApi.js](d:/Research_Agent_Frontend/src/api/researchApi.js).

### Run in Development

```bash
npm run dev
```

Vite will start the local development server, usually at:

```text
http://localhost:5173
```

### Build for Production

