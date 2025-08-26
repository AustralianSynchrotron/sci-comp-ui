import { useState, useRef, useEffect } from "react"
import { Switch } from "../elements/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/alert-dialog"
import { AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ShutterConfig {
  id: string
  name: string
  type: "shutter" | "variable-blocker"
  isOpen: boolean
  threshold?: number // For variable blockers
  currentValue?: number // For variable blockers
}

interface BeamlineControlProps {
  shutters: ShutterConfig[]
  onShutterChange: (shutterId: string, isOpen: boolean) => void
  className?: string
}

export function BeamBlockerControl({ shutters, onShutterChange, className }: BeamlineControlProps) {
  const [pendingShutter, setPendingShutter] = useState<string | null>(null)
  const [showSafetyDialog, setShowSafetyDialog] = useState(false)
  const beamlineRef = useRef<HTMLDivElement>(null)
  const shutterRefs = useRef<(HTMLDivElement | null)[]>([])
  const [beamWidth, setBeamWidth] = useState("0%")

  const firstClosedShutterIndex = shutters.findIndex((shutter) => !shutter.isOpen)
  const allShuttersOpen = firstClosedShutterIndex === -1

  useEffect(() => {
    const calculateBeamWidth = () => {
      if (!beamlineRef.current) return

      const beamlineRect = beamlineRef.current.getBoundingClientRect()
      const beamlineWidth = beamlineRect.width

      if (allShuttersOpen) {
        setBeamWidth("100%")
        return
      }

      const firstClosedShutterRef = shutterRefs.current[firstClosedShutterIndex]
      if (firstClosedShutterRef) {
        const shutterRect = firstClosedShutterRef.getBoundingClientRect()
        const shutterCenter = shutterRect.left + shutterRect.width / 2 - beamlineRect.left
        const percentage = (shutterCenter / beamlineWidth) * 100
        setBeamWidth(`${Math.max(0, Math.min(100, percentage))}%`)
      }
    }

    calculateBeamWidth()

    const handleResize = () => {
      setTimeout(calculateBeamWidth, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [firstClosedShutterIndex, allShuttersOpen, shutters])

  const handleShutterToggle = (shutterId: string, currentState: boolean) => {
    const newState = !currentState

    if (newState) {
      const otherShutters = shutters.filter((s) => s.id !== shutterId)
      const allOthersOpen = otherShutters.every((s) => s.isOpen)

      if (allOthersOpen) {
        setPendingShutter(shutterId)
        setShowSafetyDialog(true)
        return
      }
    }

    onShutterChange(shutterId, newState)
  }

  const confirmSafetyDialog = () => {
    if (pendingShutter) {
      onShutterChange(pendingShutter, true)
      setPendingShutter(null)
    }
    setShowSafetyDialog(false)
  }

  const cancelSafetyDialog = () => {
    setPendingShutter(null)
    setShowSafetyDialog(false)
  }

  return (
    <>
      <div className={cn("w-full bg-card border rounded-lg p-4", className)}>
        <div className="relative flex items-center justify-between min-h-[140px]">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">SOURCE</span>
          </div>

          <div className="flex-1 relative mx-4" ref={beamlineRef}>
            <div className="absolute top-11 left-0 right-0 h-1 -translate-y-1/2 z-10">
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
                  className="absolute top-0 h-full border-t-2 border-gray-400 border-dotted opacity-50"
                  style={{
                    left: beamWidth,
                    width: `calc(100% - ${beamWidth})`,
                  }}
                />
              )}
            </div>

            <div className="flex justify-evenly items-center relative mt-4">
              {shutters.map((shutter, index) => (
                <div key={shutter.id} ref={(el) => (shutterRefs.current[index] = el)}>
                  <ShutterComponent
                    shutter={shutter}
                    onToggle={handleShutterToggle}
                    isBlocking={index >= firstClosedShutterIndex && firstClosedShutterIndex !== -1}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded border-2 border-blue-700 relative">
              <div className="absolute inset-1 bg-blue-400 rounded-sm" />
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
              Opening this shutter will expose the detector to the full X-ray beam. This may cause damage to the
              detector if not properly configured. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelSafetyDialog}>Cancel</AlertDialogCancel>
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
  )
}

interface ShutterComponentProps {
  shutter: ShutterConfig
  onToggle: (shutterId: string, currentState: boolean) => void
  isBlocking: boolean
}

function ShutterComponent({ shutter, onToggle, isBlocking }: ShutterComponentProps) {
  const isVariableBlocker = shutter.type === "variable-blocker"
  const isOpen = isVariableBlocker ? (shutter.currentValue ?? 0) > (shutter.threshold ?? 0) : shutter.isOpen

  return (
    <div className={cn("flex flex-col items-center gap-2 min-w-[80px] relative", isOpen ? "z-0" : "z-20")}>
      <div className="relative">
        <div
          className={cn(
            "w-6 h-12 border-2 rounded transition-all duration-300",
            isOpen
              ? "border-green-500 bg-green-100 dark:bg-green-900/20"
              : "border-red-500 bg-red-100 dark:bg-red-900/20",
          )}
        >
          <div
            className={cn(
              "absolute inset-x-0 h-1 bg-current transition-all duration-300",
              isOpen ? "top-1 opacity-30" : "top-1/2 -translate-y-1/2 opacity-100",
            )}
          />
        </div>

        {isBlocking && !isOpen && (
          <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>

      <span className="text-xs font-medium text-center">{shutter.name}</span>

      {isVariableBlocker ? (
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "px-2 py-1 rounded text-xs font-small h-4 flex items-center justify-center",
              isOpen
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
            )}
          >
            {isOpen ? "OPEN" : "BLOCKED"}: {shutter.currentValue?.toFixed(1) ?? 0}/{shutter.threshold ?? 0}
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
  )
}
