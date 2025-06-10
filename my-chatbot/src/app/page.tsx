"use client";

import { useChat } from "@ai-sdk/react";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    reload,
  } = useChat({});

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            {" "}
            Retry{" "}
          </button>
        </>
      )}
      {(status == "submitted" || status === "streaming") && (
        <div>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={status !== "ready"}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
