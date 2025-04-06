/*
  Warnings:

  - Added the required column `respuesta` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `respuesta` VARCHAR(191) NOT NULL;
