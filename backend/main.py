from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from data_loader import get_all_developers, get_metrics_for_developer, get_all_months, get_manager_summary, get_developer_trend_plot, get_team_comparison_plot

app = FastAPI(title="Dev Productivity API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/developers")
def list_developers():
    return get_all_developers()

@app.get("/months")
def list_months():
    return get_all_months()

@app.get("/metrics/{developer_id}/{month}")
def get_metrics(developer_id: str, month: str):
    result = get_metrics_for_developer(developer_id, month)
    if not result:
        raise HTTPException(status_code=404, detail="No data found for this developer/month combination")
    return result

@app.get("/manager-summary/{month}")
def manager_summary(month: str):
    return get_manager_summary(month)

@app.get("/visualize/{developer_id}")
def visualize_trend(developer_id: str):
    buf = get_developer_trend_plot(developer_id)
    if not buf:
        raise HTTPException(status_code=404, detail="No data found for this developer")
    return StreamingResponse(buf, media_type="image/png")

@app.get("/visualize-team/{month}")
def visualize_team(month: str):
    buf = get_team_comparison_plot(month)
    if not buf:
        raise HTTPException(status_code=404, detail="No data found for this month")
    return StreamingResponse(buf, media_type="image/png")
