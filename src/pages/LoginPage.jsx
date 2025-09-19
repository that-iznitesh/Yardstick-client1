
import { useState } from "react"

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        loginType: isAdmin ? "Admin" : "Member",
      }),
    })

    if (res.ok) {
      const data = await res.json()
      onLogin(data.token, data.role)
    } else {
      const err = await res.json()
      alert(err.message || "Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Yardstick
          </h1>
          <p className="text-white/90 font-medium">Welcome back to your colorful workspace</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/20 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-3 h-3 rounded-full ${isAdmin ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-gradient-to-r from-blue-500 to-cyan-500"}`}
              ></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                {isAdmin ? "Admin Login" : "Member Login"}
              </h2>
            </div>
            <p className="text-gray-600">
              {isAdmin ? "Access your colorful admin dashboard" : "Access your vibrant notes"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-purple-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-purple-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign In ✨
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            {!isAdmin ? (
              <button
                onClick={() => setIsAdmin(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
              >
                Switch to Admin Login 🚀
              </button>
            ) : (
              <button
                onClick={() => setIsAdmin(false)}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
              >
                🏠 Back to Member Login
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-white/80 font-medium">🔒 Secure & Colorful login powered by Yardstick</p>
        </div>
      </div>
    </div>
  )
}
