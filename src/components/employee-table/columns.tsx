"use client";

import { Badge } from "@/components/ui/badge";
import { Employee } from "@/generated/prisma/client";
import { formatDate, getPositionColor } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Calendar } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteEmployeeDialog } from "@/components/employee-dialog/delete-employee-dialog";
import { EmployeeDialog } from "@/components/employee-dialog/employee-dialog";
import { ColumnSortingHeader } from "@/components/employee-table/column-headers";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    sortDescFirst: true,
    header: ({ column }) => <ColumnSortingHeader column={column} name="ID" />,
    cell: ({ row }) => <div className="px-4">{row.original.id}</div>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => <ColumnSortingHeader column={column} name="Nama" />,
    cell: ({ row }) => <div className="px-3">{row.original.nama}</div>,
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
    cell: ({ row }) => {
      const jabatan = row.original.jabatan;
      return (
        <Badge
          variant="outline"
          className={`${getPositionColor(jabatan)} shadow-none`}>
          {jabatan}
        </Badge>
      );
    },
  },
  {
    accessorKey: "tanggalMasuk",
    header: "Tanggal Masuk",
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <Calendar className="w-3 h-3 mr-2 text-gray-400" />
        {formatDate(row.original.tanggalMasuk)}
      </div>
    ),
  },
  {
    accessorKey: "statusAktif",
    header: "Status Aktif",
    cell: ({ row }) => {
      const { statusAktif } = row.original;

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusAktif
              ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
              : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10"
          }`}>
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              statusAktif ? "bg-green-600" : "bg-red-600"
            }`}></span>
          {statusAktif ? "Aktif" : "Non-Aktif"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Tombol Edit */}
            <EmployeeDialog type="edit" employee={employee} />

            {/* Tombol Delete */}
            <DeleteEmployeeDialog
              id={row.original.id}
              name={row.original.nama}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
