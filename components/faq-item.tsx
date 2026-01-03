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
    <div className="border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:rune-glow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-card/30 hover:bg-card/50 transition-colors duration-200"
      >
        <h3 className="font-playfair text-lg font-bold text-primary text-left">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="px-6 py-4 bg-gradient-to-b from-card/20 to-card/10 border-t border-primary/10 max-h-[500px] overflow-y-auto">
          {typeof answer === "string" ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{answer}</p>
          ) : (
            <div className="text-muted-foreground leading-relaxed">{answer}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQItem