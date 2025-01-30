/*
  Warnings:

  - You are about to drop the `contactinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `contactinfo`;

-- DropTable
DROP TABLE `messages_info`;

-- CreateTable
CREATE TABLE `Contact_Us` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contact_Us_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
