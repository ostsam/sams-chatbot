CREATE TABLE "my-chatbot_messagesTable" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"chatId" varchar(256) NOT NULL,
	"role" varchar(256),
	"createdAt" timestamp with time zone,
	"parts" jsonb NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "my-chatbot_user-sessions-table" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "my-chatbot_messagesTable" ADD CONSTRAINT "my-chatbot_messagesTable_chatId_my-chatbot_user-sessions-table_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."my-chatbot_user-sessions-table"("id") ON DELETE no action ON UPDATE no action;