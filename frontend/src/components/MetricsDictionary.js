import React from "react";

const metricsData = [
  {
    id: "lead_time",
    name: "Lead Time (Days)",
    meaning: "The total time it takes for code to go from the first commit to running in production.",
    calculation: "Time of Deployment - Time of First Commit.",
    importance: "A low lead time indicates a streamlined, highly automated pipeline where code flows quickly from development to the customer. High lead times suggest bottlenecks in code review, QA, or deployment queues."
  },
  {
    id: "cycle_time",
    name: "Cycle Time (Days)",
    meaning: "The total duration taken to complete a specific task or ticket from start to finish.",
    calculation: "Time Ticket Marked 'Done' - Time Ticket Marked 'In Progress'.",
    importance: "It helps measure how well work is broken down. Lower cycle times mean developers are working on small, manageable chunks of work rather than large, complex features that sit in progress for weeks."
  },
  {
    id: "pr_throughput",
    name: "PR Throughput",
    meaning: "The number of Pull Requests successfully merged over a given period (e.g., weekly or monthly).",
    calculation: "Count of Pull Requests with status 'Merged'.",
    importance: "Consistent PR throughput indicates a healthy, active development cadence. It encourages smaller, more frequent commits which are easier to review and less likely to introduce massive bugs."
  },
  {
    id: "deploy_freq",
    name: "Deployment Frequency",
    meaning: "How often the team or developer successfully pushes code into the production environment.",
    calculation: "Total number of successful production deployments in the given timeframe.",
    importance: "High deployment frequency is a hallmark of elite engineering teams. It allows for rapid iteration, faster feedback loops, and reduces the risk associated with massive 'big bang' releases."
  },
  {
    id: "bug_rate",
    name: "Bug Rate (%)",
    meaning: "The percentage of deployments or completed tickets that result in a reported bug, defect, or production failure.",
    calculation: "(Number of Bug Tickets / Total Number of Tickets Completed) × 100.",
    importance: "While moving fast is good, it shouldn't come at the cost of stability. A high bug rate indicates that testing procedures, QA, or code reviews need strengthening."
  }
];

export default function MetricsDictionary() {
  return (
    <div style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <div style={{ marginBottom: "30px", padding: "30px", background: "var(--bg-panel)", borderRadius: "16px", border: "1px solid var(--border)", backdropFilter: "blur(20px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-purple)", boxShadow: "0 0 15px var(--accent-purple)" }}></span>
          Metrics Dictionary
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6" }}>
          This guide provides a detailed breakdown of the core productivity metrics tracked by the platform. 
          Understanding these metrics is crucial for identifying bottlenecks and improving team health.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {metricsData.map((metric) => (
          <div key={metric.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", transition: "all 0.3s ease" }}>
            <h3 style={{ color: "var(--accent-blue)", fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
              {metric.name}
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
              <div>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "4px" }}>What it means</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>{metric.meaning}</span>
              </div>
              
              <div>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "4px" }}>How it is calculated</strong>
                <span style={{ color: "var(--accent-green)", fontSize: "14px", fontFamily: "monospace", background: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "4px" }}>
                  {metric.calculation}
                </span>
              </div>
              
              <div>
                <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "4px" }}>Why it matters</strong>
                <span style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.5" }}>{metric.importance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
