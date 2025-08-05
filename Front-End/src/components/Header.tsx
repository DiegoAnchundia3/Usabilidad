"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./UI/button"
import { Menu, Search, User, LogIn } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./UI/dropdown-menu"

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleLogoutClick = () => {
    logout()
    window.location.replace("/")
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-white/20 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="text-gray-700 hover:bg-gray-100">
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <span className="text-gray-800 font-semibold text-lg">Diamantito de esperanza</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
            <Link to="/proceso-adopcion">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                Adopciones
              </Button>
            </Link>
            <Link to="/historias-exito">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                Historias
              </Button>
            </Link>
            <Link to="/como-ayudar">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                Cómo Ayudar
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                Contacto
              </Button>
            </Link>
          {/* Eliminar botón Registrar Animal del header público */}
        </nav>

        <div className="flex items-center gap-3">
          {/* CAMBIO AQUÍ: El botón de búsqueda ahora es un Link */}
          <Link to="/animals/search">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
          </Link>



          {user ? (
            <div className="flex items-center gap-6">
              <Button
                onClick={handleLogoutClick}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white flex items-center gap-2"
              >
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-700" />
                <span className="text-purple-700 font-bold text-base">{user.name}</span>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Iniciar Sesión</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuItem onClick={handleLogoutClick}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                  {user.tipoUsuario === "administrador" && (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                  )}
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={handleLoginClick}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar Sesión
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/registro")}>Registrarse</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
