-- Nangell Creative Studio — schema MySQL (Prisma migration init)
-- Importe no phpMyAdmin da Hostinger após criar o banco vazio.
-- Não contém dados sensíveis. Execute o seed separadamente se necessário.

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'EDITOR') NOT NULL DEFAULT 'EDITOR',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `website` VARCHAR(255) NULL,
    `project_type` VARCHAR(100) NOT NULL,
    `challenge` TEXT NOT NULL,
    `budget_range` VARCHAR(100) NOT NULL,
    `urgency` VARCHAR(100) NOT NULL,
    `preferred_contact` VARCHAR(50) NOT NULL,
    `message` TEXT NULL,
    `source_page` VARCHAR(255) NOT NULL,
    `source_demo` VARCHAR(255) NULL,
    `utm_source` VARCHAR(255) NULL,
    `utm_medium` VARCHAR(255) NULL,
    `utm_campaign` VARCHAR(255) NULL,
    `consent` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('NOVO', 'CONTATO', 'REUNIAO', 'PROPOSTA', 'FECHADO', 'PERDIDO') NOT NULL DEFAULT 'NOVO',
    `internal_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `leads_created_at_idx`(`created_at`),
    INDEX `leads_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `short_description` TEXT NOT NULL,
    `full_description` TEXT NOT NULL,
    `problem` TEXT NOT NULL,
    `solution` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `stack` JSON NOT NULL,
    `cover_image` VARCHAR(500) NOT NULL,
    `gallery` JSON NOT NULL,
    `metrics` JSON NOT NULL,
    `demo_type` ENUM('NONE', 'NATIVE', 'IFRAME', 'EXTERNAL') NOT NULL DEFAULT 'NATIVE',
    `demo_route` VARCHAR(255) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'PUBLISHED', 'HIDDEN') NOT NULL DEFAULT 'DRAFT',
    `seo_title` VARCHAR(255) NOT NULL,
    `seo_description` VARCHAR(500) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_slug_idx`(`slug`),
    INDEX `projects_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `headline` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `problem_solved` TEXT NOT NULL,
    `deliverables` JSON NOT NULL,
    `technologies` JSON NOT NULL,
    `target_audience` TEXT NOT NULL,
    `cta_label` VARCHAR(100) NOT NULL,
    `seo_title` VARCHAR(255) NOT NULL,
    `seo_description` VARCHAR(500) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `services_slug_key`(`slug`),
    INDEX `services_slug_idx`(`slug`),
    INDEX `services_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` VARCHAR(36) NOT NULL,
    `client_name` VARCHAR(255) NOT NULL,
    `client_role` VARCHAR(255) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `image` VARCHAR(500) NOT NULL,
    `status` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `testimonials_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `cover_image` VARCHAR(500) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `tags` JSON NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `seo_title` VARCHAR(255) NOT NULL,
    `seo_description` VARCHAR(500) NOT NULL,
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `posts_slug_key`(`slug`),
    INDEX `posts_slug_idx`(`slug`),
    INDEX `posts_status_idx`(`status`),
    INDEX `posts_published_at_idx`(`published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_settings` (
    `id` VARCHAR(36) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `value` TEXT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `site_settings_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analytics_events` (
    `id` VARCHAR(36) NOT NULL,
    `event_name` VARCHAR(100) NOT NULL,
    `page` VARCHAR(255) NOT NULL,
    `demo_slug` VARCHAR(255) NULL,
    `lead_id` VARCHAR(36) NULL,
    `metadata` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `analytics_events_event_name_idx`(`event_name`),
    INDEX `analytics_events_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demo_sessions` (
    `id` VARCHAR(36) NOT NULL,
    `demo_slug` VARCHAR(255) NOT NULL,
    `session_token` VARCHAR(255) NOT NULL,
    `user_agent` VARCHAR(500) NULL,
    `referrer` VARCHAR(500) NULL,
    `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ended_at` DATETIME(3) NULL,
    `metadata` JSON NULL,

    UNIQUE INDEX `demo_sessions_session_token_key`(`session_token`),
    INDEX `demo_sessions_demo_slug_idx`(`demo_slug`),
    INDEX `demo_sessions_started_at_idx`(`started_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demo_interactions` (
    `id` VARCHAR(36) NOT NULL,
    `session_id` VARCHAR(36) NOT NULL,
    `event_type` VARCHAR(100) NOT NULL,
    `payload` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `demo_interactions_session_id_idx`(`session_id`),
    INDEX `demo_interactions_event_type_idx`(`event_type`),
    INDEX `demo_interactions_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `demo_interactions` ADD CONSTRAINT `demo_interactions_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `demo_sessions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
