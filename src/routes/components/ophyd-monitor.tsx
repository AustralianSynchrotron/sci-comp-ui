import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { PageHeader } from "../../docs/components/page-header"
import { OphydMonitor } from "../../ui/components/ophyd-monitor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { Button } from "../../ui/elements/button"
import { Badge } from "../../ui/elements/badge"
import { DemoContainer } from "../../docs/components/demo-container"
import { toast } from "sonner"

export const Route = createFileRoute('/components/ophyd-monitor')({
  component: OphydMonitorPage,
})

// Mock data generator for demonstration
const generateMockData = () => {
  return Array.from({ length: 20 }, () => Math.random() * 100 + Math.sin(Date.now() / 1000) * 20)
}

/* DEMO_START */
function BasicVariantsDemo() {
  const mockDevice = {
    label: "Temperature Sensor",
    pvname: "BL:TEMP:01",
    value: 23.5,
    units: "°C",
    isConnected: true,
    lastUpdate: new Date(Date.now() - 5000),
    data: [20, 22, 21, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30],
  }

  const handleCopyPV = (pvname: string) => {
    toast.success(`PV Copied: ${pvname}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Compact Variant</h4>
        <OphydMonitor
          variant="compact"
          {...mockDevice}
          onCopyPV={handleCopyPV}
        />
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Grid Variant</h4>
        <div className="max-w-sm">
          <OphydMonitor
            variant="grid"
            {...mockDevice}
            onCopyPV={handleCopyPV}
          />
        </div>
      </div>
    </div>
  )
}
/* DEMO_END */

const basicVariantsSource = __SOURCE__

/* DEMO_START */
function ConnectionStatesDemo() {
  const connectedDevice = {
    label: "Pressure Gauge",
    pvname: "BL:PRESS:01",
    value: 1013.25,
    units: "mbar",
    isConnected: true,
    lastUpdate: new Date(Date.now() - 2000),
    data: [1010, 1012, 1011, 1013, 1015, 1014, 1016, 1015, 1017, 1016],
  }

  const disconnectedDevice = {
    label: "Flow Meter",
    pvname: "BL:FLOW:01",
    value: 45.2,
    units: "L/min",
    isConnected: false,
    lastUpdate: new Date(Date.now() - 120000),
    data: [40, 42, 41, 43, 45, 44, 46, 45, 47, 46],
  }

  const handleCopyPV = (pvname: string) => {
    toast.success(`PV Copied: ${pvname}`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          Connected Device
          <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
        </h4>
        <OphydMonitor
          variant="grid"
          {...connectedDevice}
          onCopyPV={handleCopyPV}
        />
      </div>
      
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          Disconnected Device
          <Badge variant="destructive">Offline</Badge>
        </h4>
        <OphydMonitor
          variant="grid"
          {...disconnectedDevice}
          onCopyPV={handleCopyPV}
        />
      </div>
    </div>
  )
}
/* DEMO_END */

const connectionStatesSource = __SOURCE__

/* DEMO_START */
function LiveMonitoringDemo() {
  const [isRunning, setIsRunning] = useState(false)
  const [devices, setDevices] = useState([
    {
      id: "temp-1",
      label: "Temperature",
      pvname: "BL:TEMP:01",
      value: 23.5,
      units: "°C",
      isConnected: true,
      lastUpdate: new Date(),
      data: [20, 22, 21, 23, 25, 24, 26, 25, 27, 26],
    },
    {
      id: "pressure-1",
      label: "Pressure",
      pvname: "BL:PRESS:01",
      value: 1013.25,
      units: "mbar",
      isConnected: true,
      lastUpdate: new Date(),
      data: [1010, 1012, 1011, 1013, 1015, 1014, 1016, 1015, 1017, 1016],
    },
    {
      id: "voltage-1",
      label: "Voltage",
      pvname: "BL:VOLT:01",
      value: 12.3,
      units: "V",
      isConnected: true,
      lastUpdate: new Date(),
      data: [12, 12.1, 12.2, 12.1, 12.3, 12.2, 12.4, 12.3, 12.5, 12.4],
    },
  ])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setDevices(prev =>
        prev.map(device => {
          const variation = (Math.random() - 0.5) * 2
          const newValue = device.value + variation
          const newDataPoint = newValue + (Math.random() - 0.5) * 5
          
          return {
            ...device,
            value: newValue,
            lastUpdate: new Date(),
            data: [...device.data.slice(1), newDataPoint],
          }
        })
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleCopyPV = (pvname: string) => {
    toast.success(`PV Copied: ${pvname}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Real-time Device Monitoring</h4>
        <Button
          onClick={() => setIsRunning(!isRunning)}
          variant={isRunning ? "destructive" : "default"}
          size="sm"
        >
          {isRunning ? "Stop Monitoring" : "Start Monitoring"}
        </Button>
      </div>
      
      <div className="space-y-2">
        {devices.map(device => (
          <OphydMonitor
            key={device.id}
            variant="compact"
            {...device}
            onCopyPV={handleCopyPV}
          />
        ))}
      </div>
    </div>
  )
}
/* DEMO_END */

const liveMonitoringSource = __SOURCE__

/* DEMO_START */
function DeviceDashboardDemo() {
  const [dashboardDevices] = useState([
    {
      id: "temp-sensor-1",
      label: "Temperature",
      pvname: "BL:TEMP:01",
      value: 23.5,
      units: "°C",
      isConnected: true,
      lastUpdate: new Date(Date.now() - 5000),
      data: generateMockData(),
    },
    {
      id: "pressure-1",
      label: "Pressure",
      pvname: "BL:PRESS:01",
      value: 1013.25,
      units: "mbar",
      isConnected: true,
      lastUpdate: new Date(Date.now() - 12000),
      data: generateMockData(),
    },
    {
      id: "flow-rate",
      label: "Flow Rate",
      pvname: "BL:FLOW:01",
      value: 45.2,
      units: "L/min",
      isConnected: false,
      lastUpdate: new Date(Date.now() - 120000),
      data: generateMockData(),
    },
    {
      id: "voltage",
      label: "Voltage",
      pvname: "BL:VOLT:01",
      value: 12.3,
      units: "V",
      isConnected: true,
      lastUpdate: new Date(Date.now() - 2000),
      data: generateMockData(),
    },
    {
      id: "current",
      label: "Current",
      pvname: "BL:CURR:01",
      value: 2.1,
      units: "A",
      isConnected: true,
      lastUpdate: new Date(Date.now() - 8000),
      data: generateMockData(),
    },
    {
      id: "humidity",
      label: "Humidity",
      pvname: "BL:HUM:01",
      value: 65.4,
      units: "%",
      isConnected: false,
      lastUpdate: new Date(Date.now() - 300000),
      data: generateMockData(),
    },
  ])

  const handleCopyPV = (pvname: string) => {
    toast.success(`PV Copied: ${pvname}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardDevices.map(device => (
        <OphydMonitor
          key={device.id}
          variant="grid"
          {...device}
          onCopyPV={handleCopyPV}
        />
      ))}
    </div>
  )
}
/* DEMO_END */

const deviceDashboardSource = __SOURCE__

function OphydMonitorPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Ophyd Monitor" }]}
        pageHeading="Ophyd Monitor"
        pageSubheading="An Ophyd hardware monitor component with various display modes and data visualization options."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          {/* Basic Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Two display modes: compact for lists and grid for dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicVariantsDemo />}
                source={basicVariantsSource}
              />
            </CardContent>
          </Card>

          {/* Connection States */}
          <Card>
            <CardHeader>
              <CardTitle>Connection States</CardTitle>
              <CardDescription>Visual indicators for device connectivity and data freshness</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ConnectionStatesDemo />}
                source={connectionStatesSource}
              />
            </CardContent>
          </Card>

          {/* Live Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>Live Monitoring</CardTitle>
              <CardDescription>Real-time data updates with sparkline visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<LiveMonitoringDemo />}
                source={liveMonitoringSource}
              />
            </CardContent>
          </Card>

          {/* Device Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Device Dashboard</CardTitle>
              <CardDescription>Grid layout for monitoring multiple devices simultaneously</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<DeviceDashboardDemo />}
                source={deviceDashboardSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
