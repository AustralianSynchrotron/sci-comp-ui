import Plot from "react-plotly.js";
import type { Data, Layout, Config } from "plotly.js";
import { oklchStringToRgb } from "../../lib/oklch-to-rgb";

interface ScatterTraceChartData {
  points: ReadonlyArray<readonly [number, number]>;
  name: string;
  color?: string;
}

interface ScatterChartProps {
  data: ScatterTraceChartData;
  showLegend?: boolean;
  className?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisRange?: readonly [number, number];
  xAxisUnits?: string;
  yAxisUnits?: string;
  yAxisRange?: readonly [number, number];
  showModeBar?: boolean;
  lockZoom?: boolean;
}

export function ScatterTraceChart({
  data: series,
  showLegend = true,
  className,
  xAxisLabel,
  yAxisLabel,
  xAxisUnits,
  yAxisUnits,
  xAxisRange,
  yAxisRange,
  showModeBar = true,
  lockZoom = false,
}: ScatterChartProps) {
  // Helper function to get CSS variable values and convert to RGB
  const getCSSVariableAsRGB = (variableName: string): string => {
    const root = getComputedStyle(document.documentElement);
    const oklchValue = root.getPropertyValue(variableName).trim();
    return oklchStringToRgb(oklchValue);
  };

  // Helper function to format axis labels with units
  const formatAxisLabel = (
    label?: string,
    units?: string
  ): string | undefined => {
    if (!label && !units) return undefined;
    if (label && units) return `${label} (${units})`;
    return label || units;
  };

  const layout: Partial<Layout> = {
    // margin: {
    //   l: yAxisLabel || yAxisUnits ? 50 : 20,
    //   r: 20,
    //   t: 10,
    //   b: xAxisLabel || xAxisUnits ? 50 : 20,
    // },
    margin: {
      l: 40,
      r: 0,
      t: 50,
      b: 0,
    },
    modebar: showModeBar
      ? {
          orientation: "v",
          bgcolor: getCSSVariableAsRGB("--background"),
          color: getCSSVariableAsRGB("--muted-foreground"),
          activecolor: getCSSVariableAsRGB("--muted-foreground"),
        }
      : undefined,
    legend: showLegend
      ? {
          x: 1.05,
          y: 0,
          xanchor: "left" as const,
          yanchor: "bottom" as const,
          bgcolor: getCSSVariableAsRGB("--background"),
          bordercolor: getCSSVariableAsRGB("--border"),
          borderwidth: 1,
          font: {
            color: getCSSVariableAsRGB("--muted-foreground"),
            size: 12,
          },
        }
      : undefined,
    xaxis: {
      title: formatAxisLabel(xAxisLabel, xAxisUnits)
        ? { text: formatAxisLabel(xAxisLabel, xAxisUnits) }
        : undefined,
      showgrid: true,
      gridcolor: getCSSVariableAsRGB("--border"),
      showline: false,
      zeroline: false,
      tickfont: {
        color: getCSSVariableAsRGB("--muted-foreground"),
      },
      range: xAxisRange,
      visible: false,
    },
    yaxis: {
      title: formatAxisLabel(yAxisLabel, yAxisUnits)
        ? { text: formatAxisLabel(yAxisLabel, yAxisUnits) }
        : undefined,
      showgrid: true,
      gridcolor: getCSSVariableAsRGB("--border"),
      // gridwidth: 1,
      showline: false,
      zeroline: false,
      tickfont: {
        color: getCSSVariableAsRGB("--muted-foreground"),
      },
      range: yAxisRange,
      visible: false,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: {
      color: getCSSVariableAsRGB("--foreground"),
    },
    showlegend: showLegend,
    autosize: true,
    width: 465,
    height: 320,
  };

  // Default chart colors from CSS variables
  const defaultColors = [
    "--chart-1",
    "--chart-2",
    "--chart-3",
    "--chart-4",
    "--chart-5",
  ];

  const plotData: Partial<Data>[] = [
    {
      x: series.points.map(([x]) => x),
      y: series.points.map(([, y]) => y),
      name: series.name,

      type: "scatter" as const,
      mode: "markers" as const,
      marker: {
        color: series.color || getCSSVariableAsRGB(defaultColors[1]),
        size: 12,
        symbol: "star-diamond",
      },
    },
    {
      x: series.points.map(([x]) => x),
      y: series.points.map(([, y]) => y),
      name: series.name,

      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: {
        color: series.color || getCSSVariableAsRGB(defaultColors[0]),
        size: 16,
        symbol: "arrow",
        angleref: "previous",
      },
    },
  ];

  const config: Partial<Config> = {
    displayModeBar: showModeBar,
    responsive: true,
    displaylogo: false,
    scrollZoom: !lockZoom,
    modeBarButtonsToRemove: lockZoom
      ? ([
          "zoomIn2d",
          "zoomOut2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "resetScale2d",
        ] as const)
      : (["zoomIn2d", "zoomOut2d"] as const),
  };

  return (
    <div style={{ position: "relative", height: 400 }} className={className}>
      <img
        style={{ position: "absolute", top: 0, left: 0 }}
        src="/public/well-plate.png"
        alt="Well plate"
      />
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: "100%", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export type { ScatterChartProps, ScatterTraceChartData };
