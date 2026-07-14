//This is used to generate reply from the ai

import { NextResponse } from "next/server";
import { generateReply } from "@/lib/AI/Groq";

var response = "";
export async function POST(req: Request) {
  const body = await req.json();
  const query = JSON.stringify(body);

  while (true) {
    const resp = await generateReply(query);
    response = JSON.stringify(resp);

    if (response) {
      console.log(query);
      console.log(response);
      return NextResponse.json(response);
    } else {
      continue;
    }
  }
}
