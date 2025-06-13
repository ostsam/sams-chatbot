import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";
import { auth } from "~/lib/auth"; // path to your Better Auth server instance
import { useState } from "react";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const response = await auth.api.signInEmail({
  body: {
    email,
    password,
  },
  asResponse: true, // returns a response object instead of data
});

const session = await auth.api.getSession({
  headers: await headers(), // you need to pass the headers object.
});

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
