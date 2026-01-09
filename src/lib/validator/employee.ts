import z from "zod";

export const employeeSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  jabatan: z.enum(["ADMIN", "STAFF", "MANAGER"], {
    error: "Jabatan wajib dipilih",
  }),
  tanggalMasuk: z.date().refine((date) => date <= new Date(), {
    message: "Tanggal masuk tidak boleh di masa depan.",
  }),
  statusAktif: z.boolean(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
