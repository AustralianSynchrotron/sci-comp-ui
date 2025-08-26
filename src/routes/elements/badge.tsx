import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Badge } from "../../ui/elements/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { CheckCircle, Info, AlertTriangle } from "lucide-react"

export const Route = createFileRoute('/elements/badge')({
  component: BadgePage,
})

/* DEMO_START */
function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Beam Active</Badge>
      <Badge variant="secondary">Energy: 6.5 GeV</Badge>
      <Badge variant="success">System Online</Badge>
      <Badge variant="warning">Maintenance Due</Badge>
      <Badge variant="destructive">Interlock Tripped</Badge>
      <Badge variant="outline">Current: 200 mA</Badge>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const badgeVariantsSource = __SOURCE__

/* DEMO_START */
function BadgeWithIconsDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">
        <CheckCircle className="size-3" />
        Synchrotron Ready
      </Badge>
      <Badge variant="secondary">
        <Info className="size-3" />
        Vacuum OK
      </Badge>
      <Badge variant="success">
        <CheckCircle className="size-3" />
        All Systems Green
      </Badge>
      <Badge variant="warning">
        <AlertTriangle className="size-3" />
        Low Power Mode
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle className="size-3" />
        RF Fault
      </Badge>
    </div>
  )
}
/* DEMO_END */

const badgeWithIconsSource = __SOURCE__

/* DEMO_START */
function StatusBadgesDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">Operational</Badge>
      <Badge variant="warning">Degraded</Badge>
      <Badge variant="destructive">Critical</Badge>
      <Badge variant="secondary">Standby</Badge>
    </div>
  )
}
/* DEMO_END */

const statusBadgesSource = __SOURCE__

function BadgePage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Badge" }]}
        pageHeading="Badge"
        pageSubheading="Displays a badge or a component that looks like a badge."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Different badge styles for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BadgeVariantsDemo />}
                source={badgeVariantsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Badges with icons for enhanced visual communication</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BadgeWithIconsDemo />}
                source={badgeWithIconsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
              <CardDescription>Badges for indicating system status</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<StatusBadgesDemo />}
                source={statusBadgesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
