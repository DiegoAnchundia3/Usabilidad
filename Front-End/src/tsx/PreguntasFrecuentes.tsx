import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "¿Cómo puedo adoptar un animal del refugio?",
    answer: "Debes completar el formulario de adopción, pasar una entrevista y cumplir con los requisitos establecidos por el refugio."
  },
  {
    question: "¿Cuáles son los requisitos para adoptar?",
    answer: "Ser mayor de edad, presentar identificación, demostrar capacidad para cuidar al animal y aceptar visitas de seguimiento."
  },
  {
    question: "¿Puedo visitar el refugio antes de adoptar?",
    answer: "Sí, puedes agendar una visita para conocer a los animales y recibir orientación del personal."
  },
  {
    question: "¿Qué incluye la adopción?",
    answer: "La adopción incluye vacunación, desparasitación, esterilización y asesoría post-adopción."
  },
  {
    question: "¿Cómo puedo ayudar al refugio si no puedo adoptar?",
    answer: "Puedes donar, ser voluntario, difundir información o apadrinar a un animal."
  },
  {
    question: "¿Qué hago si encuentro un animal abandonado?",
    answer: "Comunícate con el refugio para recibir orientación sobre el rescate y cuidado temporal."
  },
  {
    question: "¿Los animales están sanos y vacunados?",
    answer: "Sí, todos los animales pasan por revisión veterinaria y reciben las vacunas necesarias antes de ser dados en adopción."
  },
  {
    question: "¿Puedo devolver al animal si no me adapto?",
    answer: "El refugio ofrece apoyo y asesoría, pero se recomienda agotar todas las opciones antes de considerar la devolución."
  },
];

export default function PreguntasFrecuentes() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Preguntas Frecuentes</h1>
      <p className="text-lg text-gray-700 mb-8">Resuelve tus dudas sobre el refugio y el proceso de adopción.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-6">
          {faqs.map((faq, idx) => (
            <li key={idx} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-purple-700 mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
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
