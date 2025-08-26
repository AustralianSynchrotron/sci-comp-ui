import Plot from 'react-plotly.js'
import type { Data, Layout, Config } from 'plotly.js'
import { cva, type VariantProps } from 'class-variance-authority'
import { oklchStringToRgb } from '../../lib/oklch-to-rgb'

interface BarChartData {
  x: (string | number)[];
  y: number[];
  name: string;
  color?: string;
}

const chartVariants = cva("", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "default",
  },
})

interface BarChartProps extends VariantProps<typeof chartVariants> {
  data: BarChartData[];
  height?: number;
  showLegend?: boolean;
  className?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisUnits?: string;
  yAxisUnits?: string;
  showModeBar?: boolean;
  lockZoom?: boolean;
}

export function BarChart({ 
  data, 
  orientation = "vertical",
  size = "default",
  height,
  showLegend = true, 
  className,
  xAxisLabel,
  yAxisLabel,
  xAxisUnits,
  yAxisUnits,
  showModeBar = true,
  lockZoom = false
}: BarChartProps) {
  // Get height based on size variant
  const getHeight = () => {
    if (height) return height;
    switch (size) {
      case "sm": return 300;
      case "lg": return 500;
      default: return 400;
    }
  }

  // Helper function to get CSS variable values and convert to RGB
  const getCSSVariableAsRGB = (variableName: string): string => {
    const root = getComputedStyle(document.documentElement)
    const oklchValue = root.getPropertyValue(variableName).trim()
    return oklchStringToRgb(oklchValue)
  }

  // Helper function to format axis labels with units
  const formatAxisLabel = (label?: string, units?: string): string | undefined => {
    if (!label && !units) return undefined;
    if (label && units) return `${label} (${units})`;
    return label || units;
  }

  const layout: Partial<Layout> = {
    margin: { l: yAxisLabel || yAxisUnits ? 50 : 20, r: 20, t: 10, b: xAxisLabel || xAxisUnits ? 50 : 20 },
    modebar: showModeBar ? {
      orientation: 'v',
      bgcolor: getCSSVariableAsRGB('--background'),
      color: getCSSVariableAsRGB('--muted-foreground'),
      activecolor: getCSSVariableAsRGB('--muted-foreground'),
    } : undefined,
    legend: showLegend ? {
        x: 1.05, 
        y: 0,
        xanchor: 'left' as const,
        yanchor: 'bottom' as const,
        bgcolor: getCSSVariableAsRGB('--background'),
        bordercolor: getCSSVariableAsRGB('--border'),
        borderwidth: 1,
        font: {
          color: getCSSVariableAsRGB('--muted-foreground'),
          size: 12,
        },
    } : undefined,
    xaxis: {
      title: formatAxisLabel(xAxisLabel, xAxisUnits) ? { text: formatAxisLabel(xAxisLabel, xAxisUnits) } : undefined,
      showgrid: orientation === "vertical",
      gridcolor: getCSSVariableAsRGB('--border'),
      showline: false,
      tickfont: {
        color: getCSSVariableAsRGB('--muted-foreground')
      }
    },
    yaxis: {
      title: formatAxisLabel(yAxisLabel, yAxisUnits) ? { text: formatAxisLabel(yAxisLabel, yAxisUnits) } : undefined,
      showgrid: orientation === "horizontal",
      gridcolor: getCSSVariableAsRGB('--border'),
      gridwidth: 1,
      showline: false,
      zeroline: false,
      tickfont: {
        color: getCSSVariableAsRGB('--muted-foreground')
      }
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      color: getCSSVariableAsRGB('--foreground'),
    },
    showlegend: showLegend,
    autosize: true,
    height: getHeight(),
    barmode: 'group' as const,
  }

  // Default chart colors from CSS variables
  const defaultColors = [
    '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'
  ]

  const plotData: Partial<Data>[] = data.map((series, index) => {
    const baseData = {
      name: series.name,
      type: 'bar' as const,
      marker: {
        color: series.color || getCSSVariableAsRGB(defaultColors[index % defaultColors.length]),
      }
    }

    if (orientation === "horizontal") {
      return {
        ...baseData,
        x: series.y,
        y: series.x,
        orientation: 'h' as const,
      }
    } else {
      return {
        ...baseData,
        x: series.x,
        y: series.y,
      }
    }
  })

  const config: Partial<Config> = {
    displayModeBar: showModeBar,
    responsive: true,
    displaylogo: false,
    scrollZoom: !lockZoom,
    modeBarButtonsToRemove: lockZoom ? ['zoomIn2d', 'zoomOut2d', 'pan2d', 'select2d', 'lasso2d', 'resetScale2d'] as any : ['zoomIn2d', 'zoomOut2d'] as any,
  }

  return (
    <div className={className}>
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export type { BarChartProps, BarChartData }
