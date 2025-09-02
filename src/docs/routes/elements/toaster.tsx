import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Button } from "../../../ui/elements/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { Toaster } from "../../../ui/elements/toaster"
import { DemoContainer } from "@/docs/components/demo-container"
import { toast } from "sonner"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export const Route = createFileRoute('/elements/toaster')({
  component: ToasterPage,
})

/* DEMO_START */
function BasicToasterDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        onClick={() => toast.success("Beamline 7-ID successfully initialised", {
          icon: <CheckCircle className="w-5 h-5 text-success" />,
          className: 'bg-success/10 border-success/20 text-success-foreground',
        })}
        variant="success"
      >
        Success Toast
      </Button>
      <Button 
        onClick={() => toast.error("Detector temperature exceeded limits", {
          icon: <XCircle className="w-5 h-5 text-destructive" />,
          className: 'bg-destructive/10 border-destructive/20 text-destructive-foreground',
        })}
        variant="destructive"
      >
        Error Toast
      </Button>
      <Button 
        onClick={() => toast.warning("Beam intensity fluctuating", {
          icon: <AlertTriangle className="w-5 h-5 text-warning" />,
          className: 'bg-warning/10 border-warning/20 text-warning-foreground',
        })}
        variant="outline"
        className="border-warning text-warning hover:bg-warning/10"
      >
        Warning Toast
      </Button>
      <Button 
        onClick={() => toast.info("Sample stage moving to position (150, 300)", {
          icon: <div className="animate-pulse w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>,
          className: 'bg-primary/10 border-primary/20 text-primary-foreground',
        })}
        variant="outline"
      >
        Info Toast
      </Button>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicToasterSource = __SOURCE__

/* DEMO_START */
function ToasterWithActionsDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        onClick={() => toast("Data collection complete", {
          description: "1000 frames collected at 10Hz",
          action: {
            label: "View Data",
            onClick: () => console.log("View data clicked")
          }
        })}
        variant="default"
      >
        Toast with Action
      </Button>
      <Button 
        onClick={() => toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            loading: "Calibrating detector...",
            success: "Detector calibration successful",
            error: "Calibration failed - check connections"
          }
        )}
        variant="secondary"
      >
        Promise Toast
      </Button>
    </div>
  )
}
/* DEMO_END */

const toasterWithActionsSource = __SOURCE__

/* DEMO_START */
function ToasterCustomizationDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        onClick={() => toast("Custom duration toast", {
          description: "This toast will stay visible for 10 seconds",
          duration: 10000
        })}
        variant="ghost"
      >
        Long Duration
      </Button>
      <Button 
        onClick={() => toast("Rich content toast", {
          description: "Supports markdown and rich formatting",
          action: {
            label: "Acknowledge",
            onClick: () => console.log("Acknowledged")
          }
        })}
        variant="outline"
      >
        Rich Content
      </Button>
    </div>
  )
}
/* DEMO_END */

const toasterCustomizationSource = __SOURCE__


function ToasterPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Toaster" }]}
        pageHeading="Toaster"
        pageSubheading="A toast component for displaying notifications and alerts with multiple variants."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Toaster</CardTitle>
              <CardDescription>Different types of toast notifications for synchrotron operations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicToasterDemo />}
                source={basicToasterSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toaster with Actions</CardTitle>
              <CardDescription>Interactive toasts with actions and promise handling</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ToasterWithActionsDemo />}
                source={toasterWithActionsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>Additional toast options and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ToasterCustomizationDemo />}
                source={toasterCustomizationSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}
