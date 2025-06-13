import Link from "next/link";

function Page() {
  return (
    <main className="flex h-dvh flex-col items-center justify-start bg-gradient-to-b from-[#064a44] to-[#1c0f0f]">
      <div className="flex flex-col">
        <Link
          href="/login"
          className="mt-80 inline-block rounded-lg bg-teal-300 px-6 py-3 text-center font-semibold text-[#064a44] shadow transition-colors hover:bg-teal-400"
        >
          Login
        </Link>
        <Link
          href="/chat"
          className="mt-3 inline-block rounded-lg bg-teal-300 px-6 py-3 text-center font-semibold text-[#064a44] shadow transition-colors hover:bg-teal-400"
        >
          Create a New Chat
        </Link>
      </div>
    </main>
  );
}

export default Page;
