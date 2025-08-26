import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { BarChart } from '@/ui/components/chart-bar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/components/chart-bar')({
  component: ChartsPage,
})

/* DEMO_START */
function BasicBarChartDemo() {
  const salesData = [
    { product: "Laptops", q1: 120, q2: 145, q3: 160, q4: 180 },
    { product: "Tablets", q1: 85, q2: 95, q3: 110, q4: 125 },
    { product: "Phones", q1: 200, q2: 220, q3: 250, q4: 280 },
    { product: "Accessories", q1: 60, q2: 75, q3: 80, q4: 90 },
  ]

  const barData = [
    {
      x: salesData.map(d => d.product),
      y: salesData.map(d => d.q1),
      name: 'Q1 Sales'
    },
    {
      x: salesData.map(d => d.product),
      y: salesData.map(d => d.q2),
      name: 'Q2 Sales'
    },
    {
      x: salesData.map(d => d.product),
      y: salesData.map(d => d.q3),
      name: 'Q3 Sales'
    },
    {
      x: salesData.map(d => d.product),
      y: salesData.map(d => d.q4),
      name: 'Q4 Sales'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarterly Sales Performance</CardTitle>
        <CardDescription>Product sales comparison across four quarters</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart 
          data={barData}
          orientation="vertical"
          height={400}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const basicBarChartSource = __SOURCE__

/* DEMO_START */
function HorizontalBarChartDemo() {
  const marketData = [
    { region: "North America", revenue: 45000 },
    { region: "Europe", revenue: 38000 },
    { region: "Asia Pacific", revenue: 52000 },
    { region: "Latin America", revenue: 18000 },
    { region: "Middle East & Africa", revenue: 12000 },
  ]

  const horizontalBarData = [
    {
      x: marketData.map(d => d.region),
      y: marketData.map(d => d.revenue),
      name: 'Revenue ($)'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Revenue Distribution</CardTitle>
        <CardDescription>Revenue breakdown by geographical region</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart 
          data={horizontalBarData}
          orientation="horizontal"
          height={350}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const horizontalBarChartSource = __SOURCE__

/* DEMO_START */
function CompactBarChartDemo() {
  const compactData = [
    {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      y: [23, 45, 32, 67, 49],
      name: 'Tasks Completed'
    }
  ]

  return (
    <BarChart 
      data={compactData}
      orientation="vertical"
      size="sm"
      showLegend={false}
      className="border rounded-lg p-4"
    />
  )
}
/* DEMO_END */

const compactBarChartSource = __SOURCE__

/* DEMO_START */
function MultiMetricBarChartDemo() {
  const performanceData = [
    { team: "Engineering", efficiency: 92, satisfaction: 85, retention: 94 },
    { team: "Sales", efficiency: 88, satisfaction: 78, retention: 89 },
    { team: "Marketing", efficiency: 85, satisfaction: 92, retention: 91 },
    { team: "Support", efficiency: 95, satisfaction: 87, retention: 96 },
    { team: "Product", efficiency: 90, satisfaction: 90, retention: 88 },
  ]

  const multiMetricData = [
    {
      x: performanceData.map(d => d.team),
      y: performanceData.map(d => d.efficiency),
      name: 'Efficiency %'
    },
    {
      x: performanceData.map(d => d.team),
      y: performanceData.map(d => d.satisfaction),
      name: 'Satisfaction %'
    },
    {
      x: performanceData.map(d => d.team),
      y: performanceData.map(d => d.retention),
      name: 'Retention %'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance Metrics</CardTitle>
        <CardDescription>Multi-dimensional performance analysis across different teams</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart 
          data={multiMetricData}
          orientation="vertical"
          height={400}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const multiMetricBarChartSource = __SOURCE__

/* DEMO_START */
function OrientationComparisonDemo() {
  const comparisonData = [
    {
      x: ['Product A', 'Product B', 'Product C', 'Product D'],
      y: [125, 89, 156, 203],
      name: 'Sales Units'
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Vertical Bars</CardTitle>
          <CardDescription>Traditional column chart layout</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart 
            data={comparisonData}
            orientation="vertical"
            size="sm"
            showLegend={false}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Horizontal Bars</CardTitle>
          <CardDescription>Bar chart with horizontal orientation</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart 
            data={comparisonData}
            orientation="horizontal"
            size="sm"
            showLegend={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}
/* DEMO_END */

const orientationComparisonSource = __SOURCE__

function ChartsPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Bar Chart" }]}
        pageHeading="Bar Chart"
        pageSubheading="A bar chart component supporting both vertical and horizontal orientations for categorical data visualization."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Standard vertical bar chart with multiple data series</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicBarChartDemo />}
                source={basicBarChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horizontal Orientation</CardTitle>
              <CardDescription>Bar chart with horizontal layout for better label readability</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<HorizontalBarChartDemo />}
                source={horizontalBarChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compact Layout</CardTitle>
              <CardDescription>Minimal bar chart for dashboard widgets and space-constrained areas</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CompactBarChartDemo />}
                source={compactBarChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Metric Analysis</CardTitle>
              <CardDescription>Compare multiple metrics across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<MultiMetricBarChartDemo />}
                source={multiMetricBarChartSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orientation Comparison</CardTitle>
              <CardDescription>Same data displayed in both vertical and horizontal orientations</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<OrientationComparisonDemo />}
                source={orientationComparisonSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}