export async function generateJobMatch(resume, jobDescription) {
  try {
    const clean = (t) =>
      t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/);

    const resumeWords = clean(resume);
    const jobWords = clean(jobDescription);

    const resumeSet = new Set(resumeWords);

    let matched = [];
    let missing = [];

    for (const w of jobWords) {
      if (resumeSet.has(w)) matched.push(w);
      else missing.push(w);
    }

    matched = [...new Set(matched)].filter((w) => w.length > 2);
    missing = [...new Set(missing)].filter((w) => w.length > 2);

    const score = Math.min(
      100,
      Math.round((matched.length / jobWords.length) * 100)
    );

    return {
      score,
      matchingSkills: matched.slice(0, 15),
      missingSkills: missing.slice(0, 15),
      suggestions: [
        "Add missing job keywords",
        "Improve project descriptions",
        "Use measurable achievements (%, numbers)",
      ],
    };
  } catch (err) {
    console.error(err);

    return {
      score: 0,
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["ATS engine error"],
    };
  }
}
