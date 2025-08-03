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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">Registrar Nueva Mascota</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-1">Nombre *</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required className="w-full rounded-lg p-2 bg-white/20 text-white" />
          </div>
          <div>
            <label className="block text-white/80 mb-1">Especie *</label>
            <select value={especie} onChange={e => setEspecie(e.target.value)} required className="w-full rounded-lg p-2 bg-white/20 text-white">
              <option value="">Selecciona</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 mb-1">Edad *</label>
            <input type="text" value={edad} onChange={e => setEdad(e.target.value)} required className="w-full rounded-lg p-2 bg-white/20 text-white" />
          </div>
          <div>
            <label className="block text-white/80 mb-1">Estado *</label>
            <select value={estado} onChange={e => setEstado(e.target.value)} required className="w-full rounded-lg p-2 bg-white/20 text-white">
              <option value="">Selecciona</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/80 mb-1">Información o Historia</label>
            <textarea value={historia} onChange={e => setHistoria(e.target.value)} rows={4} className="w-full rounded-lg p-2 bg-white/20 text-white resize-none" placeholder="Comparte información relevante, historia o detalles de la mascota (opcional)"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/80 mb-1">Imagen (opcional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white" />
            {imagen && <img src={URL.createObjectURL(imagen)} alt="preview" className="mt-2 h-32 object-contain rounded" />}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">Guardar</button>
          <button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold" onClick={() => navigate("/animals/edit")}>Modificar o Eliminar</button>
        </div>
        {mensaje && <div className="text-green-300 mt-2">{mensaje}</div>}
      </form>
    </div>
  );
};

export default AnimalForm;
