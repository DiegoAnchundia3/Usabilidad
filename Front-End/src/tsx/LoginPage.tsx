"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, User, Lock, LogIn, Home, Settings } from "lucide-react"
import { DashboardService } from "../services/dashboard.service"

const MAX_ATTEMPTS = 3
const BLOCK_TIME_MS = 15000

const LoginPage: React.FC = () => {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{
    usuario?: string
    contrasena?: string
  }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: { usuario?: string; contrasena?: string } = {}
    if (!usuario.trim()) {
      newErrors.usuario = "El usuario es obligatorio"
    }
    if (!contrasena.trim()) {
      newErrors.contrasena = "La contraseña es obligatoria"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBlocked) return
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Intentar hacer login usando el DashboardService
      const loginResult = await DashboardService.login(usuario, contrasena)
      if (loginResult.success) {
        console.log("Login exitoso")
        navigate("/dashboard")
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsBlocked(true)
          setBlockTimeLeft(BLOCK_TIME_MS / 1000)
          const interval = setInterval(() => {
            setBlockTimeLeft((prev) => {
              if (prev <= 1) {
                setIsBlocked(false)
                setAttempts(0)
                clearInterval(interval)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        }
        setErrors({
          usuario: loginResult.message || "Credenciales incorrectas",
          contrasena: loginResult.message || "Credenciales incorrectas",
        })
      }
    } catch (error) {
      console.error("Error en el login:", error)
      setErrors({ usuario: "Error del servidor. Intenta más tarde." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative">
      {/* Botón para volver a Inicio */}
      <Link
        to="/inicio"
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors z-10"
      >
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Volver a Inicio</span>
      </Link>

      {/* Botón de configuración */}
      <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors z-10">
        <Settings className="w-5 h-5" />
      </button>

      {/* Layout principal con tres columnas */}
      <div className="w-full max-w-6xl flex items-center justify-center gap-8">
        {/* Imagen izquierda */}
        <div className="hidden lg:flex flex-col items-center justify-center w-80 h-[600px] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="w-full h-full relative">
            <img src="/img/perros-login.jpg" alt="Perro refugio izquierda" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white font-semibold text-lg mb-1">Cuidando con Amor</p>
              <p className="text-white/80 text-sm">Cada animal merece una segunda oportunidad</p>
            </div>
          </div>
        </div>

        {/* Contenedor central del formulario */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-slide-in">
          {/* Header con título GRANDE */}
          <div className="py-12 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
            <div className="text-center">
              <h1
                className="font-black text-white leading-none tracking-tighter text-center mb-4"
                style={{
                  fontSize: "clamp(3rem, 10vw, 10rem)",
                  lineHeight: "0.8",
                  wordSpacing: "-0.2em",
                  letterSpacing: "-0.05em",
                  textShadow: "4px 4px 32px rgba(0,0,0,0.8)",
                  transform: "scaleY(1.22)",
                  marginTop: "-0.5em",
                  marginBottom: "0.2em",
                }}
              >
                Iniciar Sesión
              </h1>
              <p className="text-white/80 text-center text-sm">Sistema de Monitoreo de Bienestar Animal</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Usuario */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <label htmlFor="usuario" className="block text-sm font-medium text-white/90">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={isBlocked}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ingresa tu usuario"
                />
              </div>
              {errors.usuario && (
                <p className="text-red-300 text-sm flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">!</span>
                  {errors.usuario}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <label htmlFor="contrasena" className="block text-sm font-medium text-white/90">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="contrasena"
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={isBlocked}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.contrasena && (
                <p className="text-red-300 text-sm flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">!</span>
                  {errors.contrasena}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isBlocked}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-white/80">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isBlocked}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Iniciando sesión...
                </>
              ) : isBlocked ? (
                `Bloqueado por ${blockTimeLeft}s`
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>

            {/* Attempts Warning */}
            {attempts > 0 && !isBlocked && (
              <div className="text-center text-yellow-300 text-sm bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                ⚠️ Intentos fallidos: {attempts}/{MAX_ATTEMPTS}
              </div>
            )}

            {/* Register Link */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <p className="text-white/60 text-sm">
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Demo Info */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}></div>
          </form>
        </div>

        {/* Imagen derecha */}
        <div className="hidden lg:flex flex-col items-center justify-center w-80 h-[600px] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="w-full h-full relative">
            <img src="/img/pugperro1.jpg.webp" alt="Perro refugio derecha" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white font-semibold text-lg mb-1">Protegiendo Juntos</p>
              <p className="text-white/80 text-sm">Tecnología al servicio del bienestar animal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
