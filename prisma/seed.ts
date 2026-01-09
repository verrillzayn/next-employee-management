import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Bersihkan data lama (Opsional, tapi bagus untuk development)
  await prisma.employee.deleteMany();

  // 2. Reset Auto Increment ID sequence di PostgreSQL (Supaya ID mulai dari 1 lagi)
  // Note: Nama tabel di query ini harus sesuai dengan nama tabel di DB (biasanya lowercase/snake_case)
  // Jika kamu pakai @map("employees") di model, ganti "Employee" jadi "employees"
  try {
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "Employee_id_seq" RESTART WITH 1;`
    );
  } catch (e) {
    console.log(
      "⚠️  Skipping sequence reset (table might be empty or different DB provider)"
    );
  }

  // 3. Baca file JSON
  const dataPath = path.join(__dirname, "seedData", "employees.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // 4. Transform data (Convert string date ke Date object)
  const employeesData = data.map((emp: any) => ({
    nama: emp.nama,
    jabatan: emp.jabatan,
    tanggalMasuk: new Date(emp.tanggalMasuk),
    statusAktif: emp.statusAktif,
  }));

  // 5. Insert ke Database
  await prisma.employee.createMany({
    data: employeesData,
  });

  console.log(`✅ Seeding finished. Added ${employeesData.length} employees.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
