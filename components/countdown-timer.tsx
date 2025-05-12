"use client"

import { useEffect, useState } from "react"
import { Clock, AlertTriangle } from "lucide-react"

interface CountdownTimerProps {
  hours?: number
  minutes?: number
  seconds?: number
  onComplete?: () => void
  className?: string
  showIcon?: boolean
  label?: string
}

export function CountdownTimer({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onComplete,
  className = "",
  showIcon = true,
  label = "Tempo restante para regularização sem acréscimo:",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds,
  })
  const [isWarning, setIsWarning] = useState(false)
  const [isCritical, setIsCritical] = useState(false)

  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds

    // Set warning state if less than 30 minutes
    if (totalSeconds <= 1800) {
      setIsWarning(true)
    }

    // Set critical state if less than 10 minutes
    if (totalSeconds <= 600) {
      setIsCritical(true)
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          if (onComplete) onComplete()
          return prev
        }

        let newHours = prev.hours
        let newMinutes = prev.minutes
        let newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        // Update warning states
        const newTotalSeconds = newHours * 3600 + newMinutes * 60 + newSeconds
        if (newTotalSeconds <= 1800 && !isWarning) {
          setIsWarning(true)
        }
        if (newTotalSeconds <= 600 && !isCritical) {
          setIsCritical(true)
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [hours, minutes, seconds, onComplete, isWarning, isCritical])

  const getTimerClasses = () => {
    if (isCritical) return "text-red-700 animate-pulse-slow"
    if (isWarning) return "text-orange-700"
    return "text-blue-700"
  }

  return (
    <div className={`flex items-center ${className}`}>
      {showIcon &&
        (isCritical ? (
          <AlertTriangle className="text-red-600 mr-2" size={18} />
        ) : (
          <Clock className="text-orange-600 mr-2" size={18} />
        ))}
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className={`text-xl font-mono font-bold ${getTimerClasses()}`}>
          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </p>
        {isCritical && (
          <p className="text-xs text-red-600 mt-1 animate-fadeIn">Atenção: prazo crítico para regularização!</p>
        )}
      </div>
    </div>
  )
}
