import { supabase } from "./client";

export let chatId: string | null = null;

export async function create_chat(title: string) {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      title: title,
    })
    .select("id")
    .single();
  if (data) {
    chatId = data.id;
  } else {
    console.log(error);
  }
}

export async function add_message(
  role: "user" | "assistant" | "coder" | "researcher",
  chatId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      chat_id: chatId,
      role: role,
      content: content,
    })
    .select()
    .single();
}

export async function chat_list() {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("updated_at", { ascending: false });

  if (data) {
    return data;
  }
}

export async function chat_history(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("role, content")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (data) {
    return data;
  }
}

export async function get_chat_by_id(chatId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (data) {
    return data;
  }
}

export async function chat_title(chatId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("title")
    .eq("id", chatId)
    .single();

  if (data) {
    return data.title;
  }
}
