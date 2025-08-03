import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Home, User, Mail, Type, MessageSquare, Send, X, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "../components/UI/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/UI/card"
import { useActionState } from "react" // Importar useActionState
import { sendContactEmail } from "../actions/send-contact-email" // Importar la Server Action

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactForm() {
  // Usar useActionState para manejar el estado del formulario con la Server Action
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    message: '',
  })

  // Mantener el estado local para la validación del lado del cliente y el control de los campos
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio."
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido."
    }
    if (!formData.subject.trim()) newErrors.subject = "El asunto es obligatorio."
    if (!formData.message.trim()) newErrors.message = "El mensaje es obligatorio."
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Limpiar error para el campo mientras el usuario escribe
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id as keyof FormErrors]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target
    const fieldErrors = validate()
    if (fieldErrors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: fieldErrors[id as keyof FormErrors] }))
    }
  }

  // Función para resetear el formulario y los mensajes de estado
  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" })
    setErrors({})
    // No necesitamos resetear `state` directamente aquí, useActionState lo maneja
  }

  // Efecto para limpiar el formulario si la acción fue exitosa
  // React.useEffect(() => {
  //   if (state.success) {
  //     resetForm()
  //   }
  // }, [state.success])

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

      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-fade-in-up">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
          <CardTitle className="text-2xl font-bold text-white text-center">Formulario de Contacto</CardTitle>
          <CardDescription className="text-white/80 text-center text-sm">
            ¿Tienes preguntas, sugerencias o quieres colaborar? ¡Contáctanos!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Mostrar mensaje de éxito o error de la Server Action */}
          {state.message && (
            <div
              className={`rounded-lg p-3 mb-4 flex items-center gap-2 ${
                state.success
                  ? "bg-green-500/10 border border-green-500/20 text-green-300"
                  : "bg-red-500/10 border border-red-500/20 text-red-300"
              }`}
            >
              {state.success ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p className="text-sm">{state.message}</p>
            </div>
          )}

          {/* El atributo `action` del formulario ahora apunta a la Server Action */}
          <form action={formAction} className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white/90">
                Nombre *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="name"
                  name="name" // Importante: el atributo `name` es necesario para FormData
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30"
                      : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"
                  }`}
                  placeholder="Tu nombre completo"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-red-300 text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/90">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="email"
                  name="email" // Importante: el atributo `name` es necesario para FormData
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30"
                      : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"
                  }`}
                  placeholder="tu@ejemplo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-300 text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Asunto */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-white/90">
                Asunto *
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="subject"
                  name="subject" // Importante: el atributo `name` es necesario para FormData
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isPending}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.subject
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30"
                      : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"
                  }`}
                  placeholder="Motivo de tu mensaje"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
              </div>
              {errors.subject && (
                <p id="subject-error" className="text-red-300 text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white/90">
                Mensaje *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-white/60" />
                <textarea
                  id="message"
                  name="message" // Importante: el atributo `name` es necesario para FormData
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isPending}
                  rows={6}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-200 resize-y ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/30"
                      : "border-white/20 focus:border-blue-400 focus:ring-blue-400/30"
                  }`}
                  placeholder="Escribe tu mensaje aquí..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
              </div>
              {errors.message && (
                <p id="message-error" className="text-red-300 text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm} // Usar la función resetForm
                disabled={isPending}
                className="w-full py-3 border-white/20 text-white/80 hover:bg-white/10 hover:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
