/*
  Warnings:

  - Added the required column `created_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "created_at" TIMESTAMPTZ(4) NOT NULL;
