import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../docs/components/page-header"
import { OphydPositionControl } from "../../ui/experimental/ophyd-control"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "../../docs/components/demo-container"

export const Route = createFileRoute('/experimental/ophyd-control')({
  component: OphydControlPage,
})

/* DEMO_START */
function OphydControlDemo() {
  return (
    <div className="space-y-6">
        <h4 className="font-medium mb-3">Basic Position Control</h4>
        <OphydPositionControl
          min={0}
          max={100}
          defaultValue={25}
          defaultTarget={50}
        />
    </div>
  )
}
/* DEMO_END */

const ophydControlSource = __SOURCE__

function OphydControlPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Experimental", href: "/experimental" }, { title: "Ophyd Control" }]}
        pageHeading="Ophyd Position Control"
        pageSubheading="A motor position control component with real-time movement simulation and precise positioning controls."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Position Control</CardTitle>
              <CardDescription>
                Interactive motor position control with real-time movement simulation, 
                adjustable increments, and visual feedback. Perfect for controlling 
                stepper motors, linear actuators, and other positioning systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<OphydControlDemo />}
                source={ophydControlSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
