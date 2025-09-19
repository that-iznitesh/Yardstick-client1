
import { useState } from "react"

export default function AdminPage({ token }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [slug, setSlug] = useState("")

const API = import.meta.env.VITE_API_URL;

  async function inviteUser(e) {
    e.preventDefault()
    const res = await fetch(`${API}/admin/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      alert("User invited")
      setEmail("")
      setPassword("")
    } else {
      const err = await res.json()
      alert(err.message || "Error inviting user")
    }
  }


  async function upgradeTenant() {
    const res = await fetch(`${API}/admin/tenants/${slug}/upgrade`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    })
    if (res.ok) {
      alert("Upgraded to Pro!")
    } else {
      const err = await res.json()
      alert(err.error || "Upgrade failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            🛠️ Admin Dashboard
          </h1>
          <p className="text-white/90 font-medium">Manage users and tenant settings with style</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 p-6 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl mr-4 shadow-lg">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Invite User
                </h2>
                <p className="text-gray-600 text-sm">Add new colorful members to the platform</p>
              </div>
            </div>

            <form onSubmit={inviteUser} className="space-y-5">
              <div>
                <label htmlFor="userEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  id="userEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-green-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="userPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  🔐 Temporary Password
                </label>
                <input
                  id="userPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter temporary password"
                  className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-green-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                📨 Send Invitation
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 p-6 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl mr-4 shadow-lg">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Upgrade Tenant
                </h2>
                <p className="text-gray-600 text-sm">Upgrade tenant accounts to Pro status</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="tenantSlug" className="block text-sm font-semibold text-gray-700 mb-2">
                  🏢 Tenant Slug
                </label>
                <input
                  id="tenantSlug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="acme-corp"
                  className="w-full px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-yellow-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter the unique identifier for the tenant</p>
              </div>

              <button
                onClick={upgradeTenant}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🚀 Upgrade to Pro
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-center text-white shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold mb-1">24</div>
            <div className="text-sm text-pink-100">Active Users</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-center text-white shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm text-blue-100">Pro Tenants</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-center text-white shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold mb-1">156</div>
            <div className="text-sm text-green-100">Total Notes</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
