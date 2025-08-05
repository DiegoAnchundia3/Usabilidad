import React, { useState } from "react";

interface AdminAnimalSearchFilterProps {
  onFilter: (filters: { nombre: string; especie: string; estado: string }) => void;
}

const especies = ["Perro", "Gato", "Otro"];
const estados = ["disponible", "adoptado", "en tratamiento", "fallecido"];

export default function AdminAnimalSearchFilter({ onFilter }: AdminAnimalSearchFilterProps) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ nombre, especie, estado });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-4 items-center bg-white/10 p-4 rounded-lg border border-white/20">
      <input
        type="text"
        placeholder="Nombre del animal"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        className="px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <select
        value={especie}
        onChange={e => setEspecie(e.target.value)}
        className="px-3 py-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Todas las especies</option>
        {especies.map(es => (
          <option key={es} value={es}>{es}</option>
        ))}
      </select>
      <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
        className="px-3 py-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Todos los estados</option>
        {estados.map(est => (
          <option key={est} value={est}>{est}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition"
      >
        Filtrar
      </button>
    </form>
  );
}
