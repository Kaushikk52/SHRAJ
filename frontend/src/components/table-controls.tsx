"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus, Palette, AlignLeft, AlignCenter, AlignRight, Settings } from "lucide-react"
import type { Editor } from "@tiptap/react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TableControlsProps {
  editor: Editor
  onEditTable: () => void
}

export function TableControls({ editor, onEditTable }: TableControlsProps) {
  const [cellBgColor, setCellBgColor] = useState("#ffffff")
  const [rowBgColor, setRowBgColor] = useState("#ffffff")

  if (!editor.isActive("table")) {
    return null
  }

  const applyTableBorderStyling = () => {
    // Get current table attributes
    const tableAttrs = editor.getAttributes("table")
    const borderStyle = tableAttrs.borderStyle || "solid"
    const borderColor = tableAttrs.borderColor || "#e5e7eb"

    // Apply DOM styling to maintain consistency
    setTimeout(() => {
      const tableElement = editor.view.dom.querySelector("table.custom-table")
      if (tableElement) {
        const allCells = tableElement.querySelectorAll("td, th")
        allCells.forEach((cell) => {
          const htmlCell = cell as HTMLElement
          htmlCell.style.border = `1px ${borderStyle} ${borderColor}`
          htmlCell.style.padding = "8px"
        })
      }
    }, 50)
  }

  const handleCellBackgroundColor = () => {
    editor.commands.updateAttributes("tableCell", { backgroundColor: cellBgColor })
    editor.commands.updateAttributes("tableHeader", { backgroundColor: cellBgColor })
    applyTableBorderStyling()
  }

  const handleRowBackgroundColor = () => {
    // Update the row's background color attribute
    editor.commands.updateAttributes("tableRow", { backgroundColor: rowBgColor })

    // Also update all cells in the current row
    const { state } = editor
    const { selection } = state
    const { $anchor } = selection

    // Find the table row and update all its cells
    for (let depth = $anchor.depth; depth > 0; depth--) {
      const node = $anchor.node(depth)
      if (node.type.name === "tableRow") {
        const rowStart = $anchor.start(depth)
        const rowEnd = $anchor.end(depth)

        // Update all cells in this row
        state.doc.nodesBetween(rowStart, rowEnd, (node, pos) => {
          if (node.type.name === "tableCell" || node.type.name === "tableHeader") {
            editor.commands.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              backgroundColor: rowBgColor,
            })
          }
        })
        break
      }
    }

    applyTableBorderStyling()
  }

  const handleCellAlignment = (alignment: string) => {
    editor.commands.updateAttributes("tableCell", { textAlign: alignment })
    editor.commands.updateAttributes("tableHeader", { textAlign: alignment })
    applyTableBorderStyling()
  }

  const handleAddRow = (direction: "before" | "after") => {
    if (direction === "before") {
      editor.chain().focus().addRowBefore().run()
    } else {
      editor.chain().focus().addRowAfter().run()
    }
    applyTableBorderStyling()
  }

  const handleAddColumn = (direction: "before" | "after") => {
    if (direction === "before") {
      editor.chain().focus().addColumnBefore().run()
    } else {
      editor.chain().focus().addColumnAfter().run()
    }
    applyTableBorderStyling()
  }

  const handleDeleteRow = () => {
    editor.chain().focus().deleteRow().run()
    applyTableBorderStyling()
  }

  const handleDeleteColumn = () => {
    editor.chain().focus().deleteColumn().run()
    applyTableBorderStyling()
  }

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <Button variant="ghost" size="sm" onClick={() => handleAddRow("before")} title="Add row above">
          <Plus className="h-3 w-3" />
          Row ↑
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleAddRow("after")} title="Add row below">
          <Plus className="h-3 w-3" />
          Row ↓
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeleteRow} title="Delete row">
          <Minus className="h-3 w-3" />
          Row
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <Button variant="ghost" size="sm" onClick={() => handleAddColumn("before")} title="Add column left">
          <Plus className="h-3 w-3" />
          Col ←
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleAddColumn("after")} title="Add column right">
          <Plus className="h-3 w-3" />
          Col →
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeleteColumn} title="Delete column">
          <Minus className="h-3 w-3" />
          Col
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCellAlignment("left")}
          title="Align left"
          className={
            editor.getAttributes("tableCell").textAlign === "left" ||
            editor.getAttributes("tableHeader").textAlign === "left" ||
            (!editor.getAttributes("tableCell").textAlign && !editor.getAttributes("tableHeader").textAlign)
              ? "bg-muted"
              : ""
          }
        >
          <AlignLeft className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCellAlignment("center")}
          title="Align center"
          className={
            editor.getAttributes("tableCell").textAlign === "center" ||
            editor.getAttributes("tableHeader").textAlign === "center"
              ? "bg-muted"
              : ""
          }
        >
          <AlignCenter className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCellAlignment("right")}
          title="Align right"
          className={
            editor.getAttributes("tableCell").textAlign === "right" ||
            editor.getAttributes("tableHeader").textAlign === "right"
              ? "bg-muted"
              : ""
          }
        >
          <AlignRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" title="Cell background color">
              <Palette className="h-3 w-3" />
              Cell
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-2">
              <Label htmlFor="cell-bg-color">Cell Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="cell-bg-color"
                  type="color"
                  value={cellBgColor}
                  onChange={(e) => setCellBgColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input value={cellBgColor} onChange={(e) => setCellBgColor(e.target.value)} className="flex-1" />
              </div>
              <Button onClick={handleCellBackgroundColor} size="sm">
                Apply to Cell
              </Button>
              <Button
                onClick={() => {
                  setCellBgColor("#ffffff")
                  editor.commands.updateAttributes("tableCell", { backgroundColor: null })
                  const tableAttrs = editor.getAttributes("table")
                  const headerBg = tableAttrs.headerBackgroundColor || "#f3f4f6"
                  editor.commands.updateAttributes("tableHeader", { backgroundColor: headerBg })
                  applyTableBorderStyling()
                }}
                variant="outline"
                size="sm"
              >
                Remove Background
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" title="Row background color">
              <Palette className="h-3 w-3" />
              Row
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-2">
              <Label htmlFor="row-bg-color">Row Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="row-bg-color"
                  type="color"
                  value={rowBgColor}
                  onChange={(e) => setRowBgColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input value={rowBgColor} onChange={(e) => setRowBgColor(e.target.value)} className="flex-1" />
              </div>
              <Button onClick={handleRowBackgroundColor} size="sm">
                Apply to Row
              </Button>
              <Button
                onClick={() => {
                  setRowBgColor("#ffffff")
                  editor.commands.updateAttributes("tableRow", { backgroundColor: null })
                  applyTableBorderStyling()
                }}
                variant="outline"
                size="sm"
              >
                Remove Background
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onEditTable} title="Edit table properties">
          <Settings className="h-3 w-3" />
          Edit Table
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteTable().run()}
          title="Delete table"
          className="text-red-600 hover:text-red-700"
        >
          Delete Table
        </Button>
      </div>
    </div>
  )
}
