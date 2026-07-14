import {
  add_message,
  chat_history,
  chat_list,
  create_chat,
  get_chat_by_id,
  chatId,
  chat_title,
} from "./functions";
import { sendResponse, generateResponse } from "../AI/actions";

export async function creation_of_new_chat(title: string) {
  await create_chat(title);
  console.log("chat opened sucessfully");
  if (chatId) {
    return chatId;
  }
}

export async function user_message_append(chatId: string, userInput: string) {
  add_message("user", chatId, userInput);
}

export async function ai_message_append(chatId: string, aiResponse: string) {
  add_message("assistant", chatId, aiResponse);
}

export async function get_chats() {
  const list = await chat_list();
  return list;
}

export async function get_chat_history(chatId: string) {
  const msg = await chat_history(chatId);
  return msg;
}

export async function get_chat_title(chatId: string) {
  const title = await chat_title(chatId);
  return title;
}
