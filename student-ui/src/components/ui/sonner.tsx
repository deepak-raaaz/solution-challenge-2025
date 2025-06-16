"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#11161D",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "#202732",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
