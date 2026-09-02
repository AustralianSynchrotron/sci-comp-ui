import { useState, useRef, useEffect } from "react";
import { Switch } from "../elements/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ShutterConfig {
  id: string;
  name: string;
  type: "shutter" | "variable-blocker";
  isOpen: boolean;
  threshold?: number; // For variable blockers
  currentValue?: number; // For variable blockers
}

interface BeamlineControlProps {
  shutters: ShutterConfig[];
  onShutterChange: (shutterId: string, isOpen: boolean) => void;
  className?: string;
}

export function BeamBlockerControl({
  shutters,
  onShutterChange,
  className,
}: BeamlineControlProps) {
  const [pendingShutter, setPendingShutter] = useState<string | null>(null);
  const [showSafetyDialog, setShowSafetyDialog] = useState(false);
  const beamlineRef = useRef<HTMLDivElement>(null);
  const shutterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [beamWidth, setBeamWidth] = useState("0%");

  const firstClosedShutterIndex = shutters.findIndex(
    (shutter) => !shutter.isOpen
  );
  const allShuttersOpen = firstClosedShutterIndex === -1;

  useEffect(() => {
    const calculateBeamWidth = () => {
      if (!beamlineRef.current) return;

      const beamlineRect = beamlineRef.current.getBoundingClientRect();
      const beamlineWidth = beamlineRect.width;

      if (allShuttersOpen) {
        setBeamWidth("100%");
        return;
      }

      const firstClosedShutterRef =
        shutterRefs.current[firstClosedShutterIndex];
      if (firstClosedShutterRef) {
        const shutterRect = firstClosedShutterRef.getBoundingClientRect();
        const shutterCenter =
          shutterRect.left + shutterRect.width / 2 - beamlineRect.left;
        const percentage = (shutterCenter / beamlineWidth) * 100;
        setBeamWidth(`${Math.max(0, Math.min(100, percentage))}%`);
      }
    };

    calculateBeamWidth();

    const handleResize = () => {
      setTimeout(calculateBeamWidth, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [firstClosedShutterIndex, allShuttersOpen, shutters]);

  const handleShutterToggle = (shutterId: string, currentState: boolean) => {
    const newState = !currentState;

    if (newState) {
      const otherShutters = shutters.filter((s) => s.id !== shutterId);
      const allOthersOpen = otherShutters.every((s) => s.isOpen);

      if (allOthersOpen) {
        setPendingShutter(shutterId);
        setShowSafetyDialog(true);
        return;
      }
    }

    onShutterChange(shutterId, newState);
  };

  const confirmSafetyDialog = () => {
    if (pendingShutter) {
      onShutterChange(pendingShutter, true);
      setPendingShutter(null);
    }
    setShowSafetyDialog(false);
  };

  const cancelSafetyDialog = () => {
    setPendingShutter(null);
    setShowSafetyDialog(false);
  };

  return (
    <>
      <div className={cn("w-full rounded-lg border bg-card p-4", className)}>
        <div className="relative flex min-h-[140px] items-center justify-between">
          <div className="flex flex-shrink-0 flex-col items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
            <span className="text-xs text-muted-foreground">SOURCE</span>
          </div>

          <div className="relative mx-4 flex-1" ref={beamlineRef}>
            <div className="absolute top-11 right-0 left-0 z-10 h-1 -translate-y-1/2">
              <div
                className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-500"
                style={{ width: beamWidth }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="beam-pips" />
                </div>
              </div>

              {!allShuttersOpen && (
                <div
                  className="absolute top-0 h-full border-t-2 border-dotted border-gray-400 opacity-50"
                  style={{
                    left: beamWidth,
                    width: `calc(100% - ${beamWidth})`,
                  }}
                />
              )}
            </div>

            <div className="relative mt-4 flex items-center justify-evenly">
              {shutters.map((shutter, index) => (
                <div
                  key={shutter.id}
                  ref={(el) => (shutterRefs.current[index] = el)}
                >
                  <ShutterComponent
                    shutter={shutter}
                    onToggle={handleShutterToggle}
                    isBlocking={
                      index >= firstClosedShutterIndex &&
                      firstClosedShutterIndex !== -1
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-col items-center gap-2">
            <div className="relative h-8 w-8 rounded border-2 border-blue-700 bg-blue-500">
              <div className="absolute inset-1 rounded-sm bg-blue-400" />
            </div>
            <span className="text-xs text-muted-foreground">DET 1</span>
          </div>
        </div>
      </div>

      <AlertDialog open={showSafetyDialog} onOpenChange={setShowSafetyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Detector Safety Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              Opening this shutter will expose the detector to the full X-ray
              beam. This may cause damage to the detector if not properly
              configured. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelSafetyDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSafetyDialog}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Open Shutter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface ShutterComponentProps {
  shutter: ShutterConfig;
  onToggle: (shutterId: string, currentState: boolean) => void;
  isBlocking: boolean;
}

function ShutterComponent({
  shutter,
  onToggle,
  isBlocking,
}: ShutterComponentProps) {
  const isVariableBlocker = shutter.type === "variable-blocker";
  const isOpen = isVariableBlocker
    ? (shutter.currentValue ?? 0) > (shutter.threshold ?? 0)
    : shutter.isOpen;

  return (
    <div
      className={cn(
        "relative flex min-w-[80px] flex-col items-center gap-2",
        isOpen ? "z-0" : "z-20"
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "h-12 w-6 rounded border-2 transition-all duration-300",
            isOpen
              ? "border-green-500 bg-green-100 dark:bg-green-900/20"
              : "border-red-500 bg-red-100 dark:bg-red-900/20"
          )}
        >
          <div
            className={cn(
              "absolute inset-x-0 h-1 bg-current transition-all duration-300",
              isOpen
                ? "top-1 opacity-30"
                : "top-1/2 -translate-y-1/2 opacity-100"
            )}
          />
        </div>

        {isBlocking && !isOpen && (
          <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-red-500" />
        )}
      </div>

      <span className="text-center text-xs font-medium">{shutter.name}</span>

      {isVariableBlocker ? (
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "font-small flex h-4 items-center justify-center rounded px-2 py-1 text-xs",
              isOpen
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            )}
          >
            {isOpen ? "OPEN" : "BLOCKED"}:{" "}
            {shutter.currentValue?.toFixed(1) ?? 0}/{shutter.threshold ?? 0}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">CLOSED</span>
          <Switch
            checked={isOpen}
            onCheckedChange={() => onToggle(shutter.id, isOpen)}
            className="data-[state=checked]:bg-green-500"
          />
          <span className="text-xs text-muted-foreground">OPEN</span>
        </div>
      )}
    </div>
  );
}
