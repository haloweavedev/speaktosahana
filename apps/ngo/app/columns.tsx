"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@repo/ui/components/ui/badge";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { DataTableColumnHeader } from "@repo/ui/components/data-table-column-header";
import { MoreHorizontal } from "lucide-react";
import { Ngo } from "./page";

export const columns: ColumnDef<Ngo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sr. No." />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("serialNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGO Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "registrationType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reg. Type" />
    ),
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("registrationType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "primarySectors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primary Sectors" />
    ),
    cell: ({ row }) => {
      const sectors: string[] = row.getValue("primarySectors");
      return (
        <div className="flex flex-wrap gap-1 max-w-[300px]">
          {sectors.map((sector) => (
            <Badge key={sector} variant="secondary">
              {sector}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.primarySectors.some(sector => sector.toLowerCase().includes(value.toLowerCase()));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "operationalDistrict",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operational District" />
    ),
    cell: ({ row }) => <div>{row.getValue("operationalDistrict")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("contactEmail")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ngo = row.original;

      return (
        <div className="flex justify-end">
          <MoreHorizontal className="h-4 w-4" />
        </div>
      );
    },
  },
];
