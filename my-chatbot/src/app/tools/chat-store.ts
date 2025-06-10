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
    createdAt: new Date(Date.now()),
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

  return selectSession;

  if (selectSession == null || undefined) {
    throw new Error("Session not found.");
  }
}

export async function saveChat(id: string, messages: Message[]) {
  for (const m of messages) {
    const message: typeof messagesTable.$inferSelect = {
      id: m.id,
      chatId: id,
      role: m.role,
      parts: m.parts,
      content: m.content,
      createdAt: m.createdAt || null,
    };
    await db.insert(messagesTable).values(message);
    return message;
  }
}
