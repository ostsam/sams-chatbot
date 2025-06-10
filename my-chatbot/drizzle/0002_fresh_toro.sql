CREATE TABLE "my-chatbot_messagesTable" (
	"id" integer PRIMARY KEY NOT NULL,
	"chatId" varchar(256) NOT NULL,
	"role" varchar(256),
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"parts" jsonb NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "my-chatbot_post" CASCADE;--> statement-breakpoint
ALTER TABLE "my-chatbot_messagesTable" ADD CONSTRAINT "my-chatbot_messagesTable_chatId_my-chatbot_user-sessions-table_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."my-chatbot_user-sessions-table"("id") ON DELETE no action ON UPDATE no action;