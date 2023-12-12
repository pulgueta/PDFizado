/*
  Warnings:

  - You are about to drop the column `mercadopagoCurrentPeriodEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mercadopagoCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mercadopagoPriceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paypalCurrentPeriodEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paypalCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paypalPriceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paypalSubscriptionId` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailVerified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "User_mercadopagoCurrentPeriodEnd_key";

-- DropIndex
DROP INDEX "User_mercadopagoCustomerId_key";

-- DropIndex
DROP INDEX "User_mercadopagoPriceId_key";

-- DropIndex
DROP INDEX "User_paypalCurrentPeriodEnd_key";

-- DropIndex
DROP INDEX "User_paypalCustomerId_key";

-- DropIndex
DROP INDEX "User_paypalPriceId_key";

-- DropIndex
DROP INDEX "User_paypalSubscriptionId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mercadopagoCurrentPeriodEnd",
DROP COLUMN "mercadopagoCustomerId",
DROP COLUMN "mercadopagoPriceId",
DROP COLUMN "paypalCurrentPeriodEnd",
DROP COLUMN "paypalCustomerId",
DROP COLUMN "paypalPriceId",
DROP COLUMN "paypalSubscriptionId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "emailVerified" SET NOT NULL;
