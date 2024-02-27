/*
  Warnings:

  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConversationToMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConversationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ConversationToMessage" DROP CONSTRAINT "_ConversationToMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToMessage" DROP CONSTRAINT "_ConversationToMessage_B_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_B_fkey";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "_ConversationToMessage";

-- DropTable
DROP TABLE "_ConversationToUser";

-- CreateTable
CREATE TABLE "Conversations" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConversationsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ConversationsToMessage" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationsToUser_AB_unique" ON "_ConversationsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationsToUser_B_index" ON "_ConversationsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationsToMessage_AB_unique" ON "_ConversationsToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationsToMessage_B_index" ON "_ConversationsToMessage"("B");

-- AddForeignKey
ALTER TABLE "_ConversationsToUser" ADD CONSTRAINT "_ConversationsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationsToUser" ADD CONSTRAINT "_ConversationsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationsToMessage" ADD CONSTRAINT "_ConversationsToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationsToMessage" ADD CONSTRAINT "_ConversationsToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
