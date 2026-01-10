"use client"

import { useEffect, useRef } from "react"

export default function Pin({ pin, onChange }) {
  const ref = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (pin.focus && textareaRef.current) {
      textareaRef.current.focus()
      onChange({ ...pin, focus: false })
    }
  }, [])

  const onPointerDown = e => {
    const rect = ref.current.getBoundingClientRect()
    const ox = e.clientX - rect.left
    const oy = e.clientY - rect.top

    const move = ev => {
      onChange({ ...pin, x: ev.clientX - ox, y: ev.clientY - oy })
    }

    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  const remove = () => {
    onChange({ ...pin, _delete: true })
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      style={{ left: pin.x, top: pin.y, background: pin.color }}
      className="pin-card absolute border-4 border-black shadow-brutal rounded-brutal p-4 cursor-grab group min-w-[180px]"
    >
      <button
        onClick={remove}
        className="absolute -top-3 -right-3 w-6 h-6 bg-black text-white rounded-full hidden group-hover:flex items-center justify-center text-sm"
      >
        ×
      </button>

      {pin.text !== undefined && (
        <textarea
          ref={textareaRef}
          value={pin.text}
          onChange={e => onChange({ ...pin, text: e.target.value })}
          className="w-full bg-transparent outline-none resize-none font-bold text-lg text-green-900"
        />
      )}

      {pin.image && (
        <img
          src={pin.image}
          className="max-w-[240px] mt-2 border-2 border-black rounded-brutal"
        />
      )}
    </div>
  )
}
