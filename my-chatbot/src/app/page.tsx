import Link from "next/link";

function Page() {
  return (
    <Link
      href="/chat"
      className="flex h-dvh flex-col items-center justify-start bg-gradient-to-b from-[#064a44] to-[#1c0f0f] text-red-500"
    >
      Create a New Chat
    </Link>
  );
}

export default Page;
