'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

const FloatingCoffeeWidget = () => {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Panel */}
      <div
        ref={panelRef}
        className={clsx(
          'origin-bottom-right transform transition-all duration-300',
          open
            ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto'
            : 'scale-90 opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div className="mb-2 w-72 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Support Me</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you enjoy my work, support me here:
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.paypal.com/paypalme/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-center font-semibold"
            >
              PayPal
            </a>
            <a
              href="bitcoin:yourBitcoinAddress"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-center font-semibold"
            >
              Bitcoin
            </a>
            <a
              href="ethereum:yourEthereumAddress"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-center font-semibold"
            >
              Ethereum
            </a>
          </div>
        </div>
      </div>

      {/* Floating Coffee Cup */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-16 h-20 flex items-end justify-center transition-transform transform hover:scale-110"
        aria-label="Support Me"
      >
        {/* Cup Body */}
        <div className="w-14 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-b-xl shadow-2xl relative flex items-end justify-center">
          {/* Steam */}
          <div className="absolute top-0 w-1 h-4 bg-white rounded-full animate-steam left-4"></div>
          <div className="absolute top-0 w-1 h-4 bg-white rounded-full animate-steam left-7 delay-200"></div>
          <div className="absolute top-0 w-1 h-4 bg-white rounded-full animate-steam left-10 delay-400"></div>
        </div>
        {/* Cup Handle */}
        <div className="absolute right-[-6px] top-4 w-4 h-8 border-4 border-orange-500 rounded-r-full"></div>
      </button>

      {/* Steam animation */}
      <style jsx>{`
        @keyframes steam {
          0% {
            transform: translateY(0) scaleX(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-6px) scaleX(1.2);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-12px) scaleX(1);
            opacity: 0;
          }
        }
        .animate-steam {
          animation: steam 2s infinite;
        }
        .animate-steam.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-steam.delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}

export default FloatingCoffeeWidget
