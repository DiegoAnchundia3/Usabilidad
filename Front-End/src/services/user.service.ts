import type {
  UserRegistrationData,
  RegistrationResponse,
  UserProfile,
  ValidationError,
} from '../types/user.types';
import {
  mockUsers,
  mockAnimals,
  mockMedicalRecords,
  mockAdoptions,
  mockInventory,
  mockDonations,
  mockVolunteerActivities,
  mockRefugioStats,
} from '../data/mockData';

export class UserService {
  private static async delay(ms: number = 1500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async registerUser(
    userData: UserRegistrationData
  ): Promise<RegistrationResponse> {
    try {
      await this.delay(2000);

      const errors: ValidationError[] = [];

      if (
        mockUsers.some(
          (user) => user.email.toLowerCase() === userData.email.toLowerCase()
        )
      ) {
        errors.push({
          field: 'email',
          message: 'Este email ya está registrado',
          type: 'custom',
        });
      }

      if (Math.random() < 0.05) {
        return {
          success: false,
          message: 'Error temporal del servidor. Intenta más tarde.',
          errors: [],
        };
      }

      if (errors.length > 0) {
        return {
          success: false,
          message: 'Error en los datos proporcionados',
          errors,
        };
      }

      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        telefono: userData.telefono,
        tipoUsuario: userData.tipoUsuario,
        fechaRegistro: new Date(),
        estado: 'pendiente',
      };

      mockUsers.push(newUser);

      return {
        success: true,
        message:
          'Usuario registrado exitosamente. Revisa tu email para activar tu cuenta.',
        user: newUser,
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: 'Error inesperado. Intenta más tarde.',
        errors: [],
      };
    }
  }

  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      await this.delay(800);

      return mockUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error('Error verificando email:', error);
      return false;
    }
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      await this.delay(1000);

      const user = mockUsers.find((u) => u.id === userId);
      return user || null;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      return null;
    }
  }

  static async getAllUsers(): Promise<UserProfile[]> {
    try {
      await this.delay(1200);
      return [...mockUsers];
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  static async activateAccount(
    _token: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.delay(1000);

      return {
        success: true,
        message: 'Cuenta activada exitosamente',
      };
    } catch (error) {
      console.error('Error activando cuenta:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  static async resendActivationEmail(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.delay(1000);

      const userExists = mockUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!userExists) {
        return {
          success: false,
          message: 'Email no encontrado',
        };
      }

      return {
        success: true,
        message: 'Email de activación enviado exitosamente',
      };
    } catch (error) {
      console.error('Error reenviando email:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  static async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    usersByRole: Record<string, number>;
  }> {
    try {
      await this.delay(800);

      const totalUsers = mockUsers.length;
      const activeUsers = mockUsers.filter((u) => u.estado === 'activo').length;
      const pendingUsers = mockUsers.filter(
        (u) => u.estado === 'pendiente'
      ).length;

      const usersByRole = mockUsers.reduce((acc, user) => {
        acc[user.tipoUsuario] = (acc[user.tipoUsuario] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalUsers,
        activeUsers,
        pendingUsers,
        usersByRole,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        pendingUsers: 0,
        usersByRole: {},
      };
    }
  }

  static async getRefugioData(): Promise<{
    animales: any[];
    registrosMedicos: any[];
    adopciones: any[];
    inventario: any[];
    donaciones: any[];
    actividadesVoluntarios: any[];
    estadisticas: any;
  }> {
    try {
      await this.delay(1500);

      return {
        animales: mockAnimals,
        registrosMedicos: mockMedicalRecords,
        adopciones: mockAdoptions,
        inventario: mockInventory,
        donaciones: mockDonations,
        actividadesVoluntarios: mockVolunteerActivities,
        estadisticas: mockRefugioStats,
      };
    } catch (error) {
      console.error('Error obteniendo datos del refugio:', error);
      return {
        animales: [],
        registrosMedicos: [],
        adopciones: [],
        inventario: [],
        donaciones: [],
        actividadesVoluntarios: [],
        estadisticas: {},
      };
    }
  }

  static async getDataByCategory(category: string): Promise<any[]> {
    try {
      await this.delay(800);

      switch (category) {
        case 'animales':
          return mockAnimals;
        case 'registros-medicos':
          return mockMedicalRecords;
        case 'adopciones':
          return mockAdoptions;
        case 'inventario':
          return mockInventory;
        case 'donaciones':
          return mockDonations;
        case 'actividades':
          return mockVolunteerActivities;
        default:
          return [];
      }
    } catch (error) {
      console.error(`Error obteniendo datos de ${category}:`, error);
      return [];
    }
  }

  static async searchUsers(filters: {
    nombre?: string;
    tipoUsuario?: string;
    estado?: string;
  }): Promise<UserProfile[]> {
    try {
      await this.delay(600);

      let filteredUsers = [...mockUsers];

      if (filters.nombre) {
        const searchTerm = filters.nombre.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.nombre.toLowerCase().includes(searchTerm) ||
            user.apellido.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.tipoUsuario) {
        filteredUsers = filteredUsers.filter(
          (user) => user.tipoUsuario === filters.tipoUsuario
        );
      }

      if (filters.estado) {
        filteredUsers = filteredUsers.filter(
          (user) => user.estado === filters.estado
        );
      }

      return filteredUsers;
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      return [];
    }
  }
}
