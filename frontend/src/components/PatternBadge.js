import React from "react";
import "./PatternBadge.css";

const PATTERN_CONFIG = {
  "Healthy flow":   { color: "good",    dot: "#4fffb0", label: "Healthy Flow" },
  "Quality watch":  { color: "warn",    dot: "#ffb340", label: "Quality Watch" },
  "Needs review":   { color: "bad",     dot: "#ff5a5a", label: "Needs Review" },
};

export default function PatternBadge({ pattern }) {
  const cfg = PATTERN_CONFIG[pattern] || { color: "neutral", dot: "#5ab4ff", label: pattern };
  return (
    <span className={`pattern-badge pattern-${cfg.color}`}>
      <span className="pattern-dot" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}
