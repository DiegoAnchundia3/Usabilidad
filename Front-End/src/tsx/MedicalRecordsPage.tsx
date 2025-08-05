import React from "react";
import { SideMenu } from "../components/SideMenu";

export default function MedicalRecordsPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <SideMenu />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Registros Médicos</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <p className="text-lg text-gray-700 mb-4">Consulta y gestiona los registros médicos de los animales del refugio.</p>
          <ul className="space-y-4">
            <li className="bg-blue-50 p-4 rounded-lg shadow flex flex-col">
              <span className="font-bold text-blue-700">Max</span>
              <span className="text-gray-600">Diagnóstico: Animal en buen estado general</span>
              <span className="text-gray-500 text-sm">Próxima visita: 01/10/2024</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
