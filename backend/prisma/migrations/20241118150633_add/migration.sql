/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_postId_userId_key" ON "Upvotes"("postId", "userId");
