/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PasswordToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PasswordToken_token_key` ON `PasswordToken`(`token`);
