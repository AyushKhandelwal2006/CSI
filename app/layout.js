import "./globals.css"

export const metadata = {
  title: "Freeform Digital Board"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
