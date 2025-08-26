import type { Table } from "@tanstack/react-table"
import { X, Plus } from "lucide-react"

import { Button } from "../../elements/button"
import { Input } from "../../elements/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { flowStates, queueNames } from "./data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter flows..."
          value={(table.getColumn("flowName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("flowName")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("state") && (
          <DataTableFacetedFilter column={table.getColumn("state")} title="State" options={flowStates} />
        )}
        {table.getColumn("queueName") && (
          <DataTableFacetedFilter column={table.getColumn("queueName")} title="Queue" options={queueNames} />
        )}
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Flow
        </Button>
      </div>
    </div>
  )
}
