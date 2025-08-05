import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Revisión de requisitos",
    description: "Verificamos que cumplas con los requisitos básicos para adoptar, como ser mayor de edad y tener un entorno adecuado para el animal."
  },
  {
    title: "Solicitud de adopción",
    description: "Completa el formulario de adopción con tus datos y preferencias. Esto nos ayuda a encontrar el animal ideal para ti."
  },
  {
    title: "Entrevista y visita",
    description: "Realizamos una entrevista y puedes visitar el refugio para conocer a los animales y resolver tus dudas."
  },
  {
    title: "Firma de acuerdo",
    description: "Si todo está en orden, firmas un acuerdo de adopción donde te comprometes al bienestar del animal."
  },
  {
    title: "Entrega del animal",
    description: "Coordinamos la entrega del animal y te brindamos recomendaciones para su adaptación en el nuevo hogar."
  },
  {
    title: "Seguimiento post-adopción",
    description: "Realizamos visitas o llamadas de seguimiento para asegurarnos de que el animal se adapta bien y resolver cualquier inquietud."
  },
];

export default function ProcesoAdopcion() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Proceso de Adopción</h1>
      <p className="text-lg text-gray-700 mb-8">Infórmate sobre los pasos para adoptar un animal en nuestro refugio.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ol className="list-decimal pl-6 space-y-4">
          {steps.map((step, idx) => (
            <li key={idx}>
              <span className="font-semibold text-purple-700">{step.title}</span>
              <p className="text-gray-700 ml-2">{step.description}</p>
            </li>
          ))}
        </ol>
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
