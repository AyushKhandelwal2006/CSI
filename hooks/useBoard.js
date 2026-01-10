import { useEffect, useState } from "react"
import { loadBoards, saveBoards } from "../lib/storage"
import useHistory from "./useHistory"

export default function useBoard() {
  const [boards, setBoards] = useState(null)
  const history = useHistory([])

  useEffect(() => {
    const stored = loadBoards()
    if (stored) {
      setBoards(stored)
      const active = stored.list.find(b => b.id === stored.activeId)
      history.set(active ? active.pins : [])
    } else {
      const id = Date.now().toString()
      const initial = { activeId: id, list: [{ id, name: "Untitled", pins: [] }] }
      setBoards(initial)
      saveBoards(initial)
    }
  }, [])

  useEffect(() => {
    if (!boards) return
    const updated = {
      ...boards,
      list: boards.list.map(b =>
        b.id === boards.activeId ? { ...b, pins: history.state } : b
      )
    }
    setBoards(updated)
    saveBoards(updated)
  }, [history.state])

  const createBoard = name => {
    const id = Date.now().toString()
    const next = {
      activeId: id,
      list: [...boards.list, { id, name, pins: [] }]
    }
    setBoards(next)
    history.set([])
    saveBoards(next)
  }

  const openBoard = id => {
    const board = boards.list.find(b => b.id === id)
    if (!board) return
    setBoards({ ...boards, activeId: id })
    history.set(board.pins)
  }

  const clearBoard = () => history.set([])

  return {
    state: history.state,
    set: history.set,
    undo: history.undo,
    redo: history.redo,
    boards,
    createBoard,
    openBoard,
    clearBoard
  }
}
