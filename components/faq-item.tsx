"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type React from "react"

interface FAQItemProps {
  question: string
  answer: string | React.ReactNode
  category?: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-cyan-400/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-black/30 hover:bg-black/50 transition-colors duration-200"
      >
        <h3 className="font-playfair text-lg font-bold text-cyan-400 text-left">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-cyan-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="px-6 py-4 bg-gradient-to-b from-black/20 to-black/10 border-t border-cyan-400/10 max-h-[500px] overflow-y-auto">
          {typeof answer === "string" ? (
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
          ) : (
            <div className="text-gray-300 leading-relaxed">{answer}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQItem
