-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "brand" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "mileage" INTEGER,
ADD COLUMN     "transmission" TEXT;
