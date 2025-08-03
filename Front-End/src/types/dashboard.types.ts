
export interface DashboardMenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  description?: string;
  badge?: number;
  access: UserRole[];
}

export interface DashboardStats {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  roles: UserRole[];
}

export interface RecentActivity {
  id: string;
  type: 'animal' | 'adoption' | 'medical' | 'user' | 'donation' | 'volunteer';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  animal?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface AnimalCard {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  estado: 'disponible' | 'adoptado' | 'en_tratamiento' | 'cuarentena';
  foto?: string;
  prioridad?: 'normal' | 'alta' | 'urgente';
  proximaCita?: Date;
  cuidador?: string;
  veterinario?: string;
}

export interface MedicalAlert {
  id: string;
  animalId: string;
  animalNombre: string;
  tipo: 'vacuna_pendiente' | 'revision_medica' | 'medicamento' | 'emergencia';
  descripcion: string;
  fechaLimite: Date;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  asignado?: string;
}

export interface VolunteerTask {
  id: string;
  titulo: string;
  descripcion: string;
  tipo:
    | 'paseo'
    | 'limpieza'
    | 'alimentacion'
    | 'socializacion'
    | 'administrativo';
  estado: 'pendiente' | 'en_progreso' | 'completada';
  prioridad: 'baja' | 'media' | 'alta';
  fechaLimite?: Date;
  duracionEstimada: number; // en horas
  animalesInvolucrados?: string[];
  voluntarioAsignado?: string;
}

export interface DashboardConfig {
  role: UserRole;
  title: string;
  subtitle: string;
  menuItems: DashboardMenuItem[];
  stats: DashboardStats[];
  quickActions: QuickAction[];
  showAnimals: boolean;
  showMedicalAlerts: boolean;
  showVolunteerTasks: boolean;
  showRecentActivity: boolean;
}

export type UserRole =
  | 'administrador'
  | 'veterinario'
  | 'cuidador'
  | 'voluntario';
