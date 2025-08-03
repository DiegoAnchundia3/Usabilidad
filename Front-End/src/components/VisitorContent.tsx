"use client"
import { Card, CardContent } from "./UI/card"
import { Button } from "./UI/button"
import { Heart, Calendar, MapPin, MessageCircle, ArrowRight, Phone, HandHeart } from "lucide-react"
import Mapa from "./UI/Mapa" // Importa tu componente Mapa

export function VisitorContent() {
  const adoptedAnimals = [
    {
      name: "Baxter",
      age: "2 años",
      breed: "French Poodle",
      description:
        "Baxter encontró una familia que lo ama incondicionalmente. Ahora disfruta de largas caminatas y una cama cálida.",
      image:"/img/misperros/baxtersonriente.jpg", // Ruta img para Baxter
      url: "/adopted/baxter",
    },
    {
      name: "Lucero",
      age: "1 año",
      breed: "Dalmata",
      description:
        "Lucero fue encontrado desnutrido y enfermo. Ahora es una perra feliz y saludable que disfruta cada día.",
      image: "/img/misperros/tommyasomado.jpg", // Ruta img para Lucero
      url: "/adopted/lucero",
    },
    {
      name: "Tommy", 
      age: "3 años",
      breed: "Dalmata",
      description: "Tommy, un dalmata juguetón y cariñoso, encontró su hogar ideal donde es amado y cuidado.",
      image:  "/img/misperros/tommyrelajado.jpg", // Ruta img para Tommy
      url: "/adopted/tommy",
    },
  ]

  const successStories = [
    {
      title: "La nueva vida de Toby",
      content:
        "Después de 8 meses en nuestro refugio, Toby encontró una familia que lo ama incondicionalmente. Ahora disfruta de largas caminatas en el parque y dormir en una cama cálida cada noche.",
      image: "/img/perrosgoogle/Toby.jpg",
    },
    {
      title: "Bella: de la calle al hogar",
      content:
        "Bella fue encontrada desnutrida y enferma. Gracias a nuestros cuidados y al amor de su nueva familia, ahora es una perra feliz y saludable que disfruta cada día al máximo.",
      image: "/img/perrosgoogle/Bella.avif",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 mb-12 shadow-lg border border-white/20 animate-fade-in-up">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/img/gatosYperrosinicio.webp"
            alt="Perros y Gatos"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-6 filter drop-shadow-[0_0_20px_rgba(128,0,128,0.4)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cada Patita de Gatito y Perrito Merece un Hogar Lleno de{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Amor</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            En Refugio de Animales “Diamantito de esperanza” rescatamos, cuidamos y encontramos hogares amorosos para gatitos y perritos abandonados.
            Cada historia importa, cada vida es valiosa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
              Conoce a Nuestros Animales
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent">
              Cómo Adoptar
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Dogs */}
      <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Animales Adoptados Recientemente</h2>{" "}
          {/* Changed text-white to text-gray-900 */}
          <Button variant="link" className="text-black hover:text-purple-200 flex items-center gap-1">
            Ver más historias <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptedAnimals.map((animal, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-white/95 backdrop-blur-md border-white/20"
            >
              <img src={animal.image || "/placeholder.svg"} alt={animal.name} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900 text-shadow-sm">{animal.name}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex gap-4 text-sm text-gray-700 mb-4 text-shadow-xs">
                  <span>{animal.age}</span>
                  <span>•</span>
                  <span>{animal.breed}</span>
                </div>
                <p className="text-gray-800 mb-4 text-shadow-xs">{animal.description}</p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
                  Ver historia
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Historias de Éxito</h2>{" "}
        {/* Changed text-white to text-gray-900 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-white/95 backdrop-blur-md border-white/20"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                />
                <CardContent className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.content}</p>
                  <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 h-auto">
                    Leer historia completa
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* How You Can Help */}
      <div
        className="bg-white/95 backdrop-blur-md rounded-xl p-8 mb-16 shadow-lg border border-white/20 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Cómo Puedes Ayudar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adopta</h3>
              <p className="text-gray-600 mb-4">
                Brinda un hogar amoroso a un gatito o perrito que lo necesita y cambia dos vidas para siempre.
              </p>
              <Button variant="link" className="text-purple-600 hover:text-purple-700">
                Proceso de adopción
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voluntariado</h3>
              <p className="text-gray-600 mb-4">
                Dona tu tiempo y cariño. Los gatitos y perritos necesitan paseos, juegos y socialización.
              </p>
              <Button variant="link" className="text-purple-600 hover:text-purple-700">
                Únete como voluntario
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibont text-gray-900 mb-2">Dona</h3>
              <p className="text-gray-600 mb-4">
                Tus donaciones nos ayudan a proporcionar alimento, atención médica y refugio.
              </p>
              <Button variant="link" className="text-purple-600 hover:text-purple-700">
                Hacer una donación
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visit Us - Google Map Integration */}
      <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
        <Card className="bg-white/95 backdrop-blur-md border-white/20 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visítanos</h2>
                <p className="text-gray-600 mb-6">
                  Te invitamos a conocer nuestro refugio y a todos los perros que esperan encontrar un hogar. Nuestro
                  equipo estará encantado de mostrarte las instalaciones y responder todas tus preguntas.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Dirección</p>
                      <p className="text-gray-600">Av. Principal #123, Ciudad</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Horario</p>
                      <p className="text-gray-600">Lunes a Sábado: 10:00 - 18:00</p>
                      <p className="text-gray-600">Domingo: 10:00 - 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Teléfono</p>
                      <p className="text-gray-600">(123) 456-7890</p>
                    </div>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
                  Agendar una visita
                </Button>
              </div>
              <div className="h-64 md:h-auto bg-gradient-to-br from-purple-100 to-blue-100">
                {/* Aquí es donde renderizamos tu componente Mapa */}
                <Mapa />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter */}
      <div
        className="bg-white/95 backdrop-blur-md rounded-xl p-8 text-center shadow-lg border border-white/20 animate-fade-in-up"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mantente Informado</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Suscríbete a nuestro boletín para recibir noticias sobre nuevos gatitos y perritos disponibles, historias de
          éxito y consejos para el cuidado de tu mascota.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="px-4 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
            Suscribirse
          </Button>
        </div>
      </div>
    </main>
  )
}
