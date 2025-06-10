ALTER TABLE "my-chatbot_messagesTable" ALTER COLUMN "id" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "my-chatbot_messagesTable" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "my-chatbot_user-sessions-table" ALTER COLUMN "id" SET DATA TYPE varchar(256);