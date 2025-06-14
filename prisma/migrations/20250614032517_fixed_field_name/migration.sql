/*
  Warnings:

  - You are about to drop the column `assignee_id` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignee_id_fkey`;

-- DropIndex
DROP INDEX `Issue_assignee_id_fkey` ON `Issue`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assignee_id`,
    ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
