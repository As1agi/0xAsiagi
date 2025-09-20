'use client'
import { useEffect, useRef, useState } from 'react'

export default function ProjectsClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(true)
  const message = '🚧 This page is under construction 🏗️🛠️'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars =
      '01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?'.split('')
    const fontSize = 18
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(0)

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.95 ? '#00ff88' : '#0f0'
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, i * fontSize, y * fontSize)
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  // Fade in / fade out blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev)
    }, 1000) // 1s per cycle
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* MATRIX CANVAS */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Blinking overlay text with fade effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <h1
          className={`text-green-400 text-lg font-mono transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {message}
        </h1>
      </div>
    </div>
  )
}
