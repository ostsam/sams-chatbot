import { openai } from "@ai-sdk/openai";
import {
  streamText,
  appendResponseMessages,
  createIdGenerator,
  appendClientMessage,
} from "ai";
import { saveChat, loadChat, convertMessage } from "~/app/tools/chat-store";
import type { Message } from "ai";
import { NextResponse } from "next/server";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function GET(req: Request) {
  return new NextResponse("hello");
}
// what is the point of this function:
// "there is a new message incoming... load up (??); save it to the database???"
// wait for a request from the json?
//
export async function POST(req: Request) {
  // get the message and id from the request
  // the request was sent by the client
  // the client is the chatbot app
  // the chatbot app is sending a message and an id to the server.
  // what ID?
  // the id corresponds to a chat id
  const reqBody = await req.json();
  const message: Message = reqBody.message;
  const id: string = reqBody.id;
  // get the previous messages for this particular chat, by id
  const previousMessages = await loadChat(id);
  const convertedMessages = convertMessage(previousMessages);
  // append the previous messages with the current message that we just got from the chat bot app.
  const messages = appendClientMessage({
    messages: convertedMessages as Message[],
    message,
  });
  // ask openai o3-mini to respond to these messages
  const result = streamText({
    model: openai("o3-mini-2025-01-31"),
    system: "You are a helpful assistant.",
    messages,
    // when openai is done responding, do X
    async onFinish({ response }) {
      // save the entire chat to the database.
      const allMessages = appendResponseMessages({
        messages: messages,
        responseMessages: response.messages,
      });

      await saveChat(reqBody.id, allMessages);
    },
  });

  //result.consumeStream();

  return result.toDataStreamResponse();
}
