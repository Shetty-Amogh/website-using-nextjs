import { generateReply } from "./Groq";

let reply: string | null = null

export async function generateResponse(query: string) {
  const completion = await generateReply(query);
  reply = completion.choices[0]?.message?.content;
}

export async function sendResponse(){
    if (reply){
        return reply 
    }
    else 
    {
        return ("No Reply")
    }
      
}
