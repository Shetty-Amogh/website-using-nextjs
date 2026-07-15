"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const sendSearch = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/new_chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: search }),
      },
    );

    const chatId = await response.json();
    console.log("chat id is : " + chatId.chatId + " ");
    if (chatId.chatId == undefined) {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/error`);
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/${chatId.chatId}`);
    }

    setSearch("");
  };

  return (
    <div>
      <div className="Query">
        <label>This is the new chat page</label>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button" onClick={sendSearch}>
          {" "}
          send{" "}
        </button>
      </div>

      <div></div>
    </div>
  );
}
