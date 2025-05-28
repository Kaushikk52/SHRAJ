"use client"

import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import TableCell from "@tiptap/extension-table-cell"

export const CustomTable = Table.configure({
  resizable: true,
  HTMLAttributes: {
    class: "custom-table",
  },
}).extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      borderStyle: {
        default: "solid",
        parseHTML: (element) => element.getAttribute("data-border-style") || "solid",
        renderHTML: (attributes) => {
          return {
            "data-border-style": attributes.borderStyle,
          }
        },
      },
      borderColor: {
        default: "#e5e7eb",
        parseHTML: (element) => element.getAttribute("data-border-color") || "#e5e7eb",
        renderHTML: (attributes) => {
          return {
            "data-border-color": attributes.borderColor,
          }
        },
      },
      headerBackgroundColor: {
        default: "#f3f4f6",
        parseHTML: (element) => element.getAttribute("data-header-bg") || "#f3f4f6",
        renderHTML: (attributes) => {
          return {
            "data-header-bg": attributes.headerBackgroundColor,
          }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { borderStyle = "solid", borderColor = "#e5e7eb" } = HTMLAttributes

    return [
      "table",
      {
        ...HTMLAttributes,
        class: "custom-table",
        style: `border-collapse: collapse; width: 100%; border: 1px ${borderStyle} ${borderColor};`,
      },
      ["tbody", 0],
    ]
  },
})

export const CustomTableRow = TableRow.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || element.getAttribute("data-bg-color"),
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {}
          }
          return {
            "data-bg-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

export const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: "#f3f4f6",
        parseHTML: (element) => element.style.backgroundColor || element.getAttribute("data-bg-color"),
        renderHTML: (attributes) => {
          const bgColor = attributes.backgroundColor || "#f3f4f6"
          return {
            "data-bg-color": bgColor,
            style: `background-color: ${bgColor}; font-weight: 600; padding: 8px;`,
          }
        },
      },
      textAlign: {
        default: "left",
        parseHTML: (element) => element.style.textAlign || "left",
        renderHTML: (attributes) => {
          if (!attributes.textAlign || attributes.textAlign === "left") {
            return {}
          }
          return {
            style: `text-align: ${attributes.textAlign}; background-color: ${attributes.backgroundColor || "#f3f4f6"}; font-weight: 600; padding: 8px;`,
          }
        },
      },
    }
  },
})

export const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || element.getAttribute("data-bg-color"),
        renderHTML: (attributes) => {
          const baseStyle = "padding: 8px;"
          if (!attributes.backgroundColor) {
            return {
              style: baseStyle,
            }
          }
          return {
            "data-bg-color": attributes.backgroundColor,
            style: `${baseStyle} background-color: ${attributes.backgroundColor};`,
          }
        },
      },
      textAlign: {
        default: "left",
        parseHTML: (element) => element.style.textAlign || "left",
        renderHTML: (attributes) => {
          const baseStyle = "padding: 8px;"
          const bgStyle = attributes.backgroundColor ? ` background-color: ${attributes.backgroundColor};` : ""
          const alignStyle =
            attributes.textAlign && attributes.textAlign !== "left" ? ` text-align: ${attributes.textAlign};` : ""

          return {
            style: `${baseStyle}${bgStyle}${alignStyle}`,
          }
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {}
          }
          return {
            style: `width: ${attributes.width}; padding: 8px;`,
          }
        },
      },
    }
  },
})
