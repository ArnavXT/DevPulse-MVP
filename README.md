# DevPulse — Developer Productivity Dashboard

DevPulse is a modern, full-stack analytics dashboard designed to measure, visualize, and interpret developer productivity metrics. Built with a **FastAPI** Python backend and a premium **React** frontend, it provides both individual contributors and engineering managers with actionable insights into software delivery performance.

Instead of just showing raw data, DevPulse focuses on **interpretation and context**—helping teams identify bottlenecks, balance speed with quality, and celebrate high performers without causing metric anxiety.

## 🏗️ Project Structure

```text
dev-productivity/
├── backend/
│   ├── main.py            ← FastAPI app (REST Endpoints)
│   ├── data_loader.py     ← Pandas data processing & Matplotlib chart generation
│   ├── requirements.txt   ← Python dependencies
│   └── data/
│       └── intern_assignment_support_pack_dev_only_v3.xlsx  ← PUT DATASET HERE
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js / App.css           ← Main app shell and dynamic styling
    │   ├── index.js / index.css       ← Entry point + global glassmorphism styles
    │   ├── hooks/useApi.js            ← API fetching logic
    │   └── components/
    │       ├── MetricCard.js          ← Hoverable metric tiles
    │       ├── PatternBadge.js        ← Healthy/Watch/Review status pill
    │       ├── InterpretationPanel.js ← Contextual insights & next steps
    │       └── ManagerView.js         ← Team overview 
    └── package.json
```

---

## 🔗 Project Links

* **Demo Video:** [Insert Link Here]
* **Miro Board / Architecture:** [Insert Link Here]

---

## 🚀 Setup Instructions

### Step 1 — Place the Excel file
Copy the raw dataset into the backend data folder:
```text
backend/data/intern_assignment_support_pack_dev_only_v3.xlsx
```

### Step 2 — Start the Python Backend
Open a terminal and run:
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # (Use `source venv/bin/activate` on Mac/Linux)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*Backend runs at: **http://localhost:8000***
*Interactive API Docs: **http://localhost:8000/docs***

### Step 3 — Start the React Frontend
Open a second terminal and run:
```bash
cd frontend
npm install
npm start
```
*Frontend runs at: **http://localhost:3000***

*(Note: API calls are automatically proxied to the backend via package.json to avoid CORS issues).*

---

## ✨ Core Features & Visualizations

- **Radar (Spider) Charts:** A "Gold Standard" visualization for individual contributors. It plots Lead Time, Cycle Time, PR Throughput, and Quality on a normalized circular grid, instantly highlighting a developer's "shape" and balancing speed vs. quality.
- **Cumulative Flow Diagrams (CFD):** A team-level visualization showing the stacked status of all tickets over time, making it impossible for bottlenecks (like PRs stuck in code review) to hide.
- **Dynamic Interpretations:** An "Interpret" button that translates raw numbers into a plain-English summary of the month, followed by personalized, actionable next steps.
- **Contextual Tooltips:** Hover over any metric card to see exactly what it means and whether the current value is considered healthy.
- **Premium UI/UX:** Built with a modern, animated dark mode, glassmorphism panels, and a focus on keeping developers engaged rather than overwhelmed.

---

## 📡 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /developers` | Returns a list of all developers, teams, and levels. |
| `GET /months` | Returns available months from the dataset. |
| `GET /metrics/{id}/{month}` | Returns raw metrics, customized tooltips, patterns, and insights. |
| `GET /manager-summary/{month}` | Returns aggregated metrics for the entire team. |
| `GET /visualize/{id}` | Returns a dynamically generated Matplotlib Radar Chart image. |
| `GET /visualize-team/{month}` | Returns a dynamically generated Matplotlib CFD image. |
