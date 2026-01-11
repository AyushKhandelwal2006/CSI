import { useEffect } from "react"
import useHistory from "./useHistory"
import {
  saveBoard,
  loadBoard,
  loadBoards,
  saveBoards
} from "../lib/storage"

export default function useBoard() {
  const history = useHistory([])
  const boards = loadBoards()

  useEffect(() => {
    history.set(loadBoard())
  }, [])

  useEffect(() => {
    saveBoard(history.state)
    if (!boards.activeId) return

    const updated = boards.list.map(b =>
      b.id === boards.activeId
        ? { ...b, updatedAt: Date.now(), pins: history.state.length }
        : b
    )

    saveBoards({ ...boards, list: updated })
  }, [history.state])

  const clearBoard = () => history.set([])

  const createBoard = name => {
    const id = Date.now().toString()
    const next = {
      activeId: id,
      list: [...boards.list, { id, name, updatedAt: Date.now(), pins: 0 }]
    }
    saveBoards(next)
    history.set([])
  }

  const openBoard = id => {
    saveBoards({ ...boards, activeId: id })
    history.set(loadBoard(id))
  }

  return {
    ...history,
    clearBoard,
    boards,
    createBoard,
    openBoard
  }
}
