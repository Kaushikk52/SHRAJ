"use client"

import { Mark, mergeAttributes } from "@tiptap/core"

export interface CustomUnderlineOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customUnderline: {
      /**
       * Set a custom underline mark
       */
      setCustomUnderline: (attributes?: { color?: string }) => ReturnType
      /**
       * Toggle a custom underline mark
       */
      toggleCustomUnderline: (attributes?: { color?: string }) => ReturnType
      /**
       * Unset a custom underline mark
       */
      unsetCustomUnderline: () => ReturnType
    }
  }
}

export const CustomUnderlineExtension = Mark.create<CustomUnderlineOptions>({
  name: "customUnderline",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: "span[data-custom-underline]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { color = "#000000" } = HTMLAttributes

    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-custom-underline": "",
        style: `text-decoration: underline; text-decoration-color: ${color};`,
      }),
      0,
    ]
  },

  addAttributes() {
    return {
      color: {
        default: "#000000",
        parseHTML: (element) => {
          const style = element.getAttribute("style") || ""
          const match = style.match(/text-decoration-color:\s*([^;]+)/)
          return match ? match[1] : "#000000"
        },
      },
    }
  },

  addCommands() {
    return {
      setCustomUnderline:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleCustomUnderline:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetCustomUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})
