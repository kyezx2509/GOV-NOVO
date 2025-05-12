"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  minutes: number
  seconds: number
  onComplete?: () => void
}

export function Countdown({ minutes, seconds, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          if (onComplete) onComplete()
          return prev
        }

        if (prev.seconds === 0) {
          return {
            minutes: prev.minutes - 1,
            seconds: 59,
          }
        }

        return {
          minutes: prev.minutes,
          seconds: prev.seconds - 1,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">Tempo para compensação automática:</p>
      <p className="text-2xl font-mono font-bold">
        {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
      </p>
    </div>
  )
}
