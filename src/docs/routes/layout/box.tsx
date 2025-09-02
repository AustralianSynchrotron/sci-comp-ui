import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { CodeBlock } from "../../../ui/components/code-block"

export const Route = createFileRoute("/layout/box")({
  component: BoxPage,
})

/* DEMO_START */
function BasicBoxDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <p>This is a basic box with border and padding.</p>
      </div>
      <div className="p-4 bg-muted rounded-lg">
        <p>This is a box with background color.</p>
      </div>
      <div className="p-4 border-2 border-dashed border-muted-foreground rounded-lg">
        <p>This is a box with dashed border.</p>
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicBoxSource = __SOURCE__

/* DEMO_START */
function BoxSpacingDemo() {
  return (
    <div className="space-y-4">
      <div className="p-2 border rounded-lg bg-blue-50">
        <p>Small padding (p-2)</p>
      </div>
      <div className="p-4 border rounded-lg bg-green-50">
        <p>Medium padding (p-4)</p>
      </div>
      <div className="p-8 border rounded-lg bg-yellow-50">
        <p>Large padding (p-8)</p>
      </div>
    </div>
  )
}
/* DEMO_END */

const boxSpacingSource = __SOURCE__

/* DEMO_START */
function NestedBoxesDemo() {
  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-4">Outer box</p>
      <div className="p-4 bg-muted rounded-lg">
        <p className="mb-2">Inner box</p>
        <div className="p-2 bg-background border rounded">
          <p>Nested box</p>
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const nestedBoxesSource = __SOURCE__

function BoxPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Box" }]}
        pageHeading="Box"
        pageSubheading="A fundamental layout component for creating containers and spacing."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Box</CardTitle>
              <CardDescription>Simple container boxes with different styles</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicBoxDemo />}
                source={basicBoxSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Box Spacing</CardTitle>
              <CardDescription>Different padding and margin configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BoxSpacingDemo />}
                source={boxSpacingSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nested Boxes</CardTitle>
              <CardDescription>Boxes within boxes for complex layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<NestedBoxesDemo />}
                source={nestedBoxesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>How to create box layouts with Tailwind classes</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="jsx" code={`// Basic box with padding and border
<div className="p-4 border rounded-lg">
  Content here
</div>

// Box with background
<div className="p-4 bg-muted rounded-lg">
  Content here
</div>

// Responsive box
<div className="p-2 md:p-4 lg:p-6 border rounded-lg">
  Responsive padding
</div>`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
