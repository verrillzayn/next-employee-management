"use server";

import { prisma } from "@/lib/prisma";
import { EmployeeFormValues, employeeSchema } from "@/lib/validator/employee";
import { revalidatePath } from "next/cache";

export async function updateEmployee(id: number, data: EmployeeFormValues) {
  const result = employeeSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  try {
    await prisma.employee.update({
      where: { id },
      data: result.data,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengupdate data" };
  }
}
