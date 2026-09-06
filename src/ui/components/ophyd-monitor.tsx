import { Copy, Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../layout/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../elements/tooltip";
import { Sparkline } from "../elements/spark-line";

export interface OphydMonitorProps {
  variant?: "compact" | "grid";
  label: string;
  pvname: string;
  value?: number;
  units?: string;
  isConnected?: boolean;
  lastUpdate?: Date;
  data?: number[];
  className?: string;
  onCopyPV?: (pvname: string) => void;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 10) return "<10s ago";
  if (diffSeconds < 30) return "<30s ago";
  if (diffSeconds < 60) return "<1m ago";
  if (diffSeconds < 300) return "<5m ago";
  return ">10m ago";
};

const ConnectionDot = ({ isConnected }: { isConnected: boolean }) => {
  if (!isConnected) {
    return (
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
      </span>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="h-3 w-3 rounded-full bg-green-500" />
    </div>
  );
};

const CopyButton = ({
  pvname,
  onCopyPV,
  className,
}: {
  pvname: string;
  onCopyPV?: (pvname: string) => void;
  className?: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pvname);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopyPV?.(pvname);
    } catch (err) {
      console.error("Failed to copy PV: ", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
            className
          )}
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copied!" : "Copy PV"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

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
    <div
      className={cn(
        "flex items-center rounded-md border bg-card px-3 py-2",
        className
      )}
    >
      {/* Label - Fixed width for alignment */}
      <div className="w-38 flex-shrink-0 truncate text-sm font-medium">
        {label}
      </div>

      {/* PV Name - Fixed width for alignment */}
      <div className="w-38 flex-shrink-0 truncate font-mono text-xs text-muted-foreground">
        {pvname}
      </div>

      {/* Value with Units - Fixed width for alignment */}
      <div className="w-24 flex-shrink-0 text-right font-mono text-sm tabular-nums">
        {value !== undefined ? (
          <>
            {value.toFixed(2)}
            <span className="ml-1 text-xs text-muted-foreground">
              {units || <span className="invisible">u</span>}
            </span>
          </>
        ) : (
          "—"
        )}
      </div>

      {/* Sparkline - Fixed width with spacing */}
      <div className="mx-4 h-8 w-16 flex-shrink-0">
        <Sparkline data={data} className="h-full w-full" />
      </div>

      <div className="flex-1" />

      {/* Right section: Last Update, Connection Status, Copy Button */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <div className="w-20 text-center text-xs text-muted-foreground">
          {lastUpdate ? formatTimeAgo(lastUpdate) : "No data"}
        </div>
        <div className="flex w-6 items-center justify-center">
          <ConnectionDot isConnected={isConnected} />
        </div>
        <CopyButton pvname={pvname} onCopyPV={onCopyPV} />
      </div>
    </div>
  );
};

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
    <Card className={cn("relative p-4", className)}>
      <CopyButton
        pvname={pvname}
        onCopyPV={onCopyPV}
        className="absolute top-2 right-2"
      />
      <div className="mb-3 pr-8">
        <div className="truncate text-sm font-semibold">{label}</div>
        <div className="truncate font-mono text-xs text-muted-foreground">
          {pvname}
        </div>
      </div>

      {value !== undefined && (
        <div className="mb-2 text-2xl font-bold tabular-nums">
          {value.toFixed(2)}
          {units && (
            <span className="ml-2 text-lg text-muted-foreground">{units}</span>
          )}
        </div>
      )}

      <div className="mb-2 h-4 w-full">
        <Sparkline data={data} className="h-full w-full" size="lg" />
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ConnectionDot isConnected={isConnected} />
          <span className={cn(isConnected ? "text-green-600" : "text-red-600")}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="text-muted-foreground">
          {lastUpdate ? formatTimeAgo(lastUpdate) : "No data"}
        </div>
      </div>
    </Card>
  );
};

export const OphydMonitor = (props: OphydMonitorProps) => {
  const { variant = "compact" } = props;

  if (variant === "grid") {
    return <GridVariant {...props} />;
  }

  return <CompactVariant {...props} />;
};

export default OphydMonitor;
