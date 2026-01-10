"use client"

import { useState } from "react"
import html2canvas from "html2canvas"

export default function SnapshotPanel({ board }) {
  const { boards, createBoard, openBoard } = board
  const [name, setName] = useState("")

  if (!boards) return null

  const save = () => {
    if (!name.trim()) return
    createBoard(name.trim())
    setName("")
  }

  const exportImage = async () => {
    const canvas = document.querySelector(".brutal-grid")
    if (!canvas) return
    const img = await html2canvas(canvas)
    const link = document.createElement("a")
    link.download = "board.png"
    link.href = img.toDataURL()
    link.click()
  }

  const deleteBoard = id => {
    if (!confirm("Delete this board permanently?")) return
    const remaining = boards.list.filter(b => b.id !== id)
    if (!remaining.length) return
    openBoard(remaining[0].id)
    localStorage.setItem(
      "boards",
      JSON.stringify({ activeId: remaining[0].id, list: remaining })
    )
    location.reload()
  }

  return (
    <div className="fixed bottom-6 right-6 bg-blue-400 p-4 border-4 border-black shadow-brutal rounded-brutal w-64 z-[100] pointer-events-auto">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Board name"
        className="w-full mb-2 p-2 border-2 border-black rounded-brutal"
      />

      <button onClick={save} className="brutal-btn w-full mb-2">
        Save New Board
      </button>

      <button onClick={exportImage} className="brutal-btn w-full mb-3">
        Export as Image
      </button>

      <div className="space-y-1">
        {boards.list.map(b => (
          <div
            key={b.id}
            className={`flex items-center justify-between px-2 py-1 border-2 border-black rounded-brutal font-bold cursor-pointer ${
              b.id === boards.activeId ? "bg-yellow-300" : "bg-white"
            }`}
          >
            <span onClick={() => openBoard(b.id)}>{b.name}</span>
            <button
              onClick={() => deleteBoard(b.id)}
              className="text-red-600 font-black"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
