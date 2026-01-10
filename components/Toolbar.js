"use client"

export default function Toolbar({ board }) {
  const { state, set, undo, redo, clearBoard, boards } = board
  const activeBoard = boards?.list.find(b => b.id === boards.activeId)

  const addText = () => {
    set([
      ...state,
      {
        id: Date.now(),
        x: 140,
        y: 140,
        text: "",
        color: "#4DFF88",
        focus: true
      }
    ])
  }

  const addImage = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      set([
        ...state,
        {
          id: Date.now(),
          x: 160,
          y: 160,
          image: ev.target.result,
          color: "#4D96FF"
        }
      ])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-yellow-400 px-8 py-5 border-4 border-black shadow-brutal rounded-brutal pointer-events-auto">
      <div className="flex flex-col mr-2">
        <span className="font-black text-2xl tracking-tight">
          Freeform<span className="text-blue-600">Board</span>
        </span>
        <span className="text-sm font-bold opacity-70">
          {activeBoard?.name || "Untitled"}
        </span>
      </div>

      <button onClick={addText} className="brutal-btn">Text</button>

      <label className="brutal-btn cursor-pointer">
        Image
        <input type="file" hidden onChange={addImage} />
      </label>

      <button onClick={undo} className="brutal-btn">Undo</button>
      <button onClick={redo} className="brutal-btn">Redo</button>

      <button
        onClick={() => confirm("Clear this board completely?") && clearBoard()}
        className="brutal-btn bg-red-500 text-white font-black"
      >
        CLEAR
      </button>
    </div>
  )
}
