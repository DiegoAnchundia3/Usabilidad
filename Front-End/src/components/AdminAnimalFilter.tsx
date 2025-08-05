import React, { useState } from "react";

interface AdminAnimalFilterProps {
  onFilter: (filters: { name: string; species: string; status: string }) => void;
}

export default function AdminAnimalFilter({ onFilter }: AdminAnimalFilterProps) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = () => {
    onFilter({ name, species, status });
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Nombre del animal"
        value={name}
        onChange={e => setName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
      />
      <select
        value={species}
        onChange={e => setSpecies(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-purple-500"
      >
        <option value="">Todas las especies</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-green-500"
      >
        <option value="">Todos los estados</option>
        <option value="disponible">Disponible</option>
        <option value="adoptado">Adoptado</option>
        <option value="en_tratamiento">En tratamiento</option>
      </select>
      <button
        onClick={handleFilter}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
      >
        Filtrar
      </button>
    </div>
  );
}
