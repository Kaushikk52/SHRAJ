"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { CardComponent } from "@/components/card-component"

export interface CardOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    card: {
      /**
       * Add a card
       */
      setCard: (options: {
        backgroundColor?: string
        borderColor?: string
        title?: string
        content?: string
        width?: string
        height?: string
      }) => ReturnType
    }
  }
}

export const CardExtension = Node.create<CardOptions>({
  name: "card",

  group: "block",

  content: "block+",

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="card"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": "card" }),
      0, // Content
    ]
  },

  addAttributes() {
    return {
      backgroundColor: {
        default: "#f9fafb",
        parseHTML: (element) => element.getAttribute("data-background-color") || element.style.backgroundColor,
      },
      borderColor: {
        default: "#e5e7eb",
        parseHTML: (element) => element.getAttribute("data-border-color") || element.style.borderColor,
      },
      title: {
        default: "Card Title",
        parseHTML: (element) => {
          const titleEl = element.querySelector("[data-card-title]")
          return titleEl ? titleEl.textContent : "Card Title"
        },
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("data-width") || element.style.width || "100%",
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.getAttribute("data-height") || element.style.height || "auto",
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CardComponent)
  },

  addCommands() {
    return {
      setCard:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
            content: [
              {
                type: "paragraph",
                content: options.content ? [{ type: "text", text: options.content }] : [],
              },
            ],
          })
        },
    }
  },
})
