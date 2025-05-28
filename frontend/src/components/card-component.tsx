"use client"

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"

interface CardComponentProps {
  node: {
    attrs: {
      backgroundColor: string
      borderColor: string
      title: string
      width: string
      height: string
    }
  }
  updateAttributes: (attrs: Record<string, any>) => void
}

export function CardComponent({ node, updateAttributes }: CardComponentProps) {
  const { backgroundColor, borderColor, title, width, height } = node.attrs

  return (
    <NodeViewWrapper className="my-4">
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          backgroundColor,
          borderColor,
          width,
          height,
          minHeight: height === "auto" ? "auto" : "100px",
        }}
      >
        <div
          className="p-4 font-medium text-lg border-b"
          style={{ borderColor }}
          contentEditable={false}
          data-card-title
        >
          {title}
        </div>
        <div className="p-4 overflow-auto" style={{ maxHeight: height !== "auto" ? "calc(100% - 60px)" : "none" }}>
          <NodeViewContent className="content" />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
