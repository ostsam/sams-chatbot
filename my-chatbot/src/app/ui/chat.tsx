"use client";
import { type Message, useChat } from "@ai-sdk/react";
import { createIdGenerator } from "ai";
import Image from "next/image";

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    setMessages,
    status,
    stop,
    error,
    reload,
  } = useChat({
    id, // use the provided chat ID
    initialMessages, // initial messages if provided
    sendExtraMessageFields: true, // send id and createdAt for each message
    generateId: createIdGenerator({
      prefix: "msgc",
      size: 16,
    }),
    experimental_prepareRequestBody({ messages, id }) {
      return { message: messages[messages.length - 1], id };
    },
  });

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="max-h relative h-full flex-1 space-y-5 overflow-y-auto scroll-auto p-6">
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <div
            key={message.id}
            className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
          >
            <div
              className={`relative max-w-[80%] rounded-3xl p-4 text-sm leading-relaxed break-words whitespace-pre-wrap shadow-lg ring-1 ring-white/10 ${
                isUser
                  ? "bg-gradient-to-br from-lime-400 to-lime-500 text-black"
                  : "bg-gradient-to-br from-amber-400 to-amber-500 text-black"
              }`}
            >
              {message.content}
            </div>
            <button
              className="inline-flex rounded-md p-1 hover:bg-blue-900 focus:ring-2 focus:outline-none"
              onClick={() => handleDelete(message.id)}
            >
              <Image
                src={"/bin.png"}
                width={10}
                height={10}
                alt="delete"
                className="m-1"
              />
            </button>
          </div>
        );
      })}
      {error && (
        <div className="bg-rose-800/75 px-4 py-2 text-center text-sm text-rose-100">
          Something went wrong.
          <button
            type="button"
            onClick={() => reload()}
            className="ml-3 inline-flex items-center rounded-full bg-rose-600 px-3 py-1 text-white hover:bg-rose-500"
          >
            Retry
          </button>
        </div>
      )}
      {(status === "submitted" || status === "streaming") && (
        <div className="bg-zinc-700/75 px-4 py-2 text-center text-sm text-zinc-100">
          Generating...
          <button
            type="button"
            onClick={stop}
            className="ml-3 inline-flex items-center rounded-full bg-zinc-600 px-3 py-1 text-white hover:bg-zinc-500"
          >
            Stop
          </button>
        </div>
      )}
      <div className="absolute inset-x-0 self-end">
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 left-0 flex w-full gap-3 border-t border-neutral-800 bg-black/80 px-4 py-3 backdrop-blur-md"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="The bot won't bite!"
            className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-white placeholder-neutral-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-400/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "streaming" || !input.trim()}
            className="rounded-xl bg-gradient-to-br from-lime-500 to-lime-400 px-5 py-2 font-medium text-black shadow-md transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
