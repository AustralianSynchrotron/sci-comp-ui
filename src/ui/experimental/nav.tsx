// import { useState, useEffect, useRef, useCallback } from "react"
// import { Minus, Plus, Copy } from "lucide-react"
// import { cn } from "../../lib/utils"
// import { Slider } from "../elements/slider"
// import { Button } from "../elements/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../layout/card"
// import { Label } from "../elements/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../elements/select"

interface NavProps {
  textProp: string
}

export function Nav({ textProp }: NavProps) {
  return (
    <div>
      <h1>Nav</h1>
      <p>{textProp}</p>
    </div>
  )
}
