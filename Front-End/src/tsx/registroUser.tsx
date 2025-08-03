import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  UserCheck,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Loader2,
  Home,
} from "lucide-react"
import { useRegistrationForm } from "../hooks/useRegistrationForm"
import { USER_ROLES } from "../types/user.types"

const RegistroUser: React.FC = () => {
  const {
    formState,
    isSubmitting,
    submitError,
    passwordStrength,
    emailChecking,
    isFormValid,
    handleFieldChange,
    handleFieldBlur,
    submitForm,
  } = useRegistrationForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validaciones obligatorias
    if (formState.terminos.value !== "true") {
      alert("Debes aceptar los términos y condiciones y la política de privacidad.");
      return;
    }
    if (!formState.confirmarContrasena.value || formState.contrasena.value !== formState.confirmarContrasena.value) {
      alert("Debes confirmar correctamente tu contraseña.");
      return;
    }
    // Prepara los datos para el backend
    const payload = {
      usuario: formState.nombre.value.toLowerCase() + formState.apellido.value.toLowerCase(),
      email: formState.email.value,
      password: formState.contrasena.value,
      rol: formState.tipoUsuario.value
    };
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setRegistroExitoso(true);
        setSuccessMessage("Usuario creado correctamente. ¡Ahora puedes iniciar sesión!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        alert(data.message || "Error al crear usuario");
      }
    } catch (error) {
      alert("Error de red o del servidor");
    }
  };

  const userRoleOptions = [
    {
      value: USER_ROLES.CUIDADOR,
      label: "Cuidador",
      description: "Cuidado diario de los animales",
    },
    {
      value: USER_ROLES.VOLUNTARIO,
      label: "Voluntario",
      description: "Apoyo en actividades del refugio",
    },
  ]

  if (registroExitoso) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">¡Registro Exitoso!</h2>
          <p className="text-white/80 mb-6">{successMessage}</p>
          <p className="text-blue-200 text-sm">Serás redirigido al login en unos segundos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-2 relative overflow-hidden">
      {/* Botón para volver a Inicio */}
      <Link
        to="/inicio"
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors z-10"
      >
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Volver a Inicio</span>
      </Link>

      {/* Layout principal horizontal - Usa toda la altura */}
      <div className="w-full max-w-5xl flex items-stretch justify-center gap-4 h-full py-4">
        {/* Imagen izquierda - Altura completa */}
        <div className="hidden lg:flex flex-col items-center justify-center w-64 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="w-full h-full relative">
            <img src="/img/perros-login.jpg" alt="Perro refugio izquierda" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-4 right-4 text-center">
              <p className="text-white font-semibold text-xl mb-2">Únete a Nosotros</p>
              <p className="text-white/80 text-sm">Forma parte de nuestra misión de rescate</p>
            </div>
          </div>
        </div>

        {/* Contenedor central del formulario - Altura completa */}
        <div className="w-full max-w-full min-h-screen bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Link to="/login" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-white/70" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-full">
                  <UserCheck className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
                  <p className="text-white/80 text-sm">Únete al Sistema de Monitoreo de Bienestar Animal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form - Usa el espacio restante */}
          <div className="flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-6">


              {/* Grid principal: 2 filas, la primera con tipo de usuario y contraseña, la segunda con confirmar contraseña y fortaleza */}
              <div className="grid grid-cols-1 gap-4 w-full">
                {/* Fila 1: Tipo de usuario y contraseña */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tipo de Usuario */}
                  <div className="space-y-2">
                    <label htmlFor="tipoUsuario" className="block text-sm font-medium text-white/90">Tipo de Usuario *</label>
                    <select
                      id="tipoUsuario"
                      value={formState.tipoUsuario.value}
                      onChange={(e) => handleFieldChange("tipoUsuario", e.target.value)}
                      onBlur={() => handleFieldBlur("tipoUsuario")}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-200 ${formState.tipoUsuario.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                    >
                      <option value="" className="bg-gray-800">Selecciona tu rol</option>
                      {userRoleOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-800">{option.label} - {option.description}</option>
                      ))}
                    </select>
                    {formState.tipoUsuario.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.tipoUsuario.error.message}</p>
                    )}
                  </div>
                  {/* Contraseña */}
                  <div className="space-y-2">
                    <label htmlFor="contrasena" className="block text-sm font-medium text-white/90">Contraseña *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="contrasena"
                        type={showPassword ? "text" : "password"}
                        value={formState.contrasena.value}
                        onChange={(e) => handleFieldChange("contrasena", e.target.value)}
                        onBlur={() => handleFieldBlur("contrasena")}
                        className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.contrasena.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="Tu contraseña"
                        maxLength={12}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formState.contrasena.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.contrasena.error.message}</p>
                    )}
                  </div>
                </div>
                {/* Fila 2: Confirmar contraseña y fortaleza */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Confirmar Contraseña */}
                  <div className="space-y-2">
                    <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-white/90">Confirmar Contraseña *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="confirmarContrasena"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formState.confirmarContrasena.value}
                        onChange={(e) => handleFieldChange("confirmarContrasena", e.target.value)}
                        onBlur={() => handleFieldBlur("confirmarContrasena")}
                        className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.confirmarContrasena.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="Confirma contraseña"
                        maxLength={12}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Mostrar error solo si ambos campos están llenos y no coinciden */}
                    {formState.contrasena.value && formState.confirmarContrasena.value && formState.contrasena.value !== formState.confirmarContrasena.value && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />Las contraseñas no coinciden</p>
                    )}
                    {formState.confirmarContrasena.error && formState.confirmarContrasena.error.message !== "" && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.confirmarContrasena.error.message}</p>
                    )}
                  </div>
                  {/* Fortaleza de contraseña */}
                  <div className="flex flex-col justify-between">
                    {passwordStrength && passwordStrength.text && (
                      <div className="space-y-3 w-full xl:w-80">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/70">Fortaleza:</span>
                          <span className={`text-sm font-medium ${passwordStrength.color}`}>{passwordStrength.text}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.level <= 2
                                ? "bg-red-500"
                                : passwordStrength.level === 3
                                  ? "bg-orange-500"
                                  : passwordStrength.level === 4
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{ width: `${(passwordStrength.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {passwordStrength.requirements.map((req) => (
                            <div key={req.id} className="flex items-center gap-2 text-sm">
                              {req.met ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <X className="w-4 h-4 text-red-400" />
                              )}
                              <span className={req.met ? "text-green-300" : "text-white/60"}>{req.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Fila 3: Nombre, Apellido, Teléfono, Email (en una grid de 2 columnas) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-white/90">Nombre *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="nombre"
                        type="text"
                        value={formState.nombre.value}
                        onChange={(e) => handleFieldChange("nombre", e.target.value)}
                        onBlur={() => handleFieldBlur("nombre")}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.nombre.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="Tu nombre"
                      />
                    </div>
                    {formState.nombre.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.nombre.error.message}</p>
                    )}
                  </div>
                  {/* Apellido */}
                  <div className="space-y-2">
                    <label htmlFor="apellido" className="block text-sm font-medium text-white/90">Apellido *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="apellido"
                        type="text"
                        value={formState.apellido.value}
                        onChange={(e) => handleFieldChange("apellido", e.target.value)}
                        onBlur={() => handleFieldBlur("apellido")}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.apellido.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="Tu apellido"
                      />
                    </div>
                    {formState.apellido.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.apellido.error.message}</p>
                    )}
                  </div>
                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="block text-sm font-medium text-white/90">Teléfono (opcional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="telefono"
                        type="tel"
                        value={formState.telefono.value}
                        onChange={(e) => handleFieldChange("telefono", e.target.value)}
                        onBlur={() => handleFieldBlur("telefono")}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.telefono.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="+1234567890"
                      />
                    </div>
                    {formState.telefono.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.telefono.error.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/90">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        id="email"
                        type="email"
                        value={formState.email.value}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        onBlur={() => handleFieldBlur("email")}
                        className={`w-full pl-10 pr-10 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${formState.email.error ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30" : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"}`}
                        placeholder="tu@email.com"
                        maxLength={50}
                      />
                      {emailChecking && (
                        <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 animate-spin" />
                      )}
                    </div>
                    {formState.email.error && (
                      <p className="text-red-300 text-sm flex items-center gap-2"><X className="w-4 h-4" />{formState.email.error.message}</p>
                    )}
                  </div>
                </div>
              </div>



              {/* Términos y condiciones */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.terminos.value === "true"}
                    onChange={(e) => handleFieldChange("terminos", e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400/30"
                    required
                  />
                  <span className="text-sm text-white/80">
                    Acepto los {" "}
                    <button type="button" className="text-blue-300 hover:text-blue-200 underline" onClick={() => setShowTerms(true)}>
                      términos y condiciones
                    </button> y la {" "}
                    <button type="button" className="text-blue-300 hover:text-blue-200 underline" onClick={() => setShowPrivacy(true)}>
                      política de privacidad
                    </button> *
                  </span>
                </label>
                {formState.terminos.error && (
                  <p className="text-red-300 text-sm flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {formState.terminos.error.message}
                  </p>
                )}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.newsletter.value === "true"}
                    onChange={(e) => handleFieldChange("newsletter", e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400/30"
                  />
                  <span className="text-sm text-white/80">Quiero recibir noticias y actualizaciones por email</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formState.nombre.value ||
                  !formState.apellido.value ||
                  !formState.email.value ||
                  !formState.tipoUsuario.value ||
                  !formState.contrasena.value ||
                  !formState.confirmarContrasena.value ||
                  formState.contrasena.value !== formState.confirmarContrasena.value ||
                  formState.terminos.value !== "true"
                }
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    Crear Cuenta
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-white/60 text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    className="text-blue-300 hover:text-blue-200 font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    Inicia Sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Imagen derecha - Altura completa */}
        <div className="hidden lg:flex flex-col items-center justify-center w-64 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="w-full h-full relative">
            <img src="/img/pugperro1.jpg.webp" alt="Perro refugio derecha" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-4 right-4 text-center">
              <p className="text-white font-semibold text-xl mb-2">Bienvenido</p>
              <p className="text-white/80 text-sm">Juntos hacemos la diferencia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Términos y Condiciones */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button onClick={() => setShowTerms(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-2">Términos y Condiciones</h2>
            <p className="text-gray-700 mb-2">Esto es un ejemplo de términos y condiciones. Aquí puedes poner el texto legal que desees mostrar a los usuarios sobre el uso del sistema, responsabilidades, etc.</p>
            <p className="text-gray-500 text-sm">Última actualización: 2025</p>
          </div>
        </div>
      )}
      {/* Modal Política de Privacidad */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-2">Política de Privacidad</h2>
            <p className="text-gray-700 mb-2">Este es un ejemplo de política de privacidad. Aquí puedes informar a los usuarios sobre el tratamiento de sus datos personales, almacenamiento, derechos, etc.</p>
            <p className="text-gray-500 text-sm">Última actualización: 2025</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegistroUser
