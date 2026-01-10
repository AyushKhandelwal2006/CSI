"use client"

import { useRef, useState } from "react"
import Pin from "./Pin"

export default function Canvas({ board }) {
  const { state, set } = board
  const ref = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const start = useRef({ x: 0, y: 0 })

  const updatePin = pin => {
    if (pin._delete) {
      set(state.filter(p => p.id !== pin.id))
    } else {
      set(state.map(p => (p.id === pin.id ? pin : p)))
    }
  }

  const onWheel = e => {
    e.preventDefault()
    setScale(s => Math.min(2, Math.max(0.5, s - e.deltaY * 0.001)))
  }

  const onMouseDown = e => {
    if (e.target !== ref.current) return
    setPanning(true)
    start.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }

  const onMouseMove = e => {
    if (!panning) return
    setOffset({ x: e.clientX - start.current.x, y: e.clientY - start.current.y })
  }

  const onMouseUp = () => setPanning(false)

  return (
    <div
      ref={ref}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="w-full h-full brutal-grid overflow-hidden relative pointer-events-auto"
    >
      {/* background blobs must NOT block clicks */}
      <div className="bg-blob bg-yellow-300 w-96 h-96 top-[-120px] left-[-120px] pointer-events-none" />
      <div className="bg-blob bg-blue-400 w-96 h-96 bottom-[-150px] right-[-100px] pointer-events-none" />
      <div className="bg-blob bg-pink-400 w-72 h-72 top-[30%] right-[20%] pointer-events-none" />

      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
        }}
        className="relative w-full h-full z-10 pointer-events-auto"
      >
        {state.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade pointer-events-none">
            <h1 className="text-6xl font-black">Freeform Thinking.</h1>
            <p className="mt-4 text-xl opacity-60">
              Click Text or Image to start
            </p>
          </div>
        )}

        {state.map(pin => (
          <Pin key={pin.id} pin={pin} onChange={updatePin} />
        ))}
      </div>
    </div>
  )
}
