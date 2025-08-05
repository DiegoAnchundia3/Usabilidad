import React from "react";
import { SideMenu } from "../components/SideMenu";

export default function AdoptionsPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-100 via-purple-300 to-purple-500">
      <SideMenu />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-6">Gestión de Adopciones</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <p className="text-lg text-gray-700 mb-4">Aquí puedes ver y gestionar las solicitudes de adopción, aprobar o rechazar solicitudes y ver el historial de adopciones.</p>
          <ul className="space-y-4">
            <li className="bg-purple-50 p-4 rounded-lg shadow flex flex-col">
              <span className="font-bold text-purple-700">Luna</span>
              <span className="text-gray-600">Adoptante: Familia García</span>
              <span className="text-gray-500 text-sm">Estado: Completada</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
