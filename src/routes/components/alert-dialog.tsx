import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../../ui/components/alert-dialog"
import { Button } from "../../ui/elements/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/components/alert-dialog')({
  component: AlertDialogPage,
})

/* DEMO_START */
function BasicAlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Shutdown Beamline</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Beamline Shutdown</AlertDialogTitle>
          <AlertDialogDescription>
            This will terminate all active experiments and close the beamline. 
            Any unsaved data will be lost. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Shutdown</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicAlertDialogSource = __SOURCE__

/* DEMO_START */
function DestructiveAlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Emergency Stop</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emergency Stop Activated</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately halt all beamline operations and activate 
            safety protocols. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Emergency Stop
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
/* DEMO_END */

const destructiveAlertDialogSource = __SOURCE__

/* DEMO_START */
function CustomContentAlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">View Detector Status</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Detector Calibration Required</AlertDialogTitle>
          <AlertDialogDescription>
            The X-ray detector has exceeded its calibration tolerance. 
            Current drift: 0.15° from reference position.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Detector:</strong> Pilatus 6M
            </div>
            <div>
              <strong>Last Calibration:</strong> 2024-01-15 14:30 UTC
            </div>
            <div>
              <strong>Temperature:</strong> 23.4°C
            </div>
            <div>
              <strong>Humidity:</strong> 45.2%
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction>Schedule Calibration</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
/* DEMO_END */

const customContentAlertDialogSource = __SOURCE__

function AlertDialogPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Alert Dialog" }]}
        pageHeading="Alert Dialog"
        pageSubheading="A modal dialog that interrupts the user with important content and requires a response."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Alert Dialog</CardTitle>
              <CardDescription>A simple confirmation dialog for important actions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicAlertDialogDemo />}
                source={basicAlertDialogSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destructive Actions</CardTitle>
              <CardDescription>Alert dialogs for dangerous or irreversible operations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<DestructiveAlertDialogDemo />}
                source={destructiveAlertDialogSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Content</CardTitle>
              <CardDescription>Alert dialogs with additional information and custom layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CustomContentAlertDialogDemo />}
                source={customContentAlertDialogSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
