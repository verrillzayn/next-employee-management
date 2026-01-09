"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { createEmployee } from "@/app/actions/create-employee";
import { EmployeeFormValues, employeeSchema } from "@/lib/validator/employee";
import JoinDateCalendar from "@/components/employee-dialog/join-date-calendar";
import { Employee } from "@/generated/prisma/client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ErrorEditDialog from "@/components/employee-dialog/error-edit-dialog";
import { updateEmployee } from "@/app/actions/update-employee";

export function EmployeeDialog({
  employee,
  type,
}: {
  employee?: Employee;
  type: "edit" | "create";
}) {
  if (type === "edit" && !employee) {
    return <ErrorEditDialog />;
  }

  const [open, setOpen] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      nama: type === "create" ? "" : employee?.nama,
      jabatan: type === "create" ? undefined : employee?.jabatan,
      tanggalMasuk: type === "create" ? new Date() : employee?.tanggalMasuk,
      statusAktif: type === "create" ? false : employee?.statusAktif,
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(data: EmployeeFormValues) {
    if (type === "create") {
      const result = await createEmployee(data);

      if (result.success) {
        toast.success("Data karyawan berhasil ditambahkan.");
        setOpen(false);
        form.reset();
      } else {
        toast.error("Terjadi kesalahan saat menyimpan data.");
      }
    } else {
      if (!employee) {
        toast.error("Data karyawan tidak ditemukan.");
        return;
      }
      const result = await updateEmployee(employee.id, data);

      if (result.success) {
        toast.success("Data karyawan diperbarui.");

        setOpen(false);
      } else {
        toast.error("Gagal update data.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "create" ? (
          <Button className="transition-all shadow-sm bg-card-foreground text-background hover:bg-card-foreground/80">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Karyawan
          </Button>
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer">
            <Pencil className="w-4 h-4 mr-2 text-gray-500" />
            Edit Data
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Tambah Karyawan Baru" : "Edit data karyawan"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Isi formulir di bawah ini untuk menambahkan data karyawan baru."
              : "Perbarui informasi karyawan pada formulir di bawah ini."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Field Nama */}
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Verrill Zain Syafiq"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Field Jabatan */}
            <FormField
              control={form.control}
              name="jabatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STAFF">Staff</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Field Tanggal Masuk */}
            <FormField
              control={form.control}
              name="tanggalMasuk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Masuk</FormLabel>
                  <FormControl>
                    <JoinDateCalendar
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Field Status Aktif */}
            <FormField
              control={form.control}
              name="statusAktif"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Status</FormLabel>
                    <FormDescription>
                      Karyawan ini masih bekerja aktif di perusahaan.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
