import React from "react";
import { SideMenu } from "../components/SideMenu";

export default function AccessibilityDemoPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-500">
      <SideMenu />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">Demo Accesibilidad</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <p className="text-lg text-gray-700 mb-4">Prueba las funciones de accesibilidad del sistema, como alto contraste, lectura guiada y menú accesible.</p>
          <ul className="space-y-4">
            <li className="bg-indigo-50 p-4 rounded-lg shadow flex flex-col">
              <span className="font-bold text-indigo-700">Modo Alto Contraste</span>
              <span className="text-gray-600">Activa/desactiva el modo para mejorar la visibilidad.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
