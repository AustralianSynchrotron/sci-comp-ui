import { useState } from "react"
import { PanelTopOpen as SheetIcon } from "lucide-react"

import { Button } from "../elements/button"
import { OphydMonitor } from "../components/ophyd-monitor"
import { BeamBlockerControl, type ShutterConfig } from "./beam-blockers-control"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../layout/sheet"
import {
  NavigationMenu,
  NavigationMenuList,
  // NavigationMenuContent,
  // NavigationMenuItem,
  // NavigationMenuLink,
  // NavigationMenuTrigger,
} from "../components/navigation-menu"

interface NavProps {
  title?: string
  description?: string
}

export function Nav({ title, description }: NavProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <span className="font-semibold mr-4">{title}</span>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Beamline</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Status</NavigationMenuLink>
                <NavigationMenuLink href="#">Configuration</NavigationMenuLink>
                <NavigationMenuLink href="#">Diagnostics</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Monitors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Energy</NavigationMenuLink>
                <NavigationMenuLink href="#">Flux</NavigationMenuLink>
                <NavigationMenuLink href="#">Position</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-3">
        {/* Inline Ophyd Monitors */}
        <div className="flex items-center gap-3 ml-8">
          <OphydMonitor
            label="Energy"
            value={12.4}
            units="keV"
            pvname="PV:ENERGY"
            variant="grid"
          />
          <OphydMonitor
            label="Ring Current"
            value={200.5}
            units="mA"
            pvname="PV:RING_CURRENT"
            variant="grid"
          />
          <OphydMonitor
            label="Beam Size"
            value={0.125}
            units="mm"
            pvname="PV:BEAM_SIZE"
            variant="grid"
          />
        </div>

        {/* Sheet Toggle */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SheetIcon className="h-4 w-4 mr-2" />
              View more
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 p-6">
              {/* Ophyd Monitors in Sheet */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Ophyd Monitors</h3>
                <div className="grid grid-cols-4 gap-4">
                  <OphydMonitor
                    label="Energy"
                    value={12.4}
                    units="keV"
                    pvname="PV:ENERGY"
                    variant="grid"
                  />
                  <OphydMonitor
                    label="Flux"
                    value={1.2e12}
                    units="ph/s"
                    pvname="PV:FLUX"
                    variant="grid"
                  />
                  <OphydMonitor
                    label="Ring Current"
                    value={200.5}
                    units="mA"
                    pvname="PV:RING_CURRENT"
                    variant="grid"
                  />
                  <OphydMonitor
                    label="Beam Size"
                    value={0.125}
                    units="mm"
                    pvname="PV:BEAM_SIZE"
                    variant="grid"
                  />
                </div>
              </div>

              {/* Beam Blockers Control */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Beam Blockers</h3>
                <BasicBeamBlockerDemo />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function BasicBeamBlockerDemo() {
  const [shutters, setShutters] = useState<ShutterConfig[]>([
    { id: "shut01", name: "SHUT 01", type: "shutter", isOpen: false },
    { id: "shut02", name: "SHUT 02", type: "shutter", isOpen: false },
    { id: "shut03", name: "SHUT 03", type: "shutter", isOpen: true },
  ])

  const handleShutterChange = (shutterId: string, isOpen: boolean) => {
    setShutters((prev) =>
      prev.map((shutter) =>
        shutter.id === shutterId ? { ...shutter, isOpen } : shutter
      )
    )
  }

  return (
    <div>
      <BeamBlockerControl
        shutters={shutters}
        onShutterChange={handleShutterChange}
      />
    </div>
  )
}
