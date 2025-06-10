import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("o3-mini-2025-01-31"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
