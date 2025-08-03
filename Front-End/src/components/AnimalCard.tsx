import { Card, CardContent, CardTitle } from "./UI/card"
import { Button } from "./UI/button"
import { Heart, MapPin } from "lucide-react"
import type { Animal } from "../data/animals"

interface AnimalCardProps {
  animal: Animal
}


export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl bg-white/95 backdrop-blur-md border-white/20">
      <img src={animal.imageUrl || "/placeholder.svg"} alt={animal.name} className="w-full h-64 object-contain bg-white" />
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-bold text-gray-900">{animal.name}</CardTitle>
          <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 mb-4">
          <span>{animal.species}</span>
          <span>•</span>
          <span>{animal.breed}</span>
          <span>•</span>
          <span>{animal.age}</span>
        </div>
        <p className="text-gray-800 mb-4 line-clamp-3">{animal.description}</p>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 text-purple-600" />
          <span>{animal.location}</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  )
}
