const BASE_URL = import.meta.env.VITE_API_BASE_URL ;


export async function createResearch(topic) {
  const response = await fetch(`${BASE_URL}/research/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error("Failed to create research");
  }

  return response.json();
}


export async function getHistory() {
  const response = await fetch(`${BASE_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}


export async function getReportById(reportId) {
  const response = await fetch(`${BASE_URL}/history/${reportId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }

  return response.json();
}


export async function searchReports(query, topK = 5) {
  const response = await fetch(`${BASE_URL}/research/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, top_k: topK }),
  });

  if (!response.ok) {
    throw new Error("Failed to search reports");
  }

  return response.json();
}
