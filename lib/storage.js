export const loadBoards = () => {
  if (typeof window === "undefined") return null
  return JSON.parse(localStorage.getItem("boards") || "null")
}

export const saveBoards = data => {
  if (typeof window === "undefined") return
  localStorage.setItem("boards", JSON.stringify(data))
}
