import { useState } from "react";

export default function ATSAnalyzer() {
  const [resume, setResume] = useState("");
  const [score, setScore] = useState(null);

  function analyze() {
    if (!resume) return;

    const keywords = [
      "react",
      "node",
      "javascript",
      "api",
      "database",
      "frontend",
    ];

    let match = 0;

    keywords.forEach((k) => {
      if (resume.toLowerCase().includes(k)) match += 15;
    });

    setScore(Math.min(100, match));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>📊 ATS Analyzer</h1>

      <textarea
        style={{ width: "100%", height: 150 }}
        onChange={(e) => setResume(e.target.value)}
      />

      <button onClick={analyze}>Analyze</button>

      {score !== null && <h2>ATS Score: {score}/100</h2>}
    </div>
  );
}
