CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`todo` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_id_unique` ON `todos` (`id`);