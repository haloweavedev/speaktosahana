-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "ngos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "darpan_id" TEXT,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT,
    "serial_number" TEXT,
    "registration_number" TEXT,
    "registration_type" TEXT,
    "registration_raw" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "website" TEXT,
    "summary_address" TEXT,
    "address" TEXT,
    "district" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "darpan_registration_date" DATE,
    "registered_with" TEXT,
    "type_of_npo" TEXT,
    "act_name" TEXT,
    "city_of_registration" TEXT,
    "state_of_registration" TEXT,
    "date_of_registration" DATE,
    "registration_date" DATE,
    "summary_sectors" TEXT[],
    "primary_sectors" TEXT[],
    "secondary_sectors" TEXT[],
    "operational_states" TEXT,
    "operational_district" TEXT,
    "office_bearers" JSONB,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "geocoding_status" TEXT NOT NULL DEFAULT 'PENDING',
    "geocoded_pincode" TEXT,
    "source_url" TEXT,
    "scraped_at" TIMESTAMPTZ,
    "hash" TEXT,
    "raw" JSONB,
    "raw_scraped_details" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ngos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrape_runs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMPTZ,
    "duration_ms" INTEGER,
    "total_discovered" INTEGER,
    "total_processed" INTEGER,
    "inserted" INTEGER,
    "updated" INTEGER,
    "skipped" INTEGER,
    "errors" JSONB,
    "message" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scrape_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ngo_sectors" (
    "ngo_id" UUID NOT NULL,
    "sector_id" BIGINT NOT NULL,

    CONSTRAINT "ngo_sectors_pkey" PRIMARY KEY ("ngo_id","sector_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ngos_darpan_id_key" ON "ngos"("darpan_id");

-- CreateIndex
CREATE INDEX "ngos_pincode_idx" ON "ngos"("pincode");

-- CreateIndex
CREATE INDEX "ngos_district_state_idx" ON "ngos"("district", "state");

-- CreateIndex
CREATE INDEX "ngos_geocoding_status_idx" ON "ngos"("geocoding_status");

-- CreateIndex
CREATE INDEX "scrape_runs_started_at_idx" ON "scrape_runs"("started_at");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");

-- AddForeignKey
ALTER TABLE "ngo_sectors" ADD CONSTRAINT "ngo_sectors_ngo_id_fkey" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ngo_sectors" ADD CONSTRAINT "ngo_sectors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

