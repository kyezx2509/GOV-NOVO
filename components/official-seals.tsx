import { Shield, CheckCircle } from "lucide-react"

interface OfficialSealsProps {
  className?: string
  variant?: "default" | "compact" | "inline"
}

export function OfficialSeals({ className = "", variant = "default" }: OfficialSealsProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="bg-[#071D41] text-white text-xs font-medium px-2 py-1 rounded flex items-center">
          <Shield size={12} className="mr-1" />
          <span>SEFISC</span>
        </div>
        <div className="ml-1 text-xs text-green-600 flex items-center">
          <CheckCircle size={10} className="mr-1" />
          <span className="hidden sm:inline">Verificado</span>
        </div>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="bg-[#071D41] text-white text-xs font-medium px-2 py-0.5 rounded flex items-center">
          <span className="mr-1">•</span>
          <span>PGFN</span>
        </div>
        <div className="bg-[#071D41] text-white text-xs font-medium px-2 py-0.5 rounded flex items-center">
          <span className="mr-1">•</span>
          <span>SEFISC</span>
        </div>
        <div className="bg-[#071D41] text-white text-xs font-medium px-2 py-0.5 rounded flex items-center">
          <span className="mr-1">•</span>
          <span>SERPRO</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <div className="bg-[#071D41] text-white text-xs font-medium px-3 py-1 rounded flex items-center">
        <span className="mr-1">•</span>
        <span>PGFN</span>
      </div>
      <div className="bg-[#071D41] text-white text-xs font-medium px-3 py-1 rounded flex items-center">
        <span className="mr-1">•</span>
        <span>SEFISC</span>
      </div>
      <div className="bg-[#071D41] text-white text-xs font-medium px-3 py-1 rounded flex items-center">
        <span className="mr-1">•</span>
        <span>SISTEMA NACIONAL DE FISCALIZAÇÃO ELETRÔNICA</span>
      </div>
      <div className="bg-[#071D41] text-white text-xs font-medium px-3 py-1 rounded flex items-center">
        <span className="mr-1">•</span>
        <span>SERPRO</span>
      </div>
    </div>
  )
}
