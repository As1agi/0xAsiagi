'use client'
import { useRef, useEffect, useState } from 'react'

const skills = [
  { emoji: '💻', label: 'C++', level: 'Intermediate', anim: 'laptop-bounce', code: ["#include <iostream>", "int main() {", "  std::cout << \"Hello World!\" << std::endl;", "  return 0;", "}   "] },
  { emoji: '🐍', label: 'Python', level: 'Intermediate', anim: 'snake-slither', code: ["def greet(name):", "    print(f'Hello, {name}')", "", "for i in range(5):", "    greet('World')   "] },
  { emoji: '♟️', label: 'Chess', level: 'Intermediate', anim: 'chess-tilt', code: ["Chess.com","username: 1Asiagi","1030 elo  ","come play me"]},
  { emoji: '🕵️‍♂️', label: 'Reverse Engineering', level: 'Beginner', anim: 'detective-look', code: ["01100110 10101001 00110100 11001010", "E8 FF D4 89 01 23 45 67 ...  "] },
  { emoji: '🔐', label: 'Cryptography', level: 'Beginner', anim: 'lock-wiggle', code: ["AES-256 Encryption", "RSA Keys Generated", "Caesar Shift: KHOOR   "] },
  { emoji: '🌐', label: 'Web Exploitation', level: 'Beginner', anim: 'globe-spin', code: ["GET /index.html HTTP/1.1", "Host: example.com", "200 OK    "] },
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseEnter = () => { container.style.animationPlayState = 'paused' }
    const handleMouseLeave = () => { container.style.animationPlayState = 'running' }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="relative overflow-hidden w-full bg-[#fefefe] dark:bg-gray-900 py-12 transition-colors duration-700">
      {/* Section Label */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-wide transition-colors duration-700">
          My Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2 transition-colors duration-700">
        </p>
      </div>

      <div ref={containerRef} className="flex animate-loop-scroll">
        {[...skills, ...skills].map((skill, idx) => (
          <div
            key={idx}
            className={`relative flex-shrink-0 w-48 h-48 m-4 
                       bg-[#ffffff] dark:bg-gray-800 rounded-2xl 
                       border border-gray-300 dark:border-gray-700
                       text-center flex flex-col items-center justify-center 
                       transition-all duration-700
                       cursor-pointer hover:scale-105 group overflow-hidden
                       hover:bg-gray-100 dark:hover:bg-gray-700`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Typing background only on hover */}
            {hovered === idx && skill.code.length > 0 && <TypingTerminal lines={skill.code} />}

            {/* Emoji */}
            <span className={`text-4xl mb-3 relative z-10 transition-transform duration-300 hover:scale-125 ${skill.anim}`}>
              {skill.emoji}
            </span>

            <span className="text-gray-900 dark:text-gray-100 font-semibold relative z-10 transition-colors duration-700">{skill.label}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute bottom-3 z-10 transition-colors duration-700">
              {skill.level}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes loop-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-loop-scroll {
          display: flex;
          animation: loop-scroll 20s linear infinite;
          width: max-content;
        }

        /* Emoji hover animations */
        .snake-slither:hover { animation: slither 0.6s infinite alternate ease-in-out; }
        @keyframes slither { 0% { transform: translateX(0); } 100% { transform: translateX(8px); } }

        .lock-wiggle:hover { animation: wiggle 0.4s infinite ease-in-out; }
        @keyframes wiggle { 0%,100%{transform:rotate(0deg);}25%{transform:rotate(-10deg);}75%{transform:rotate(10deg);} }

        .detective-look:hover { animation: look 0.8s infinite ease-in-out; }
        @keyframes look { 0%,100%{transform:translateX(0);}50%{transform:translateX(-6px);} }

        .laptop-bounce:hover { animation: bounce 0.6s infinite ease-in-out; }
        @keyframes bounce { 0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);} }

        .chess-tilt:hover { animation: tilt 0.6s infinite ease-in-out; }
        @keyframes tilt { 0%,100%{transform:rotate(0deg);}50%{transform:rotate(-8deg);} }

        .globe-spin:hover { animation: spin 1.2s infinite linear; }
        @keyframes spin { 0%{transform:rotate(0);}100%{transform:rotate(360deg);} }
      `}</style>
    </section>
  )
}

// Typing animation component
function TypingTerminal({ lines }: { lines: string[] }) {
  const bgRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = bgRef.current
    const cursor = cursorRef.current
    if (!el || !cursor) return

    let lineIndex = 0
    let charIndex = 0
    el.textContent = ''

    const interval = setInterval(() => {
      if (lineIndex >= lines.length) {
        lineIndex = 0
        charIndex = 0
        el.textContent = ''
      } else {
        el.textContent += lines[lineIndex][charIndex] || ''
        charIndex++
        if (charIndex >= lines[lineIndex].length) {
          charIndex = 0
          lineIndex++
          el.textContent += '\n'
        }
      }
    }, 50)

    const cursorBlink = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0'
    }, 500)

    return () => { clearInterval(interval); clearInterval(cursorBlink) }
  }, [lines])

  return (
    <pre className="absolute inset-0 p-2 text-xs font-mono opacity-30 pointer-events-none whitespace-pre-wrap">
      <span ref={bgRef} className="text-gray-800 dark:text-green-400 transition-colors duration-700"></span>
      <span ref={cursorRef} className="text-gray-800 dark:text-green-400 transition-colors duration-700">_</span>
    </pre>
  )
}
