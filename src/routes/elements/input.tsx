import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { PageHeader } from "../../docs/components/page-header"
import { Input } from "../../ui/elements/input"
import { Label } from "../../ui/elements/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { DatePicker } from "../../ui/components/date-picker"

export const Route = createFileRoute("/elements/input")({
  component: InputPage,
})

/* DEMO_START */
function BasicInputDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" />
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicInputSource = __SOURCE__

/* DEMO_START */
function InputTypesDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="Enter a number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <DatePicker
          value={selectedDate}
          onValueChange={setSelectedDate}
          placeholder="Select a date"
        />
      </div>
    </div>
  )
}
/* DEMO_END */

const inputTypesSource = __SOURCE__

/* DEMO_START */
function InputStatesDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="normal">Normal</Label>
        <Input id="normal" placeholder="Normal input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>
    </div>
  )
}
/* DEMO_END */

const inputStatesSource = __SOURCE__

function InputPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Input" }]}
        pageHeading="Input"
        pageSubheading="Displays a form input field or a component that looks like an input field."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Basic Input</CardTitle>
              <CardDescription>Standard input field</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicInputDemo />}
                source={basicInputSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Input Types</CardTitle>
              <CardDescription>Different input types</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<InputTypesDemo />}
                source={inputTypesSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>Input states and variations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<InputStatesDemo />}
                source={inputStatesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
