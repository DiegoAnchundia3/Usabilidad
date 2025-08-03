import React, { useState, useEffect } from 'react';
import { UserService } from '../services/user.service';
import type { UserProfile } from '../types/user.types';

const DemoDataViewer: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [refugioData, setRefugioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Cargar usuarios
        const usersData = await UserService.getAllUsers();
        setUsers(usersData);

        // Cargar datos del refugio
        const refugioInfo = await UserService.getRefugioData();
        setRefugioData(refugioInfo);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando datos del refugio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          📊 Datos Mock del Sistema de Refugio
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usuarios */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              👥 Usuarios del Sistema
            </h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">
                        {user.nombre} {user.apellido}
                      </p>
                      <p className="text-blue-200 text-sm">{user.email}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.tipoUsuario === 'administrador'
                            ? 'bg-red-500/20 text-red-300'
                            : user.tipoUsuario === 'veterinario'
                            ? 'bg-green-500/20 text-green-300'
                            : user.tipoUsuario === 'cuidador'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {user.tipoUsuario}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.estado === 'activo'
                          ? 'bg-green-500/20 text-green-300'
                          : user.estado === 'pendiente'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {user.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estadísticas del Refugio */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              📈 Estadísticas del Refugio
            </h2>
            {refugioData?.estadisticas && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-300">
                    {refugioData.estadisticas.animalesTotal}
                  </p>
                  <p className="text-blue-200 text-sm">Total Animales</p>
                </div>
                <div className="bg-green-500/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-300">
                    {refugioData.estadisticas.animalesDisponibles}
                  </p>
                  <p className="text-green-200 text-sm">Disponibles</p>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-300">
                    {refugioData.estadisticas.adopcionesEsteMes}
                  </p>
                  <p className="text-purple-200 text-sm">Adopciones</p>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-300">
                    {refugioData.estadisticas.voluntariosActivos}
                  </p>
                  <p className="text-yellow-200 text-sm">Voluntarios</p>
                </div>
              </div>
            )}
          </div>

          {/* Animales */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              🐕 Animales en el Refugio
            </h2>
            <div className="space-y-3">
              {refugioData?.animales?.slice(0, 3).map((animal: any) => (
                <div key={animal.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{animal.nombre}</p>
                      <p className="text-blue-200 text-sm">
                        {animal.raza} - {animal.especie}
                      </p>
                      <p className="text-white/60 text-xs">
                        {animal.edad} años - {animal.peso}kg
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        animal.estado === 'disponible'
                          ? 'bg-green-500/20 text-green-300'
                          : animal.estado === 'adoptado'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {animal.estado.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donaciones */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              💰 Donaciones Recientes
            </h2>
            <div className="space-y-3">
              {refugioData?.donaciones?.map((donacion: any) => (
                <div key={donacion.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">
                        {donacion.donante}
                      </p>
                      <p className="text-blue-200 text-sm">
                        {donacion.tipo === 'monetaria'
                          ? `$${donacion.monto.toFixed(2)}`
                          : donacion.descripcion}
                      </p>
                      <p className="text-white/60 text-xs">
                        {donacion.fecha.toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        donacion.tipo === 'monetaria'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {donacion.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">
            ℹ️ Información del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white font-medium">
                Total de Registros Médicos
              </p>
              <p className="text-blue-300 text-2xl">
                {refugioData?.registrosMedicos?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-white font-medium">Adopciones Completadas</p>
              <p className="text-green-300 text-2xl">
                {refugioData?.adopciones?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-white font-medium">Items en Inventario</p>
              <p className="text-purple-300 text-2xl">
                {refugioData?.inventario?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDataViewer;
