import { useState } from "react"

export default function useHistory(initial) {
  const [past, setPast] = useState([])
  const [present, setPresent] = useState(initial)
  const [future, setFuture] = useState([])

  const set = state => {
    setPast([...past, present])
    setPresent(state)
    setFuture([])
  }

  const undo = () => {
    if (!past.length) return
    const prev = past[past.length - 1]
    setPast(past.slice(0, -1))
    setFuture([present, ...future])
    setPresent(prev)
  }

  const redo = () => {
    if (!future.length) return
    const next = future[0]
    setFuture(future.slice(1))
    setPast([...past, present])
    setPresent(next)
  }

  return { state: present, set, undo, redo }
}
