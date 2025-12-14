"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const teeth = {
  upper: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  lower: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
}

const toothStatus = {
  11: "healthy",
  12: "cavity",
  16: "filled",
  21: "healthy",
  26: "root-canal",
  31: "healthy",
  36: "crown",
  46: "extracted",
}

const statusColors = {
  healthy: "fill-white stroke-foreground",
  cavity: "fill-red-500/20 stroke-red-500",
  filled: "fill-blue-500/20 stroke-blue-500",
  "root-canal": "fill-purple-500/20 stroke-purple-500",
  crown: "fill-amber-500/20 stroke-amber-500",
  extracted: "fill-gray-500/20 stroke-gray-500",
}

export function Odontogram() {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Upper Teeth */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-xs text-muted-foreground font-medium">Arcada Superior</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {teeth.upper.map((tooth) => (
            <button
              key={tooth}
              onClick={() => setSelectedTooth(tooth)}
              className={cn(
                "flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors",
                selectedTooth === tooth && "bg-accent",
              )}
            >
              <svg width="32" height="40" viewBox="0 0 32 40" className={statusColors[toothStatus[tooth] || "healthy"]}>
                <path
                  d="M16 2 C10 2 8 6 8 10 L8 30 C8 35 10 38 16 38 C22 38 24 35 24 30 L24 10 C24 6 22 2 16 2 Z"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-xs font-medium">{tooth}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lower Teeth */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 flex-wrap justify-center">
          {teeth.lower.map((tooth) => (
            <button
              key={tooth}
              onClick={() => setSelectedTooth(tooth)}
              className={cn(
                "flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors",
                selectedTooth === tooth && "bg-accent",
              )}
            >
              <span className="text-xs font-medium">{tooth}</span>
              <svg width="32" height="40" viewBox="0 0 32 40" className={statusColors[toothStatus[tooth] || "healthy"]}>
                <path
                  d="M16 2 C10 2 8 6 8 10 L8 30 C8 35 10 38 16 38 C22 38 24 35 24 30 L24 10 C24 6 22 2 16 2 Z"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground font-medium">Arcada Inferior</div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center pt-6 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border-2 border-foreground" />
          <span className="text-xs">Saudável</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/20 border-2 border-red-500" />
          <span className="text-xs">Cárie</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500/20 border-2 border-blue-500" />
          <span className="text-xs">Obturado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500/20 border-2 border-purple-500" />
          <span className="text-xs">Canal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500/20 border-2 border-amber-500" />
          <span className="text-xs">Coroa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-500/20 border-2 border-gray-500" />
          <span className="text-xs">Extraído</span>
        </div>
      </div>
    </div>
  )
}
