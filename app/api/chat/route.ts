import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/chat_ai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const question = body.question;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL as string,
      web_search_options: {
        search_context_size: "medium",
      },
      messages: [
        {
          role: "system",
          content:
            "You are a highly knowledgeable assistant capable of answering any question.",
        },
        {
          role: "assistant",
          content:
            "You are a highly knowledgeable assistant capable of answering any question.",
        },
        { role: "user", content: question },
      ],
    });

    const answer = completion?.choices[0]?.message?.content;
    if (!answer) {
      throw new Error("Out of token.!");
    }

    return NextResponse.json({ content: answer }, { status: 200 });
  } catch (error) {
    console.log("Error /api/chat POST with error : ", error);

    return NextResponse.json(
      { error: "/api/chat POST" + error },
      { status: 401 }
    );
  }
}
