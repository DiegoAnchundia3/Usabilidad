
export interface UserRegistrationData {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  contrasena: string;
  confirmarContrasena: string;
  tipoUsuario: UserRole;
  terminos: boolean;
  newsletter: boolean;
}

export interface UserProfile {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  tipoUsuario: UserRole;
  fechaRegistro: Date;
  estado: UserStatus;
  avatar?: string;
  password?: string;
  username?: string;
}

export type UserRole =
  | 'administrador'
  | 'veterinario'
  | 'cuidador'
  | 'voluntario';

export const USER_ROLES = {
  ADMINISTRADOR: 'administrador' as const,
  VETERINARIO: 'veterinario' as const,
  CUIDADOR: 'cuidador' as const,
  VOLUNTARIO: 'voluntario' as const,
} as const;

export type UserStatus = 'activo' | 'inactivo' | 'pendiente' | 'suspendido';

export const USER_STATUS = {
  ACTIVO: 'activo' as const,
  INACTIVO: 'inactivo' as const,
  PENDIENTE: 'pendiente' as const,
  SUSPENDIDO: 'suspendido' as const,
} as const;

export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'length' | 'match' | 'custom';
}

export interface PasswordStrength {
  level: 1 | 2 | 3 | 4 | 5;
  text: string;
  color: string;
  requirements: PasswordRequirement[];
}

export interface PasswordRequirement {
  id: string;
  text: string;
  met: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  user?: Partial<UserProfile>;
  errors?: ValidationError[];
}

export interface FormFieldState {
  value: string;
  touched: boolean;
  error?: ValidationError;
}

export interface RegistrationFormState {
  nombre: FormFieldState;
  apellido: FormFieldState;
  email: FormFieldState;
  telefono: FormFieldState;
  contrasena: FormFieldState;
  confirmarContrasena: FormFieldState;
  tipoUsuario: FormFieldState;
  terminos: FormFieldState;
  newsletter: FormFieldState;
}

export interface RegistrationFormProps {
  onSubmit?: (data: UserRegistrationData) => Promise<void>;
  onSuccess?: (user: UserProfile) => void;
  onError?: (errors: ValidationError[]) => void;
  initialData?: Partial<UserRegistrationData>;
  className?: string;
}
