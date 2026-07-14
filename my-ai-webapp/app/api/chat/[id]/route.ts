// This is for chat history and title and everything of a specific chat, gotten by ID
import { get_chat_history, get_chat_title } from "@/lib/supabase/actions";
import { NextResponse, NextRequest } from "next/server";
import { generateResponse } from "@/lib/AI/actions";

//POST is for returning and generating ai response

//GET is for getting chat and messages

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const title = await get_chat_title(id);

  return NextResponse.json({ title: title });
}

export async function POST(req: Request) {
  const { id, userInput } = await req.json();

  const aiReply = generateResponse(userInput);

  return NextResponse.json({
    aiMessage: {
      chatId: id,
      role: "assistant",
      content: aiReply,
    },
  });
}
