"use client"

import { useEffect, useState } from "react"
import Canvas from "../components/Canvas"
import Toolbar from "../components/Toolbar"
import SnapshotPanel from "../components/SnapshotPanel"
import useBoard from "../hooks/useBoard"

export default function Home() {
  const board = useBoard()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="w-screen h-screen overflow-hidden">
      <Toolbar board={board} />
      <Canvas board={board} />
      <SnapshotPanel board={board} />
    </main>
  )
}
