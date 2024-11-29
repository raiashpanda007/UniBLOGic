/*
  Warnings:

  - Added the required column `description` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Branch" ADD VALUE 'None';

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "description" TEXT NOT NULL;
