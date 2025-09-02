import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Alert, AlertDescription, AlertTitle } from "../../../ui/components/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

export const Route = createFileRoute('/components/alert')({
  component: AlertPage,
})

/* DEMO_START */
function BasicAlertDemo() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Beamline Status</AlertTitle>
        <AlertDescription>
          The X-ray source is operating at 12.4 keV with a current of 200 mA. 
          All safety systems are functioning normally.
        </AlertDescription>
      </Alert>
      
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Calibration Complete</AlertTitle>
        <AlertDescription>
          Detector calibration has been completed successfully. 
          Resolution: 0.1° ± 0.02° from reference position.
        </AlertDescription>
      </Alert>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicAlertSource = __SOURCE__

/* DEMO_START */
function DestructiveAlertDemo() {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Warning</AlertTitle>
        <AlertDescription>
          Beamline temperature has exceeded safe operating limits. 
          Current: 85°C (Max: 80°C). Immediate intervention required.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Radiation Safety Alert</AlertTitle>
        <AlertDescription>
          Interlock system has detected an unauthorised access attempt. 
          Beam has been automatically shut down. Contact safety officer immediately.
        </AlertDescription>
      </Alert>
    </div>
  )
}
/* DEMO_END */

const destructiveAlertSource = __SOURCE__

/* DEMO_START */
function CustomAlertDemo() {
  return (
    <div className="space-y-4">
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Experiment Progress</AlertTitle>
        <AlertDescription className="text-blue-700">
          Data collection at 45% completion. Estimated time remaining: 2 hours 15 minutes. 
          Current sample: Protein crystal (PDB: 1ABC) at 100K.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Maintenance Reminder</AlertTitle>
        <AlertDescription className="text-amber-700">
          Scheduled maintenance for goniometer system in 3 days. 
          Please complete all experiments by end of shift.
        </AlertDescription>
      </Alert>
    </div>
  )
}
/* DEMO_END */

const customAlertSource = __SOURCE__

function AlertPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Alert" }]}
        pageHeading="Alert"
        pageSubheading="Displays important messages to users about their actions or system status."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Alerts</CardTitle>
              <CardDescription>Standard alert messages with icons and descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicAlertDemo />}
                source={basicAlertSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destructive Alerts</CardTitle>
              <CardDescription>Alerts for critical warnings and error conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<DestructiveAlertDemo />}
                source={destructiveAlertSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Styling</CardTitle>
              <CardDescription>Alerts with custom colors and styling for different contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CustomAlertDemo />}
                source={customAlertSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
