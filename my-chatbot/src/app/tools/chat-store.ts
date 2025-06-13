import { generateId, type Message } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { userSession, messagesTable } from "~/server/db/schema";
import path from "path";
import { db } from "~/db";
import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

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
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session?.user) {
    throw new Error("you are not authenticated!");
  }
  const chatId = generateId();
  const userId = session.user.id;
  const chat: typeof userSession.$inferSelect = {
    ///rename userSession
    chatId: chatId,
    createdAt: new Date(),
    userId: userId,
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

export function convertMessage(
  input: (typeof messagesTable.$inferSelect)[],
): Message[] {
  return input.map((message) => {
    return {
      ...message,
      role: message.role as any,
      id: message.messageId,
      createdAt: message.createdAt || undefined,
      parts: message.parts as any,
    };
  });
}

export async function saveChat(chatId: string, messages: Message[]) {
  const mappedMessages = messages.map((m) => ({
    messageId: m.id,
    chatId: chatId,
    role: m.role,
    parts: m.parts,
    content: m.content,
    createdAt: new Date(),
  }));
  await db.insert(messagesTable).values(mappedMessages).onConflictDoNothing();
  return mappedMessages;
}
