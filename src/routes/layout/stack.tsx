import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../docs/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { Button } from "../../ui/elements/button"
import { DemoContainer } from "@/docs/components/demo-container"
import { CodeBlock } from "../../ui/components/code-block"

export const Route = createFileRoute("/layout/stack")({
  component: StackPage,
})

/* DEMO_START */
function VerticalStackDemo() {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-blue-50 border rounded">Item 1</div>
      <div className="p-3 bg-green-50 border rounded">Item 2</div>
      <div className="p-3 bg-yellow-50 border rounded">Item 3</div>
      <div className="p-3 bg-red-50 border rounded">Item 4</div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const verticalStackSource = __SOURCE__

/* DEMO_START */
function HorizontalStackDemo() {
  return (
    <div className="flex gap-4">
      <div className="p-3 bg-blue-50 border rounded flex-1">Item 1</div>
      <div className="p-3 bg-green-50 border rounded flex-1">Item 2</div>
      <div className="p-3 bg-yellow-50 border rounded flex-1">Item 3</div>
    </div>
  )
}
/* DEMO_END */

const horizontalStackSource = __SOURCE__

/* DEMO_START */
function ButtonStackDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-semibold">Vertical Button Stack</h4>
        <div className="space-y-2">
          <Button className="w-full">Primary Action</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Secondary Action
          </Button>
          <Button variant="ghost" className="w-full">
            Tertiary Action
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold">Horizontal Button Stack</h4>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const buttonStackSource = __SOURCE__

/* DEMO_START */
function StackSpacingDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Tight spacing (space-y-1)</h4>
        <div className="space-y-1">
          <div className="p-2 bg-muted rounded text-sm">Item 1</div>
          <div className="p-2 bg-muted rounded text-sm">Item 2</div>
          <div className="p-2 bg-muted rounded text-sm">Item 3</div>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Loose spacing (space-y-8)</h4>
        <div className="space-y-8">
          <div className="p-2 bg-muted rounded text-sm">Item 1</div>
          <div className="p-2 bg-muted rounded text-sm">Item 2</div>
          <div className="p-2 bg-muted rounded text-sm">Item 3</div>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const stackSpacingSource = __SOURCE__

function StackPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Stack" }]}
        pageHeading="Stack"
        pageSubheading="Arrange elements in vertical or horizontal stacks with consistent spacing."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vertical Stack</CardTitle>
              <CardDescription>Elements stacked vertically with consistent spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<VerticalStackDemo />}
                source={verticalStackSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horizontal Stack</CardTitle>
              <CardDescription>Elements arranged horizontally with spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<HorizontalStackDemo />}
                source={horizontalStackSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Stack</CardTitle>
              <CardDescription>Common pattern for stacking buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonStackDemo />}
                source={buttonStackSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Different Spacing</CardTitle>
              <CardDescription>Stacks with various spacing options</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<StackSpacingDemo />}
                source={stackSpacingSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>How to create stack layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="jsx" code={`// Vertical stack
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Horizontal stack
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Button stack
<div className="space-y-2">
  <Button className="w-full">Primary</Button>
  <Button variant="outline" className="w-full bg-transparent">Secondary</Button>
</div>`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
