import { useState, useEffect } from "react"
import { Input } from "../elements/input"
import { Label } from "../elements/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../elements/select"
import { synchrotronMath, type SynchrotronValue } from "../../lib/units-math"

interface UnitsFieldProps {
  label: string
  defaultValue?: number
  defaultUnit?: string
  onChange?: (value: SynchrotronValue) => void
  className?: string
}

export function UnitsField({ label, defaultValue = 0, defaultUnit = "eV", onChange, className }: UnitsFieldProps) {
  const [nativeValue, setNativeValue] = useState<SynchrotronValue>(
    synchrotronMath.createValue(defaultValue, defaultUnit),
  )
  const [displayValue, setDisplayValue] = useState<SynchrotronValue>(nativeValue)
  const [compatibleUnits, setCompatibleUnits] = useState<string[]>([])

  // Update compatible units when native unit changes
  useEffect(() => {
    const units = synchrotronMath.getCompatibleUnits(nativeValue.nativeUnit)
    setCompatibleUnits(units)
  }, [nativeValue.nativeUnit])

  // Handle input value change
  const handleValueChange = (inputValue: string) => {
    const numValue = Number.parseFloat(inputValue) || 0

    // Update native value in current display units, then convert back to native
    const updatedInDisplayUnits = synchrotronMath.createValue(numValue, displayValue.unit)
    const backToNative = synchrotronMath.convertForDisplay(updatedInDisplayUnits, nativeValue.nativeUnit)

    setNativeValue(backToNative)
    setDisplayValue({ ...updatedInDisplayUnits })

    onChange?.(backToNative)
  }

  // Handle unit change for display
  const handleUnitChange = (newUnit: string) => {
    const converted = synchrotronMath.convertForDisplay(nativeValue, newUnit)
    setDisplayValue(converted)
  }

  return (
    <div className={className}>
      <Label htmlFor={`${label}-input`} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex gap-2 mt-1">
        <Input
          id={`${label}-input`}
          type="number"
          value={displayValue.value}
          onChange={(e) => handleValueChange(e.target.value)}
          className="flex-1"
          step="any"
        />
        <Select value={displayValue.unit} onValueChange={handleUnitChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {compatibleUnits.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Native: {nativeValue.nativeValue.toExponential(3)} {nativeValue.nativeUnit}
      </div>
    </div>
  )
}
