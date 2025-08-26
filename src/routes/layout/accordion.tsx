import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/layout/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/layout/accordion')({
  component: AccordionPage,
})

/* DEMO_START */
function BasicAccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="beamline-status">
        <AccordionTrigger>Beamline Status</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Beam Current:</span>
              <span className="font-mono text-green-600">200 mA</span>
            </div>
            <div className="flex justify-between">
              <span>Energy:</span>
              <span className="font-mono text-blue-600">8.0 keV</span>
            </div>
            <div className="flex justify-between">
              <span>Flux:</span>
              <span className="font-mono text-purple-600">1.2e12 ph/s</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="detector-info">
        <AccordionTrigger>Detector Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-mono">Pilatus 6M</span>
            </div>
            <div className="flex justify-between">
              <span>Pixel Size:</span>
              <span className="font-mono">172 μm</span>
            </div>
            <div className="flex justify-between">
              <span>Array Size:</span>
              <span className="font-mono">2463×2527</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sample-data">
        <AccordionTrigger>Sample Data Collection</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Exposure Time:</span>
              <span className="font-mono">0.1 s</span>
            </div>
            <div className="flex justify-between">
              <span>Distance:</span>
              <span className="font-mono">300 mm</span>
            </div>
            <div className="flex justify-between">
              <span>Oscillation:</span>
              <span className="font-mono">0.1°</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicAccordionSource = __SOURCE__

/* DEMO_START */
function MultipleAccordionDemo() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="system-alerts">
        <AccordionTrigger>System Alerts</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="rounded bg-yellow-50 p-2 text-yellow-800">
              ⚠️ Beam current below optimal range
            </div>
            <div className="rounded bg-green-50 p-2 text-green-800">
              ✅ Detector temperature stable
            </div>
            <div className="rounded bg-blue-50 p-2 text-blue-800">
              ℹ️ Maintenance scheduled for next week
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="data-quality">
        <AccordionTrigger>Data Quality Metrics</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Resolution:</span>
              <span className="font-mono text-green-600">1.8 Å</span>
            </div>
            <div className="flex justify-between">
              <span>Completeness:</span>
              <span className="font-mono text-blue-600">98.2%</span>
            </div>
            <div className="flex justify-between">
              <span>I/σ(I):</span>
              <span className="font-mono text-purple-600">12.4</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="environmental">
        <AccordionTrigger>Environmental Conditions</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Temperature:</span>
              <span className="font-mono">22.5°C</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity:</span>
              <span className="font-mono">45%</span>
            </div>
            <div className="flex justify-between">
              <span>Pressure:</span>
              <span className="font-mono">1013 hPa</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
/* DEMO_END */

const multipleAccordionSource = __SOURCE__

function AccordionPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Accordion" }]}
        pageHeading="Accordion"
        pageSubheading="A vertically collapsible section that can be used to organize content into expandable areas."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Accordion</CardTitle>
              <CardDescription>A single collapsible accordion with beamline information</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicAccordionDemo />}
                source={basicAccordionSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multiple Accordion</CardTitle>
              <CardDescription>Multiple sections can be expanded simultaneously</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<MultipleAccordionDemo />}
                source={multipleAccordionSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
