import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Users, UserCheck, Briefcase } from "lucide-react";
import { EmployeeTable } from "@/components/employee-table/employee-table";
import { columns } from "@/components/employee-table/columns";
import Header from "@/components/header";
import { StatCard } from "@/components/stat-card";

async function getEmployees() {
  const data = await prisma.employee.findMany({
    orderBy: { id: "asc" },
  });
  return data;
}

export default async function Home() {
  const employees = await getEmployees();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.statusAktif).length;
  const managerCount = employees.filter((e) => e.jabatan === "MANAGER").length;

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* -- HEADER SECTION -- */}
        <Header />

        {/* -- STATS CARDS -- */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Karyawan"
            value={totalEmployees}
            icon={Users}
            desc="Semua data terdaftar"
          />
          <StatCard
            title="Karyawan Aktif"
            value={activeEmployees}
            icon={UserCheck}
            desc="Status aktif saat ini"
            className="text-green-600"
          />
          <StatCard
            title="Total Manager"
            value={managerCount}
            icon={Briefcase}
            desc="Jabatan level manajerial"
          />
        </div>

        {/* -- TABLE SECTION -- */}

        <Suspense fallback={<div>Loading...</div>}>
          <EmployeeTable columns={columns} data={employees} />
        </Suspense>
      </div>
    </main>
  );
}
