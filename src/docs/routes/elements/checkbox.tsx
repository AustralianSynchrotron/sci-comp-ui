import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Checkbox } from "../../../ui/elements/checkbox"
import { Label } from "../../../ui/elements/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/checkbox')({
  component: CheckboxPage,
})

/* DEMO_START */
function BasicCheckboxDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="beamline" />
        <Label htmlFor="beamline">Beamline 7-ID</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="detector" />
        <Label htmlFor="detector">Pilatus 300K Detector</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="monochromator" />
        <Label htmlFor="monochromator">Si(111) Monochromator</Label>
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicCheckboxSource = __SOURCE__

/* DEMO_START */
function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="enabled" defaultChecked />
        <Label htmlFor="enabled">X-ray Source Enabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">Safety Interlock (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="indeterminate" />
        <Label htmlFor="indeterminate">Sample Stage Position</Label>
      </div>
    </div>
  )
}
/* DEMO_END */

const checkboxStatesSource = __SOURCE__

/* DEMO_START */
function CheckboxWithDescriptionDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox id="data-collection" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="data-collection">Data Collection Mode</Label>
          <p className="text-xs text-muted-foreground">Enable continuous data collection at 10Hz</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="auto-calibration" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="auto-calibration">Auto-calibration</Label>
          <p className="text-xs text-muted-foreground">Automatically calibrate detector every 100 frames</p>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const checkboxWithDescriptionSource = __SOURCE__

function CheckboxPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Checkbox" }]}
        pageHeading="Checkbox"
        pageSubheading="A control that allows the user to toggle between checked and unchecked states."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Checkbox</CardTitle>
              <CardDescription>Simple checkbox controls for synchrotron beamline settings</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicCheckboxDemo />}
                source={basicCheckboxSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox States</CardTitle>
              <CardDescription>Different checkbox states and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CheckboxStatesDemo />}
                source={checkboxStatesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox with Descriptions</CardTitle>
              <CardDescription>Checkboxes with additional context and descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CheckboxWithDescriptionDemo />}
                source={checkboxWithDescriptionSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
