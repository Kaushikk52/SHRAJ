"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Editor } from "@tiptap/react"

interface TableEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editor: Editor
}

export function TableEditDialog({ open, onOpenChange, editor }: TableEditDialogProps) {
  const [borderStyle, setBorderStyle] = useState("solid")
  const [borderColor, setBorderColor] = useState("#e5e7eb")
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#f3f4f6")

  useEffect(() => {
    if (open && editor.isActive("table")) {
      // Get current table attributes
      const tableAttrs = editor.getAttributes("table")
      setBorderStyle(tableAttrs.borderStyle || "solid")
      setBorderColor(tableAttrs.borderColor || "#e5e7eb")
      setHeaderBackgroundColor(tableAttrs.headerBackgroundColor || "#f3f4f6")
    }
  }, [open, editor])

  const applyTableStyling = (borderStyle: string, borderColor: string, headerBgColor: string) => {
    // Update table node attributes
    editor.commands.updateAttributes("table", {
      borderStyle,
      borderColor,
      headerBackgroundColor: headerBgColor,
    })

    // Update all header cells with new background color
    const { state } = editor
    const { tr } = state
    let modified = false

    state.doc.descendants((node, pos) => {
      if (node.type.name === "tableHeader") {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          backgroundColor: headerBgColor,
        })
        modified = true
      }
    })

    if (modified) {
      editor.view.dispatch(tr)
    }

    // Apply DOM styling for immediate visual feedback
    setTimeout(() => {
      const tableElement = editor.view.dom.querySelector("table.custom-table")
      if (tableElement) {
        // Apply table-level styling
        tableElement.style.borderCollapse = "collapse"
        tableElement.style.width = "100%"
        tableElement.style.border = `1px ${borderStyle} ${borderColor}`
        tableElement.setAttribute("data-border-style", borderStyle)
        tableElement.setAttribute("data-border-color", borderColor)
        tableElement.setAttribute("data-header-bg", headerBgColor)

        // Apply cell-level styling
        const allCells = tableElement.querySelectorAll("td, th")
        allCells.forEach((cell) => {
          const htmlCell = cell as HTMLElement
          htmlCell.style.border = `1px ${borderStyle} ${borderColor}`
          htmlCell.style.padding = "8px"
        })

        // Apply header-specific styling
        const headers = tableElement.querySelectorAll("th")
        headers.forEach((header) => {
          const htmlHeader = header as HTMLElement
          htmlHeader.style.backgroundColor = headerBgColor
          htmlHeader.style.fontWeight = "600"
          htmlHeader.setAttribute("data-bg-color", headerBgColor)
        })
      }
    }, 50)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editor.isActive("table")) return

    applyTableStyling(borderStyle, borderColor, headerBackgroundColor)
    onOpenChange(false)
  }

  const renderTablePreview = () => {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className="border p-1 text-xs font-semibold"
              style={{
                borderColor,
                backgroundColor: headerBackgroundColor,
                borderStyle,
              }}
            >
              Header 1
            </th>
            <th
              className="border p-1 text-xs font-semibold"
              style={{
                borderColor,
                backgroundColor: headerBackgroundColor,
                borderStyle,
              }}
            >
              Header 2
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="border p-1 text-xs"
              style={{
                borderColor,
                borderStyle,
              }}
            >
              Cell 1,1
            </td>
            <td
              className="border p-1 text-xs"
              style={{
                borderColor,
                borderStyle,
              }}
            >
              Cell 1,2
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Table Properties</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="header-bg" className="text-right">
                Header Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="header-bg"
                  type="color"
                  value={headerBackgroundColor}
                  onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={headerBackgroundColor}
                  onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Border Style</Label>
              <RadioGroup value={borderStyle} onValueChange={setBorderStyle} className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solid" id="solid" />
                  <Label htmlFor="solid">Solid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dashed" id="dashed" />
                  <Label htmlFor="dashed">Dashed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dotted" id="dotted" />
                  <Label htmlFor="dotted">Dotted</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="border-color" className="text-right">
                Border Color
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
              <div className="col-span-3">{renderTablePreview()}</div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Table</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
