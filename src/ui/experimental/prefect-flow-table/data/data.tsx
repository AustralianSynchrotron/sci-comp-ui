import { Clock, Play, CheckCircle, XCircle, Pause, AlertTriangle, RotateCcw } from "lucide-react"

export const flowStates = [
  {
    value: "scheduled",
    label: "Scheduled",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    value: "running",
    label: "Running",
    icon: Play,
    color: "text-green-600",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: Pause,
    color: "text-gray-600",
  },
  {
    value: "crashed",
    label: "Crashed",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    value: "retrying",
    label: "Retrying",
    icon: RotateCcw,
    color: "text-yellow-600",
  },
]

export const queueNames = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "high-priority",
    label: "High Priority",
  },
  {
    value: "data-processing",
    label: "Data Processing",
  },
  {
    value: "ml-training",
    label: "ML Training",
  },
  {
    value: "etl-pipeline",
    label: "ETL Pipeline",
  },
]
