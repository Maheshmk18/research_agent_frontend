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

```bash
npm run build
```

This creates the production output in the `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

## Backend API Expectations

The frontend expects these backend endpoints:

### `POST /research/create`

Creates a new research report.

Expected request body:

```json
{
  "topic": "Artificial Intelligence in Healthcare"
}
```

Expected response:

```json
{
  "id": "123",
  "topic": "Artificial Intelligence in Healthcare",
  "final_report": "..."
}
```

### `GET /history`

Returns a report history list.

The frontend supports several response shapes:

- an array directly
- `{ "items": [...] }`
- `{ "history": [...] }`
- `{ "reports": [...] }`

### `GET /history/:reportId`

Returns one report by ID.

### `DELETE /history/:reportId`

Deletes a report by ID.

Note:
If this endpoint is missing or fails, the frontend still hides the deleted report locally.

### `POST /research/search`

Search support exists in the API helper but is not currently wired into a visible page.

Expected request shape:

```json
{
  "query": "climate risk",
  "top_k": 5
}
```

## Data Handling Notes

The frontend tries to be flexible with backend report objects. It can resolve IDs from fields such as:

- `id`
- `report_id`
- `_id`
- `uuid`
- `slug` in some UI cases

It also reads report text from the first available field among:

- `final_report`
- `report`
- `summary`

## Local Storage Keys

The app uses browser `localStorage` for frontend persistence:

- `research-agent-report-snapshots`
- `research-agent-deleted-report-ids`

These help preserve recent reports and keep deleted reports hidden from the UI.

## Main Files

- [src/pages/Home.jsx](d:/Research_Agent_Frontend/src/pages/Home.jsx): create research flow and live report display
- [src/pages/History.jsx](d:/Research_Agent_Frontend/src/pages/History.jsx): loads history and handles deletion
- [src/pages/ReportDetail.jsx](d:/Research_Agent_Frontend/src/pages/ReportDetail.jsx): single report view
- [src/api/researchApi.js](d:/Research_Agent_Frontend/src/api/researchApi.js): all API calls and local snapshot/delete helpers
- [src/utils/reportFormatting.jsx](d:/Research_Agent_Frontend/src/utils/reportFormatting.jsx): cleans and structures report text

## Development Notes

- Edit source files in `src/`, not in `dist/`
- `dist/` is generated output from the build step
- The app currently uses plain React state and effects without a global state library
- Styling is organized by feature/page CSS files

## Troubleshooting

### Reports are not loading

Check:

- the backend server is running
- `VITE_API_BASE_URL` is correct
- the backend allows requests from the frontend origin if CORS is enabled there

### Deleted reports still appear

The frontend now hides deleted reports locally. If they reappear unexpectedly:

- clear browser local storage
- confirm the backend is returning stable report IDs

### Build issues

Reinstall dependencies and rebuild:

```bash
npm install
npm run build
```

## Future Improvements

- add search UI for historical reports
- add pagination for large history lists
- add toast notifications for create/delete actions
- support richer markdown-style rendering from backend reports
- improve backend error details surfaced in the UI

## License

This project currently has no license file included. Add one if you plan to share or distribute it publicly.
