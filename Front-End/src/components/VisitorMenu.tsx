import React from "react";
import { X, PawPrint, Heart, Users, HandHeart, Phone, Home, HelpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface VisitorMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function VisitorMenu({ open, onClose }: VisitorMenuProps) {
  if (!open) return null;
  return (
    <aside className="fixed top-0 left-0 h-screen w-80 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 shadow-2xl z-[100] flex flex-col text-white animate-slide-in">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
        <span className="text-lg font-bold">Menú</span>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-xs font-semibold text-white/70 mb-2">CONOCE A NUESTROS AMIGOS</h3>
          <ul className="space-y-2">
            <li><Link to="/perros-disponibles" className="flex items-center gap-2 hover:text-purple-200"><PawPrint className="w-4 h-4" />Perros Disponibles</Link></li>
            <li><Link to="/historias-exito" className="flex items-center gap-2 hover:text-purple-200"><Heart className="w-4 h-4" />Historias de Éxito</Link></li>
            <li><Link to="/proceso-adopcion" className="flex items-center gap-2 hover:text-purple-200"><Users className="w-4 h-4" />Proceso de Adopción</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white/70 mb-2">CÓMO PUEDES AYUDAR</h3>
          <ul className="space-y-2">
            <li><Link to="/donaciones" className="flex items-center gap-2 hover:text-purple-200"><HandHeart className="w-4 h-4" />Donaciones</Link></li>
            <li><Link to="/voluntariado" className="flex items-center gap-2 hover:text-purple-200"><Users className="w-4 h-4" />Voluntariado</Link></li>
            <li><Link to="/hogares-temporales" className="flex items-center gap-2 hover:text-purple-200"><Home className="w-4 h-4" />Hogares Temporales</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white/70 mb-2">CONTÁCTANOS</h3>
          <ul className="space-y-2">
            <li><Link to="/visitanos" className="flex items-center gap-2 hover:text-purple-200"><Home className="w-4 h-4" />Visítanos</Link></li>
            <li><Link to="/preguntas-frecuentes" className="flex items-center gap-2 hover:text-purple-200"><HelpCircle className="w-4 h-4" />Preguntas Frecuentes</Link></li>
            <li><Link to="/telefonos" className="flex items-center gap-2 hover:text-purple-200"><Phone className="w-4 h-4" />Teléfonos</Link></li>
            <li><Link to="/contact" className="flex items-center gap-2 hover:text-purple-200"><MessageCircle className="w-4 h-4" />Formulario de Contacto</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
