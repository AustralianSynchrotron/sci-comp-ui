import { useState, useEffect, useRef, useCallback } from "react"
import { Minus, Plus, Copy } from "lucide-react"
import { cn } from "../../lib/utils"
import { Slider } from "../elements/slider"
import { Button } from "../elements/button"
import { Card, CardContent, CardHeader, CardTitle } from "../layout/card"
import { Label } from "../elements/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../elements/select"

interface OphydPositionControlProps {
  className?: string
  min?: number
  max?: number
  defaultValue?: number
  defaultTarget?: number
  motorId?: string
  onPositionChange?: (newPosition: number) => void
  onTargetChange?: (newTarget: number) => void
  onMoveStart?: () => void
  onMoveComplete?: () => void
  /** External movement status (e.g., RMOV from Ophyd API) - if not provided, internal state is used */
  isMoving?: boolean
  currentPosition?: number
  targetPosition?: number
  disabled?: boolean
  readOnly?: boolean
}

export function OphydPositionControl({
  className,
  min = 0,
  max = 100,
  defaultValue = 25,
  defaultTarget = 50,
  motorId = "MOTOR-POS-42X7B9",
  onPositionChange,
  onTargetChange,
  onMoveStart,
  onMoveComplete,
  isMoving: externalIsMoving,
  currentPosition: externalCurrentPosition,
  targetPosition: externalTargetPosition,
  disabled = false,
  readOnly = false,
}: OphydPositionControlProps) {
  const [internalCurrentValue, setInternalCurrentValue] = useState(defaultValue)
  const [internalTargetValue, setInternalTargetValue] = useState(defaultTarget)
  const [incrementSize, setIncrementSize] = useState("1")
  const [internalIsMoving, setInternalIsMoving] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Use external values if provided, otherwise use internal state
  const currentValue = externalCurrentPosition ?? internalCurrentValue
  const targetValue = externalTargetPosition ?? internalTargetValue
  const isMoving = externalIsMoving ?? internalIsMoving

  // Calculate the increment size as a number
  const increment = Number(incrementSize)

  // Mock API simulation for motor movement (replace with real API calls)
  const simulateOphydMovement = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const newIsMoving = true
    setInternalIsMoving(newIsMoving)
    onMoveStart?.()

    intervalRef.current = setInterval(() => {
      setInternalCurrentValue((prev) => {
        const difference = targetValue - prev
        const tolerance = 0.1

        if (Math.abs(difference) <= tolerance) {
          const finalIsMoving = false
          setInternalIsMoving(finalIsMoving)
          onMoveComplete?.()
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          const finalValue = targetValue
          onPositionChange?.(finalValue)
          return finalValue
        }

        // Move 10% of the remaining distance each step (exponential approach)
        const step = difference * 0.1
        const newValue = prev + step
        onPositionChange?.(newValue)
        return newValue
      })
    }, 100) // Update every 100ms
  }, [targetValue, onPositionChange, onMoveStart, onMoveComplete])

  // Handle increment/decrement of target value (does not trigger movement)
  const adjustTarget = useCallback((amount: number) => {
    const newValue = Math.min(Math.max(targetValue + amount, min), max)
    if (!readOnly) {
      setInternalTargetValue(newValue)
      onTargetChange?.(newValue)
      // Note: Movement is not automatically triggered - user must click "Move to Target"
    }
  }, [targetValue, min, max, readOnly, onTargetChange])

  // Note: Movement is now only triggered by the "Move to Target" button
  // External RMOV status can be passed via the isMoving prop

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Generate tick marks for the slider
  const tickMarks = []
  const tickInterval = max <= 100 ? 10 : Math.floor(max / 10)
  for (let i = min; i <= max; i += tickInterval) {
    tickMarks.push(i)
  }

  // Note: Position percentages are now handled by the dual-thumb slider

  const handleCopyMotorId = () => {
    navigator.clipboard.writeText(motorId)
  }



  // This is the ONLY function that triggers movement - called by "Move to Target" button
  const handleManualMove = () => {
    if (!readOnly && !disabled) {
      simulateOphydMovement()
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Ophyd Position Control</CardTitle>
        <button
          onClick={handleCopyMotorId}
          disabled={disabled}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy className="h-3.5 w-3.5" />
          <span>copy motor PV</span>
        </button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current and Target Value Display */}
        <div className="grid grid-cols-2 gap-4 items-end">
  <div className="text-center">
    <Label className="block">Current Position:</Label>
    <div className={cn("text-3xl font-bold", isMoving && "text-orange-500")}>
      {currentValue.toFixed(1)}
    </div>
  </div>
  <div className="text-center">
    <Label className="block">Target Position:</Label>
    <div className="text-3xl font-bold text-primary">
      {targetValue.toFixed(1)}
    </div>
  </div>
</div>


        {/* Dual-thumb slider with target and current position */}
        <div className="pt-2 mb-10">
          <div className="relative">
            {/* Dual-thumb slider: [currentPosition, targetPosition] */}
            <Slider
              value={[currentValue, targetValue]}
              min={min}
              max={max}
              step={0.1}
              allowUnorderedValues={true}
              onValueChange={(values) => {
                // Allow target to move freely on either side of current position
                if (values.length === 2 && !readOnly) {
                  // Find which value changed (the one that's not the current position)
                  const newTarget = values.find(v => Math.abs(v - currentValue) >= 0.01)
                  
                  if (newTarget !== undefined) {
                    setInternalTargetValue(newTarget)
                    onTargetChange?.(newTarget)
                  }
                }
              }}
              disabled={disabled || readOnly}
              className="z-10"
            />

            {/* Tick marks */}
            <div className="absolute top-5 left-0 right-0 flex justify-between px-1 text-xs text-muted-foreground">
              {tickMarks.map((tick) => (
                <div key={tick} className="flex flex-col items-center">
                  <div className="h-1 w-0.5 bg-muted-foreground/50 mb-1"></div>
                  {tick}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Increment Controls */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Label>Adjustment Increment:</Label>
            <Select value={incrementSize} onValueChange={setIncrementSize} disabled={disabled || readOnly}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Increment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1</SelectItem>
                <SelectItem value="0.5">0.5</SelectItem>
                <SelectItem value="1">1.0</SelectItem>
                <SelectItem value="5">5.0</SelectItem>
                <SelectItem value="10">10.0</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
              onClick={() => adjustTarget(-increment)}
              disabled={disabled || readOnly || isMoving}
            >
              <Minus className="mr-2 h-4 w-4" />
              Decrease
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
              onClick={() => adjustTarget(increment)}
              disabled={disabled || readOnly || isMoving}
            >
              <Plus className="mr-2 h-4 w-4" />
              Increase
            </Button>
          </div>

          {/* Manual move button */}
          <Button
            className="w-full"
            onClick={handleManualMove}
            disabled={disabled || readOnly || isMoving || Math.abs(targetValue - currentValue) < 0.1}
          >
            {isMoving ? "Moving..." : "Move to Target"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
