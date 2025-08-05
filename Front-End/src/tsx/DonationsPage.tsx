import React from "react";
import { SideMenu } from "../components/SideMenu";

export default function DonationsPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
      <SideMenu />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-yellow-900 mb-6">Donaciones</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <p className="text-lg text-gray-700 mb-4">Visualiza y gestiona las donaciones recibidas por el refugio.</p>
          <ul className="space-y-4">
            <li className="bg-yellow-50 p-4 rounded-lg shadow flex flex-col">
              <span className="font-bold text-yellow-700">Juan Pérez</span>
              <span className="text-gray-600">Monto: $100.00</span>
              <span className="text-gray-500 text-sm">Destino: Medicamentos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
