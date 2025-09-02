import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../components/page-header"
import { Progress } from "../../../ui/elements/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { Button } from "../../../ui/elements/button"
import { useState } from "react"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute("/elements/progress")({
  component: ProgressPage,
})

/* DEMO_START */
function BasicProgressDemo() {
  return (
    <div className="space-y-4">
      <Progress value={33} className="w-full" />
      <p className="text-sm text-muted-foreground">33% complete</p>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicProgressSource = __SOURCE__

/* DEMO_START */
function InteractiveProgressDemo() {
  const [progress, setProgress] = useState(33)

  return (
    <div className="space-y-4">
      <Progress value={progress} className="w-full" />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
          -10%
        </Button>
        <Button variant="outline" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
          +10%
        </Button>
        <Button variant="outline" size="sm" onClick={() => setProgress(0)}>
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{progress}% complete</p>
    </div>
  )
}
/* DEMO_END */

const interactiveProgressSource = __SOURCE__

/* DEMO_START */
function ProgressValuesDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Loading...</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>In Progress</span>
          <span>60%</span>
        </div>
        <Progress value={60} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Almost Done</span>
          <span>90%</span>
        </div>
        <Progress value={90} />
      </div>
    </div>
  )
}
/* DEMO_END */

const progressValuesSource = __SOURCE__

function ProgressPage() {

  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Progress" }]}
        pageHeading="Progress"
        pageSubheading="Displays an indicator showing the completion progress of a task."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Basic Progress</CardTitle>
              <CardDescription>A simple progress bar</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicProgressDemo />}
                source={basicProgressSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Progress</CardTitle>
              <CardDescription>Progress bar with controls</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<InteractiveProgressDemo />}
                source={interactiveProgressSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Different Values</CardTitle>
              <CardDescription>Progress bars with different completion values</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ProgressValuesDemo />}
                source={progressValuesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
