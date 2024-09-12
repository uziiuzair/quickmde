import React from "react"

import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Quick MDE",
  description:
    "Quick MDE is a Markdown editor that allows you to write and preview Markdown in real-time.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-950">
        {children}

        <GoogleAnalytics gaId="G-9V24RY1456" />
      </body>
    </html>
  )
}
