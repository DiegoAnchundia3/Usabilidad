
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const perros = [
  {
    nombre: "Baxter",
    edad: 2,
    raza: "French Poodle",
    historia: "Baxter encontró una familia que lo ama incondicionalmente. Ahora disfruta de largas caminatas y una cama cálida.",
    imagen: "/public/img/misperros/baxtersonriente.jpg"
  },
  {
    nombre: "Lucero",
    edad: 1,
    raza: "Dálmata",
    historia: "Lucero fue encontrado desnutrido y enfermo. Ahora es una perra feliz y saludable que disfruta cada día.",
    imagen: "/public/img/misperros/bebemichi.jpg"
  },
  {
    nombre: "Tommy",
    edad: 3,
    raza: "Dálmata",
    historia: "Tommy, un dálmata juguetón y cariñoso, encontró su hogar ideal donde es amado y cuidado.",
    imagen: "/public/img/misperros/tommyrelajado.jpg"
  },
];

export default function PerrosDisponibles() {
  const [modal, setModal] = useState<{open: boolean, perro: typeof perros[0] | null}>({open: false, perro: null});
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 py-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Perros Disponibles</h1>
      <p className="text-lg text-gray-700 mb-8">Aquí puedes ver todos los perros que están disponibles para adopción en el refugio.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {perros.map((perro, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src={perro.imagen} alt={perro.nombre} className="w-40 h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-1">{perro.nombre}</h2>
            <p className="text-gray-600 mb-1">{perro.edad} años &bull; {perro.raza}</p>
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-2 px-6 rounded mt-4 w-full"
              onClick={() => setModal({open: true, perro})}
            >
              Ver historia
            </button>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la historia */}
      {modal.open && modal.perro && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-purple-700 text-2xl"
              onClick={() => setModal({open: false, perro: null})}
            >
              &times;
            </button>
            <img src={modal.perro.imagen} alt={modal.perro.nombre} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">{modal.perro.nombre}</h2>
            <p className="text-gray-600 text-center mb-2">{modal.perro.edad} años &bull; {modal.perro.raza}</p>
            <p className="text-gray-700 text-center">{modal.perro.historia}</p>
          </div>
        </div>
      )}
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow mt-10"
        onClick={() => navigate("/")}
      >
        Regresar al inicio
      </button>
    </div>
  );
}
