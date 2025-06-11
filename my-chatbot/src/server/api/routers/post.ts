/*
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { messagesTable } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messagesTable).values({
        id: input.id,
        chatId: input.chatId,
        role: input.role,
        createdAt: input.createdAt,
        parts: input.parts,
        content: input.content,

      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.messagesTable.findFirst({
      orderBy: (messagesTable, { desc }) => [desc(messagesTable.createdAt)],
    });

    return post ?? null;
  }),
});



    id: d.varchar({ length: 256 }).primaryKey(),
    chatId: d.varchar({ length: 256 }).notNull(),
    role: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true }),
    parts: jsonb("parts").notNull(),
    content: d.text().notNull(),
    */