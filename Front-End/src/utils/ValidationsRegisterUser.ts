export interface ValidationErrors {
  [key: string]: string
}

interface FormData {
  nombre: string
  apellido: string
  usuario: string
  correo: string
  telefono: string
  contrasena: string
  confirmarContrasena: string
}

export const validateField = (field: keyof FormData, value: string, formData: FormData): string => {
  switch (field) {
    case "nombre":
      return validateNombre(value)
    case "apellido":
      return validateApellido(value)
    case "usuario":
      return validateUsuario(value)
    case "correo":
      return validateCorreo(value)
    case "telefono":
      return validateTelefono(value)
    case "contrasena":
      return validateContrasena(value)
    case "confirmarContrasena":
      return validateConfirmarContrasena(value, formData.contrasena)
    default:
      return ""
  }
}

export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Validar campos obligatorios
  const nombreError = validateNombre(formData.nombre)
  if (nombreError) errors.nombre = nombreError

  const apellidoError = validateApellido(formData.apellido)
  if (apellidoError) errors.apellido = apellidoError

  const usuarioError = validateUsuario(formData.usuario)
  if (usuarioError) errors.usuario = usuarioError

  const correoError = validateCorreo(formData.correo)
  if (correoError) errors.correo = correoError

  const telefonoError = validateTelefono(formData.telefono)
  if (telefonoError) errors.telefono = telefonoError

  const contrasenaError = validateContrasena(formData.contrasena)
  if (contrasenaError) errors.contrasena = contrasenaError

  const confirmarContrasenaError = validateConfirmarContrasena(formData.confirmarContrasena, formData.contrasena)
  if (confirmarContrasenaError) errors.confirmarContrasena = confirmarContrasenaError

  return errors
}

// Validaciones individuales
const validateNombre = (nombre: string): string => {
  if (!nombre.trim()) {
    return "El nombre es obligatorio"
  }
  if (nombre.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres"
  }
  if (nombre.trim().length > 50) {
    return "El nombre no puede exceder 50 caracteres"
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
    return "El nombre solo puede contener letras y espacios"
  }
  return ""
}

const validateApellido = (apellido: string): string => {
  if (!apellido.trim()) {
    return "El apellido es obligatorio"
  }
  if (apellido.trim().length < 2) {
    return "El apellido debe tener al menos 2 caracteres"
  }
  if (apellido.trim().length > 50) {
    return "El apellido no puede exceder 50 caracteres"
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.trim())) {
    return "El apellido solo puede contener letras y espacios"
  }
  return ""
}

const validateUsuario = (usuario: string): string => {
  if (!usuario.trim()) {
    return "El nombre de usuario es obligatorio"
  }
  if (usuario.length < 3) {
    return "El usuario debe tener al menos 3 caracteres"
  }
  if (usuario.length > 20) {
    return "El usuario no puede exceder 20 caracteres"
  }
  if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
    return "El usuario solo puede contener letras, números y guiones bajos"
  }
  if (/^\d/.test(usuario)) {
    return "El usuario no puede comenzar con un número"
  }
  return ""
}

const validateCorreo = (correo: string): string => {
  if (!correo.trim()) {
    return "El correo electrónico es obligatorio"
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(correo)) {
    return "Ingresa un correo electrónico válido"
  }
  if (correo.length > 100) {
    return "El correo no puede exceder 100 caracteres"
  }
  return ""
}

const validateTelefono = (telefono: string): string => {
  // El teléfono es opcional, pero si se proporciona debe ser válido
  if (telefono.trim() === "") {
    return ""
  }

  // Remover espacios y caracteres especiales para validación
  const telefonoLimpio = telefono.replace(/[\s\-$$$$]/g, "")

  if (!/^\+?[0-9]{8,15}$/.test(telefonoLimpio)) {
    return "Ingresa un número de teléfono válido (8-15 dígitos)"
  }
  return ""
}

const validateContrasena = (contrasena: string): string => {
  if (!contrasena) {
    return "La contraseña es obligatoria"
  }
  if (contrasena.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres"
  }
  if (contrasena.length > 128) {
    return "La contraseña no puede exceder 128 caracteres"
  }
  if (!/(?=.*[a-z])/.test(contrasena)) {
    return "La contraseña debe contener al menos una letra minúscula"
  }
  if (!/(?=.*[A-Z])/.test(contrasena)) {
    return "La contraseña debe contener al menos una letra mayúscula"
  }
  if (!/(?=.*\d)/.test(contrasena)) {
    return "La contraseña debe contener al menos un número"
  }
  if (!/(?=.*[@$!%*?&])/.test(contrasena)) {
    return "La contraseña debe contener al menos un carácter especial (@$!%*?&)"
  }

  // Verificar patrones comunes débiles
  const patronesDebiles = [/123456/, /password/i, /qwerty/i, /abc123/i, /admin/i]

  for (const patron of patronesDebiles) {
    if (patron.test(contrasena)) {
      return "La contraseña contiene un patrón muy común. Elige una más segura"
    }
  }

  return ""
}

const validateConfirmarContrasena = (confirmarContrasena: string, contrasena: string): string => {
  if (!confirmarContrasena) {
    return "Debes confirmar tu contraseña"
  }
  if (confirmarContrasena !== contrasena) {
    return "Las contraseñas no coinciden"
  }
  return ""
}

// Utilidades adicionales
export const getPasswordStrengthScore = (password: string): number => {
  let score = 0

  // Longitud
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // Complejidad
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  // Diversidad
  const uniqueChars = new Set(password).size
  if (uniqueChars >= password.length * 0.7) score += 1

  return Math.min(score, 5)
}

export const formatPhoneNumber = (phone: string): string => {
  // Formato básico para números de teléfono
  const cleaned = phone.replace(/\D/g, "")

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  return phone
}
