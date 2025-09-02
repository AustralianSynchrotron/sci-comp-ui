import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Grid } from "../../../ui/layout/grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/layout/grid')({
  component: GridPage,
})

/* DEMO_START */
function BasicGridDemo() {
  return (
    <Grid container columns={3} gap={4}>
      <Grid item className="rounded-md border p-4 text-center">
        <div className="text-sm font-medium">Beam Current</div>
        <div className="text-2xl font-bold text-green-600">200 mA</div>
      </Grid>
      <Grid item className="rounded-md border p-4 text-center">
        <div className="text-sm font-medium">Energy</div>
        <div className="text-2xl font-bold text-blue-600">8.0 keV</div>
      </Grid>
      <Grid item className="rounded-md border p-4 text-center">
        <div className="text-sm font-medium">Flux</div>
        <div className="text-2xl font-bold text-purple-600">1.2e12</div>
      </Grid>
    </Grid>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicGridSource = __SOURCE__

/* DEMO_START */
function ResponsiveGridDemo() {
  return (
    <Grid container columns={12} gap={4}>
      <Grid item colSpan={12} className="sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="rounded-md border p-4 text-center">
          <div className="text-sm font-medium">Detector 1</div>
          <div className="text-lg font-semibold text-blue-600">Active</div>
        </div>
      </Grid>
      <Grid item colSpan={12} className="sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="rounded-md border p-4 text-center">
          <div className="text-sm font-medium">Detector 2</div>
          <div className="text-lg font-semibold text-green-600">Active</div>
        </div>
      </Grid>
      <Grid item colSpan={12} className="sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="rounded-md border p-4 text-center">
          <div className="text-sm font-medium">Detector 3</div>
          <div className="text-lg font-semibold text-orange-600">Standby</div>
        </div>
      </Grid>
      <Grid item colSpan={12} className="sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="rounded-md border p-4 text-center">
          <div className="text-sm font-medium">Detector 4</div>
          <div className="text-lg font-semibold text-red-600">Offline</div>
        </div>
      </Grid>
    </Grid>
  )
}
/* DEMO_END */

const responsiveGridSource = __SOURCE__

/* DEMO_START */
function ComplexGridDemo() {
  return (
    <Grid container columns={6} rows={4} gap={2} className="h-64">
      <Grid item colSpan={2} rowSpan={2} className="rounded-md border bg-blue-50 p-4">
        <div className="text-sm font-medium">Beam Monitor</div>
        <div className="text-xs text-muted-foreground">Large display area</div>
      </Grid>
      <Grid item colSpan={4} className="rounded-md border bg-green-50 p-4">
        <div className="text-sm font-medium">Status Bar</div>
        <div className="text-xs text-muted-foreground">Wide status display</div>
      </Grid>
      <Grid item colSpan={2} className="rounded-md border bg-purple-50 p-4">
        <div className="text-sm font-medium">Controls</div>
        <div className="text-xs text-muted-foreground">Control panel</div>
      </Grid>
      <Grid item colSpan={2} className="rounded-md border bg-orange-50 p-4">
        <div className="text-sm font-medium">Logs</div>
        <div className="text-xs text-muted-foreground">Event log</div>
      </Grid>
      <Grid item colSpan={6} className="rounded-md border bg-gray-50 p-4">
        <div className="text-sm font-medium">Footer</div>
        <div className="text-xs text-muted-foreground">Full width footer</div>
      </Grid>
    </Grid>
  )
}
/* DEMO_END */

const complexGridSource = __SOURCE__

function GridPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Grid" }]}
        pageHeading="Grid"
        pageSubheading="A grid system for creating responsive layouts with customizable columns, rows, and spacing."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Grid</CardTitle>
              <CardDescription>A simple 3-column grid with beamline metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicGridDemo />}
                source={basicGridSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsive Grid</CardTitle>
              <CardDescription>A responsive grid that adapts to different screen sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ResponsiveGridDemo />}
                source={responsiveGridSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complex Grid Layout</CardTitle>
              <CardDescription>A grid with custom column and row spans for complex layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ComplexGridDemo />}
                source={complexGridSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
