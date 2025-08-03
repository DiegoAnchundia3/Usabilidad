import type { UserRole, UserProfile } from '../types/user.types';
import type { DashboardConfig, DashboardStats } from '../types/dashboard.types';
import {
  mockUsers,
  mockAnimals,
  mockMedicalRecords,
  mockVolunteerActivities,
  mockDashboardConfigs,
  mockMedicalAlerts,
  mockVolunteerTasks,
} from '../data/mockData';

export class DashboardService {
  private static currentUser: UserProfile | null = null;

  static async login(
    emailOrUsername: string,
    password: string
  ): Promise<{ success: boolean; user?: UserProfile; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const user = mockUsers.find(
      (u) =>
        (u.email === emailOrUsername || u.username === emailOrUsername) &&
        u.password === password
    );

    if (user) {
      this.currentUser = user;
      return {
        success: true,
        user,
        message: 'Login exitoso',
      };
    }

    return {
      success: false,
      message: 'Credenciales inválidas',
    };
  }

  static getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  static logout(): void {
    this.currentUser = null;
  }

  static getDashboardConfig(role: UserRole): DashboardConfig {
    return mockDashboardConfigs[role];
  }

  static getDashboardStats(role: UserRole): DashboardStats[] {
    const config = mockDashboardConfigs[role];
    return config.stats;
  }

  static getAnimals() {
    return mockAnimals;
  }

  static getMedicalRecords() {
    return mockMedicalRecords;
  }

  static getVolunteerActivities() {
    return mockVolunteerActivities;
  }

  static getMedicalAlerts() {
    return mockMedicalAlerts.filter(
      (alert) => alert.prioridad === 'alta' || alert.prioridad === 'media'
    );
  }

  static getVolunteerTasks() {
    return mockVolunteerTasks;
  }

  static getAlertsByRole(role: UserRole) {
    return mockMedicalAlerts.filter((alert) => {
      switch (role) {
        case 'veterinario':
          return alert.prioridad === 'alta';
        case 'cuidador':
          return alert.prioridad === 'alta' || alert.prioridad === 'media';
        default:
          return mockMedicalAlerts;
      }
    });
  }

  static getActivitiesByRole(role: UserRole) {
    return mockVolunteerActivities.filter((activity) => {
      switch (role) {
        case 'voluntario':
          return (
            activity.actividad.includes('alimentar') ||
            activity.actividad.includes('pasear')
          );
        case 'cuidador':
          return !activity.actividad.includes('administrativo');
        default:
          return mockVolunteerActivities;
      }
    });
  }

  static getTasksByStatus(status: string) {
    return mockVolunteerTasks.filter((task) => task.estado === status);
  }

  static getTasksByVolunteer(volunteerId: string) {
    return mockVolunteerTasks.filter(
      (task) => task.voluntarioAsignado === volunteerId
    );
  }

  static getAnimalsByStatus(status: string) {
    return mockAnimals.filter((animal) => animal.estado === status);
  }

  static getAnimalsNeedingMedicalAttention() {
    const alertAnimals = mockMedicalAlerts.map((alert) => alert.animalId);
    return mockAnimals.filter((animal) => alertAnimals.includes(animal.id));
  }

  static getUpcomingAppointments() {
    return [
      { id: '1', animalName: 'Luna', time: '09:00', type: 'Revisión' },
      { id: '2', animalName: 'Max', time: '10:30', type: 'Vacunación' },
      { id: '3', animalName: 'Bella', time: '14:00', type: 'Control' },
    ];
  }

  static getPerformanceMetrics() {
    const totalAnimals = mockAnimals.length;
    const adoptedAnimals = mockAnimals.filter(
      (animal) => animal.estado === 'adoptado'
    ).length;
    const adoptionRate =
      totalAnimals > 0 ? (adoptedAnimals / totalAnimals) * 100 : 0;

    return {
      adoptionRate: Math.round(adoptionRate),
      averageStayDays: 45,
      volunteerHours: 1240, 
      medicalTreatments: mockMedicalRecords.length,
      satisfactionScore: 4.8, 
    };
  }

  static updateTaskStatus(taskId: string, status: string): boolean {
    const task = mockVolunteerTasks.find((task) => task.id === taskId);
    if (task) {
      task.estado = status;
      return true;
    }
    return false;
  }

  static getGeneralStats() {
    return {
      totalAnimales: mockAnimals.length,
      totalUsuarios: mockUsers.length,
      animalesAdoptados: mockAnimals.filter(
        (animal) => animal.estado === 'adoptado'
      ).length,
      alertasMedicas: mockMedicalAlerts.length,
      voluntariosActivos: mockUsers.filter(
        (user) => user.tipoUsuario === 'voluntario'
      ).length,
      ingresosMes: mockAnimals.filter((animal) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return new Date(animal.fechaIngreso) > oneMonthAgo;
      }).length,
    };
  }
}

export default DashboardService;
