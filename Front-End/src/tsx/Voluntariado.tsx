import { useNavigate } from "react-router-dom";

const volunteerInfo = [
  {
    title: "¿Quién puede ser voluntario?",
    content: "Cualquier persona mayor de edad, con amor por los animales y ganas de ayudar puede unirse al equipo de voluntarios."
  },
  {
    title: "¿Qué actividades realizan los voluntarios?",
    content: "Apoyo en limpieza, alimentación, paseos, socialización, campañas educativas, eventos y difusión en redes sociales."
  },
  {
    title: "¿Qué beneficios obtengo como voluntario?",
    content: "Aprendes sobre el cuidado animal, haces nuevos amigos, desarrollas habilidades y contribuyes a una causa noble."
  },
  {
    title: "¿Qué compromiso se espera?",
    content: "Se solicita responsabilidad, respeto y cumplir con los turnos o actividades asignadas. Puedes elegir horarios según tu disponibilidad."
  },
  {
    title: "¿Cómo puedo inscribirme?",
    content: "Completa el formulario de voluntariado en la web o acércate al refugio para recibir información y orientación."
  },
  {
    title: "¿Recibo capacitación?",
    content: "Sí, el refugio brinda capacitación inicial y acompañamiento durante tu voluntariado."
  },
];

export default function Voluntariado() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-purple-100 to-blue-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Voluntariado</h1>
      <p className="text-lg text-gray-700 mb-8">Únete como voluntario y ayuda a mejorar la vida de los animales.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-6">
          {volunteerInfo.map((info, idx) => (
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
