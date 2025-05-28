"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    backgroundColor: string
    borderColor: string
    title: string
    content: string
    width: string
    height: string
  }) => void
}

export function CardDialog({ open, onOpenChange, onSubmit }: CardDialogProps) {
  const [backgroundColor, setBackgroundColor] = useState("#f9fafb")
  const [borderColor, setBorderColor] = useState("#e5e7eb")
  const [title, setTitle] = useState("Card Title")
  const [content, setContent] = useState("")
  const [width, setWidth] = useState("100%")
  const [height, setHeight] = useState("auto")

  useEffect(() => {
    if (open) {
      setBackgroundColor("#f9fafb")
      setBorderColor("#e5e7eb")
      setTitle("Card Title")
      setContent("")
      setWidth("100%")
      setHeight("auto")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      backgroundColor,
      borderColor,
      title,
      content,
      width,
      height,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-title" className="text-right">
                Title
              </Label>
              <Input id="card-title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-content" className="text-right">
                Content
              </Label>
              <Textarea
                id="card-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Initial card content"
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dimensions</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="card-width" className="text-xs">
                    Width
                  </Label>
                  <Input
                    id="card-width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="100%, 300px, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="card-height" className="text-xs">
                    Height
                  </Label>
                  <Input
                    id="card-height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="auto, 200px, etc."
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="background-color" className="text-right">
                Background
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="background-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-32" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="border-color" className="text-right">
                Border
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="border-color"
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-32" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Preview</Label>
              <div className="col-span-3">
                <div
                  className="border rounded-lg overflow-hidden"
                  style={{
                    backgroundColor,
                    borderColor,
                    width: width === "100%" ? "100%" : "auto",
                    height: height === "auto" ? "auto" : "100px",
                  }}
                >
                  <div className="p-2 font-medium border-b" style={{ borderColor }}>
                    {title}
                  </div>
                  <div className="p-2 text-sm">{content || "Card content will appear here"}</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Insert Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
