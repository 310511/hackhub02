// src/app/admin/dashboard/components/columns.tsx

//@ts-nocheck
"use client";
import { ColumnDef } from "@tanstack/react-table"
import { ExperimentRun } from "@/types"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<ExperimentRun>[] = [
  {
    accessorKey: "name",
    header: "Experiment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === 'Completed' ? 'success' : 
                      status === 'Running' ? 'warning' : 'destructive'
      return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
    cell: ({ row }) => `${row.getValue("accuracy")?.toFixed(1)}%`
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => `${Math.floor(row.getValue("duration") / 60)}min`
  },
]