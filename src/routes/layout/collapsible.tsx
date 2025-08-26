import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/layout/collapsible"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { Button } from "../../ui/elements/button"
import React from "react"

export const Route = createFileRoute('/layout/collapsible')({
  component: CollapsiblePage,
})

/* DEMO_START */
function BasicCollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Beamline Status
          <span className="text-xs text-muted-foreground">Click to expand</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Beam Current:</span>
            <span className="font-mono text-green-600">200 mA</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Energy:</span>
            <span className="font-mono text-blue-600">8.0 keV</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Flux:</span>
            <span className="font-mono text-purple-600">1.2e12 ph/s</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicCollapsibleSource = __SOURCE__

/* DEMO_START */
function ControlledCollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-medium leading-none">Detector Configuration</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? "Hide" : "Show"} Details
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Pixel Size:</span>
              <span className="ml-2 font-mono">172 μm</span>
            </div>
            <div>
              <span className="font-medium">Array Size:</span>
              <span className="ml-2 font-mono">2048×2048</span>
            </div>
            <div>
              <span className="font-medium">Readout Time:</span>
              <span className="ml-2 font-mono">0.1 s</span>
            </div>
            <div>
              <span className="font-medium">Dynamic Range:</span>
              <span className="ml-2 font-mono">16-bit</span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
/* DEMO_END */

const controlledCollapsibleSource = __SOURCE__

function CollapsiblePage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Collapsible" }]}
        pageHeading="Collapsible"
        pageSubheading="A collapsible content area that can be toggled to show or hide content."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Collapsible</CardTitle>
              <CardDescription>A simple collapsible section with beamline status information</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicCollapsibleDemo />}
                source={basicCollapsibleSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Controlled Collapsible</CardTitle>
              <CardDescription>A collapsible with controlled state and custom trigger button</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ControlledCollapsibleDemo />}
                source={controlledCollapsibleSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
