import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "@/ui/elements/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/elements/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/elements/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/elements/hover-card"
import { Badge } from "@/ui/elements/badge"
import { Separator } from "@/ui/elements/separator"
import {
  type Element,
  type ElementCategory,
  PERIODIC_TABLE_DATA,
  ELEMENT_CATEGORIES,
  getElementBySymbol,
} from "../../lib/periodic-table-data"

export type PeriodicTableOutputType = "element" | "symbol" | "name" | "atomicNumber" | "atomicMass"

export interface PeriodicTableProps {
  variant?: "compact" | "grid"
  outputType?: PeriodicTableOutputType
  outputFormat?: "string" | "number" | "object"
  onElementSelect?: (value: any) => void
  value?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

function ElementCard({ element, onClick }: { element: Element; onClick?: () => void }) {
  const categoryInfo = ELEMENT_CATEGORIES[element.category]
  
  const truncatedName = element.name.length > 10 ? element.name.slice(0, 9) + "..." : element.name

  return (
    <HoverCard>
      <HoverCardTrigger >
        <div
          className={cn(
            "relative w-12 h-12 border border-border rounded cursor-pointer transition-all hover:scale-105 hover:shadow-md",
            categoryInfo.lightColor,
            "font-medium text-center flex flex-col justify-center items-center",
            onClick && "hover:ring-1 hover:ring-ring hover:ring-offset-1",
          )}
          onClick={onClick}
        >
          <div className="font-bold absolute top-0.5 left-0.5 text-[8px] opacity-80 leading-none">{element.atomicNumber}</div>
          <div className="text-[10px] font-bold leading-none">{element.symbol}</div>
          <div className="text-[7px] text-center leading-none">{truncatedName}</div>
          <div className=" font-bold absolute bottom-0.5 left-0.5 right-0.5 text-[7px] opacity-90 truncate leading-none">
            {element.atomicMass.toFixed(element.atomicMass % 1 === 0 ? 0 : 1)}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-12 h-12 rounded-md flex items-center justify-center text-white font-bold",
                categoryInfo.color,
              )}
            >
              {element.symbol}
            </div>
            <div>
              <h4 className="text-lg font-semibold">{element.name}</h4>
              <p className="text-sm text-muted-foreground">Atomic Number: {element.atomicNumber}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Atomic Mass:</span>
              <p className="text-muted-foreground">{element.atomicMass} u</p>
            </div>
            <div>
              <span className="font-medium">Category:</span>
              <p className="text-muted-foreground">{categoryInfo.name}</p>
            </div>
            {element.meltingPoint && (
              <div>
                <span className="font-medium">Melting Point:</span>
                <p className="text-muted-foreground">{element.meltingPoint}°C</p>
              </div>
            )}
            {element.boilingPoint && (
              <div>
                <span className="font-medium">Boiling Point:</span>
                <p className="text-muted-foreground">{element.boilingPoint}°C</p>
              </div>
            )}
            {element.discoveryYear && (
              <div>
                <span className="font-medium">Discovery:</span>
                <p className="text-muted-foreground">{element.discoveryYear}</p>
              </div>
            )}
            {element.discoveredBy && (
              <div className="col-span-2">
                <span className="font-medium">Discovered by:</span>
                <p className="text-muted-foreground">{element.discoveredBy}</p>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function CategoryLegend({
  selectedCategories,
  onCategoryToggle,
}: {
  selectedCategories: Set<ElementCategory>
  onCategoryToggle: (category: ElementCategory) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(ELEMENT_CATEGORIES).map(([key, info]) => {
        const category = key as ElementCategory
        const isSelected = selectedCategories.has(category)

        return (
          <Badge
            key={category}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              isSelected && info.lightColor,
              isSelected && "border-transparent text-foreground",
            )}
            onClick={() => onCategoryToggle(category)}
          >
            <div className={cn("w-3 h-3 rounded-full mr-2", info.lightColor)} />
            {info.name}
          </Badge>
        )
      })}
    </div>
  )
}

function PeriodicTableGrid({
  elements,
  onElementSelect,
  selectedCategories,
}: {
  elements: Element[]
  onElementSelect: (element: Element) => void
  selectedCategories: Set<ElementCategory>
}) {
  const filteredElements = elements.filter(
    (element) => selectedCategories.size === 0 || selectedCategories.has(element.category),
  )

  // Create the classic periodic table layout
  // Each array represents the atomic numbers for that period, with null for empty spaces
  const periodicTableLayout = [
    // Period 1
    [1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2],
    // Period 2  
    [3, 4, null, null, null, null, null, null, null, null, null, null, 5, 6, 7, 8, 9, 10],
    // Period 3
    [11, 12, null, null, null, null, null, null, null, null, null, null, 13, 14, 15, 16, 17, 18],
    // Period 4
    [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    // Period 5
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    // Period 6 (with lanthanide placeholder)
    [55, 56, "La-Lu", 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
    // Period 7 (with actinide placeholder)
    [87, 88, "Ac-Lr", 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  ]

  const lanthanides = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]
  
  const actinides = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]

  const renderElement = (atomicNumber: number | string | null) => {
    if (atomicNumber === null) {
      return <div key={`empty-${Math.random()}`} className="w-12 h-12" />
    }
    
    if (typeof atomicNumber === 'string') {
      return (
        <div key={atomicNumber} className="w-12 h-12 border border-dashed border-gray-400 rounded flex items-center justify-center">
          <span className="text-[8px] text-gray-500 font-medium">{atomicNumber}</span>
        </div>
      )
    }

    const element = filteredElements.find((el) => el.atomicNumber === atomicNumber)
    if (!element) {
      return <div key={atomicNumber} className="w-12 h-12" />
    }

    return <ElementCard key={element.atomicNumber} element={element} onClick={() => onElementSelect(element)} />
  }

  return (
    <div className="space-y-1">
      {/* Main periodic table */}
      {periodicTableLayout.map((period, periodIndex) => (
        <div key={periodIndex} className="flex gap-0.5">
          {period.map((atomicNumber, index) => (
            <div key={`${periodIndex}-${index}`}>
              {renderElement(atomicNumber)}
            </div>
          ))}
        </div>
      ))}

      {/* Lanthanides and Actinides */}
      <div className="mt-4 space-y-1">
        {/* Lanthanides */}
        <div className="flex gap-0.5">
          <div className="w-12 h-12 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">La-Lu</span>
          </div>
          {lanthanides.map((atomicNumber) => (
            <div key={atomicNumber}>
              {renderElement(atomicNumber)}
            </div>
          ))}
        </div>
        
        {/* Actinides */}
        <div className="flex gap-0.5">
          <div className="w-12 h-12 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">Ac-Lr</span>
          </div>
          {actinides.map((atomicNumber) => (
            <div key={atomicNumber}>
              {renderElement(atomicNumber)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PeriodicTable({
  variant = "compact",
  outputType = "element",
  outputFormat = "object",
  onElementSelect,
  value,
  placeholder = "Select element...",
  className,
  disabled = false,
}: PeriodicTableProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedElement, setSelectedElement] = React.useState<Element | null>(
    value ? getElementBySymbol(value) || null : null,
  )
  const [selectedCategories, setSelectedCategories] = React.useState<Set<ElementCategory>>(new Set())

  const handleElementSelect = (element: Element) => {
    setSelectedElement(element)
    setOpen(false)

    if (onElementSelect) {
      let outputValue: any

      switch (outputType) {
        case "symbol":
          outputValue = element.symbol
          break
        case "name":
          outputValue = element.name
          break
        case "atomicNumber":
          outputValue = element.atomicNumber
          break
        case "atomicMass":
          outputValue = element.atomicMass
          break
        case "element":
        default:
          outputValue = element
          break
      }

      if (outputFormat === "string") {
        outputValue = String(outputValue)
      } else if (outputFormat === "number" && typeof outputValue !== "number") {
        outputValue = Number(outputValue) || 0
      }

      onElementSelect(outputValue)
    }
  }

  const handleCategoryToggle = (category: ElementCategory) => {
    const newCategories = new Set(selectedCategories)
    if (newCategories.has(category)) {
      newCategories.delete(category)
    } else {
      newCategories.add(category)
    }
    setSelectedCategories(newCategories)
  }

  if (variant === "compact") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
            disabled={disabled}
          >
            {selectedElement ? (
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white",
                    ELEMENT_CATEGORIES[selectedElement.category].color,
                  )}
                >
                  {selectedElement.symbol}
                </div>
                <span>{selectedElement.name}</span>
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search elements..." />
            <CommandList>
              <CommandEmpty>No element found.</CommandEmpty>
              {Object.entries(ELEMENT_CATEGORIES).map(([categoryKey, categoryInfo]) => {
                const category = categoryKey as ElementCategory
                const categoryElements = PERIODIC_TABLE_DATA.filter((el) => el.category === category)

                if (categoryElements.length === 0) return null

                return (
                  <CommandGroup key={category} heading={categoryInfo.name}>
                    {categoryElements.map((element) => (
                      <CommandItem
                        key={element.atomicNumber}
                        value={`${element.name} ${element.symbol} ${element.atomicNumber}`}
                        onSelect={() => handleElementSelect(element)}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div
                            className={cn(
                              "w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white",
                              categoryInfo.color,
                            )}
                          >
                            {element.symbol}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{element.name}</div>
                            <div className="text-sm text-muted-foreground">
                              #{element.atomicNumber} • {element.atomicMass} u
                            </div>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedElement?.atomicNumber === element.atomicNumber ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
 if (variant === "grid") {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {selectedElement ? (
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white",
                  ELEMENT_CATEGORIES[selectedElement.category].color,
                )}
              >
                {selectedElement.symbol}
              </div>
              <span>{selectedElement.name}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[950px] p-4 max-h-[80vh] overflow-y-auto" align="start">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">Select an Element</h4>
          </div>

          <CategoryLegend selectedCategories={selectedCategories} onCategoryToggle={handleCategoryToggle} />

          <PeriodicTableGrid
            elements={PERIODIC_TABLE_DATA}
            onElementSelect={handleElementSelect}
            selectedCategories={selectedCategories}
          />
        </div>
      </PopoverContent>
    </Popover>
    )
  }
    return null
}
