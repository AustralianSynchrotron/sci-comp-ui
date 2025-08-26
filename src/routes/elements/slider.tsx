import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { Slider } from "../../ui/elements/slider"
import { Label } from "../../ui/elements/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/slider')({
  component: SliderPage,
})

/* DEMO_START */
function BasicSliderDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>X-ray Energy (keV)</Label>
        <Slider defaultValue={[12.4]} max={25} min={5} step={0.1} />
        <p className="text-xs text-muted-foreground">Range: 5.0 - 25.0 keV</p>
      </div>
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicSliderSource = __SOURCE__

/* DEMO_START */
function RangeSliderDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Detector Distance Range (mm)</Label>
        <Slider defaultValue={[150, 300]} max={500} min={50} step={5} />
        <p className="text-xs text-muted-foreground">Range: 50 - 500 mm</p>
      </div>
    </div>
  )
}
/* DEMO_END */

const rangeSliderSource = __SOURCE__

/* DEMO_START */
function SliderStatesDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Beam Current (mA)</Label>
        <Slider defaultValue={[100]} max={200} min={0} step={1} />
        <p className="text-xs text-muted-foreground">Normal operation range</p>
      </div>
      <div className="space-y-2">
        <Label>Sample Temperature (K)</Label>
        <Slider defaultValue={[300]} max={1000} min={77} step={1} disabled />
        <p className="text-xs text-muted-foreground">Cryostat offline</p>
      </div>
    </div>
  )
}
/* DEMO_END */

const sliderStatesSource = __SOURCE__

function SliderPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Slider" }]}
        pageHeading="Slider"
        pageSubheading="A form control that allows users to select a value or range of values from a given range."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Slider</CardTitle>
              <CardDescription>Single value slider for X-ray energy control</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicSliderDemo />}
                source={basicSliderSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Range Slider</CardTitle>
              <CardDescription>Dual-thumb slider for setting distance ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<RangeSliderDemo />}
                source={rangeSliderSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slider States</CardTitle>
              <CardDescription>Different slider states including disabled</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SliderStatesDemo />}
                source={sliderStatesSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
