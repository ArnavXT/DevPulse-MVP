import React, { useState } from "react";

export default function InterpretationPanel({ interpretation, nextSteps }) {
  const [revealed, setRevealed] = useState(false);

  if (!interpretation) return null;

  return (
    <>
      <button className="interp-btn" onClick={() => setRevealed(!revealed)}>
        {revealed ? "Hide Interpretation" : "View Interpretation"}
      </button>

      {revealed && (
        <div className="interp-panel">
          <h3>Interpretation</h3>
          <p>{interpretation}</p>
          
          <h3>Suggested next steps</h3>
          <ol>
            {nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
