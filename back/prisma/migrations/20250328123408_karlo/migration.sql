/*
  Warnings:

  - Added the required column `pregunta` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `pregunta` VARCHAR(191) NOT NULL,
    MODIFY `telefono` VARCHAR(191) NULL,
    MODIFY `nombre` VARCHAR(191) NULL;
