"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Film, ChevronDown, Clock, Sparkles, ArrowUp, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPromptBarProps {
  mode?: "create" | "edit"
}

export function VideoPromptBar({ mode = "create" }: VideoPromptBarProps) {
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState("5s")
  const [aspectRatio, setAspectRatio] = useState("16:9")

  const durations = ["3s", "5s", "10s", "15s"]
  const aspectRatios = ["16:9", "9:16", "1:1", "4:3"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[720px] px-4 md:ml-9"
    >
      <div className="animate-float">
        <div className="relative flex items-center gap-2 p-2 bg-[rgba(30,30,30,0.8)] backdrop-blur-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl rounded-2xl">
          {/* Attachment/Image Input Button */}
          <button className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
            <ImageIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          </button>

          {/* Input */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === "create" ? "Videonuzu tanımlayın veya görsel yükleyin..." : "Video düzenleme talimatları..."
            }
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />

          {/* Toolbar */}
          <div className="flex items-center gap-1">
            {/* Mode Indicator */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 text-xs text-white">
              <Film className="w-3.5 h-3.5" />
              Video
            </div>

            {/* Duration Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                <Clock className="w-3 h-3" />
                {duration}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute bottom-full mb-2 left-0 hidden group-hover:block">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-1 min-w-[80px]">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={cn(
                        "w-full px-3 py-1.5 text-xs rounded text-left transition-colors",
                        d === duration ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                {aspectRatio}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute bottom-full mb-2 left-0 hidden group-hover:block">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-1 min-w-[80px]">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={cn(
                        "w-full px-3 py-1.5 text-xs rounded text-left transition-colors",
                        ratio === aspectRatio
                          ? "bg-white/10 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality/Style */}
            <button className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200",
                prompt.trim() ? "bg-white text-black hover:bg-zinc-200" : "bg-white/5 text-zinc-500",
              )}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
