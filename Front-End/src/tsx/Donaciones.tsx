import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Donaciones() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", monto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-purple-100 to-blue-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Donaciones</h1>
      <p className="text-lg text-gray-700 mb-8">Apoya nuestro refugio con tu donación. ¡Cada aporte cuenta!</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        {enviado ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">¡Gracias por tu donación!</h2>
            <p className="text-gray-700">Tu aporte ayuda a mejorar la vida de muchos animales.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-purple-700 font-medium mb-2" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-2" htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-2" htmlFor="monto">Monto (USD)</label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={form.monto}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-2" htmlFor="mensaje">Mensaje (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow w-full"
            >
              Donar
            </button>
          </form>
        )}
      </div>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow"
        onClick={() => navigate("/")}
      >
        Regresar al inicio
      </button>
    </div>
  );
}
