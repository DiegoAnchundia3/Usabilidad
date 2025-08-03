import { useState, useCallback, useEffect } from 'react';
import type {
  UserRegistrationData,
  RegistrationFormState,
  PasswordStrength,
  FormFieldState,
} from '../types/user.types';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';

export const useRegistrationForm = () => {
  const initialFieldState: FormFieldState = {
    value: '',
    touched: false,
    error: undefined,
  };

  const [formState, setFormState] = useState<RegistrationFormState>({
    nombre: { ...initialFieldState },
    apellido: { ...initialFieldState },
    email: { ...initialFieldState },
    telefono: { ...initialFieldState },
    contrasena: { ...initialFieldState },
    confirmarContrasena: { ...initialFieldState },
    tipoUsuario: { ...initialFieldState },
    terminos: { ...initialFieldState, value: 'false' },
    newsletter: { ...initialFieldState, value: 'false' },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);
  const [emailChecking, setEmailChecking] = useState(false);

  const updateField = useCallback(
    (fieldName: keyof RegistrationFormState, value: string | boolean) => {
      setFormState((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: value.toString(),
          touched: true,
        },
      }));
    },
    []
  );

  const validateField = useCallback(
    (fieldName: keyof UserRegistrationData, value: any) => {
      const formData = getFormData();
      const error = ValidationService.validateField(fieldName, value, formData);

      setFormState((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          error: error || undefined,
        },
      }));

      return error === null;
    },
    []
  );

  const getFormData = useCallback((): UserRegistrationData => {
    return {
      nombre: formState.nombre.value,
      apellido: formState.apellido.value,
      email: formState.email.value,
      telefono: formState.telefono.value || undefined,
      contrasena: formState.contrasena.value,
      confirmarContrasena: formState.confirmarContrasena.value,
      tipoUsuario: formState.tipoUsuario.value as any,
      terminos: formState.terminos.value === 'true',
      newsletter: formState.newsletter.value === 'true',
    };
  }, [formState]);

  const isFormValid = useCallback((): boolean => {
    const hasErrors = Object.values(formState).some((field) => field.error);
    const hasEmptyRequired = [
      formState.nombre,
      formState.apellido,
      formState.email,
      formState.contrasena,
      formState.confirmarContrasena,
      formState.tipoUsuario,
      formState.terminos,
    ].some((field) => !field.value || field.value === 'false');

    return !hasErrors && !hasEmptyRequired;
  }, [formState]);

  const handleFieldChange = useCallback(
    (fieldName: keyof RegistrationFormState, value: string | boolean) => {
      updateField(fieldName, value);

      if (formState[fieldName].touched) {
        setTimeout(() => {
          validateField(fieldName as keyof UserRegistrationData, value);
        }, 300);
      }
    },
    [formState, updateField, validateField]
  );

  const handleFieldBlur = useCallback(
    (fieldName: keyof UserRegistrationData) => {
      const value = formState[fieldName].value;

      setFormState((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          touched: true,
        },
      }));

      validateField(fieldName, value);
    },
    [formState, validateField]
  );

  const checkEmailExists = useCallback(async (email: string) => {
    if (!email || !ValidationService.validateEmail(email)) return;

    setEmailChecking(true);
    try {
      const exists = await UserService.checkEmailExists(email);
      if (exists) {
        setFormState((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            error: {
              field: 'email',
              message: 'Este email ya está registrado',
              type: 'custom',
            },
          },
        }));
      }
    } catch (error) {
      console.error('Error verificando email:', error);
    } finally {
      setEmailChecking(false);
    }
  }, []);

  const submitForm = useCallback(async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = getFormData();
      const errors = ValidationService.validateRegistrationForm(formData);

      if (errors.length > 0) {
        const newFormState = { ...formState };
        errors.forEach((error) => {
          if (newFormState[error.field as keyof RegistrationFormState]) {
            newFormState[error.field as keyof RegistrationFormState].error =
              error;
          }
        });
        setFormState(newFormState);

        return {
          success: false,
          message: 'Por favor corrige los errores en el formulario',
        };
      }

      const response = await UserService.registerUser(formData);

      if (!response.success) {
        if (response.errors && response.errors.length > 0) {
          const newFormState = { ...formState };
          response.errors.forEach((error) => {
            if (newFormState[error.field as keyof RegistrationFormState]) {
              newFormState[error.field as keyof RegistrationFormState].error =
                error;
            }
          });
          setFormState(newFormState);
        }

        setSubmitError(response.message);
        return {
          success: false,
          message: response.message,
        };
      }

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = 'Error inesperado. Intenta más tarde.';
      setSubmitError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, getFormData]);

  const resetForm = useCallback(() => {
    setFormState({
      nombre: { ...initialFieldState },
      apellido: { ...initialFieldState },
      email: { ...initialFieldState },
      telefono: { ...initialFieldState },
      contrasena: { ...initialFieldState },
      confirmarContrasena: { ...initialFieldState },
      tipoUsuario: { ...initialFieldState },
      terminos: { ...initialFieldState, value: 'false' },
      newsletter: { ...initialFieldState, value: 'false' },
    });
    setSubmitError(null);
    setPasswordStrength(null);
  }, []);

  useEffect(() => {
    const password = formState.contrasena.value;
    if (password) {
      const strength = ValidationService.getPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  }, [formState.contrasena.value]);

  useEffect(() => {
    const email = formState.email.value;
    if (formState.email.touched && email && !formState.email.error) {
      const timeoutId = setTimeout(() => {
        checkEmailExists(email);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    formState.email.value,
    formState.email.touched,
    formState.email.error,
    checkEmailExists,
  ]);

  return {
    formState,
    isSubmitting,
    submitError,
    passwordStrength,
    emailChecking,
    isFormValid: isFormValid(),
    handleFieldChange,
    handleFieldBlur,
    submitForm,
    resetForm,
    getFormData,
  };
};
