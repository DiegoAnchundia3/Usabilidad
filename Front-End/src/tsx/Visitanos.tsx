import { useNavigate } from "react-router-dom";

const visitInfo = [
  {
    title: "Dirección",
    content: "Av. Principal y Calle Secundaria, Ciudad Refugio, Ecuador."
  },
  {
    title: "Horarios de atención",
    content: "Lunes a viernes: 09:00 - 17:00 | Sábados: 10:00 - 14:00 | Domingos y feriados: cerrado."
  },
  {
    title: "¿Qué puedes hacer durante la visita?",
    content: "Conocer a los animales, recibir información sobre adopciones, participar en actividades educativas y colaborar como voluntario."
  },
  {
    title: "Recomendaciones para tu visita",
    content: "Trae ropa cómoda, sigue las indicaciones del personal, respeta a los animales y pregunta cualquier duda que tengas."
  },
  {
    title: "¿Necesito agendar mi visita?",
    content: "No es obligatorio, pero se recomienda agendar para recibir atención personalizada. Puedes hacerlo llamando al refugio o por nuestro formulario de contacto."
  },
];

export default function Visitanos() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Visítanos</h1>
      <p className="text-lg text-gray-700 mb-8">Ven a conocer el refugio y a nuestros animales.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-6">
          {visitInfo.map((info, idx) => (
            <li key={idx} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-purple-700 mb-2">{info.title}</h3>
              <p className="text-gray-700">{info.content}</p>
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
