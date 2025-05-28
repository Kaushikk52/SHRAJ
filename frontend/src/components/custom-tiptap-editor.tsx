"use client"

import { useState, useCallback, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  ImageIcon,
  Youtube,
  Quote,
  Minus,
  Square,
  Underline,
  Table,
} from "lucide-react"
import { ColoredLinkExtension } from "@/lib/colored-link-extension"
import { CustomImageExtension } from "@/lib/custom-image-extension"
import { YouTubeExtension } from "@/lib/youtube-extension"
import { DividerExtension } from "@/lib/Divider-extension"
import { CardExtension } from "@/lib/card-extension"
import { CustomUnderlineExtension } from "@/lib/custom-underline-extension"
import { CustomTable, CustomTableRow, CustomTableHeader, CustomTableCell } from "@/lib/table-extension"
import { LinkDialog } from "@/components/link-dialog"
import { ImageDialog } from "@/components/image-dialog"
import { YouTubeDialog } from "@/components/youtube-dialog"
import { DividerDialog } from "@/components/divider-dialog"
import { CardDialog } from "@/components/card-dialog"
import { UnderlineDialog } from "@/components/underline-dialog"
import { TableDialog } from "@/components/table-dialog"
import { TableEditDialog } from "@/components/table-edit-dialog"
import { TableControls } from "@/components/table-controls"

interface CustomTiptapEditorProps {
  content: string
  onChange: (content: string) => void
  editorType: "basic" | "table" | "features"
}

export function CustomTiptapEditor({ content, onChange, editorType }: CustomTiptapEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false)
  const [dividerDialogOpen, setDividerDialogOpen] = useState(false)
  const [cardDialogOpen, setCardDialogOpen] = useState(false)
  const [underlineDialogOpen, setUnderlineDialogOpen] = useState(false)
  const [tableDialogOpen, setTableDialogOpen] = useState(false)
  const [tableEditDialogOpen, setTableEditDialogOpen] = useState(false)

  // Configure extensions based on editor type
  const getExtensions = () => {
    const baseExtensions = [
      StarterKit.configure({
        underline: false,
      }),
    ]

    switch (editorType) {
      case "basic":
        return [
          ...baseExtensions,
          ColoredLinkExtension,
          CustomImageExtension,
          YouTubeExtension,
          DividerExtension,
          CardExtension,
          CustomUnderlineExtension,
        ]
      case "table":
        return [
          ...baseExtensions,
          CustomTable,
          CustomTableRow,
          CustomTableHeader,
          CustomTableCell,
          ColoredLinkExtension,
          CustomUnderlineExtension,
        ]
      case "features":
        return [...baseExtensions, ColoredLinkExtension, CustomUnderlineExtension]
      default:
        return baseExtensions
    }
  }

  const editor = useEditor({
    extensions: getExtensions(),
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const applyTableStyling = useCallback(
    (borderStyle: string, borderColor: string, headerBgColor: string) => {
      setTimeout(() => {
        const tableElement = editor?.view.dom.querySelector("table.custom-table")
        if (tableElement) {
          tableElement.style.borderCollapse = "collapse"
          tableElement.style.width = "100%"
          tableElement.style.border = `1px ${borderStyle} ${borderColor}`

          const cells = tableElement.querySelectorAll("td, th")
          cells.forEach((cell) => {
            ;(cell as HTMLElement).style.border = `1px ${borderStyle} ${borderColor}`
            ;(cell as HTMLElement).style.padding = "8px"
          })

          const headers = tableElement.querySelectorAll("th")
          headers.forEach((header) => {
            ;(header as HTMLElement).style.backgroundColor = headerBgColor
            ;(header as HTMLElement).style.fontWeight = "600"
          })
        }
      }, 100)
    },
    [editor],
  )

  // Event handlers (same as before)
  const handleLinkSubmit = useCallback(
    ({
      url,
      text,
      bgColor,
      paddingX,
      paddingY,
    }: { url: string; text: string; bgColor: string; paddingX: string; paddingY: string }) => {
      if (!editor) return

      if (text && editor.state.selection.empty) {
        editor.commands.insertContent(text)
        const { from } = editor.state.selection
        editor.commands.setTextSelection({
          from: from - text.length,
          to: from,
        })
      }

      editor.commands.setColoredLink({
        href: url,
        backgroundColor: bgColor,
        paddingX: paddingX,
        paddingY: paddingY,
      })

      setLinkDialogOpen(false)
    },
    [editor],
  )

  const handleImageSubmit = useCallback(
    (imageData: {
      src: string
      alt: string
      title: string
      width: string
      height: string
      alignment: string
      caption: string
    }) => {
      if (!editor) return
      editor.commands.setCustomImage(imageData)
      setImageDialogOpen(false)
    },
    [editor],
  )

  const handleYoutubeSubmit = useCallback(
    (youtubeData: { src: string; width: number; height: number; start: number }) => {
      if (!editor) return
      editor.commands.setYouTube(youtubeData)
      setYoutubeDialogOpen(false)
    },
    [editor],
  )

  const handleDividerSubmit = useCallback(
    (dividerData: { color: string; thickness: string }) => {
      if (!editor) return
      editor.commands.setDivider(dividerData)
      setDividerDialogOpen(false)
    },
    [editor],
  )

  const handleCardSubmit = useCallback(
    (cardData: {
      backgroundColor: string
      borderColor: string
      title: string
      content: string
      width: string
      height: string
    }) => {
      if (!editor) return
      editor.commands.setCard(cardData)
      setCardDialogOpen(false)
    },
    [editor],
  )

  const handleUnderlineSubmit = useCallback(
    ({ color }: { color: string }) => {
      if (!editor) return
      editor.commands.setCustomUnderline({ color })
      setUnderlineDialogOpen(false)
    },
    [editor],
  )

  const handleTableSubmit = useCallback(
    (tableData: {
      rows: number
      cols: number
      withHeaderRow: boolean
      borderStyle: string
      borderColor: string
      headerBackgroundColor: string
    }) => {
      if (!editor) return

      editor
        .chain()
        .focus()
        .insertTable({
          rows: tableData.rows,
          cols: tableData.cols,
          withHeaderRow: tableData.withHeaderRow,
        })
        .run()

      setTimeout(() => {
        editor.commands.updateAttributes("table", {
          borderStyle: tableData.borderStyle,
          borderColor: tableData.borderColor,
          headerBackgroundColor: tableData.headerBackgroundColor,
        })

        if (tableData.withHeaderRow) {
          const { state } = editor
          const { tr } = state
          let modified = false

          state.doc.descendants((node, pos) => {
            if (node.type.name === "tableHeader") {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                backgroundColor: tableData.headerBackgroundColor,
              })
              modified = true
            }
          })

          if (modified) {
            editor.view.dispatch(tr)
          }
        }

        applyTableStyling(tableData.borderStyle, tableData.borderColor, tableData.headerBackgroundColor)
      }, 100)

      setTableDialogOpen(false)
    },
    [editor, applyTableStyling],
  )

  if (!editor) {
    return null
  }

  // Render toolbar based on editor type
  const renderToolbar = () => {
    const commonButtons = (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setUnderlineDialogOpen(true)}
          className={editor.isActive("customUnderline") ? "bg-muted" : ""}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLinkDialogOpen(true)}
          className={editor.isActive("coloredLink") ? "bg-muted" : ""}
        >
          <Link className="h-4 w-4" />
        </Button>
      </>
    )

    switch (editorType) {
      case "basic":
        return (
          <>
            {commonButtons}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "bg-muted" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "bg-muted" : ""}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "bg-muted" : ""}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDividerDialogOpen(true)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setImageDialogOpen(true)}
              className={editor.isActive("customImage") ? "bg-muted" : ""}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setYoutubeDialogOpen(true)}
              className={editor.isActive("youtube") ? "bg-muted" : ""}
            >
              <Youtube className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCardDialogOpen(true)}
              className={editor.isActive("card") ? "bg-muted" : ""}
            >
              <Square className="h-4 w-4" />
            </Button>
          </>
        )
      case "table":
        return (
          <>
            {commonButtons}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTableDialogOpen(true)}
              className={editor.isActive("table") ? "bg-muted" : ""}
            >
              <Table className="h-4 w-4" />
            </Button>
          </>
        )
      case "features":
        return commonButtons
      default:
        return commonButtons
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-1 border-b flex-wrap">{renderToolbar()}</div>

      {/* Table Controls - Only show when a table is active and editor type is table */}
      {editorType === "table" && editor.isActive("table") && (
        <TableControls editor={editor} onEditTable={() => setTableEditDialogOpen(true)} />
      )}

      <EditorContent editor={editor} className="p-4 min-h-[200px] prose max-w-none" />

      {/* Dialogs */}
      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        onSubmit={handleLinkSubmit}
        initialText={
          editor.state.selection.empty
            ? ""
            : editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, " ")
        }
        initialUrl={editor.isActive("coloredLink") ? editor.getAttributes("coloredLink").href : ""}
        initialBgColor={
          editor.isActive("coloredLink") ? editor.getAttributes("coloredLink").backgroundColor : "#e9f5ff"
        }
        initialPaddingX={editor.isActive("coloredLink") ? editor.getAttributes("coloredLink").paddingX : "0.375rem"}
        initialPaddingY={editor.isActive("coloredLink") ? editor.getAttributes("coloredLink").paddingY : "0.125rem"}
      />

      {editorType === "basic" && (
        <>
          <ImageDialog
            open={imageDialogOpen}
            onOpenChange={setImageDialogOpen}
            onSubmit={handleImageSubmit}
            initialValues={editor.isActive("customImage") ? editor.getAttributes("customImage") : {}}
          />
          <YouTubeDialog open={youtubeDialogOpen} onOpenChange={setYoutubeDialogOpen} onSubmit={handleYoutubeSubmit} />
          <DividerDialog open={dividerDialogOpen} onOpenChange={setDividerDialogOpen} onSubmit={handleDividerSubmit} />
          <CardDialog open={cardDialogOpen} onOpenChange={setCardDialogOpen} onSubmit={handleCardSubmit} />
        </>
      )}

      <UnderlineDialog
        open={underlineDialogOpen}
        onOpenChange={setUnderlineDialogOpen}
        onSubmit={handleUnderlineSubmit}
        initialColor={editor.isActive("customUnderline") ? editor.getAttributes("customUnderline").color : "#000000"}
      />

      {editorType === "table" && (
        <>
          <TableDialog open={tableDialogOpen} onOpenChange={setTableDialogOpen} onSubmit={handleTableSubmit} />
          <TableEditDialog open={tableEditDialogOpen} onOpenChange={setTableEditDialogOpen} editor={editor} />
        </>
      )}
    </div>
  )
}
