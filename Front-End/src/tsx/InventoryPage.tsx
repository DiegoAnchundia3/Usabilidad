import React from "react";
import { SideMenu } from "../components/SideMenu";

export default function InventoryPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-green-300 to-green-500">
      <SideMenu />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-green-900 mb-6">Inventario</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <p className="text-lg text-gray-700 mb-4">Gestiona el inventario de alimentos, medicinas y suministros del refugio.</p>
          <ul className="space-y-4">
            <li className="bg-green-50 p-4 rounded-lg shadow flex flex-col">
              <span className="font-bold text-green-700">Alimento para perros</span>
              <span className="text-gray-600">Cantidad: 50kg</span>
              <span className="text-gray-500 text-sm">Proveedor: Pet Food Co.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
