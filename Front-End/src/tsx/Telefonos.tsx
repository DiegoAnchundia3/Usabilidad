import { useNavigate } from "react-router-dom";

const contactPhones = [
  { name: "Refugio Principal", phone: "099-123-4567" },
  { name: "Adopciones", phone: "098-765-4321" },
  { name: "Emergencias", phone: "096-555-8888" },
];

export default function Telefonos() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Teléfonos</h1>
      <p className="text-lg text-gray-700 mb-8">Contacta al refugio por teléfono para más información.</p>
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mb-6">
        <ul className="space-y-6">
          {contactPhones.map((contact, idx) => (
            <li key={idx} className="flex flex-col items-center">
              <span className="font-medium text-gray-800">{contact.name}</span>
              <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">{contact.phone}</a>
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
