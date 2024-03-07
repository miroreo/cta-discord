-- CreateTable
CREATE TABLE "alert_history" (
    "alert_id" INTEGER NOT NULL,
    "headline" TEXT,
    "short_description" TEXT,
    "guid" TEXT,
    "published_to" INTEGER,

    CONSTRAINT "alert_history_pkey" PRIMARY KEY ("alert_id")
);

-- CreateTable
CREATE TABLE "guilds" (
    "guild_id" BIGINT NOT NULL,
    "guild_name" TEXT,
    "has_alerts" BOOLEAN,
    "alert_channel" BIGINT,
    "accessibility_alerts" BOOLEAN,
    "planned_alerts" BOOLEAN,
    "route_ids" TEXT[],

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "kv_store" (
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "kv_store_pkey" PRIMARY KEY ("key")
);

