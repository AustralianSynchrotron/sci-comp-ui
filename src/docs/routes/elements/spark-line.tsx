import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../components/page-header"
import { Sparkline } from "../../../ui/elements/spark-line"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { Badge } from "../../../ui/elements/badge"
import { MoveUpRight, MoveDownRight } from "lucide-react"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/spark-line')({
  component: SparklinePage,
})

/* DEMO_START */
function SparklineVariantsDemo() {
  const increasingData = [10, 15, 12, 20, 25, 30, 28, 35, 40, 45]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h4 className="font-medium">Color Options</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Primary color:</span>
            <Sparkline data={increasingData} color="--primary"/>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Success color:</span>
            <Sparkline data={increasingData} color="--success"/>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Custom hex:</span>
            <Sparkline data={increasingData} color="#8b5cf6"/>
          </div>
        </div>        
      </div>
    </div>
  )
}
/* DEMO_END */

const sparklineVariantsSource = __SOURCE__

/* DEMO_START */
function SparklineTrendBehaviorDemo() {
  const increasingData = [10, 15, 12, 20, 25, 30, 28, 35, 40, 45]
  const decreasingData = [45, 40, 35, 32, 28, 25, 20, 18, 15, 10]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h4 className="font-medium">Default Behavior (Primary Color)</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Increasing data</span>
              <Badge variant="default" className="bg-green-100 text-green-800"><MoveUpRight className="w-4 h-4" /> Increasing</Badge>
            </div>
            <Sparkline data={increasingData} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Decreasing data</span>
              <Badge variant="destructive" className="bg-red-100 text-red-800"><MoveDownRight className="w-4 h-4" /> Decreasing</Badge>
            </div>
            <Sparkline data={decreasingData} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">All sparklines use the primary color regardless of data trend</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Trend-Indicating Behavior</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Increasing data</span>
              <Badge variant="default" className="bg-green-100 text-green-800"><MoveUpRight className="w-4 h-4" /> Increasing</Badge>
            </div>
            <Sparkline data={increasingData} indicateTrend={true} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Decreasing data</span>
              <Badge variant="destructive" className="bg-red-100 text-red-800"><MoveDownRight className="w-4 h-4" /> Decreasing</Badge>
            </div>
            <Sparkline data={decreasingData} indicateTrend={true} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Sparklines change color based on data trend (green for increasing, red for decreasing)</p>
      </div>
    </div>
  )
}
/* DEMO_END */

const sparklineTrendBehaviorSource = __SOURCE__

/* DEMO_START */
function SparklineSizesDemo() {
  const increasingData = [10, 15, 12, 20, 25, 30, 28, 35, 40, 45]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Small:</span>
        <Sparkline size="sm" data={increasingData} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Default:</span>
        <Sparkline size="default" data={increasingData} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Large:</span>
        <Sparkline size="lg" data={increasingData} />
      </div>
    </div>
  )
}
/* DEMO_END */

const sparklineSizesSource = __SOURCE__

function SparklinePage() {
  // Static data for basic examples
  const increasingData = [10, 15, 12, 20, 25, 30, 28, 35, 40, 45]
  const volatileData = [20, 35, 15, 40, 10, 45, 25, 50, 30, 35]

  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Spark Line" }]}
        pageHeading="Spark Line"
        pageSubheading="Compact line charts for displaying trends in small spaces."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          {/* Color Options */}
          <Card>
            <CardHeader>
              <CardTitle>Color Options</CardTitle>
              <CardDescription>Use CSS variables, hex colors, or let trend indication choose colors automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SparklineVariantsDemo />}
                source={sparklineVariantsSource}
              />
            </CardContent>
          </Card>

          {/* Trend Behavior */}
          <Card>
            <CardHeader>
              <CardTitle>Default vs Trend-Indicating Behavior</CardTitle>
              <CardDescription>Compare default primary color behavior with trend-based coloring</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SparklineTrendBehaviorDemo />}
                source={sparklineTrendBehaviorSource}
              />
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Different sparkline sizes for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SparklineSizesDemo />}
                source={sparklineSizesSource}
              />
            </CardContent>
          </Card>

          {/* Configuration Options */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
              <CardDescription>Customizable sparklines with different stroke widths and trend indication control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Stroke Width Variations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-sm">Thin (1px):</span>
                      <Sparkline data={volatileData} strokeWidth={1} />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-sm">Default:</span>
                      <Sparkline data={volatileData} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-sm">Bold (3px):</span>
                      <Sparkline data={volatileData} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                                <div className="space-y-4">
                  <h4 className="font-medium">Trend Indication Control</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-sm">With trend:</span>
                      <Sparkline data={increasingData} indicateTrend={true} />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-sm">No trend:</span>
                      <Sparkline data={increasingData} indicateTrend={false} color="--muted-foreground" />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-sm">Empty data:</span>
                      <Sparkline data={[]} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Dimensions</CardTitle>
              <CardDescription>Override default sizes with custom width and height</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">Wide (200x20):</span>
                  <Sparkline data={volatileData} width={200} height={20} color="--success" />
                </div>
                <div className="flex h-20 items-center gap-4">
                  <span className="w-24 text-sm font-medium">Tall (100x40):</span>
                  <Sparkline data={volatileData} width={100} height={40} color="--destructive" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">Mini (40x12):</span>
                  <Sparkline data={increasingData} width={40} height={12} strokeWidth={1} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
