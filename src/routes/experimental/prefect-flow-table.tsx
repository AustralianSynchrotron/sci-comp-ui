import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { DataTable } from "../../ui/experimental/prefect-flow-table/data-table"
import { columns } from "../../ui/experimental/prefect-flow-table/columns"
import flows from "../../ui/experimental/prefect-flow-table/data/flows.json"

export const Route = createFileRoute('/experimental/prefect-flow-table')({
  component: PrefectFlowTablePage,
})

/* DEMO_START */
function PrefectFlowTableDemo() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">Prefect Flow Management</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your Prefect workflow executions across all queues.
          </p>
        </div>
        <DataTable data={flows} columns={columns} />
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const prefectFlowTableSource = __SOURCE__

function PrefectFlowTablePage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Experimental", href: "/experimental" }, { title: "Prefect Flow Table" }]}
        pageHeading="Prefect Flow Table"
        pageSubheading="A data table component for monitoring and managing Prefect workflow executions with filtering, sorting, and pagination."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flow Management Table</CardTitle>
              <CardDescription>
                Complete table view with state filtering, queue management, and flow monitoring capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PrefectFlowTableDemo />}
                source={prefectFlowTableSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
