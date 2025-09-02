import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { PageHeader } from "../../components/page-header"
import { BeamBlockerControl, type ShutterConfig } from "../../../ui/experimental/beam-blockers-control"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/experimental/beam-blockers-control')({
  component: BeamBlockersControlPage,
})

/* DEMO_START */
function BasicBeamBlockerDemo() {
  const [shutters, setShutters] = useState<ShutterConfig[]>([
    { id: "shut01", name: "SHUT 01", type: "shutter", isOpen: false },
    { id: "shut02", name: "SHUT 02", type: "shutter", isOpen: false },
    { id: "shut03", name: "SHUT 03", type: "shutter", isOpen: true },
  ])

  const handleShutterChange = (shutterId: string, isOpen: boolean) => {
    setShutters((prev) => prev.map((shutter) => (shutter.id === shutterId ? { ...shutter, isOpen } : shutter)))
  }

  return (
    <div>
      <BeamBlockerControl
        shutters={shutters}
        onShutterChange={handleShutterChange}
      />
      <div className="mt-4 text-sm text-muted-foreground">
        Try toggling the shutters to see the beam visualization update in real-time.
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicBeamBlockerSource = __SOURCE__

/* DEMO_START */
function VariableBlockerDemo() {
  const [shutters, setShutters] = useState<ShutterConfig[]>([
    { id: "shut01", name: "SHUT 01", type: "shutter", isOpen: false },
    { id: "shut02", name: "SHUT 02", type: "shutter", isOpen: false },
    {
      id: "blocker01",
      name: "VAR BLOCK",
      type: "variable-blocker",
      isOpen: false,
      threshold: 5.0,
      currentValue: 2.3,
    },
    { id: "shut03", name: "SHUT 03", type: "shutter", isOpen: false },
  ])

  const handleShutterChange = (shutterId: string, isOpen: boolean) => {
    setShutters((prev) => prev.map((shutter) => (shutter.id === shutterId ? { ...shutter, isOpen } : shutter)))
  }

  return (
    <div>
      <BeamBlockerControl
        shutters={shutters}
        onShutterChange={handleShutterChange}
      />
      <div className="mt-4 space-y-2 text-sm">
        <div className="font-medium">Variable Blocker Features:</div>
        <ul className="text-muted-foreground space-y-1 ml-4">
          <li>• Automatically opens when current value exceeds threshold</li>
          <li>• Shows real-time value monitoring</li>
          <li>• Visual status indicators (OPEN/BLOCKED)</li>
          <li>• No manual control - purely automatic</li>
        </ul>
      </div>
    </div>
  )
}
/* DEMO_END */

const variableBlockerSource = __SOURCE__

/* DEMO_START */
function SafetyFeaturesDemo() {
  const [shutters, setShutters] = useState<ShutterConfig[]>([
    { id: "shut01", name: "SHUT 01", type: "shutter", isOpen: true },
    { id: "shut02", name: "SHUT 02", type: "shutter", isOpen: true },
    { id: "shut03", name: "SHUT 03", type: "shutter", isOpen: false },
  ])

  const handleShutterChange = (shutterId: string, isOpen: boolean) => {
    setShutters((prev) => prev.map((shutter) => (shutter.id === shutterId ? { ...shutter, isOpen } : shutter)))
  }

  return (
    <div>
      <BeamBlockerControl
        shutters={shutters}
        onShutterChange={handleShutterChange}
      />
      <div className="mt-4 space-y-2 text-sm">
        <div className="font-medium">Safety System:</div>
        <ul className="text-muted-foreground space-y-1 ml-4">
          <li>• Confirmation dialog before detector exposure</li>
          <li>• Visual beam blocking indicators</li>
          <li>• Animated beam flow with blocking visualization</li>
          <li>• Red pulse indicators on blocking elements</li>
        </ul>
        <div className="text-orange-600 dark:text-orange-400 font-medium">
          ⚠️ Try opening the last shutter to see the safety dialog
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const safetyFeaturesSource = __SOURCE__

function BeamBlockersControlPage() {


  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Beam Blockers Control" }]}
        pageHeading="Beam Blockers Control"
        pageSubheading="A visual display of beam blockers and beam."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Example</CardTitle>
              <CardDescription>A simple beamline with three shutters</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicBeamBlockerDemo />}
                source={basicBeamBlockerSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Variable Blocker</CardTitle>
              <CardDescription>Demonstrates variable threshold blockers like a broad beamstop.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<VariableBlockerDemo />}
                source={variableBlockerSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Features</CardTitle>
              <CardDescription>Demonstrates the safety warning dialog when exposing the detector</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SafetyFeaturesDemo />}
                source={safetyFeaturesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
