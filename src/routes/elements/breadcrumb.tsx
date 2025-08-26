import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator,
  BreadcrumbEllipsis 
} from "../../ui/elements/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/breadcrumb')({
  component: BreadcrumbDemoPage,
})

/* DEMO_START */
function BasicBreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/beamlines">Beamlines</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Beamline 1.1</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicBreadcrumbSource = __SOURCE__

/* DEMO_START */
function ComplexBreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/experiments">Experiments</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/experiments/xas">XAS Studies</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Fe K-edge Analysis</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
/* DEMO_END */

const complexBreadcrumbSource = __SOURCE__

/* DEMO_START */
function EquipmentBreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/equipment">Equipment</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/equipment/detectors">Detectors</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Pilatus 300K</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
/* DEMO_END */

const equipmentBreadcrumbSource = __SOURCE__

function BreadcrumbDemoPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Breadcrumb" }]}
        pageHeading="Breadcrumb"
        pageSubheading="A navigation component that shows the current page location within a hierarchy."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Breadcrumb</CardTitle>
              <CardDescription>Simple navigation hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicBreadcrumbDemo />}
                source={basicBreadcrumbSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complex Navigation</CardTitle>
              <CardDescription>Breadcrumb with ellipsis for long paths</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ComplexBreadcrumbDemo />}
                source={complexBreadcrumbSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Navigation</CardTitle>
              <CardDescription>Navigating through equipment hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<EquipmentBreadcrumbDemo />}
                source={equipmentBreadcrumbSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
