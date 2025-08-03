import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Heart,
  UserCheck,
  Stethoscope,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  Calendar,
  Pill,
  AlertTriangle,
  Clock,
  Cookie,
  Play,
  CheckSquare,
  CheckCircle,
  User,
  MapPin,
  FileText,
  Plus,
  UserPlus,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';
import { DashboardService } from '../services/dashboard.service';
import type { UserProfile } from '../types/user.types';
import type { DashboardConfig, DashboardStats } from '../types/dashboard.types';

// Mapeo de iconos string a componentes
const iconMap = {
  LayoutDashboard,
  Users,
  Heart,
  UserCheck,
  Stethoscope,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  Calendar,
  Pill,
  AlertTriangle,
  Clock,
  Cookie,
  Play,
  CheckSquare,
  CheckCircle,
  User,
  MapPin,
  FileText,
  Plus,
  UserPlus,
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [animals, setAnimals] = useState<any[]>([]);
  const [medicalAlerts, setMedicalAlerts] = useState<any[]>([]);
  const [volunteerTasks, setVolunteerTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const currentUser = DashboardService.getCurrentUser();

        if (!currentUser) {
          navigate('/login');
          return;
        }

        setUser(currentUser);

        // Obtener configuración del dashboard
        const dashboardConfig = DashboardService.getDashboardConfig(
          currentUser.tipoUsuario
        );
        setConfig(dashboardConfig);

        // Cargar datos según el rol
        const [statsData, animalsData, alertsData, tasksData] =
          await Promise.all([
            Promise.resolve(
              DashboardService.getDashboardStats(currentUser.tipoUsuario)
            ),
            Promise.resolve(DashboardService.getAnimals()),
            Promise.resolve(
              DashboardService.getAlertsByRole(currentUser.tipoUsuario)
            ),
            Promise.resolve(DashboardService.getVolunteerTasks()),
          ]);

        setStats(statsData);
        setAnimals(animalsData);
        setMedicalAlerts(alertsData);
        setVolunteerTasks(tasksData);
      } catch (error) {
        console.error('Error cargando dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    DashboardService.logout();
    navigate('/login');
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? (
      <IconComponent className="w-5 h-5" />
    ) : (
      <LayoutDashboard className="w-5 h-5" />
    );
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getEstadoColor = (estado: string) => {
    const colors = {
      disponible: 'bg-green-500/20 text-green-300',
      adoptado: 'bg-blue-500/20 text-blue-300',
      en_tratamiento: 'bg-yellow-500/20 text-yellow-300',
      cuarentena: 'bg-red-500/20 text-red-300',
      pendiente: 'bg-orange-500/20 text-orange-300',
      en_progreso: 'bg-blue-500/20 text-blue-300',
      completada: 'bg-green-500/20 text-green-300',
    };
    return (
      colors[estado as keyof typeof colors] || 'bg-gray-500/20 text-gray-300'
    );
  };

  const getPrioridadColor = (prioridad: string) => {
    const colors = {
      baja: 'bg-green-500/20 text-green-300',
      media: 'bg-yellow-500/20 text-yellow-300',
      alta: 'bg-orange-500/20 text-orange-300',
      critica: 'bg-red-500/20 text-red-300',
    };
    return (
      colors[prioridad as keyof typeof colors] || 'bg-gray-500/20 text-gray-300'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  if (!user || !config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Error cargando dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/20 z-40">
        <div className="p-6">
          {/* Logo y título */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">RefugioApp</h1>
              <p className="text-blue-200 text-xs">{config.title}</p>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.nombre.charAt(0)}
                  {user.apellido.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user.nombre} {user.apellido}
                </p>
                <p className="text-blue-200 text-xs capitalize">
                  {user.tipoUsuario}
                </p>
              </div>
            </div>
          </div>

          {/* Menú de navegación */}
          <nav className="space-y-2">
            {config.menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {getIcon(item.icon)}
                <span className="font-medium">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link
            to="/demo"
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 rounded-lg transition-all duration-200 border border-blue-500/30"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Demo Accesibilidad</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{config.title}</h1>
              <p className="text-blue-200">{config.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-r ${getStatColor(
                  stat.color
                )} rounded-xl p-6 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.change && (
                      <p
                        className={`text-sm ${
                          stat.changeType === 'increase'
                            ? 'text-green-200'
                            : 'text-red-200'
                        }`}
                      >
                        {stat.changeType === 'increase' ? '+' : '-'}
                        {stat.change} este mes
                      </p>
                    )}
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    {getIcon(stat.icon)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acciones rápidas */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.quickActions.map((action) => (
                <button
                  key={action.id}
                  className={`p-4 bg-gradient-to-r ${getStatColor(
                    action.color
                  )} rounded-lg text-white text-left hover:scale-105 transition-transform duration-200`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {getIcon(action.icon)}
                    <h3 className="font-semibold">{action.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Animales */}
            {config.showAnimals && animals.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4">
                  {user.tipoUsuario === 'administrador'
                    ? 'Animales en el Refugio'
                    : user.tipoUsuario === 'veterinario'
                    ? 'Mis Pacientes'
                    : user.tipoUsuario === 'cuidador'
                    ? 'Mis Animales'
                    : 'Animales Disponibles'}
                </h2>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {animals.slice(0, 6).map((animal) => (
                    <div key={animal.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">
                            {animal.nombre}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {animal.raza} - {animal.especie}
                          </p>
                          <p className="text-white/60 text-xs">
                            {animal.edad} años • {animal.peso}kg
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(
                            animal.estado
                          )}`}
                        >
                          {animal.estado.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alertas médicas */}
            {config.showMedicalAlerts && medicalAlerts.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4">
                  Alertas Médicas
                </h2>
                <div className="space-y-3">
                  {medicalAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">
                            {alert.animalNombre}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {alert.descripcion}
                          </p>
                          <p className="text-white/60 text-xs">
                            Vence: {alert.fechaLimite.toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getPrioridadColor(
                            alert.prioridad
                          )}`}
                        >
                          {alert.prioridad}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tareas de voluntarios */}
            {config.showVolunteerTasks && volunteerTasks.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4">
                  Mis Tareas
                </h2>
                <div className="space-y-3">
                  {volunteerTasks.map((task) => (
                    <div key={task.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">
                            {task.titulo}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {task.descripcion}
                          </p>
                          <p className="text-white/60 text-xs">
                            Duración estimada: {task.duracionEstimada}h
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getEstadoColor(
                              task.estado
                            )}`}
                          >
                            {task.estado.replace('_', ' ')}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getPrioridadColor(
                              task.prioridad
                            )}`}
                          >
                            {task.prioridad}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
