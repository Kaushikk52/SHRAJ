"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UnderlineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { color: string }) => void
  initialColor?: string
}

export function UnderlineDialog({ open, onOpenChange, onSubmit, initialColor = "#000000" }: UnderlineDialogProps) {
  const [color, setColor] = useState(initialColor)

  useEffect(() => {
    if (open) {
      setColor(initialColor)
    }
  }, [open, initialColor])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ color })
  }

  const PRESET_COLORS = [
    { label: "Black", value: "#000000" },
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#22c55e" },
    { label: "Yellow", value: "#eab308" },
    { label: "Purple", value: "#a855f7" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Underline</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="underline-color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="underline-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="w-32" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Presets</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`w-8 h-8 rounded-full border ${
                      color === preset.value ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: preset.value }}
                    onClick={() => setColor(preset.value)}
                    title={preset.label}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Preview</Label>
              <div className="col-span-3">
                <span style={{ textDecoration: "underline", textDecorationColor: color }}>
                  This is how your underlined text will look
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Apply Underline</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
