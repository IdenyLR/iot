"use client"

import type React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { MdDashboard, MdAnalytics, MdDeleteOutline, MdLogout, MdSettingsInputAntenna } from "react-icons/md"
import "./Sidebar.css"

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?")
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("token")
      navigate("/")
    }
  }

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={20} />,
      exact: true,
    },
    {
      path: "/graficos",
      label: "Gráficas",
      icon: <MdAnalytics size={20} />,
    },
    {
      path: "/eliminadas",
      label: "Parcelas Eliminadas",
      icon: <MdDeleteOutline size={20} />,
    },
    {
      path: "/logout",
      label: "Salir",
      icon: <MdLogout size={20} />,
      action: handleLogout,
      isLogout: true,
    },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>
          <span className="logo-icon">
            <MdSettingsInputAntenna size={24} />
          </span>
          <span>Mi IoT</span>
        </h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`
                ${isActive(item.path, item.exact) ? "active" : ""}
                ${item.isLogout ? "logout-item" : ""}
              `}
              onClick={item.action || (() => navigate(item.path))}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

