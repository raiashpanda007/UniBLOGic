/*
  Warnings:

  - You are about to drop the column `title` on the `Community` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Community_title_key";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "title";

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");
