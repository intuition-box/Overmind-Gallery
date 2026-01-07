"use client"

import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Cloud } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="flex items-center w-full px-4 py-3 text-sm opacity-0">
        <div className="w-5 h-5 mr-3" />
        Loading...
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center w-full px-4 py-3 text-sm text-card-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 text-left group"
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Icon Container */}
      <div className="relative w-5 h-5 mr-3 flex-shrink-0">
        {/* Moon + Stars → shown in Light Mode (inviting switch to dark) */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            !isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        >
          <Moon className="w-5 h-5 text-blue-400 group-hover:text-blue-500 fill-current" />
          {/* Twinkling Stars */}
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
          <div
            className="absolute top-3 -right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute -top-0.5 right-2 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        {/* Sun + Cloud → shown in Dark Mode (inviting switch to light) */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-0"
          }`}
        >
          <Sun className="w-5 h-5 text-amber-500 group-hover:text-amber-600" />
          <Cloud className="w-2.5 h-2.5 text-gray-400 absolute -bottom-0.5 -right-0.5" />
        </div>
      </div>

      {/* Text label – shows what mode you will switch TO */}
      <span className="font-medium">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  )
}