import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../components/page-header"
import { Button } from "../../../ui/elements/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/button')({
  component: ButtonPage,
})

/* DEMO_START */
function BasicButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicButtonSource = __SOURCE__

/* DEMO_START */
function ButtonSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
/* DEMO_END */

const buttonSizesSource = __SOURCE__

/* DEMO_START */
function ButtonStatesDemo() {
  return (
    <div className="flex gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  )
}
/* DEMO_END */

const buttonStatesSource = __SOURCE__

function ButtonPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Button" }]}
        pageHeading="Button"
        pageSubheading="Displays a button or a component that looks like a button."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Different button styles for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicButtonDemo />}
                source={basicButtonSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Different button sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonSizesDemo />}
                source={buttonSizesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>Button states and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ButtonStatesDemo />}
                source={buttonStatesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}