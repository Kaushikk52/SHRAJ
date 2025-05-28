"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    rows: number
    cols: number
    withHeaderRow: boolean
    borderStyle: string
    borderColor: string
    headerBackgroundColor: string
  }) => void
}

export function TableDialog({ open, onOpenChange, onSubmit }: TableDialogProps) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [withHeaderRow, setWithHeaderRow] = useState(true)
  const [borderStyle, setBorderStyle] = useState("solid")
  const [borderColor, setBorderColor] = useState("#e5e7eb")
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#f3f4f6")

  useEffect(() => {
    if (open) {
      setRows(3)
      setCols(3)
      setWithHeaderRow(true)
      setBorderStyle("solid")
      setBorderColor("#e5e7eb")
      setHeaderBackgroundColor("#f3f4f6")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      rows,
      cols,
      withHeaderRow,
      borderStyle,
      borderColor,
      headerBackgroundColor,
    })
  }

  const renderTablePreview = () => {
    const previewRows = []
    for (let i = 0; i < Math.min(rows, 4); i++) {
      const cells = []
      for (let j = 0; j < Math.min(cols, 4); j++) {
        const isHeader = withHeaderRow && i === 0
        cells.push(
          <td
            key={j}
            className="border p-1 text-xs"
            style={{
              borderColor,
              backgroundColor: isHeader ? headerBackgroundColor : "transparent",
              borderStyle,
            }}
          >
            {isHeader ? `Header ${j + 1}` : `Cell ${i + 1},${j + 1}`}
          </td>,
        )
      }
      previewRows.push(<tr key={i}>{cells}</tr>)
    }

    return (
      <table className="w-full border-collapse">
        <tbody>{previewRows}</tbody>
      </table>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dimensions</Label>
              <div className="col-span-3 flex gap-2">
                <div className="w-1/2">
                  <Label htmlFor="rows" className="text-xs">
                    Rows
                  </Label>
                  <Input
                    id="rows"
                    type="number"
                    min="1"
                    max="20"
                    value={rows}
                    onChange={(e) => setRows(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="cols" className="text-xs">
                    Columns
                  </Label>
                  <Input
                    id="cols"
                    type="number"
                    min="1"
                    max="10"
                    value={cols}
                    onChange={(e) => setCols(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Header Row</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox id="header-row" checked={withHeaderRow} onCheckedChange={setWithHeaderRow} />
                <Label htmlFor="header-row" className="text-sm">
                  Include header row
                </Label>
              </div>
            </div>

            {withHeaderRow && (
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
            )}

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
            <Button type="submit">Insert Table</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
