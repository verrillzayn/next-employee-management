import { Button } from "@/components/ui/button";
import { Employee } from "@/generated/prisma/client";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export const ColumnSortingHeader = ({
  column,
  name,
}: {
  column: Column<Employee>;
  name: string;
}) => {
  const isSorted = column.getIsSorted();
  return (
    <Button
      key={name}
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {name}
      {isSorted === "asc" ? (
        <ArrowUp className="w-4 h-4 ml-2" />
      ) : isSorted === "desc" ? (
        <ArrowDown className="w-4 h-4 ml-2" />
      ) : (
        <ArrowUpDown className="w-4 h-4 ml-2" />
      )}
    </Button>
  );
};
