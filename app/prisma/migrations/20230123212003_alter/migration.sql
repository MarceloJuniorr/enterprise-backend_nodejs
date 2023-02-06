/*
  Warnings:

  - Added the required column `birthday` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `enterprises` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `birthday` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `enterprises` MODIFY `email` VARCHAR(191) NOT NULL;
