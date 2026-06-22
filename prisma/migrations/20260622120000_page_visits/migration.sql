-- CreateTable
CREATE TABLE `page_visits` (
    `id` VARCHAR(36) NOT NULL,
    `path` VARCHAR(500) NOT NULL,
    `referrer` VARCHAR(500) NULL,
    `user_agent` VARCHAR(500) NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `country` VARCHAR(100) NULL,
    `region` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `utm_source` VARCHAR(255) NULL,
    `utm_medium` VARCHAR(255) NULL,
    `utm_campaign` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `page_visits_path_idx`(`path`),
    INDEX `page_visits_created_at_idx`(`created_at`),
    INDEX `page_visits_country_idx`(`country`),
    INDEX `page_visits_ip_address_idx`(`ip_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
