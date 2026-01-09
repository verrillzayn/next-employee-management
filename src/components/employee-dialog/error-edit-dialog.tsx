"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";

const ErrorEditDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer">
          <Pencil className="w-4 h-4 mr-2 text-gray-500" />
          Edit Data
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          Error; Tidak ada data karyawan yang ditemukan untuk diedit.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorEditDialog;
