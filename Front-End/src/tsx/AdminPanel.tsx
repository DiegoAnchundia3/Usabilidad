import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Componente para mostrar el usuario logeado
function AdminUserInfo() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || 'Usuario';
  return (
    <div style={{position: 'absolute', top: 24, right: 24, zIndex: 1000}}>
      <div style={{display: 'flex', alignItems: 'center', background: 'rgba(60, 48, 120, 0.9)', borderRadius: 16, padding: '12px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)'}}>
        <div style={{width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 60%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{name[0]?.toUpperCase() || 'U'}</span>
        </div>
        <div>
          <div style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{name}</div>
          <div style={{color: '#c7d2fe', fontSize: 14}}>Administrador</div>
        </div>
      </div>
    </div>
  );
}

const usuarios = [
  { id: 1, usuario: "Diegardo1", password: "Admin123", rol: "Administrador" },
  { id: 2, usuario: "Davicho12", password: "EmelecCampeon", rol: "Usuario" },
  { id: 3, usuario: "xJordi13", password: "JordiP", rol: "Usuario" },
];

export default function AdminPanel() {
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div style={{position: 'relative', width: '100%'}}>
        {/* Botón regresar al dashboard y usuario alineados a la izquierda */}
        <div style={{position: 'absolute', top: 24, left: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16}}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{background: 'rgba(60, 48, 120, 0.9)', color: 'white', borderRadius: 16, padding: '12px 24px', fontWeight: 'bold', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', marginBottom: 12, border: 'none', cursor: 'pointer'}}>
            ← Regresar al Dashboard
          </button>
          <AdminUserInfo />
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 w-full max-w-3xl space-y-8" style={{marginTop: 80}}>
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">Panel de Administración</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
              onClick={() => navigate("/animals/new")}
            >
              Gestionar Animal
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
              onClick={() => navigate("/admin/users")}
            >
              Gestionar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
