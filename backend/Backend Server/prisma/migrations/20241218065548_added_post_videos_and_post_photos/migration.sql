/*
  Warnings:

  - You are about to drop the column `multimedia` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoQuality" AS ENUM ('HD', 'SD', 'FHD');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "multimedia";

-- CreateTable
CREATE TABLE "PostPhotos" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "PostPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostVideos" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "quality" "VideoQuality" NOT NULL,

    CONSTRAINT "PostVideos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostPhotos" ADD CONSTRAINT "PostPhotos_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVideos" ADD CONSTRAINT "PostVideos_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
