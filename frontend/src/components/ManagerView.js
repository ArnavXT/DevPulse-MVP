import React from "react";

const COLS = [
  { key: "developer_name", label: "Developer" },
  { key: "level",          label: "Level" },
  { key: "team",           label: "Team" },
  { key: "lead_time_days", label: "Lead Time (days)", fmt: v => v.toFixed(1) },
  { key: "cycle_time_days",label: "Cycle Time (days)", fmt: v => v.toFixed(1) },
  { key: "pr_throughput",  label: "PRs",  fmt: v => v },
  { key: "deployment_frequency", label: "Deploys", fmt: v => v },
  { key: "bug_rate",       label: "Bug Rate", fmt: v => v === 0 ? "0%" : `${(v*100).toFixed(0)}%` },
  { key: "pattern",        label: "Pattern" },
];

export default function ManagerView({ data, month }) {
  if (!data || data.length === 0) {
    return <div style={{color: "var(--text-muted)"}}>No data for {month}</div>;
  }

  const teams = [...new Set(data.map(d => d.team))];

  return (
    <div>
      <div className="chart-container" style={{marginBottom: "30px", padding: "30px"}}>
        <h3 style={{marginBottom: "20px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--border)", paddingBottom: "8px"}}>
          <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-blue)", display: "inline-block", boxShadow: "0 0 10px var(--accent-blue)"}}></span>
          TEAM PRODUCTIVITY COMPARISON
        </h3>
        <img className="chart-image" src={`/visualize-team/${month}`} alt="Team Comparison Chart" />
      </div>

      {teams.map(team => {
        const devs = data.filter(d => d.team === team);
        return (
          <div key={team} style={{marginBottom: "30px", background: "var(--bg-panel)", padding: "20px", borderRadius: "16px", border: "1px solid var(--border)", backdropFilter: "blur(20px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"}}>
            <h3 style={{marginBottom: "15px", color: "var(--accent-purple)", display: "flex", alignItems: "center", gap: "8px"}}>
              <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-purple)", display: "inline-block", boxShadow: "0 0 10px var(--accent-purple)"}}></span>
              {team}
            </h3>
            <table className="data-table" style={{width: "100%"}}>
              <thead>
                <tr>
                  {COLS.map(c => <th key={c.key} className="header-cell" style={{textAlign: "left"}}>{c.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {devs.map(dev => (
                  <tr key={dev.developer_id}>
                    {COLS.map(c => (
                      <td key={c.key} className="value-cell" style={{width: "auto"}}>
                        {c.fmt ? c.fmt(dev[c.key]) : dev[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
