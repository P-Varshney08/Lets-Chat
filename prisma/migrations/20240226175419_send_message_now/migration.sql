/*
  Warnings:

  - You are about to drop the `Conversations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConversationsToMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConversationsToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ConversationsToMessage" DROP CONSTRAINT "_ConversationsToMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationsToMessage" DROP CONSTRAINT "_ConversationsToMessage_B_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationsToUser" DROP CONSTRAINT "_ConversationsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationsToUser" DROP CONSTRAINT "_ConversationsToUser_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Conversations";

-- DropTable
DROP TABLE "_ConversationsToMessage";

-- DropTable
DROP TABLE "_ConversationsToUser";

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
