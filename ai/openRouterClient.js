export async function callOpenRouter(messages, model = "openai/gpt-4o-mini") {
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
          model,
          messages,
        }),
      }
    );

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid AI response");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter Error:", err);
    throw new Error("AI service unavailable");
  }
}
