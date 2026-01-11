"use client"

import { useState, useRef } from "react"

const COLORS = ["#4DFF88", "#4D96FF", "#FFE44D", "#FF7AD9"]

export default function Pin({ pin, onChange }) {
  const ref = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [showTools, setShowTools] = useState(false)

  const onMouseDown = e => {
    setDragging(true)
    setOffset({
      x: e.clientX - pin.x,
      y: e.clientY - pin.y
    })
  }

  const onMouseMove = e => {
    if (!dragging) return
    onChange({
      ...pin,
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    })
  }

  const stopDrag = () => setDragging(false)

  const updateText = e => {
    onChange({ ...pin, text: e.target.value })
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseEnter={() => setShowTools(true)}
      onMouseLeaveCapture={() => setShowTools(false)}
      style={{
        left: pin.x,
        top: pin.y,
        background: pin.color
      }}
      className="absolute min-w-[200px] border-4 border-black shadow-brutal rounded-brutal p-3 cursor-move"
    >
      {showTools && (
        <div className="flex gap-1 mb-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => onChange({ ...pin, color: c })}
              style={{ background: c }}
              className="w-5 h-5 border-2 border-black rounded-full"
            />
          ))}

          <button
            onClick={() => onChange({ ...pin, _delete: true })}
            className="ml-auto text-red-600 font-black"
          >
            ✕
          </button>
        </div>
      )}

      {pin.image ? (
        <img src={pin.image} className="max-w-[240px] rounded" />
      ) : (
        <textarea
          autoFocus={pin.focus}
          value={pin.text}
          onChange={updateText}
          placeholder="Write something..."
          className="w-full bg-transparent outline-none resize-none font-bold"
        />
      )}
    </div>
  )
}
