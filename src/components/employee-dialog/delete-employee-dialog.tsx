"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteEmployee } from "@/app/actions/delete-employee";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface DeleteEmployeeDialogProps {
  id: number;
  name: string;
}

export function DeleteEmployeeDialog({ id, name }: DeleteEmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteEmployee(id);

    if (result.success) {
      toast.success("Data karyawan dihapus.");
      setOpen(false);
    } else {
      toast.error("Terjadi kesalahan saat menghapus data karyawan.");
    }
    setIsDeleting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah Anda yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini akan menghapus data karyawan <strong>{name}</strong>{" "}
            secara permanen dari database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isDeleting}>Batal</Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700">
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
