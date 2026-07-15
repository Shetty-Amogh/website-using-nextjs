import { creation_of_new_chat } from "@/lib/supabase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();

  const chatId = await creation_of_new_chat(title);
  return NextResponse.json({ chatId });
}
