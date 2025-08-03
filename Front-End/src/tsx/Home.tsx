import React from "react";
import { LogOut, Search, User } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 text-dark-50 flex flex-col">
      {/* HEADER */}
      <header className="w-full bg-white/10 backdrop-blur-md shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-white">🐾 Bienestar Animal</h1>

        <nav className="hidden md:flex gap-6 text-white font-medium">
          <a href="#" className="hover:text-secondary-300">Inicio</a>
          <a href="#" className="hover:text-secondary-300">Animales</a>
          <a href="#" className="hover:text-secondary-300">Monitoreo</a>
          <a href="#" className="hover:text-secondary-300">Usuarios</a>
          <a href="#" className="hover:text-secondary-300">Reportes</a>
          <a href="#" className="hover:text-secondary-300">Configuración</a>
        </nav>

        <div className="flex gap-4 items-center text-white">
          <button className="hover:text-secondary-300">
            <Search size={20} />
          </button>
          <button className="hover:text-secondary-300">
            <User size={20} />
          </button>
          <button className="hover:text-red-400">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6">
        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Animales en buen estado</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">128</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Alertas activas</h3>
            <p className="text-3xl font-bold text-yellow-400 mt-2">5</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Próximas vacunas</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">12</p>
          </div>
        </div>

        {/* GRÁFICO (Placeholder por ahora) */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-6 mb-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Gráfico de Monitoreo</h3>
          <div className="h-40 flex items-center justify-center text-gray-300 italic">
            [Aquí irá un gráfico interactivo]
          </div>
        </div>

        {/* LISTA DE ÚLTIMOS REGISTROS */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Últimos registros</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-300">
                <th className="pb-2">Animal</th>
                <th className="pb-2">Estado</th>
                <th className="pb-2">Última revisión</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="py-2">Rocky</td>
                <td className="py-2 text-green-400">Saludable</td>
                <td className="py-2">14/07/2025</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2">Luna</td>
                <td className="py-2 text-yellow-400">En observación</td>
                <td className="py-2">14/07/2025</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2">Max</td>
                <td className="py-2 text-red-400">Crítico</td>
                <td className="py-2">13/07/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/10 backdrop-blur-md text-center text-gray-300 text-sm py-4">
        © 2025 Sistema de Monitoreo de Bienestar Animal
      </footer>
    </div>
  );
};

export default Home;
