import type { Message } from "ai";
import { loadChat } from "~/app/tools/chat-store";
import Chat from "~/app/ui/chat";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // get the chat ID from the URL
  const messages = await loadChat(id); // load the chat messages

  const messagesForApp: Message[] = messages.map((msg) => {
    // TODO: make this an actual zod schema parse so I know for sure, instead of typecasting.
    return { ...msg, createdAt: msg.createdAt || undefined } as Message;
  });

  return <Chat id={id} initialMessages={messagesForApp} />; // display the chat
}
