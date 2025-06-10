import Link from "next/link";

function Page() {
  return (
      <Link href="/chat" className="text-red-500">
        Create a New Chat
      </Link>
  );
}

export default Page;
