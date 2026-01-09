import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            PT. USSI
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola data karyawan, jabatan, dan status keaktifan.
          </p>
        </div>

        <ThemeToggle />
      </div>
      <div className="border" />
    </>
  );
}
