import { Copy, Check } from "lucide-react"
import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../layout/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../elements/tooltip"
import { Sparkline } from "../elements/spark-line"

export interface OphydMonitorProps {
  variant?: "compact" | "grid"
  label: string
  pvname: string
  value?: number
  units?: string
  isConnected?: boolean
  lastUpdate?: Date
  data?: number[]
  className?: string
  onCopyPV?: (pvname: string) => void
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)

  if (diffSeconds < 10) return "<10s ago"
  if (diffSeconds < 30) return "<30s ago"
  if (diffSeconds < 60) return "<1m ago"
  if (diffSeconds < 300) return "<5m ago"
  return ">10m ago"
}

const ConnectionDot = ({ isConnected }: { isConnected: boolean }) => {
  if (!isConnected) {
    return (
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
      </span>
    )
  }

  return (
    <div className="animate-pulse">
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  )
}

const CopyButton = ({
  pvname,
  onCopyPV,
  className,
}: {
  pvname: string
  onCopyPV?: (pvname: string) => void
  className?: string
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pvname)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopyPV?.(pvname)
    } catch (err) {
      console.error("Failed to copy PV: ", err)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger 
          className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-muted h-6 w-6", className)}
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copied!" : "Copy PV"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const CompactVariant = ({
  label,
  pvname,
  value,
  units,
  isConnected = false,
  lastUpdate,
  data = [],
  onCopyPV,
  className,
}: OphydMonitorProps) => {
  return (
    <div className={cn("flex items-center py-2 px-3 border rounded-md bg-card", className)}>
      {/* Label - Fixed width for alignment */}
      <div className="font-medium text-sm w-38 flex-shrink-0 truncate">{label}</div>

      {/* PV Name - Fixed width for alignment */}
      <div className="text-xs text-muted-foreground font-mono w-38 flex-shrink-0 truncate">{pvname}</div>

      {/* Value with Units - Fixed width for alignment */}
      <div className="text-sm font-mono w-24 flex-shrink-0 text-right tabular-nums">
        {value !== undefined ? (
          <>
            {value.toFixed(2)}
            <span className="text-xs text-muted-foreground ml-1">
              {units || <span className="invisible">u</span>}
            </span>
          </>
        ) : (
          "—"
        )}
      </div>

      {/* Sparkline - Fixed width with spacing */}
      <div className="w-16 h-8 flex-shrink-0 mx-4">
        <Sparkline data={data} className="w-full h-full"/>
      </div>

      <div className="flex-1" />

      {/* Right section: Last Update, Connection Status, Copy Button */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-xs text-muted-foreground w-20 text-center">
          {lastUpdate ? formatTimeAgo(lastUpdate) : "No data"}
        </div>
        <div className="flex items-center justify-center w-6">
          <ConnectionDot isConnected={isConnected} />
        </div>
        <CopyButton pvname={pvname} onCopyPV={onCopyPV} />
      </div>
    </div>
  )
}

const GridVariant = ({
  label,
  pvname,
  value,
  units,
  isConnected = false,
  lastUpdate,
  data = [],
  onCopyPV,
  className,
}: OphydMonitorProps) => {
  return (
    <Card className={cn("p-4 relative", className)}>
      <CopyButton pvname={pvname} onCopyPV={onCopyPV} className="absolute top-2 right-2" />
      <div className="mb-3 pr-8">
        <div className="font-semibold text-sm truncate">{label}</div>
        <div className="text-xs text-muted-foreground font-mono truncate">{pvname}</div>
      </div>

      {value !== undefined && (
        <div className="text-2xl font-bold mb-2 tabular-nums">
          {value.toFixed(2)}
          {units && <span className="text-lg text-muted-foreground ml-2">{units}</span>}
        </div>
      )}

      <div className="w-full h-4 mb-2">
        <Sparkline data={data} className="w-full h-full"  size="lg"/>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ConnectionDot isConnected={isConnected} />
          <span className={cn(isConnected ? "text-green-600" : "text-red-600")}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="text-muted-foreground">{lastUpdate ? formatTimeAgo(lastUpdate) : "No data"}</div>
      </div>
    </Card>
  )
}

export const OphydMonitor = (props: OphydMonitorProps) => {
  const { variant = "compact" } = props

  if (variant === "grid") {
    return <GridVariant {...props} />
  }

  return <CompactVariant {...props} />
}

export default OphydMonitor
