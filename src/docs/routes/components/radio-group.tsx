import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../components/page-header"
import { RadioGroup, RadioGroupItem } from "../../../ui/components/radio-group"
import { Label } from "../../../ui/elements/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { CodeBlock } from "../../../ui/components/code-block"

export const Route = createFileRoute("/components/radio-group")({
  component: RadioGroupPage,
})

/* DEMO_START */
function BasicRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicRadioGroupSource = __SOURCE__

/* DEMO_START */
function RadioGroupWithDescriptionsDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="option-one">Option One</Label>
          <p className="text-xs text-muted-foreground">This is the first option with a description.</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="option-two">Option Two</Label>
          <p className="text-xs text-muted-foreground">This is the second option with a description.</p>
        </div>
      </div>
    </RadioGroup>
  )
}
/* DEMO_END */

const radioGroupWithDescriptionsSource = __SOURCE__

/* DEMO_START */
function DisabledRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="enabled">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="enabled" id="enabled" />
        <Label htmlFor="enabled">Enabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled" id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
    </RadioGroup>
  )
}
/* DEMO_END */

const disabledRadioGroupSource = __SOURCE__

function RadioGroupPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Radio Group" }]}
        pageHeading="Radio Group"
        pageSubheading="A set of checkable buttons, where no more than one of the buttons can be checked at a time."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Radio Group</CardTitle>
              <CardDescription>A simple radio group with options</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicRadioGroupDemo />}
                source={basicRadioGroupSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radio Group with Descriptions</CardTitle>
              <CardDescription>Radio options with additional descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<RadioGroupWithDescriptionsDemo />}
                source={radioGroupWithDescriptionsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disabled State</CardTitle>
              <CardDescription>Radio group with disabled options</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<DisabledRadioGroupDemo />}
                source={disabledRadioGroupSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>How to use the Radio Group component</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="jsx" code={`import { RadioGroup, RadioGroupItem } from "sci-comp-ui/radio-group"
import { Label } from "sci-comp-ui/label"

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
