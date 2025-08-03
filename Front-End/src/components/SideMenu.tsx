import { Button } from "./UI/button"
import { X, Heart, PawPrint, Info, MessageCircle, HandHeart, Calendar, MapPin, Phone } from "lucide-react"
// Importar Link de react-router-dom
import { Link } from "react-router-dom"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  if (!isOpen) return null

  const menuSections = [
    {
      title: "Conoce a Nuestros Amigos",
      items: [
        { name: "Perros Disponibles", icon: PawPrint, href: "/dogs" },
        { name: "Historias de Éxito", icon: Heart, href: "/success-stories" },
        { name: "Proceso de Adopción", icon: Info, href: "/adoption-process" },
      ],
    },
    {
      title: "Cómo Puedes Ayudar",
      items: [
        { name: "Donaciones", icon: HandHeart, href: "/donations" },
        { name: "Voluntariado", icon: Calendar, href: "/volunteer" },
        { name: "Hogares Temporales", icon: MapPin, href: "/foster" },
      ],
    },
    {
      title: "Contáctanos",
      items: [
        { name: "Visítanos", icon: MapPin, href: "/visit" },
        { name: "Preguntas Frecuentes", icon: MessageCircle, href: "/faq" },
        { name: "Teléfonos", icon: Phone, href: "/contact" },
        { name: "Formulario de Contacto", icon: MessageCircle, href: "/contact" },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full max-w-xs h-full bg-white shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-500 to-blue-600">
          <h2 className="text-xl font-semibold text-white">Menú</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          {menuSections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    onClick={onClose} // Cerrar el menú al hacer clic en el enlace
                    className="w-full justify-start h-auto py-2 text-left hover:bg-purple-50 flex items-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <item.icon className="h-4 w-4 mr-3 text-purple-600" />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
