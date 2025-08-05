import { useNavigate } from "react-router-dom";

const historias = [
  {
    nombre: "Luna",
    historia: "Luna fue rescatada de la calle en estado de desnutrición. Tras recibir atención médica y mucho cariño, fue adoptada por una familia que la cuida y la ama. Ahora disfruta de un hogar cálido y seguro.",
    imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80"
  },
  {
    nombre: "Max",
    historia: "Max llegó al refugio tras ser abandonado. Su energía y alegría conquistaron a sus adoptantes, quienes le brindaron una segunda oportunidad. Hoy es el compañero inseparable de sus nuevos dueños.",
    imagen: "https://images.unsplash.com/photo-1518715308788-300e1e1e8d0b?auto=format&fit=crop&w=400&q=80"
  },
  {
    nombre: "Michi",
    historia: "Michi fue encontrado herido y asustado. Gracias al refugio, se recuperó y encontró una familia que lo cuida y le da amor. Ahora vive feliz y seguro, rodeado de cariño.",
    imagen: "https://images.unsplash.com/photo-1518715308788-300e1e1e8d0b?auto=format&fit=crop&w=400&q=80"
  },
  {
    nombre: "Bella",
    historia: "Bella fue rescatada junto a sus cachorros. Todos encontraron familias responsables y amorosas. Bella disfruta de paseos y juegos en su nuevo hogar.",
    imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80"
  },
  {
    nombre: "Zeus",
    historia: "Zeus fue víctima de maltrato, pero con paciencia y dedicación logró superar sus miedos. Hoy es un perro sociable y feliz, ejemplo de superación y amor.",
    imagen: "https://images.unsplash.com/photo-1518715308788-300e1e1e8d0b?auto=format&fit=crop&w=400&q=80"
  },
];

export default function HistoriasExito() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Historias de Éxito</h1>
      <p className="text-lg text-gray-700 mb-8">Conoce las historias de adopción y rescate que han cambiado vidas.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-8">
          {historias.map((h, idx) => (
            <li key={idx} className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 last:border-b-0">
              <img src={h.imagen} alt={h.nombre} className="w-32 h-32 object-cover rounded-full shadow" />
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{h.nombre}</h3>
                <p className="text-gray-700">{h.historia}</p>
              </div>
            </li>
          ))}
        </ul>
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
