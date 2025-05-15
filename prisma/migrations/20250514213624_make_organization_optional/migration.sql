-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_organizationId_fkey";

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "public" DROP NOT NULL,
ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
