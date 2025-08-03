import type {
  ValidationError,
  PasswordStrength,
  PasswordRequirement,
  UserRegistrationData,
} from '../types/user.types';

export class ValidationService {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;
  private static readonly NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

  static validateEmail(email: string): ValidationError | null {
    if (!email.trim()) {
      return {
        field: 'email',
        message: 'El email es obligatorio',
        type: 'required',
      };
    }

    if (!this.EMAIL_REGEX.test(email)) {
      return {
        field: 'email',
        message: 'Ingresa un email válido',
        type: 'format',
      };
    }

    return null;
  }

  static validateName(name: string, fieldName: string): ValidationError | null {
    if (!name.trim()) {
      return {
        field: fieldName,
        message: `El ${fieldName} es obligatorio`,
        type: 'required',
      };
    }

    if (name.length < 2) {
      return {
        field: fieldName,
        message: `El ${fieldName} debe tener al menos 2 caracteres`,
        type: 'length',
      };
    }

    if (name.length > 50) {
      return {
        field: fieldName,
        message: `El ${fieldName} no puede exceder 50 caracteres`,
        type: 'length',
      };
    }

    if (!this.NAME_REGEX.test(name)) {
      return {
        field: fieldName,
        message: `El ${fieldName} solo puede contener letras y espacios`,
        type: 'format',
      };
    }

    return null;
  }

  static validatePhone(phone: string): ValidationError | null {
    if (!phone.trim()) {
      return null; // El teléfono es opcional
    }

    if (!this.PHONE_REGEX.test(phone)) {
      return {
        field: 'telefono',
        message: 'Ingresa un número de teléfono válido',
        type: 'format',
      };
    }

    return null;
  }

  static validatePassword(password: string): ValidationError | null {
    if (!password) {
      return {
        field: 'contrasena',
        message: 'La contraseña es obligatoria',
        type: 'required',
      };
    }

    if (password.length < 8) {
      return {
        field: 'contrasena',
        message: 'La contraseña debe tener al menos 8 caracteres',
        type: 'length',
      };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return {
        field: 'contrasena',
        message:
          'La contraseña debe contener mayúsculas, minúsculas, números y símbolos',
        type: 'format',
      };
    }

    return null;
  }

  static validatePasswordConfirmation(
    password: string,
    confirmation: string
  ): ValidationError | null {
    if (!confirmation) {
      return {
        field: 'confirmarContrasena',
        message: 'Confirma tu contraseña',
        type: 'required',
      };
    }

    if (password !== confirmation) {
      return {
        field: 'confirmarContrasena',
        message: 'Las contraseñas no coinciden',
        type: 'match',
      };
    }

    return null;
  }

  static getPasswordStrength(password: string): PasswordStrength {
    const requirements: PasswordRequirement[] = [
      {
        id: 'length',
        text: 'Mínimo 8 caracteres',
        met: password.length >= 8,
      },
      {
        id: 'lowercase',
        text: 'Una letra minúscula',
        met: /[a-z]/.test(password),
      },
      {
        id: 'uppercase',
        text: 'Una letra mayúscula',
        met: /[A-Z]/.test(password),
      },
      {
        id: 'number',
        text: 'Un número',
        met: /\d/.test(password),
      },
      {
        id: 'special',
        text: 'Un símbolo especial',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];

    const metRequirements = requirements.filter((req) => req.met).length;

    let level: 1 | 2 | 3 | 4 | 5;
    let text: string;
    let color: string;

    if (metRequirements === 0 || password.length === 0) {
      level = 1;
      text = '';
      color = '';
    } else if (metRequirements <= 2) {
      level = 2;
      text = 'Muy débil';
      color = 'text-red-500';
    } else if (metRequirements === 3) {
      level = 3;
      text = 'Débil';
      color = 'text-orange-500';
    } else if (metRequirements === 4) {
      level = 4;
      text = 'Buena';
      color = 'text-yellow-500';
    } else {
      level = 5;
      text = 'Excelente';
      color = 'text-green-500';
    }

    return {
      level,
      text,
      color,
      requirements,
    };
  }

  // Validar formulario completo
  static validateRegistrationForm(
    data: UserRegistrationData
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validar nombre
    const nombreError = this.validateName(data.nombre, 'nombre');
    if (nombreError) errors.push(nombreError);

    // Validar apellido
    const apellidoError = this.validateName(data.apellido, 'apellido');
    if (apellidoError) errors.push(apellidoError);

    // Validar email
    const emailError = this.validateEmail(data.email);
    if (emailError) errors.push(emailError);

    // Validar teléfono (opcional)
    const phoneError = this.validatePhone(data.telefono || '');
    if (phoneError) errors.push(phoneError);

    // Validar contraseña
    const passwordError = this.validatePassword(data.contrasena);
    if (passwordError) errors.push(passwordError);

    // Validar confirmación de contraseña
    const passwordConfirmError = this.validatePasswordConfirmation(
      data.contrasena,
      data.confirmarContrasena
    );
    if (passwordConfirmError) errors.push(passwordConfirmError);

    // Validar tipo de usuario
    if (!data.tipoUsuario) {
      errors.push({
        field: 'tipoUsuario',
        message: 'Selecciona un tipo de usuario',
        type: 'required',
      });
    }

    // Validar términos y condiciones
    if (!data.terminos) {
      errors.push({
        field: 'terminos',
        message: 'Debes aceptar los términos y condiciones',
        type: 'required',
      });
    }

    return errors;
  }

  // Validar campo individual en tiempo real
  static validateField(
    fieldName: keyof UserRegistrationData,
    value: any,
    formData?: Partial<UserRegistrationData>
  ): ValidationError | null {
    switch (fieldName) {
      case 'nombre':
        return this.validateName(value, 'nombre');
      case 'apellido':
        return this.validateName(value, 'apellido');
      case 'email':
        return this.validateEmail(value);
      case 'telefono':
        return this.validatePhone(value);
      case 'contrasena':
        return this.validatePassword(value);
      case 'confirmarContrasena':
        return formData
          ? this.validatePasswordConfirmation(formData.contrasena || '', value)
          : null;
      case 'tipoUsuario':
        return !value
          ? {
              field: 'tipoUsuario',
              message: 'Selecciona un tipo de usuario',
              type: 'required',
            }
          : null;
      case 'terminos':
        return !value
          ? {
              field: 'terminos',
              message: 'Debes aceptar los términos y condiciones',
              type: 'required',
            }
          : null;
      default:
        return null;
    }
  }
}
