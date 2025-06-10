import { generateId, type Message } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { userSession } from "~/server/db/schema";
import path from "path";
import { db } from "~/db";


export async function createChat(): Promise<string> {
  const chatId = generateId(); // generate a unique chat ID
  const chat: typeof userSession.$inferSelect = {
    id: chatId,
    createdAt: new Date(Date.now()),
  };
  console.log(chat);
  await db.insert(userSession).values(chat);
  return chatId;
}

function getChatFile(id: string): string {
  const chatDir = path.join(process.cwd(), ".chats");
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${id}.json`);
}

export async function loadChat(id: string): Promise<Message[]> {
  return JSON.parse(await readFile(getChatFile(id), "utf8"));
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(id), content);
}
