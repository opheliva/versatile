import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Kiểm tra API Key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { role: "assistant", content: "⚠️ API Key is missing. Please check your .env.local file." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are Versatile AI Tutor. Use English only. Focus on helping users with vocabulary, context, and clear examples." 
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    // Kiểm tra nếu OpenAI trả về lỗi (401, 429, 500...)
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { role: "assistant", content: `AI Error: ${errorData.error?.message || "Something went wrong"}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);

  } catch (error) {
    console.error("Fatal API Error:", error);
    return NextResponse.json(
      { role: "assistant", content: "I encountered a technical issue. Please try again." },
      { status: 500 }
    );
  }
}