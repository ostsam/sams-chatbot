import Link from "next/link";

function Page() {
  return (
    <main className="flex h-dvh flex-col items-center justify-start bg-gradient-to-b from-[#064a44] to-[#1c0f0f]">
      <Link
        href="/chat"
        className="mt-80 inline-block rounded-lg bg-teal-300 px-6 py-3 font-semibold text-[#064a44] shadow transition-colors hover:bg-teal-400"
      >
        Create a New Chat
      </Link>
    </main>
  );
}

export default Page;
