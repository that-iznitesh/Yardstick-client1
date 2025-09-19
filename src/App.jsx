// // src/App.jsx
// import React, { useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";


// import LoginPage from "./pages/LoginPage";
// import NotesPage from "./pages/NotesPage";
// import AdminPage from "./pages/AdminPage";



// function App() {
  
//   const [token, setToken] = useState(null);
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();

//   function handleLogin(t) {
//     setToken(t);
//     const decoded = jwtDecode(t);
//     setRole(decoded.role);
//     if (decoded.role === "Admin") {
//       navigate("/admin");
//     } else {
//       navigate("/notes");
//     }
//   }

//   function handleLogout() {
//     setToken(null);
//     setRole(null);
//     navigate("/");
//   }

//   return (
//     <div>
//       {token && (
//         <div style={{ padding: "10px", background: "#eee" }}>
//           Logged in as <b>{role}</b>{" "}
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <Routes>
//         <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
//         <Route
//           path="/notes"
//           element={
//             role === "Member" ? <NotesPage token={token} /> : <Navigate to="/" />
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             role === "Admin" ? <AdminPage token={token} /> : <Navigate to="/" />
//           }
//         />
//       </Routes>
//     </div>
//   );
// }
// export default App;
"use client"

// src/App.jsx
"use client"

// src/App.jsx
import { useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import LoginPage from "./pages/LoginPage"
import NotesPage from "./pages/NotesPage"
import AdminPage from "./pages/AdminPage"

function App() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  function handleLogin(t) {
    setToken(t)
    const decoded = jwtDecode(t)
    setRole(decoded.role)
    if (decoded.role === "Admin") {
      navigate("/admin")
    } else {
      navigate("/notes")
    }
  }

  function handleLogout() {
    setToken(null)
    setRole(null)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {token && (
        <header className="bg-card border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-primary">Yardstick</h1>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {role}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-card-foreground hidden sm:inline">Welcome back</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/notes" element={role === "Member" ? <NotesPage token={token} /> : <Navigate to="/" />} />
          <Route path="/admin" element={role === "Admin" ? <AdminPage token={token} /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
