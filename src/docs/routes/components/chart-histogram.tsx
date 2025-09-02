import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { HistogramChart } from '@/ui/components/chart-histogram'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/components/chart-histogram')({
  component: ChartsPage,
})

/* DEMO_START */
function BasicHistogramDemo() {
  // Generate sample data - normally distributed around 50
  const generateNormalData = (mean: number, stdDev: number, count: number) => {
    const data = []
    for (let i = 0; i < count; i++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.random()
      const u2 = Math.random()
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
      data.push(mean + stdDev * z0)
    }
    return data
  }

  const histogramData = [
    {
      x: generateNormalData(50, 15, 1000),
      name: 'Test Scores',
      nbins: 30
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Scores Distribution</CardTitle>
        <CardDescription>Histogram showing the distribution of test scores</CardDescription>
      </CardHeader>
      <CardContent>
        <HistogramChart 
          data={histogramData}
          xAxisLabel='Score'
          orientation="vertical"
          height={400}
          showLegend={false}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const basicHistogramSource = __SOURCE__

/* DEMO_START */
function ComparisonHistogramDemo() {
  const generateData1 = () => {
    const data = []
    for (let i = 0; i < 500; i++) {
      data.push(Math.random() * 40 + 30) // Uniform distribution 30-70
    }
    return data
  }

  const generateData2 = () => {
    const data = []
    for (let i = 0; i < 500; i++) {
      const u1 = Math.random()
      const u2 = Math.random()
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
      data.push(55 + 12 * z0) // Normal distribution
    }
    return data
  }

  const comparisonData = [
    {
      x: generateData1(),
      name: 'Group A',
      nbins: 25
    },
    {
      x: generateData2(),
      name: 'Group B',
      nbins: 25
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
        <CardDescription>Overlapping histograms comparing two different groups</CardDescription>
      </CardHeader>
      <CardContent>
        <HistogramChart 
          data={comparisonData}
          orientation="vertical"
          height={400}
          opacity={0.6}
          barmode="overlay"
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const comparisonHistogramSource = __SOURCE__

/* DEMO_START */
function HorizontalHistogramDemo() {
  const salaryData = () => {
    const data = []
    // Simulate salary distribution
    for (let i = 0; i < 600; i++) {
      const base = 40000 + Math.random() * 60000
      const experience = Math.random() * 20000
      const bonus = Math.random() * 15000
      data.push(base + experience + bonus)
    }
    return data
  }

  const horizontalData = [
    {
      x: salaryData(),
      name: 'Annual Salary ($)',
      nbins: 20
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horizontal Orientation</CardTitle>
        <CardDescription>Horizontal histogram showing price distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <HistogramChart 
          data={horizontalData}
          orientation="horizontal"
          height={350}
          showLegend={false}
        />
      </CardContent>
    </Card>
  )
}
/* DEMO_END */

const horizontalHistogramSource = __SOURCE__

/* DEMO_START */
function CompactHistogramDemo() {
  const compactData = [
    {
      x: Array.from({length: 200}, () => Math.random() * 100),
      name: 'Data Points',
      nbins: 15
    }
  ]

  return (
    <HistogramChart 
      data={compactData}
      orientation="vertical"
      size="sm"
      lockZoom
      showModeBar={false}
      showLegend={false}
      className="border rounded-lg p-4"
    />
  )
}
/* DEMO_END */

const compactHistogramSource = __SOURCE__

function ChartsPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Histogram Chart" }]}
        pageHeading="Histogram Chart"
        pageSubheading="A specialised chart component for displaying frequency distributions and statistical data with configurable binning and normalization options."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Simple histogram showing data distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicHistogramDemo />}
                source={basicHistogramSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Group Comparison</CardTitle>
              <CardDescription>Overlapping histograms for comparing multiple datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ComparisonHistogramDemo />}
                source={comparisonHistogramSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horizontal Orientation</CardTitle>
              <CardDescription>Histogram with horizontal bar layout</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<HorizontalHistogramDemo />}
                source={horizontalHistogramSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compact Layout</CardTitle>
              <CardDescription>Minimal histogram for dashboard widgets; you can also lock the zoom and hide the mode bar</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CompactHistogramDemo />}
                source={compactHistogramSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}