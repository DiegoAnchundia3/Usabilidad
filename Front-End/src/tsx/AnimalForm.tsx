import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AnimalFormProps {
  onSuccess?: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ onSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [edad, setEdad] = useState("");
  const [estado, setEstado] = useState("");
  const [historia, setHistoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el animal al backend
    setMensaje("Mascota registrada correctamente");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4 relative">
      {/* Botón en la esquina superior izquierda */}
      <div style={{position: 'fixed', top: 32, left: 32, zIndex: 1000, width: 180}}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{width: '100%', background: 'white', color: 'black', borderRadius: 16, padding: '12px 0', fontWeight: 'bold', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', border: '1px solid #ccc', cursor: 'pointer'}}>
          ← Regresar al Dashboard
        </button>
      </div>
      {/* Cuadro usuario mucho más abajo, cerca del centro vertical */}
      <div style={{position: 'fixed', top: '35%', left: 32, zIndex: 1000, width: 180}}>
        {/* Cuadro de usuario bonito */}
        {(() => {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const name = user?.name || localStorage.getItem('usuario') || 'Usuario';
          const rol = user?.rol || 'Administrador';
          return (
            <div style={{display: 'flex', alignItems: 'center', background: 'rgba(60, 48, 120, 0.9)', borderRadius: 16, padding: '12px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)'}}>
              <div style={{width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 60%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
                <span style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{name[0]?.toUpperCase() || 'U'}</span>
              </div>
              <div>
                <div style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{name}</div>
                <div style={{color: '#c7d2fe', fontSize: 14}}>{rol}</div>
              </div>
            </div>
          );
        })()}
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 w-full max-w-2xl space-y-8" style={{marginTop: 80}}>
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">Registrar Animal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 w-full"
              required
            />
            <input
              type="text"
              placeholder="Especie"
              value={especie}
              onChange={e => setEspecie(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-purple-500 w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="number"
              placeholder="Edad (años)"
              value={edad}
              onChange={e => setEdad(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 w-full"
              required
            />
            <select
              value={estado}
              onChange={e => setEstado(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-purple-500 w-full"
              required
            >
              <option value="">Selecciona estado</option>
              <option value="disponible">Disponible</option>
              <option value="adoptado">Adoptado</option>
              <option value="en tratamiento">En tratamiento</option>
            </select>
          </div>
          <textarea
            placeholder="Historia del animal"
            value={historia}
            onChange={e => setHistoria(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-indigo-500 w-full"
            rows={3}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow w-full"
          >
            Registrar Animal
          </button>
        </form>
        {mensaje && <div className="text-green-300 text-center font-bold mt-4">{mensaje}</div>}
      </div>
    </div>
  );
};

export default AnimalForm;
