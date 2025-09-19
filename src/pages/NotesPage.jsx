
import { useState, useEffect } from "react"

export default function NotesPage({ token }) {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const API = import.meta.env.VITE_API_URL;

  async function fetchNotes() {
    const res = await fetch(`${API}/notes`, {
      headers: { Authorization: "Bearer " + token },
    })
    if (res.ok) {
      setNotes(await res.json())
    }
  }

  async function createNote(e) {

    e.preventDefault()
    const res = await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, content }),
    })
    if (res.ok) {
      setTitle("")
      setContent("")
      fetchNotes()
    } else {
      const err = await res.json()
      alert(err.error)
    }
  }

  async function deleteNote(id) {

    await fetch(`${API}/notes` + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
    fetchNotes()
  }

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            📝 My Colorful Notes
          </h1>
          <p className="text-white/90 font-medium">Create and manage your vibrant personal notes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ✨ Create New Note
                </h2>
              </div>

              <form onSubmit={createNote} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Title
                  </label>
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your amazing note title"
                    className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                    📄 Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your colorful thoughts here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-purple-400 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:via-teal-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  🚀 Add Note
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            {notes.length === 0 ? (
              <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 p-12 text-center shadow-2xl">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  No colorful notes yet!
                </h3>
                <p className="text-gray-600 font-medium">Create your first vibrant note to get started 🌈</p>
              </div>
            ) : (
              <div className="space-y-6">
                {notes.map((note, index) => (
                  <div
                    key={note._id}
                    className={`bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 transform hover:scale-105 ${
                      index % 4 === 0
                        ? "border-pink-300 hover:border-pink-400"
                        : index % 4 === 1
                          ? "border-blue-300 hover:border-blue-400"
                          : index % 4 === 2
                            ? "border-green-300 hover:border-green-400"
                            : "border-purple-300 hover:border-purple-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index % 4 === 0
                              ? "bg-gradient-to-r from-pink-400 to-red-500"
                              : index % 4 === 1
                                ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                                : index % 4 === 2
                                  ? "bg-gradient-to-r from-green-400 to-teal-500"
                                  : "bg-gradient-to-r from-purple-400 to-indigo-500"
                          }`}
                        ></div>
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{note.title}</h3>
                      </div>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-all duration-200 transform hover:scale-110"
                        title="Delete note"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50/50 p-4 rounded-xl">{note.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
