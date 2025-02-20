/*
  Warnings:

  - You are about to drop the column `password_hash` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registrations` DROP COLUMN `password_hash`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password_hash`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
