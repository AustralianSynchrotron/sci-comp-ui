import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/elements/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"
import { Button } from "../../../ui/elements/button"

export const Route = createFileRoute('/elements/tooltip')({
  component: TooltipPage,
})

/* DEMO_START */
function BasicTooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Beam Current</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Current beam current: 200 mA</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Energy</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>X-ray energy: 7.1 keV (Fe K-edge)</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Flux</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Photon flux: 1.2×10¹² ph/s</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicTooltipSource = __SOURCE__

/* DEMO_START */
function StatusTooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-help"></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Beamline operational - all systems normal</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-help"></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Warning - vacuum pressure above normal</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-help"></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Error - interlock system activated</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
/* DEMO_END */

const statusTooltipSource = __SOURCE__

/* DEMO_START */
function EquipmentTooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">Pilatus 300K</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Area detector: 487×619 pixels, 172×172 μm²</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">Monochromator</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Si(111) double crystal, energy resolution: ΔE/E ≈ 10⁻⁴</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">Ion Chambers</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Gas-filled ionization chambers for flux monitoring</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
/* DEMO_END */

const equipmentTooltipSource = __SOURCE__

function TooltipPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Tooltip" }]}
        pageHeading="Tooltip"
        pageSubheading="A popup that displays information related to an element when the element receives keyboard focus or mouse hover."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Tooltips</CardTitle>
              <CardDescription>Simple tooltips with contextual information</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicTooltipDemo />}
                source={basicTooltipSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Indicators</CardTitle>
              <CardDescription>Tooltips for status and warning indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<StatusTooltipDemo />}
                source={statusTooltipSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Information</CardTitle>
              <CardDescription>Detailed tooltips for equipment specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<EquipmentTooltipDemo />}
                source={equipmentTooltipSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
