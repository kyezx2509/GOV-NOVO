"use client"

import { FileText, Copy, CheckCircle, Shield } from "lucide-react"
import { useState } from "react"

interface ProtocolBadgeProps {
  protocol: string
  date?: string
  time?: string
  className?: string
  copyable?: boolean
}

export function ProtocolBadge({ protocol, date, time, className = "", copyable = true }: ProtocolBadgeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!copyable) return
    navigator.clipboard.writeText(protocol)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-md p-3 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <FileText className="text-blue-600 mr-2 mt-0.5" size={18} />
          <div>
            <div className="flex items-center">
              <p className="text-sm font-medium text-blue-800">Protocolo: {protocol}</p>
              {copyable && (
                <button
                  onClick={handleCopy}
                  className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                  title="Copiar protocolo"
                >
                  {copied ? (
                    <CheckCircle size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} className="text-blue-600" />
                  )}
                </button>
              )}
            </div>
            {(date || time) && (
              <p className="text-xs text-gray-600 mt-1">
                {date && `Emitido em: ${date}`} {time && `às ${time}`}
              </p>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-xs text-gray-500 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded flex items-center">
              <Shield size={10} className="mr-1" />
              Autenticado digitalmente
            </span>
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded flex items-center">
              <CheckCircle size={10} className="mr-1" />
              Verificado
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
