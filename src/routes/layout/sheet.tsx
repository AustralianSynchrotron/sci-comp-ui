import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/layout/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { Button } from "../../ui/elements/button"
import { Stack } from "../../ui/layout/stack"
import { Switch } from "../../ui/elements/switch"
import { Typography } from "../../ui/elements/typography"

export const Route = createFileRoute('/layout/sheet')({
  component: SheetPage,
})

/* DEMO_START */
function BasicSheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Beamline Details</Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <Stack spacing={6}>
          <SheetHeader>
            <SheetTitle>Beamline Configuration</SheetTitle>
            <SheetDescription>
              Current settings and status for the macromolecular crystallography beamline
            </SheetDescription>
          </SheetHeader>
          
          <Stack spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h4">Beam Parameters</Typography>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Energy:</span>
                  <span className="font-mono text-blue-600">12.4 keV</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Flux:</span>
                  <span className="font-mono text-green-600">1.2e12 ph/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Beam Size:</span>
                  <span className="font-mono text-purple-600">50×50 μm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Divergence:</span>
                  <span className="font-mono text-orange-600">0.1 mrad</span>
                </div>
              </div>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">System Status</Typography>
              <Stack spacing={3}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Beam Shutter</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Safety Interlocks</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Detector Cooling</span>
                  <Switch />
                </div>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Quick Actions</Typography>
              <Stack direction="row" spacing={2}>
                <Button size="sm" variant="outline">Emergency Stop</Button>
                <Button size="sm" variant="outline">Reset Alarms</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </SheetContent>
    </Sheet>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicSheetSource = __SOURCE__

/* DEMO_START */
function SheetSidesDemo() {
  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Side Sheet</SheetTitle>
          </SheetHeader>
          <div className="py-4 text-sm">Detector status and controls</div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Side Sheet</SheetTitle>
          </SheetHeader>
          <div className="py-4 text-sm">Sample information and metadata</div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
          </SheetHeader>
          <div className="py-4 text-sm">System alerts and notifications</div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
          </SheetHeader>
          <div className="py-4 text-sm">Data collection progress</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
/* DEMO_END */

const sheetSidesSource = __SOURCE__

function SheetPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Sheet" }]}
        pageHeading="Sheet"
        pageSubheading="A slide-out panel that can be positioned on any side of the screen."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Sheet</CardTitle>
              <CardDescription>A simple sheet with beamline configuration details</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicSheetDemo />}
                source={basicSheetSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sheet Positions</CardTitle>
              <CardDescription>Sheets can be positioned on any side of the screen</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SheetSidesDemo />}
                source={sheetSidesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
