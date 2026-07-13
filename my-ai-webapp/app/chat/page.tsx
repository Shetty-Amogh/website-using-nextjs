"use client";
import { useState } from "react";

export default function Chat() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [response, setReposne] = useState("");

  const sendSearch = async () => {
    setQuery(search);
    setSearch("");

    var resJson = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });
    console.log(resJson);
    var res = await resJson.json();
    console.log(JSON.stringify(res));

    setReposne(res);
  };

  return (
    <div>
      <div className="Query">
        <label>{query}</label>
      </div>

      <div className="Response">
        <label>{response}</label>
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

      <div>
        
      </div>
    </div>
  );
}
