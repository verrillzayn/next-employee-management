-- CreateEnum
CREATE TYPE "Jabatan" AS ENUM ('ADMIN', 'STAFF', 'MANAGER');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" "Jabatan" NOT NULL,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,
    "status_aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
