"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Checkbox, DataTableColumnHeader } from "@repo/ui";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
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
    cell: ({ row }) => (
      <span className="inline-flex min-w-[60px] items-center justify-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-foreground/80 ring-1 ring-white/10">
        #{row.getValue("serialNumber")}
      </span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NGO Name" />
    ),
    cell: ({ row }) => {
      const ngo = row.original;
      return (
        <div className="space-y-1">
          <p className="max-w-[520px] truncate text-base font-semibold text-foreground">
            {ngo.name}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
            {ngo.darpanId ? (
              <Badge variant="secondary" className="bg-white/5 text-foreground/80 ring-1 ring-white/10">
                Darpan {ngo.darpanId}
              </Badge>
            ) : null}
            <span className="line-clamp-1 max-w-[520px] text-ellipsis">{ngo.address}</span>
          </div>
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
    cell: ({ row }) => (
      <Badge className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground shadow-sm">
        {(row.getValue("registrationType") as string) || "—"}
      </Badge>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "primarySectors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primary Sectors" />
    ),
    cell: ({ row }) => {
      const sectors = row.original.primarySectors.slice(0, 3);
      const overflow = row.original.primarySectors.length - sectors.length;
      return (
        <div className="flex max-w-[360px] flex-wrap gap-1">
          {sectors.map((sector) => (
            <Badge key={sector} variant="secondary" className="bg-white/5 text-foreground/80 ring-1 ring-white/10">
              {sector}
            </Badge>
          ))}
          {overflow > 0 ? <span className="text-xs text-muted-foreground">+{overflow} more</span> : null}
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
    cell: ({ row }) => (
      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 ring-1 ring-white/10">
        {row.getValue("operationalDistrict") || "—"}
      </span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="text-sm text-foreground/80">{row.getValue("contactEmail")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "contactWebsite",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => {
      const site = row.original.contactWebsite;
      if (!site) {
        return <span className="text-xs text-muted-foreground">—</span>;
      }
      const label = site.replace(/^https?:\/\//, "").replace(/\/$/, "");
      return (
        <a
          href={site}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const ngo = row.original;

      return (
        <div className="flex justify-end text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" aria-label={`Actions for ${ngo.name}`} />
        </div>
      );
    },
  },
];
