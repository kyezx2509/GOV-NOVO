import type React from "react"
import { AlertTriangle, CheckCircle, Info, AlertOctagon } from "lucide-react"

type AlertType = "warning" | "error" | "success" | "info" | "critical"

interface AlertBoxProps {
  type: AlertType
  title: string
  children: React.ReactNode
  icon?: boolean
  className?: string
}

export function AlertBox({ type, title, children, icon = true, className = "" }: AlertBoxProps) {
  const getIcon = () => {
    if (!icon) return null

    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 warning-icon" />
      case "error":
      case "critical":
        return <AlertOctagon className="h-5 w-5 danger-icon" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 info-icon" />
    }
  }

  const getContainerClass = () => {
    switch (type) {
      case "warning":
        return "warning-block"
      case "error":
        return "danger-block"
      case "critical":
        return "bg-red-100 border border-red-300 rounded-md p-4 mb-6"
      case "success":
        return "bg-green-50 border border-green-200 rounded-md p-4 mb-6"
      case "info":
        return "bg-[#e5f1ff] border border-[#c4daff] rounded-md p-4 mb-6"
    }
  }

  const getTitleClass = () => {
    switch (type) {
      case "warning":
        return "text-orange-700 font-medium"
      case "error":
      case "critical":
        return "text-red-800 font-medium"
      case "success":
        return "text-green-800 font-medium"
      case "info":
        return "text-[#071D41] font-medium"
    }
  }

  return (
    <div className={`${getContainerClass()} ${className}`}>
      <div className="flex">
        {icon && <div className="flex-shrink-0">{getIcon()}</div>}
        <div className={icon ? "ml-3" : ""}>
          <h3 className={`text-sm ${getTitleClass()}`}>{title}</h3>
          <div className="mt-2 text-sm text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
