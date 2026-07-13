import { NextResponse } from "next/server";
import { sendResponse } from "@/lib/Groq";

var response = "";
export async function POST(req: Request) {
  const body = await req.json();
  const query = JSON.stringify(body);

  while (true) {
    const resp = await sendResponse(query);

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
