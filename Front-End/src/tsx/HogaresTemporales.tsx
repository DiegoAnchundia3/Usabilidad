import { useNavigate } from "react-router-dom";

const tempHomeInfo = [
  {
    title: "¿Qué es un hogar temporal?",
    content: "Un hogar temporal brinda refugio, cuidado y cariño a un animal rescatado mientras encuentra una familia definitiva."
  },
  {
    title: "¿Quién puede ser hogar temporal?",
    content: "Cualquier persona mayor de edad, responsable y con disposición para cuidar a un animal por un periodo limitado."
  },
  {
    title: "¿Cuánto tiempo dura el hogar temporal?",
    content: "El tiempo varía según el caso, puede ser desde unos días hasta varios meses, dependiendo de la adopción o recuperación del animal."
  },
  {
    title: "¿Qué apoyo brinda el refugio?",
    content: "El refugio proporciona alimento, atención veterinaria y asesoría durante todo el proceso."
  },
  {
    title: "¿Qué responsabilidades tengo como hogar temporal?",
    content: "Ofrecer un ambiente seguro, alimentación, cuidados básicos y reportar cualquier novedad al refugio."
  },
  {
    title: "¿Cómo puedo postularme?",
    content: "Completa el formulario de hogar temporal en nuestra web o comunícate directamente con el refugio."
  },
];

export default function HogaresTemporales() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Hogares Temporales</h1>
      <p className="text-lg text-gray-700 mb-8">Descubre cómo puedes ser hogar temporal para un animal rescatado.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-6">
          {tempHomeInfo.map((info, idx) => (
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
