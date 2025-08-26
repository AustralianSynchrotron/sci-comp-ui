import type { Row } from "@tanstack/react-table"
import { MoreHorizontal, Play, Pause, RotateCcw, Eye, Copy, Trash2 } from "lucide-react"

import { Button } from "../../elements/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu"

// import { flowSchema } from "./data/schema" // Available for future use

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ }: DataTableRowActionsProps<TData>) {
  // const flow = flowSchema.parse(row.original) // Available for future actions when needed

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted size-8">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Play className="mr-2 h-4 w-4" />
          Run Now
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pause className="mr-2 h-4 w-4" />
          Cancel Run
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry Flow
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Clone Flow
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
