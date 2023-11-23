/*
  Warnings:

  - You are about to drop the column `key` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `uploadStatus` on the `File` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `awsKey` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "key",
DROP COLUMN "uploadStatus",
ADD COLUMN     "awsKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false;

-- DropEnum
DROP TYPE "UploadStatus";
