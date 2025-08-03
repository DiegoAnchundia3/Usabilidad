import React, { useState } from "react";

const BuscarEditarEliminarAnimal: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [animal, setAnimal] = useState<any>(null);
  const [mensaje, setMensaje] = useState("");
  const [editando, setEditando] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);

  // Simulación de búsqueda y edición
  const handleBuscar = async () => {
    // Aquí iría la lógica para buscar por ID o nombre en la base de datos
    // Simulación:
    if (busqueda === "1" || busqueda.toLowerCase() === "buddy") {
      setAnimal({
        id: 1,
        nombre: "Buddy",
        especie: "Perro",
        edad: "2 años",
        estado: "Disponible",
        ubicacion: "Refugio Central",
        imagenUrl: ""
      });
      setMensaje("");
    } else {
      setAnimal(null);
      setMensaje("No se encontró ningún animal con ese ID o nombre.");
    }
  };

  const handleEliminar = () => {
    // Aquí iría la lógica para eliminar en la base de datos
    setAnimal(null);
    setMensaje("Animal eliminado correctamente.");
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGuardarEdicion = () => {
    setEditando(false);
    setMensaje("Datos actualizados correctamente.");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Buscar, Editar o Eliminar Mascota</h2>
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="ID o Nombre" value={busqueda} onChange={e => setBusqueda(e.target.value)} className="rounded-lg p-2 bg-white/20 text-white flex-1" />
          <button onClick={handleBuscar} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Buscar</button>
        </div>
        {mensaje && <div className="text-yellow-200 mb-2">{mensaje}</div>}
        {animal && !editando && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {animal.imagenUrl && <img src={animal.imagenUrl} alt="animal" className="h-32 rounded object-contain" />}
              <div>
                <div className="text-white/90 font-semibold">Nombre: {animal.nombre}</div>
                <div className="text-white/90">Especie: {animal.especie}</div>
                <div className="text-white/90">Edad: {animal.edad}</div>
                <div className="text-white/90">Estado: {animal.estado}</div>
                <div className="text-white/90">Ubicación: {animal.ubicacion}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleEditar} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold">Editar</button>
              <button onClick={handleEliminar} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold">Eliminar</button>
            </div>
          </div>
        )}
        {animal && editando && (
          <form onSubmit={e => { e.preventDefault(); handleGuardarEdicion(); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-1">Nombre *</label>
                <input type="text" defaultValue={animal.nombre} className="w-full rounded-lg p-2 bg-white/20 text-white" />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Especie *</label>
                <select defaultValue={animal.especie} className="w-full rounded-lg p-2 bg-white/20 text-white">
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-1">Edad *</label>
                <input type="text" defaultValue={animal.edad} className="w-full rounded-lg p-2 bg-white/20 text-white" />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Estado *</label>
                <select defaultValue={animal.estado} className="w-full rounded-lg p-2 bg-white/20 text-white">
                  <option value="Disponible">Disponible</option>
                  <option value="Adoptado">Adoptado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/80 mb-1">Ubicación *</label>
                <input type="text" defaultValue={animal.ubicacion} className="w-full rounded-lg p-2 bg-white/20 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/80 mb-1">Imagen (opcional)</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white" />
                {imagen && <img src={URL.createObjectURL(imagen)} alt="preview" className="mt-2 h-32 object-contain rounded" />}
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">Guardar Cambios</button>
              <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold" onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BuscarEditarEliminarAnimal;
