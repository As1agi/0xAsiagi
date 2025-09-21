'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-700 ease-in-out overflow-hidden',
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-yellow-200 border-yellow-300 border'
      )}
    >
      {/* Toggle ball */}
      <div
        className={clsx(
          'absolute w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-700 ease-in-out',
          isDark
            ? 'bg-gray-700 text-yellow-300 left-1 translate-x-8'
            : 'bg-yellow-200 text-yellow-500 left-1 translate-x-0'
        )}
      >
        <svg
          className={clsx(
            'w-5 h-5 transition-all duration-700 ease-in-out',
            isDark ? 'animate-breath' : 'animate-sun-rotate'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {isDark ? (
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="5" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = i * 45 * (Math.PI / 180)
                const x1 = 12 + Math.cos(angle) * 7
                const y1 = 12 + Math.sin(angle) * 7
                const x2 = 12 + Math.cos(angle) * 9
                const y2 = 12 + Math.sin(angle) * 9
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              })}
            </>
          )}
        </svg>
      </div>

      <style jsx>{`
        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        .animate-breath {
          animation: breath 2.5s ease-in-out infinite;
        }

        @keyframes sun-rotate {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(22deg) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        .animate-sun-rotate {
          animation: sun-rotate 3s ease-in-out infinite;
        }
      `}</style>
    </button>
  )
}

export default ThemeSwitch
