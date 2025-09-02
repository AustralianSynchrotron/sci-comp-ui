import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Switch } from "../../../ui/elements/switch"
import { Label } from "../../../ui/elements/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/switch')({
  component: SwitchPage,
})

/* DEMO_START */
function BasicSwitchDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="beamline" />
        <Label htmlFor="beamline">Beamline 7-ID Active</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="detector" />
        <Label htmlFor="detector">Detector Cooling System</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="safety" />
        <Label htmlFor="safety">Safety Interlock System</Label>
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicSwitchSource = __SOURCE__

/* DEMO_START */
function SwitchStatesDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="enabled" defaultChecked />
        <Label htmlFor="enabled">X-ray Source Enabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">Emergency Shutdown (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="maintenance" />
        <Label htmlFor="maintenance">Maintenance Mode</Label>
      </div>
    </div>
  )
}
/* DEMO_END */

const switchStatesSource = __SOURCE__

/* DEMO_START */
function SwitchWithDescriptionDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start space-x-2">
        <Switch id="auto-focus" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="auto-focus">Auto-focus Mode</Label>
          <p className="text-xs text-muted-foreground">Automatically adjust sample height for optimal focus</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <Switch id="data-backup" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="data-backup">Real-time Data Backup</Label>
          <p className="text-xs text-muted-foreground">Stream data to backup storage during collection</p>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const switchWithDescriptionSource = __SOURCE__

function SwitchPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Switch" }]}
        pageHeading="Switch"
        pageSubheading="A control that allows the user to toggle between on and off states."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Switch</CardTitle>
              <CardDescription>Simple toggle switches for synchrotron system controls</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicSwitchDemo />}
                source={basicSwitchSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Switch States</CardTitle>
              <CardDescription>Different switch states and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SwitchStatesDemo />}
                source={switchStatesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Switch with Descriptions</CardTitle>
              <CardDescription>Switches with additional context and descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SwitchWithDescriptionDemo />}
                source={switchWithDescriptionSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
