import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { XYChart } from '@/ui/components/chart-xy'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/components/chart-xy')({
  component: ChartsPage,
})

/* DEMO_START */
function ScatterChartDemo() {
  const scatterData = [
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [2.1, 3.8, 1.9, 4.2, 5.1, 3.9, 6.8, 7.2, 8.1, 9.3],
      name: 'Dataset A'
    },
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1.5, 2.9, 4.1, 3.7, 4.8, 6.2, 5.9, 8.1, 7.8, 8.9],
      name: 'Dataset B'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scatter Plot</CardTitle>
        <CardDescription>Data points plotted as individual markers</CardDescription>
      </CardHeader>
      <CardContent>
        <XYChart 
          data={scatterData}
          xAxisLabel='X'
          yAxisLabel='Y'
          xAxisUnits='units'
          yAxisUnits='units'
          variant="scatter"
          height={400}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const scatterChartSource = __SOURCE__

/* DEMO_START */
function LineChartDemo() {
  const lineData = [
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [20, 35, 30, 45, 55, 40],
      name: 'Revenue'
    },
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [15, 25, 35, 30, 40, 45],
      name: 'Expenses'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Continuous data visualization with smooth lines</CardDescription>
      </CardHeader>
      <CardContent>
        <XYChart 
          data={lineData}
          variant="line"
          height={350}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const lineChartSource = __SOURCE__

/* DEMO_START */
function StepChartDemo() {
  const stepData = [
    {
      x: [0, 1, 2, 3, 4, 5],
      y: [10, 15, 12, 18, 22, 20],
      name: 'Signal A'
    },
    {
      x: [0, 1, 2, 3, 4, 5],
      y: [5, 8, 15, 12, 16, 18],
      name: 'Signal B'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Chart</CardTitle>
        <CardDescription>Step-wise data transitions with horizontal-vertical lines</CardDescription>
      </CardHeader>
      <CardContent>
        <XYChart 
          data={stepData}
          variant="step"
          height={350}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const stepChartSource = __SOURCE__

/* DEMO_START */
function CompactXYChartDemo() {
  const compactData = [
    {
      x: [1, 2, 3, 4, 5],
      y: [2, 5, 3, 8, 7],
      name: 'Data'
    }
  ]

  return (
    <XYChart 
      data={compactData}
      variant="line"
      size="sm"
      lockZoom
      showModeBar={false}
      showLegend={false}
      className="border rounded-lg p-4"
    />
  )
}
/* DEMO_END */

const compactXYChartSource = __SOURCE__

function ChartsPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "XY Chart" }]}
        pageHeading="XY Chart"
        pageSubheading="A chart component for scatter plots, line charts, and step charts with configurable variants."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scatter Plot</CardTitle>
              <CardDescription>Display data points as individual markers to show correlation</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ScatterChartDemo />}
                source={scatterChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Chart</CardTitle>
              <CardDescription>Connect data points with smooth lines for trend visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<LineChartDemo />}
                source={lineChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step Chart</CardTitle>
              <CardDescription>Show step-wise data transitions with horizontal-vertical line segments</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<StepChartDemo />}
                source={stepChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compact Layout</CardTitle>
              <CardDescription>Minimal chart for space-constrained layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CompactXYChartDemo />}
                source={compactXYChartSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}