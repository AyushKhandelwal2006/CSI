const BOARD_KEY = "freeform_active_board"
const BOARDS_KEY = "freeform_boards"

export const loadBoards = () => {
  if (typeof window === "undefined") return { activeId: null, list: [] }
  return JSON.parse(localStorage.getItem(BOARDS_KEY)) || { activeId: null, list: [] }
}

export const saveBoards = data => {
  if (typeof window === "undefined") return
  localStorage.setItem(BOARDS_KEY, JSON.stringify(data))
}

export const loadBoard = id => {
  if (typeof window === "undefined") return []
  const boards = loadBoards()
  const boardId = id || boards.activeId
  if (!boardId) return []
  return JSON.parse(localStorage.getItem(`${BOARD_KEY}_${boardId}`)) || []
}

export const saveBoard = (state, id) => {
  if (typeof window === "undefined") return
  const boards = loadBoards()
  const boardId = id || boards.activeId
  if (!boardId) return
  localStorage.setItem(`${BOARD_KEY}_${boardId}`, JSON.stringify(state))
}
