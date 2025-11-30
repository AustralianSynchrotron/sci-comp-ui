import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../../../ui/layout/resizable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/layout/resizable')({
  component: ResizablePage,
})

/* DEMO_START */
function BasicResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Panel Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
/* DEMO_END */

const basicResizableSource = __SOURCE__

/* DEMO_START */
function ResizableWithHandleDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Data View</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Controls</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
/* DEMO_END */

const resizableWithHandleSource = __SOURCE__

/* DEMO_START */
function VerticalResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="h-[200px]! max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
/* DEMO_END */

const verticalResizableSource = __SOURCE__

/* DEMO_START */
function NestedResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-2xl rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex h-[400px] items-center justify-center p-6">
          <span className="font-semibold">Experiment Data</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Live Plot</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Analysis Results</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
/* DEMO_END */

const nestedResizableSource = __SOURCE__

function ResizablePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Resizable" }]}
        pageHeading="Resizable"
        pageSubheading="Accessible resizable panel groups and layouts for building complex interfaces."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Horizontal</CardTitle>
              <CardDescription>A simple horizontal resizable panel group</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicResizableDemo />}
                source={basicResizableSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Handle</CardTitle>
              <CardDescription>Resizable panels with a visual drag handle indicator</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ResizableWithHandleDemo />}
                source={resizableWithHandleSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vertical Layout</CardTitle>
              <CardDescription>Panels arranged vertically with resize handle</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<VerticalResizableDemo />}
                source={verticalResizableSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nested Panels</CardTitle>
              <CardDescription>Complex layouts with nested horizontal and vertical resizable panels</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<NestedResizableDemo />}
                source={nestedResizableSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
