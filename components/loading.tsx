"use client"

import { useEffect, useState } from "react"
import { Shield, Database, Server, FileCheck } from "lucide-react"

interface LoadingProps {
  messages: string[]
  onComplete?: () => void
  duration?: number
}

export function Loading({ messages, onComplete, duration = 4000 }: LoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dots, setDots] = useState("")
  const [progress, setProgress] = useState(0)
  const [showIcon, setShowIcon] = useState(0)

  const icons = [
    <Database key="database" className="text-blue-600" size={18} />,
    <Server key="server" className="text-blue-600" size={18} />,
    <Shield key="shield" className="text-blue-600" size={18} />,
    <FileCheck key="filecheck" className="text-blue-600" size={18} />,
  ]

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    const iconInterval = setInterval(() => {
      setShowIcon((prev) => (prev + 1) % icons.length)
    }, 1200)

    const messageInterval = setInterval(() => {
      if (currentIndex < messages.length - 1) {
        setCurrentIndex((prev) => prev + 1)
        setProgress(((currentIndex + 1) / messages.length) * 100)
      } else if (onComplete) {
        onComplete()
        clearInterval(messageInterval)
      }
    }, duration / messages.length)

    // Progress bar animation
    const progressStep = 100 / (duration / 50)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentIndex + 1) / messages.length) * 100
        if (prev < target) {
          return Math.min(prev + progressStep, target)
        }
        return prev
      })
    }, 50)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearInterval(iconInterval)
    }
  }, [currentIndex, messages.length, onComplete, duration, icons.length])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{icons[showIcon]}</div>
      </div>

      <div className="text-center max-w-md">
        <p className="text-lg font-medium text-gray-700 mb-2 flex items-center justify-center">
          <span className="mr-2">{messages[currentIndex]}</span>
          <span className="text-blue-600 font-mono">{dots}</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">Aguarde enquanto processamos sua solicitação</p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Consultando bases oficiais</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}
