import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../docs/components/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/layout/card"
import { DemoContainer } from "../../docs/components/demo-container"
import { Nav } from "../../ui/experimental/nav"

export const Route = createFileRoute("/experimental/nav")({
  component: NavPage,
})

/* DEMO_START */
function NavDemo() {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <Nav
          title="Synchrotron"
          description="Monitor and control beamline components"
        />
      </div>
    </div>
  )
}
/* DEMO_END */

const navSource = __SOURCE__

function NavPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Experimental", href: "/experimental" },
          { title: "Nav" },
        ]}
        pageHeading="Navigation with Beamline Controls"
        pageSubheading="A synchrotron beamline navigation bar with inline monitors and a controls sheet."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Beamline Navigation</CardTitle>
              <CardDescription>
                A navigation bar featuring inline Ophyd monitors for real-time
                beam parameters and a controls sheet with additional monitors
                and beam blocker controls. Click the "Controls" button to open
                the full control panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer demo={<NavDemo />} source={navSource} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
