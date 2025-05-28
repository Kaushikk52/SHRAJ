"use client"

import { mergeAttributes } from "@tiptap/core"
import Link from "@tiptap/extension-link"

export const ColoredLinkExtension = Link.extend({
  name: "coloredLink",

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "colored-link",
      },
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: "#e9f5ff",
        parseHTML: (element) => element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {}
          }

          return {
            style: `background-color: ${attributes.backgroundColor}; padding: ${attributes.paddingY || "0.125rem"} ${attributes.paddingX || "0.375rem"}; border-radius: 0.25rem;`,
          }
        },
      },
      paddingX: {
        default: "0.375rem",
        parseHTML: (element) => {
          const style = element.getAttribute("style") || ""
          const match = style.match(/padding:[^;]*\s([^\s;]*)\s[^;]*;/)
          return match ? match[1] : "0.375rem"
        },
      },
      paddingY: {
        default: "0.125rem",
        parseHTML: (element) => {
          const style = element.getAttribute("style") || ""
          const match = style.match(/padding:\s([^\s;]*)\s[^;]*/)
          return match ? match[1] : "0.125rem"
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([href *= "javascript:" i])',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["a", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setColoredLink:
        (attributes:any) =>
        ({ chain }:any) => {
          return chain()
            .setLink(attributes)
            .updateAttributes("link", {
              backgroundColor: attributes.backgroundColor,
              paddingX: attributes.paddingX,
              paddingY: attributes.paddingY,
            })
            .run()
        },
    }
  },
})
