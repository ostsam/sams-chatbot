ALTER TABLE "my-chatbot_messagesTable" RENAME COLUMN "id" TO "messageId";--> statement-breakpoint
ALTER TABLE "my-chatbot_user-sessions-table" RENAME COLUMN "id" TO "chatId";--> statement-breakpoint
ALTER TABLE "my-chatbot_messagesTable" DROP CONSTRAINT "my-chatbot_messagesTable_chatId_my-chatbot_user-sessions-table_id_fk";
--> statement-breakpoint
ALTER TABLE "my-chatbot_user-sessions-table" ADD COLUMN "userId" varchar(256);--> statement-breakpoint
ALTER TABLE "my-chatbot_messagesTable" ADD CONSTRAINT "my-chatbot_messagesTable_chatId_my-chatbot_user-sessions-table_chatId_fk" FOREIGN KEY ("chatId") REFERENCES "public"."my-chatbot_user-sessions-table"("chatId") ON DELETE no action ON UPDATE no action;