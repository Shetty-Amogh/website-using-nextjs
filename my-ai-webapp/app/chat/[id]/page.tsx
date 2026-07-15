//This will be the page containing a singular conversation, under a specific id.
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  //------------- first load whatever is in history ------------------

  useEffect(() => {
    if (!id) return;

    async function loadChat() {
      const getResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${id}`,
      );

      let dbMessages: Message[] = [];
      let title: any;

      ({ title, message: dbMessages } = await getResponse.json());

      console.log(title, " This is the recieved data from api");

      setTitle(title);
      setMessages(dbMessages);
      console.table(dbMessages);
    }

    loadChat();
  }, [id]);

  async function sendButton() {
    //--------------- store the user message ------------------
    const userMessage: Message = {
      role: "user",
      content: search,
    };
    setMessages((prev) => [...prev, userMessage]);

    //-------------- store the ai message ----------------------
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, userMsg: userMessage.content }),
      },
    );

    const data = await response.json();
    const aiResponse: Message = data.aiMessage;
    setMessages((prev) => [...prev, aiResponse]);
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6">
        <header className="mb-6 border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-zinc-400">Chat ID: {id} </p>
          <div className="mt-2 space-y-2">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.role}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button" onClick={sendButton}>
              {" "}
              send{" "}
            </button>
          </div>
        </header>
      </div>
    </main>
  );
}
