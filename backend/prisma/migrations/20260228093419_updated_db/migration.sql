/*
  Warnings:

  - Made the column `model` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
