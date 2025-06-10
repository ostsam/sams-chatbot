import { openai } from "@ai-sdk/openai";
import {
  streamText,
  appendResponseMessages,
  createIdGenerator,
  appendClientMessage,
} from "ai";
import { saveChat } from "~/app/tools/chat-store";
import { loadChat } from "~/app/tools/chat-store";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { message, id } = await req.json();
  const previousMessages = await loadChat(id);
  const messages = appendClientMessage({
    messages: previousMessages,
    message,
  });

  const result = streamText({
    model: openai("o3-mini-2025-01-31"),
    system: "You are a helpful assistant.",
    messages,
    async onFinish({ response }) {
      await saveChat({
        id,
        messages: appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),
      });
      experimental_generateMessageId: createIdGenerator({
        prefix: "msgs",
        size: 16,
      });
    },
  });
  result.consumeStream();

  return result.toDataStreamResponse();
}
