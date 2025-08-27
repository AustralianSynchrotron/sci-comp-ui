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
      <h4 className="font-medium mb-3">Basic Navigation</h4>
      <Nav textProp="Hello, world!" />
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
        pageHeading="NAV"
        pageSubheading="A navigation component with a text prop."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nav</CardTitle>
              <CardDescription>
                A navigation component with a text prop.
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
