import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../../docs/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/layout/card";
import { DemoContainer } from "../../docs/components/demo-container";
import { ScatterTraceChart } from "@/ui/components/chart-scatter-trace";

export const Route = createFileRoute(
  "/experimental/generic-scan-visualisation"
)({
  component: GenericScanVisualisationPage,
});

/* DEMO_START */
function GenericScanVisualisationDemo() {
  const compactData = {
    points: [
      // BL
      [-2.5, -2.25],
      [-2.5, -1.5],
      [-1.5, -2.25],
      [-1.5, -1.5],
      // TL
      [-2.5, 1.7],
      [-2.5, 2.5],
      [-1.5, 1.7],
      [-1.5, 2.5],
      // BR
      [1.5, -2.25],
      [1.5, -1.5],
      [2.5, -2.25],
      [2.5, -1.5],
      // TR
      [1.5, 1.75],
      [1.5, 2.5],
      [2.5, 1.75],
      [2.5, 2.5],
    ] as const,
    name: "Data",
  };

  return (
    <ScatterTraceChart
      data={compactData}
      lockZoom
      showModeBar={false}
      showLegend={false}
      className="border rounded-lg p-4"
      xAxisLabel="Sample Table X"
      yAxisLabel="Sample Table Y"
      xAxisRange={[-3, 3]}
      yAxisRange={[-3, 3]}
    />
  );
}
/* DEMO_END */

const genericScanVisualisationSource = __SOURCE__;

function GenericScanVisualisationPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { title: "Experimental", href: "/experimental" },
          { title: "Generic Scan Visualisation" },
        ]}
        pageHeading="Generic Scan Visualisation"
        pageSubheading="Realtime pre-visualisation of a Generic Scan plan."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Well Plate Overlay</CardTitle>
              <CardDescription>
                Provide a pre-visualisation of what samples will be shot in a
                generic scan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<GenericScanVisualisationDemo />}
                source={genericScanVisualisationSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
