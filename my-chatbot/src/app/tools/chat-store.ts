import { generateId, type Message } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { userSession, messagesTable } from "~/server/db/schema";
import path from "path";
import { db } from "~/db";
import { eq } from "drizzle-orm";

// TOOD
// export function dbMessageToAppMessage(
//   message: typeof messagesTable.$inferSelect,
// ): Message {
//   return {
//     ...message,
//     createdAt: message.createdAt || undefined,
//   };
// }

export async function createChat(): Promise<string> {
  const chatId = generateId(); // generate a unique chat ID
  const chat: typeof userSession.$inferSelect = {
    id: chatId,
    createdAt: new Date(),
  };
  await db.insert(userSession).values(chat);
  return chatId;
}

export async function loadChat(
  id: string,
): Promise<(typeof messagesTable.$inferSelect)[]> {
  const selectSession = db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.chatId, id));

  if (selectSession == null || undefined) {
    throw new Error("Session not found.");
  }
  return selectSession;
}

export async function saveChat(messages: Message[]) {
  const userId = generateId();
  const mappedMessages = messages.map((m) => ({
    id: userId,
    chatId: m.id,
    role: m.role,
    parts: m.parts,
    content: m.content,
    createdAt: new Date(),
  }));
  await db.insert(messagesTable).values(mappedMessages);
  return mappedMessages;
}
