//This will be the page containing a singular conversation, under a specific id.

import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params;

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${id}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   },
  // );

  //const data = await response.json();

  const getResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${id}`,
  );

  const getData = await getResponse.json();

  const { title } = getData;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6">
        <header className="mb-6 border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-zinc-400">Chat ID: {id} </p>
          <div className="mt-2 space-y-2"></div>
        </header>
      </div>

      <div>
        <div className="Query">
          <label>This is the new chat page</label>
        </div>
      </div>
    </main>
  );
}
