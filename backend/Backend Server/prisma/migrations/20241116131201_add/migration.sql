-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'ECE', 'MEA', 'MNC');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "batch" INTEGER,
ADD COLUMN     "branch" "Branch";
