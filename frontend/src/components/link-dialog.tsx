"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const PRESET_COLORS = [
  { label: "Blue", value: "#e9f5ff" },
  { label: "Green", value: "#e3fcef" },
  { label: "Yellow", value: "#fef9c3" },
  { label: "Pink", value: "#fce7f3" },
  { label: "Purple", value: "#f3e8ff" },
  { label: "Orange", value: "#ffedd5" },
]

interface LinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { url: string; text: string; bgColor: string; paddingX: string; paddingY: string }) => void
  initialText?: string
  initialUrl?: string
  initialBgColor?: string
  initialPaddingX?: string
  initialPaddingY?: string
}

export function LinkDialog({
  open,
  onOpenChange,
  onSubmit,
  initialText = "",
  initialUrl = "",
  initialBgColor = "#e9f5ff",
  initialPaddingX = "0.375rem",
  initialPaddingY = "0.125rem",
}: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl)
  const [text, setText] = useState(initialText)
  const [bgColor, setBgColor] = useState(initialBgColor)
  const [paddingX, setPaddingX] = useState(initialPaddingX)
  const [paddingY, setPaddingY] = useState(initialPaddingY)

  useEffect(() => {
    if (open) {
      setUrl(initialUrl)
      setText(initialText)
      setBgColor(initialBgColor)
      setPaddingX(initialPaddingX)
      setPaddingY(initialPaddingY)
    }
  }, [open, initialUrl, initialText, initialBgColor, initialPaddingX, initialPaddingY])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ url, text, bgColor, paddingX, paddingY })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Link with Background Color</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Text
              </Label>
              <Input
                id="text"
                placeholder="Link text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Background</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-8 h-8 rounded-full border ${bgColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setBgColor(color.value)}
                    title={color.label}
                  />
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 p-0 border-0"
                  />
                  <span className="text-xs text-muted-foreground">{bgColor}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Padding</Label>
              <div className="col-span-3 flex gap-2">
                <div className="w-1/2">
                  <Label htmlFor="paddingX" className="text-xs">
                    Horizontal (X)
                  </Label>
                  <Input
                    id="paddingX"
                    placeholder="0.375rem"
                    value={paddingX}
                    onChange={(e) => setPaddingX(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="paddingY" className="text-xs">
                    Vertical (Y)
                  </Label>
                  <Input
                    id="paddingY"
                    placeholder="0.125rem"
                    value={paddingY}
                    onChange={(e) => setPaddingY(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Preview</Label>
              <div className="col-span-3">
                <span
                  className="rounded"
                  style={{
                    backgroundColor: bgColor,
                    padding: `${paddingY} ${paddingX}`,
                  }}
                >
                  {text || "Link preview"}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!url.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
