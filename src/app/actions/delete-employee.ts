"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEmployee(id: number) {
  try {
    await prisma.employee.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus data" };
  }
}
