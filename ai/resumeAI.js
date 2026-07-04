export async function generateResume(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTERAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an expert resume writer. Return structured JSON with: summary, skills, experience improvements.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content || "";

    return {
      success: true,
      result: text,
    };
  } catch (err) {
    console.error("AI ERROR:", err);

    return {
      success: false,
      error: "AI service failed",
    };
  }
}
