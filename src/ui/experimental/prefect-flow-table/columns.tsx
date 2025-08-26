import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../elements/badge"
import { Checkbox } from "../../elements/checkbox"

import { flowStates, queueNames } from "./data/data"
import type { Flow } from "./data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Flow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "flowRunId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Flow Run ID" />,
    cell: ({ row }) => <div className="w-[120px] font-mono text-xs">{row.getValue("flowRunId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "flowName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Flow Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[400px] truncate font-medium">{row.getValue("flowName")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
    cell: ({ row }) => {
      const state = flowStates.find((state) => state.value === row.getValue("state"))

      if (!state) {
        return null
      }

      return (
        <Badge className={`flex w-[120px] items-center gap-2 ${state.color}`} variant="outline">
          {state.icon && <state.icon className={`size-4 ${state.color}`} />}
          <span className={state.color}>{state.label}</span>
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "scheduledStartTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Scheduled Start" />,
    cell: ({ row }) => {
      const dateTime = new Date(row.getValue("scheduledStartTime"))
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{dateTime.toLocaleDateString()}</span>
          <span className="text-xs text-muted-foreground">{dateTime.toLocaleTimeString()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "queueName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Queue" />,
    cell: ({ row }) => {
      const queue = queueNames.find((queue) => queue.value === row.getValue("queueName"))

      return (
        <Badge variant="secondary" className="whitespace-nowrap">
          {queue?.label || row.getValue("queueName")}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
