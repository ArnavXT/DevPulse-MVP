import React, { useState, useEffect, useCallback } from "react";
import InterpretationPanel from "./components/InterpretationPanel";
import ManagerView from "./components/ManagerView";
import MetricsDictionary from "./components/MetricsDictionary";
import { fetchDevelopers, fetchMonths, fetchMetrics, fetchManagerSummary } from "./hooks/useApi";
import "./App.css";

function MetricRow({ label, value, tooltip, isPercent = false }) {
  let displayValue = value;
  if (isPercent) {
    displayValue = `${(value * 100).toFixed(1)}%`;
  } else if (typeof value === 'number' && !Number.isInteger(value)) {
    displayValue = value.toFixed(1);
  }
  return (
    <tr>
      <td className="header-cell gray-bg">
        <div className="tooltip-wrap">
          <strong>{label}</strong>
          {tooltip && (
            <div className="tooltip-box">
              <div className="tt-label">{label}</div>
              <div className="tt-def">{tooltip.definition}</div>
              <div className="tt-status">{tooltip.status}</div>
            </div>
          )}
        </div>
      </td>
      <td className="value-cell number-cell">{displayValue}</td>
    </tr>
  );
}

export default function App() {
  const [view, setView] = useState("ic");
  const [developers, setDevelopers] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedDev, setSelectedDev] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [metrics, setMetrics] = useState(null);
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchDevelopers(), fetchMonths()])
      .then(([devs, mData]) => {
        setDevelopers(devs);
        setMonths(mData.months);
        if (devs.length > 0) setSelectedDev(devs[0].id);
        if (mData.months.length > 0) setSelectedMonth(mData.months[mData.months.length - 1]);
      })
      .catch(() => setError("Could not connect to backend."));
  }, []);

  const loadMetrics = useCallback(() => {
    if (!selectedDev || !selectedMonth || view !== "ic") return;
    setLoading(true);
    setError(null);
    setMetrics(null);
    fetchMetrics(selectedDev, selectedMonth)
      .then(data => { setMetrics(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [selectedDev, selectedMonth, view]);

  useEffect(() => { loadMetrics(); }, [loadMetrics]);

  useEffect(() => {
    if (view !== "manager" || !selectedMonth) return;
    setLoading(true);
    fetchManagerSummary(selectedMonth)
      .then(data => { setManagerData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [view, selectedMonth]);

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <div className="dashboard-title">DevPulse Dashboard</div>
        <div className="tabs">
          <button className={`tab-btn ${view === "ic" ? "active" : ""}`} onClick={() => setView("ic")}>My Dashboard</button>
          <button className={`tab-btn ${view === "manager" ? "active" : ""}`} onClick={() => setView("manager")}>Team Overview</button>
          <button className={`tab-btn ${view === "dictionary" ? "active" : ""}`} onClick={() => setView("dictionary")}>Metrics Dictionary</button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      
      {view === "ic" && (
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <table className="data-table">
              <tbody>
                <tr>
                  <td className="header-cell"><strong>Selected developer</strong></td>
                  <td className="value-cell bg-green-light">
                    <select value={selectedDev} onChange={e => setSelectedDev(e.target.value)} className="simple-select">
                      {developers.map(d => (
                        <option key={d.id} value={d.id}>{d.id} ({d.name})</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="header-cell"><strong>Selected month</strong></td>
                  <td className="value-cell bg-green-light">
                    <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="simple-select">
                      {months.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                
                {metrics && !loading ? (
                  <>
                    <tr>
                      <td className="header-cell gray-bg"><strong>Developer name</strong></td>
                      <td className="value-cell">{metrics.developer_name}</td>
                    </tr>
                    <tr>
                      <td className="header-cell gray-bg"><strong>Team</strong></td>
                      <td className="value-cell">{metrics.team}</td>
                    </tr>
                    
                    <MetricRow label="Lead time (days)" value={metrics.metrics.lead_time_days} tooltip={metrics.tooltips.lead_time_days} />
                    <MetricRow label="Cycle time (days)" value={metrics.metrics.cycle_time_days} tooltip={metrics.tooltips.cycle_time_days} />
                    <MetricRow label="PR throughput" value={metrics.metrics.pr_throughput} tooltip={metrics.tooltips.pr_throughput} />
                    <MetricRow label="Deployment frequency" value={metrics.metrics.deployment_frequency} tooltip={metrics.tooltips.deployment_frequency} />
                    <MetricRow label="Bug rate" value={metrics.metrics.bug_rate} tooltip={metrics.tooltips.bug_rate} isPercent={true} />

                    <tr>
                      <td className="header-cell gray-bg"><strong>Pattern hint</strong></td>
                      <td className="value-cell">{metrics.pattern}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="2" className="loading-cell">
                      {loading ? "Loading..." : "No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="dashboard-right">
            {metrics && !loading ? (
              <>
                <div className="chart-container">
                  <h3>Trend Analytics</h3>
                  <img className="chart-image" src={`/visualize/${selectedDev}`} alt="Trend Chart" />
                </div>
                <InterpretationPanel 
                  interpretation={metrics.interpretation}
                  nextSteps={metrics.next_steps} 
                />
              </>
            ) : (
              <div className="loading-cell">Select a developer to view analytics</div>
            )}
          </div>
        </div>
      )}

      {view === "manager" && (
        <div>
          <div style={{marginBottom: "20px", display: "flex", alignItems: "center", border: `1px solid var(--border)`, borderRadius: "8px", padding: "10px", width: "fit-content", background: "var(--bg-panel)"}}>
            <strong style={{marginRight: "10px", textTransform: "uppercase", fontSize: "12px", color: "var(--text-secondary)"}}>Selected month:</strong> 
            <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="simple-select" style={{width: "150px"}}>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          {loading ? <div className="loading-cell">Loading team data...</div> : <ManagerView data={managerData} month={selectedMonth} />}
        </div>
      )}

      {view === "dictionary" && (
        <MetricsDictionary />
      )}
    </div>
  );
}
