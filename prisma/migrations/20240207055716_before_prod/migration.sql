/*
  Warnings:

  - You are about to drop the column `mercadopagoSubscriptionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,lemonSqueezySubscriptionId,paddleSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_id_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_mercadopagoSubscriptionId_key";

-- AlterTable
ALTER TABLE "File" ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mercadopagoSubscriptionId",
ADD COLUMN     "lemonSqueezySubscriptionId" TEXT,
ADD COLUMN     "paddleSubscriptionId" TEXT;

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "benefits" TEXT[],
    "monthlyPrice" INTEGER NOT NULL,
    "yearlyPrice" INTEGER NOT NULL,
    "lemonSqueezyHref" TEXT,
    "paddleHref" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_lemonSqueezySubscriptionId_paddleSubscriptionId_key" ON "User"("email", "lemonSqueezySubscriptionId", "paddleSubscriptionId");
