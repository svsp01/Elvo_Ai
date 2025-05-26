/*
  Warnings:

  - The `type` column on the `Agent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('INITIATED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'NO_ANSWER', 'BUSY');

-- CreateEnum
CREATE TYPE "AgentType" AS ENUM ('SALES', 'SUPPORT', 'SURVEY', 'CUSTOM');

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "AgentType" NOT NULL DEFAULT 'SALES',
ALTER COLUMN "voice" SET DEFAULT 'en-IN';

-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "status" "CallStatus" NOT NULL DEFAULT 'INITIATED',
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "twilioSid" TEXT,
ALTER COLUMN "result" SET DEFAULT '{}';
