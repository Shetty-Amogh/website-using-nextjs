// This is for chat history and title and everything of a specific chat, gotten by ID
import {
  get_chat_history,
  get_chat_title,
  user_message_append,
  ai_message_append,
} from "@/lib/supabase/actions";
import { NextResponse, NextRequest } from "next/server";
import { generateResponse, sendResponse } from "@/lib/AI/actions";

//POST is for returning and generating ai response

//GET is for getting chat and messages

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const title = await get_chat_title(id);
  const dbMessages: Message[] | undefined = await get_chat_history(id);

  return NextResponse.json({ title: title, message: dbMessages });
}

export async function POST(req: Request) {
  const { id, userMsg } = await req.json();

  await user_message_append(id, userMsg);
  await generateResponse(userMsg);
  const aiReply = await sendResponse();
  await ai_message_append(id, aiReply);

  return NextResponse.json({
    aiMessage: {
      role: "assistant",
      content: aiReply,
    },
  });
}
