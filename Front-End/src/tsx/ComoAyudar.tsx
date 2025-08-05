
import { Button } from "../components/UI/button";
import { useNavigate } from "react-router-dom";

export default function ComoAyudar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">¿Cómo ayudar?</h1>
      <p className="text-lg mb-8 text-center">Puedes ayudar de diferentes maneras:</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button className="w-full" onClick={() => navigate("/donaciones")}>Donar</Button>
        <Button className="w-full" onClick={() => navigate("/voluntariado")}>Voluntariado</Button>
        <Button className="w-full" onClick={() => navigate("/proceso-adopcion")}>Adoptar</Button>
        <Button className="w-full" onClick={() => navigate("/preguntas-frecuentes")}>Preguntas frecuentes</Button>
        <Button className="w-full" onClick={() => navigate("/telefonos")}>Telefonosr</Button>
      </div>
      <Button className="mt-8 w-full max-w-xs bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => navigate("/inicio")}>Regresar al inicio</Button>
    </div>
  );
}
