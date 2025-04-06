-- CreateTable
CREATE TABLE `Parcela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `responsable` VARCHAR(191) NOT NULL,
    `tipo_cultivo` VARCHAR(191) NOT NULL,
    `ultimo_riego` DATETIME(3) NOT NULL,
    `latitud` VARCHAR(191) NOT NULL,
    `longitud` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sensor_parcela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `humedad` DOUBLE NOT NULL,
    `temperatura` DOUBLE NOT NULL,
    `lluvia` DOUBLE NOT NULL,
    `sol` DOUBLE NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL,
    `parcelaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sensor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `humedad` DOUBLE NOT NULL,
    `temperatura` DOUBLE NOT NULL,
    `lluvia` DOUBLE NOT NULL,
    `sol` DOUBLE NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sensor_parcela` ADD CONSTRAINT `Sensor_parcela_parcelaId_fkey` FOREIGN KEY (`parcelaId`) REFERENCES `Parcela`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
