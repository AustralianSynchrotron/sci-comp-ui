import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { PageHeader } from "../../docs/components/page-header"
import { PeriodicTable } from '../../ui/experimental/periodic-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { Badge } from "../../ui/elements/badge"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/experimental/periodic-table')({
  component: PeriodicTablePage,
})

/* DEMO_START */
function DefaultPeriodicTableDemo() {
  const [selectedElement, setSelectedElement] = useState<any>(null)

  return (
    <div className="space-y-4">
      <PeriodicTable
        variant="grid"
        outputType="element"
        outputFormat="object"
        onElementSelect={setSelectedElement}
        placeholder="Choose an element..."
      />

      {selectedElement && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Element:</h4>
          <div className="p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{selectedElement.symbol}</Badge>
              <span className="font-medium">{selectedElement.name}</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Atomic Number: {selectedElement.atomicNumber}</p>
              <p>Atomic Mass: {selectedElement.atomicMass} u</p>
              <p>Category: {selectedElement.category.replace("-", " ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const defaultPeriodicTableSource = __SOURCE__

/* DEMO_START */
function CompactPeriodicTableDemo() {
  const [compactValue, setCompactValue] = useState<string>("")

  return (
    <div className="space-y-4">
      <PeriodicTable
        variant="compact"
        outputType="symbol"
        outputFormat="string"
        onElementSelect={setCompactValue}
        placeholder="Search elements..."
      />

      {compactValue && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Symbol:</h4>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {compactValue}
          </Badge>
        </div>
      )}
    </div>
  )
}
/* DEMO_END */

const compactPeriodicTableSource = __SOURCE__

/* DEMO_START */
function OutputTypesDemo() {
  const [atomicNumberValue, setAtomicNumberValue] = useState<number | null>(null)
  const [elementNameValue, setElementNameValue] = useState<string>("")

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <h4 className="font-medium">Atomic Number Output</h4>
        <PeriodicTable
          variant="compact"
          outputType="atomicNumber"
          outputFormat="number"
          onElementSelect={setAtomicNumberValue}
          placeholder="Select for atomic number..."
        />
        {atomicNumberValue && (
          <Badge variant="outline" className="mt-2">
            Atomic Number: {atomicNumberValue}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Element Name Output</h4>
        <PeriodicTable
          variant="compact"
          outputType="name"
          outputFormat="string"
          onElementSelect={setElementNameValue}
          placeholder="Select for element name..."
        />
        {elementNameValue && (
          <Badge variant="outline" className="mt-2">
            {elementNameValue}
          </Badge>
        )}
      </div>
    </div>
  )
}
/* DEMO_END */

const outputTypesSource = __SOURCE__

function PeriodicTablePage() {


  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Periodic Table" }]}
        pageHeading="Periodic Table"
        pageSubheading="A chemical element picker with compact and grid variants."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compact Variant</CardTitle>
              <CardDescription>Compact searchable dropdown with categorised elements</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CompactPeriodicTableDemo />}
                source={compactPeriodicTableSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grid Variant</CardTitle>
              <CardDescription>Grid layout with category filtering and hover details</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<DefaultPeriodicTableDemo />}
                source={defaultPeriodicTableSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output Types</CardTitle>
              <CardDescription>Different output configurations for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<OutputTypesDemo />}
                source={outputTypesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
