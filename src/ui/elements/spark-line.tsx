import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { oklchStringToRgb } from '../../lib/oklch-to-rgb';

const sparklineVariants = cva(
  // Base styles
  "",
  {
    variants: {
      size: {
        sm: "h-4 w-15", // 16px height, 60px width
        default: "h-5 w-20", // 20px height, 80px width  
        lg: "h-6 w-30", // 24px height, 120px width
      }
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Helper function to get CSS variable values and convert to RGB
const getCSSVariableAsRGB = (variableName: string): string => {
  if (typeof window === 'undefined') return '#2b7fff'; // Fallback for SSR
  
  try {
    const root = getComputedStyle(document.documentElement);
    const oklchValue = root.getPropertyValue(variableName).trim();
    
    if (oklchValue && oklchValue.startsWith('oklch(')) {
      return oklchStringToRgb(oklchValue);
    }
    
    // If it's not OKLCH, return as-is (could be hex or other format)
    return oklchValue || '#2b7fff';
  } catch (error) {
    console.warn(`Failed to get CSS variable ${variableName}:`, error);
    return '#2b7fff';
  }
};

// Helper function to resolve color to a valid hex/rgb string
const resolveColor = (color: string): string => {
  // If it's a hex color, return as-is
  if (color.startsWith('#')) {
    return color;
  }
  
  // If it's an rgb/rgba color, return as-is
  if (color.startsWith('rgb')) {
    return color;
  }
  
  // If it's a CSS variable name, try to resolve it
  if (color.startsWith('--')) {
    return getCSSVariableAsRGB(color);
  }
  
  // If it's a named CSS variable without --, add it
  if (!color.startsWith('--') && !color.startsWith('#') && !color.startsWith('rgb')) {
    return getCSSVariableAsRGB(`--${color}`);
  }
  
  // Fallback
  return color;
};

interface SparklineProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sparklineVariants> {
  data: number[];
  /**
   * Color for the sparkline. Can be:
   * - Hex color: "#ffffff" 
   * - CSS variable: "--primary", "--success", "--warning", etc.
   * - Named variable: "primary", "success", "warning" (will be prefixed with --)
   * - RGB color: "rgb(59, 130, 246)"
   * 
   * When indicateTrend is true, this color is overridden by trend-based colors
   */
  color?: string;
  strokeWidth?: number;
  indicateTrend?: boolean;
  width?: number;
  height?: number;
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  ({ 
    className, 
    size, 
    color = "--primary",
    data, 
    strokeWidth = 1.5, 
    indicateTrend = false,
    width,
    height,
    ...props 
  }, ref) => {
    // Get dimensions based on size variant or custom values
    const sizeConfig = {
      sm: { width: 60, height: 16 },
      default: { width: 80, height: 20 },
      lg: { width: 120, height: 24 }
    };

    const dimensions = size && !width && !height 
      ? sizeConfig[size]
      : { width: width || 80, height: height || 20 };

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(sparklineVariants({ size, className }))}
          {...props}
        >
          <svg 
            width={dimensions.width} 
            height={dimensions.height}
            className="block"
          >
            <line 
              x1="0" 
              y1={dimensions.height / 2} 
              x2={dimensions.width} 
              y2={dimensions.height / 2} 
              stroke={resolveColor(color)}
              strokeWidth={strokeWidth}
              opacity={0.3}
            />
          </svg>
        </div>
      );
    }

    // Calculate trend (compare first and last values)
    const trend = data.length > 1 ? (data[data.length - 1] - data[0]) : 0;
    const isIncreasing = trend > 0;
    const isDecreasing = trend < 0;
    
    let strokeColor = resolveColor(color);
    
    // If trend indication is enabled, override color based on trend
    if (indicateTrend) {
      if (isIncreasing) {
        strokeColor = resolveColor('--success');
      } else if (isDecreasing) {
        strokeColor = resolveColor('--destructive');
      }
    }

    // Normalize data to fit within the SVG bounds
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const valueRange = maxValue - minValue;
    
    // Handle case where all values are the same
    if (valueRange === 0) {
      return (
        <div
          ref={ref}
          className={cn(sparklineVariants({ size, className }))}
          {...props}
        >
          <svg 
            width={dimensions.width} 
            height={dimensions.height}
            className="block"
          >
            <line 
              x1="0" 
              y1={dimensions.height / 2} 
              x2={dimensions.width} 
              y2={dimensions.height / 2} 
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </svg>
        </div>
      );
    }

    // Create path points with padding to prevent clipping
    const padding = 2; // Small padding at top and bottom
    const availableHeight = dimensions.height - (padding * 2);
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * dimensions.width;
      const y = padding + (availableHeight - ((value - minValue) / valueRange) * availableHeight);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div
        ref={ref}
        className={cn(sparklineVariants({ size, className }))}
        {...props}
      >
        <svg 
          width={dimensions.width} 
          height={dimensions.height}
          className="block"
        >
          <polyline
            points={points}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
);

Sparkline.displayName = "Sparkline";

export { Sparkline, sparklineVariants };
export type { SparklineProps };