import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { PageHeader } from "../../docs/components/page-header"
import { UnitsField } from "../../ui/experimental/units-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "../../docs/components/demo-container"
import { synchrotronMath, type SynchrotronValue } from "../../lib/units-math"

export const Route = createFileRoute("/experimental/units-field")({
  component: UnitsFieldPage,
})

/* DEMO_START */
function BasicUnitsDemo() {
  return (
    <div className="space-y-4">
      <UnitsField label="Photon Energy" defaultValue={12.4} defaultUnit="keV" />
      <UnitsField label="Beam Current" defaultValue={200} defaultUnit="mA" />
      <UnitsField label="Vacuum Pressure" defaultValue={1e-9} defaultUnit="Torr" />
      <UnitsField label="Magnetic Field" defaultValue={1.5} defaultUnit="T" />
    </div>
  )
}
/* DEMO_END */

const basicUnitsSource = __SOURCE__

/* DEMO_START */
function EnergyWavelengthDemo() {
  const [energyValue, setEnergyValue] = useState<SynchrotronValue>()
  const [wavelengthValue, setWavelengthValue] = useState<SynchrotronValue>()

  // Auto-convert energy to wavelength
  useEffect(() => {
    if (energyValue && energyValue.nativeValue > 0) {
      const wavelength = synchrotronMath.energyToWavelength(energyValue)
      setWavelengthValue(wavelength)
    }
  }, [energyValue])

  return (
    <div className="space-y-4">
      <UnitsField 
        label="Photon Energy" 
        defaultValue={12.4} 
        defaultUnit="keV" 
        onChange={setEnergyValue} 
      />

      {wavelengthValue && (
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium">Auto-calculated Wavelength:</div>
          <div className="text-lg">
            {wavelengthValue.value.toExponential(3)} m ={" "}
            {synchrotronMath.convertForDisplay(wavelengthValue, "angstrom").value.toFixed(3)} Å
          </div>
        </div>
      )}
    </div>
  )
}
/* DEMO_END */

const energyWavelengthSource = __SOURCE__

function UnitsFieldPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Experimental", href: "/experimental" }, { title: "Units Field" }]}
        pageHeading="Units Field"
        pageSubheading="An input field for values with unit conversion."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Units</CardTitle>
              <CardDescription>Different types of scientific units commonly used in synchrotron facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicUnitsDemo />}
                source={basicUnitsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy-Wavelength Conversion</CardTitle>
              <CardDescription>Automatic conversion between photon energy and wavelength using E = hc/λ</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<EnergyWavelengthDemo />}
                source={energyWavelengthSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
