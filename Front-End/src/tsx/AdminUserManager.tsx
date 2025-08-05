import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Componente para mostrar el usuario logeado
function AdminUserInfo() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || 'Usuario';
  return (
    <div style={{display: 'flex', alignItems: 'center', background: 'rgba(60, 48, 120, 0.9)', borderRadius: 16, padding: '12px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', marginLeft: 16}}>
      <div style={{width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 60%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
        <span style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{name[0]?.toUpperCase() || 'U'}</span>
      </div>
      <div>
        <div style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{name}</div>
        <div style={{color: '#c7d2fe', fontSize: 14}}>Administrador</div>
      </div>
    </div>
  );
}

const usuarios = [
  { id: 1, usuario: "Diegardo1", password: "Admin123", rol: "Administrador" },
  { id: 2, usuario: "Davicho12", password: "EmelecCampeon", rol: "Usuario" },
  { id: 3, usuario: "xJordi13", password: "JordiP", rol: "Usuario" },
];

export default function AdminUserManager() {
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("");
  const [users, setUsers] = useState(usuarios);
  const navigate = useNavigate();

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      !search ||
      u.usuario.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toString() === search;
    const matchesRol = !filterRol || u.rol === filterRol;
    return matchesSearch && matchesRol;
  });

  const handleDeleteUser = (id: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const password = window.prompt('Por seguridad, ingresa tu contraseña para borrar este usuario:');
    if (password === user?.password) {
      setUsers(prev => prev.filter(u => u.id !== id));
    } else {
      window.alert('Contraseña incorrecta. No se borró el usuario.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 16, padding: '32px 0 0 32px'}}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{background: 'rgba(60, 48, 120, 0.9)', color: 'white', borderRadius: 16, padding: '12px 24px', fontWeight: 'bold', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', border: 'none', cursor: 'pointer'}}>
          ← Regresar al Dashboard
        </button>
        <AdminUserInfo />
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-12 w-full max-w-5xl space-y-8 mt-32">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">Gestión de Usuarios</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <input
            type="text"
            placeholder="Buscar usuario por nombre o ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
          <select
            value={filterRol}
            onChange={e => setFilterRol(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-purple-500"
          >
            <option value="">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>
        <div className="bg-white/20 rounded-xl p-6 shadow space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-white text-center">No se encontraron usuarios.</div>
          ) : (
            <ul>
              {filteredUsers.map(u => (
                <li key={u.id} className="flex justify-between items-center py-2 px-4 bg-white/10 rounded-lg mb-2">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-white">{u.usuario}</span>
                    <span className="text-sm text-indigo-200">{u.rol}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
                  >
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
