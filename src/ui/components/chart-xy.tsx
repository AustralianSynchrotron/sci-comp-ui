import Plot from 'react-plotly.js'
import type { Data, Layout, Config } from 'plotly.js'
import { cva, type VariantProps } from 'class-variance-authority'
import { oklchStringToRgb } from '../../lib/oklch-to-rgb'

interface XYChartData {
  x: (string | number)[];
  y: number[];
  name: string;
  color?: string;
}

const chartVariants = cva("", {
  variants: {
    variant: {
      scatter: "",
      line: "",
      step: "",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "scatter",
    size: "default",
  },
})

interface XYChartProps extends VariantProps<typeof chartVariants> {
  data: XYChartData[];
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

export function XYChart({ 
  data, 
  variant = "scatter",
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
}: XYChartProps) {
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
      showgrid: true,
      gridcolor: getCSSVariableAsRGB('--border'),
      showline: false,
      tickfont: {
        color: getCSSVariableAsRGB('--muted-foreground')
      }
    },
    yaxis: {
      title: formatAxisLabel(yAxisLabel, yAxisUnits) ? { text: formatAxisLabel(yAxisLabel, yAxisUnits) } : undefined,
      showgrid: true,
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
  }

  // Default chart colors from CSS variables
  const defaultColors = [
    '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'
  ]

  const plotData: Partial<Data>[] = data.map((series, index) => {
    const baseData = {
      x: series.x,
      y: series.y,
      name: series.name,
      marker: {
        color: series.color || getCSSVariableAsRGB(defaultColors[index % defaultColors.length]),
      }
    }

    switch (variant) {
      case "scatter":
        return {
          ...baseData,
          type: 'scatter' as const,
          mode: 'markers' as const,
          marker: {
            ...baseData.marker,
            size: 6,
          }
        }
      case "line":
        return {
          ...baseData,
          type: 'scatter' as const,
          mode: 'lines' as const,
          line: {
            color: series.color || getCSSVariableAsRGB(defaultColors[index % defaultColors.length]),
            width: 2
          }
        }
      case "step":
        return {
          ...baseData,
          type: 'scatter' as const,
          mode: 'lines' as const,
          line: {
            shape: 'hv' as const,
            color: series.color || getCSSVariableAsRGB(defaultColors[index % defaultColors.length]),
            width: 2
          }
        }
      default:
        return baseData
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

export type { XYChartProps, XYChartData }
