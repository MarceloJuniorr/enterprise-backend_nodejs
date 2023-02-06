/*
  Warnings:

  - You are about to alter the column `birthday` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `birthday` DATE NOT NULL;
