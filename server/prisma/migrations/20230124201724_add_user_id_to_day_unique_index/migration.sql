/*
  Warnings:

  - A unique constraint covering the columns `[date,user_id]` on the table `days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "days_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "days_date_user_id_key" ON "days"("date", "user_id");
