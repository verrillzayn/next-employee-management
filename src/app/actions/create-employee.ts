"use server";

import { prisma } from "@/lib/prisma";
import { employeeSchema } from "@/lib/validator/employee";
import { revalidatePath } from "next/cache";

export async function createEmployee(data: any) {
  const result = employeeSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.format(),
    };
  }

  try {
    await prisma.employee.create({
      data: result.data,
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Gagal menyimpan data ke database.",
    };
  }
}
