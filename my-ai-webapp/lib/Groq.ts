import Groq from "groq-sdk";
import { directBehaviour } from "./behaviour";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

export const sendResponse = async (query:string) => {
  const completion = await generateReply(query);
  return completion.choices[0]?.message?.content;
};
