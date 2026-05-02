const BASE = "";  // CRA proxy handles this → http://localhost:8000

export async function fetchDevelopers() {
  const res = await fetch(`${BASE}/developers`);
  if (!res.ok) throw new Error("Failed to fetch developers");
  return res.json();
}

export async function fetchMonths() {
  const res = await fetch(`${BASE}/months`);
  if (!res.ok) throw new Error("Failed to fetch months");
  return res.json();
}

export async function fetchMetrics(developerId, month) {
  const res = await fetch(`${BASE}/metrics/${developerId}/${month}`);
  if (!res.ok) throw new Error("No data for this selection");
  return res.json();
}

export async function fetchManagerSummary(month) {
  const res = await fetch(`${BASE}/manager-summary/${month}`);
  if (!res.ok) throw new Error("Failed to fetch manager summary");
  return res.json();
}
