import { Button } from "./UI/button"
import { X, Menu, Heart, PawPrint, Info, MessageCircle, HandHeart, Calendar, MapPin, Phone, Home } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const menuSections = [
    {
      title: "Panel de Administración",
      items: [
        { name: "Dashboard", icon: Info, href: "/dashboard" },
        { name: "Usuarios", icon: HandHeart, href: "/admin/users" },
        {
          name: "Animales",
          icon: PawPrint,
          children: [
            { name: "Registrar Animal", icon: Heart, href: "/animals/new" },
          ],
        },
        { name: "Adopciones", icon: Calendar, href: "/adoptions" },
        { name: "Registros Médicos", icon: MessageCircle, href: "/medical" },
        { name: "Inventario", icon: MapPin, href: "/inventory" },
        { name: "Donaciones", icon: HandHeart, href: "/donations" },
      ],
    },
    {
      title: "Accesibilidad",
      items: [
        { name: "Demo Accesibilidad", icon: Info, href: "/accessibility-demo" },
      ],
    },
    {
      title: "Cuenta",
      items: [
  { name: "Inicio", icon: Home, href: "/inicio" },
      ],
    },
  ];

  return (
    <>
      {/* Botón para mostrar/ocultar menú */}
      <button
        className="fixed top-4 left-4 z-[100] bg-purple-900 text-white rounded-full p-2 shadow-lg hover:bg-purple-700 transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Ocultar menú" : "Mostrar menú"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {/* Menú lateral */}
      {isOpen && (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 shadow-xl z-50 flex flex-col border-r border-white/20">
          <div className="flex items-center justify-center py-8 border-b border-white/10">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="ml-3 text-2xl font-bold text-white">RefugioApp</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-6">
            {menuSections.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-semibold text-white/70 text-xs uppercase tracking-wide mb-3">{section.title}</h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    item.children ? (
                      <div key={itemIndex} className="group">
                        <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white font-medium cursor-pointer">
                          <item.icon className="h-5 w-5 text-purple-300" />
                          <span>{item.name}</span>
                        </div>
                        <div className="ml-8 space-y-1">
                          {item.children.map((child, childIdx) => (
                            <Link
                              key={childIdx}
                              to={child.href}
                              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-white/70 hover:bg-white/10 hover:text-white font-medium"
                            >
                              <child.icon className="h-4 w-4 text-purple-200" />
                              <span>{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={itemIndex}
                        to={item.href}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white font-medium"
                      >
                        <item.icon className="h-5 w-5 text-purple-300" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
      )}
    </>
  )
}
