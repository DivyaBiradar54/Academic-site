/*
  Warnings:

  - You are about to drop the column `email_to` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `groupchats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Name` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailTo` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupChatId` to the `replies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `email_to`,
    DROP COLUMN `name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `senderId`,
    DROP COLUMN `timestamp`,
    ADD COLUMN `Name` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `emailTo` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `replies` ADD COLUMN `groupChatId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `groupchats`;

-- CreateTable
CREATE TABLE `GroupChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userInitials` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `reactions` JSON NULL,
    `messageDate` DATETIME(3) NOT NULL,
    `messageTime` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_groupChatId_fkey` FOREIGN KEY (`groupChatId`) REFERENCES `GroupChat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
