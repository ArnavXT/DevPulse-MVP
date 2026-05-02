import React from "react";
import "./MetricCard.css";

const METRIC_META = {
  lead_time_days:       { label: "Lead Time",            unit: "days", icon: "⚡" },
  cycle_time_days:      { label: "Cycle Time",           unit: "days", icon: "🔄" },
  pr_throughput:        { label: "PR Throughput",        unit: "PRs",  icon: "📬" },
  deployment_frequency: { label: "Deploy Frequency",     unit: "deps", icon: "🚀" },
  bug_rate:             { label: "Bug Rate",             unit: "ratio",icon: "🐞" },
};

function getColor(key, value) {
  if (key === "lead_time_days") {
    if (value <= 2.5) return "good";
    if (value <= 4.0) return "warn";
    return "bad";
  }
  if (key === "cycle_time_days") {
    if (value <= 4.0) return "good";
    if (value <= 5.5) return "warn";
    return "bad";
  }
  if (key === "pr_throughput") {
    if (value >= 4) return "good";
    if (value >= 2) return "neutral";
    return "warn";
  }
  if (key === "deployment_frequency") {
    if (value >= 3) return "good";
    if (value >= 2) return "neutral";
    return "warn";
  }
  if (key === "bug_rate") {
    if (value === 0) return "good";
    if (value <= 0.3) return "warn";
    return "bad";
  }
  return "neutral";
}

export default function MetricCard({ metricKey, value, tooltip }) {
  const meta = METRIC_META[metricKey] || { label: metricKey, unit: "", icon: "📊" };
  const color = getColor(metricKey, value);

  const displayValue = metricKey === "bug_rate"
    ? `${(value * 100).toFixed(0)}%`
    : value;

  return (
    <div className={`metric-card tooltip-wrap color-${color}`}>
      <div className="mc-icon">{meta.icon}</div>
      <div className="mc-label">{meta.label}</div>
      <div className="mc-value">{displayValue}</div>
      <div className="mc-unit">{metricKey === "bug_rate" ? "escaped" : meta.unit}</div>

      {tooltip && (
        <div className="tooltip-box">
          <div className="tt-label">{meta.label}</div>
          <div className="tt-def">{tooltip.definition}</div>
          <div className="tt-status">{tooltip.status}</div>
        </div>
      )}
    </div>
  );
}
