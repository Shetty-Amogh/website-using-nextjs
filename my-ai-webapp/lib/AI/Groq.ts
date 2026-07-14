import "server-only";

import Groq from "groq-sdk";
import { directBehaviour } from "./behaviour";

let api_key = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: api_key });

export const generateReply = async (query: string) => {
  console.log("Response started generating");
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: directBehaviour,
      },
      {
        role: "user",
        content: query,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
};
