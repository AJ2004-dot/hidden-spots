"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Star, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample data for map markers
const mapSpots = [
  {
    id: 1,
    name: "Sunset Point at Gwalior Fort",
    vibe: "Romantic",
    rating: 4.8,
    latitude: 26.2295,
    longitude: 78.1773,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    name: "Hidden Garden Café",
    vibe: "Serene",
    rating: 4.6,
    latitude: 26.2124,
    longitude: 78.1772,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    name: "Artist's Corner at Phool Bagh",
    vibe: "Creative",
    rating: 4.5,
    latitude: 26.2183,
    longitude: 78.1821,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    name: "Riverside Meditation Spot",
    vibe: "Serene",
    rating: 4.7,
    latitude: 26.2089,
    longitude: 78.1654,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const vibeColors = {
  Romantic: "bg-pink-500",
  Serene: "bg-blue-500",
  Creative: "bg-purple-500",
}

export default function MapPage() {
  const [selectedSpot, setSelectedSpot] = useState<(typeof mapSpots)[0] | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Explore Map</h1>
              <p className="text-sm text-gray-600">Gwalior Hidden Spots</p>
            </div>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="relative">
        {/* Simulated Map Background */}
        <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Location Markers */}
          {mapSpots.map((spot, index) => (
            <div
              key={spot.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
              onClick={() => setSelectedSpot(spot)}
            >
              <div
                className={`w-6 h-6 rounded-full ${vibeColors[spot.vibe as keyof typeof vibeColors]} border-2 border-white shadow-lg flex items-center justify-center`}
              >
                <MapPin className="w-3 h-3 text-white" />
              </div>
              {selectedSpot?.id === spot.id && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white rounded-lg shadow-lg p-2 min-w-48">
                    <div className="flex gap-2">
                      <Image
                        src={spot.image || "/placeholder.svg"}
                        alt={spot.name}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{spot.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{spot.rating}</span>
                        </div>
                        <Badge className="text-xs mt-1" variant="secondary">
                          {spot.vibe}
                        </Badge>
                      </div>
                    </div>
                    <Link href={`/spot/${spot.id}`}>
                      <Button size="sm" className="w-full mt-2 text-xs">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current Location Indicator */}
          <div className="absolute bottom-4 right-4">
            <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="max-w-md mx-auto px-4 py-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Vibe Legend</h3>
            <div className="space-y-2">
              {Object.entries(vibeColors).map(([vibe, color]) => (
                <div key={vibe} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${color}`}></div>
                  <span className="text-sm">{vibe} Spots</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Spots List */}
      <div className="max-w-md mx-auto px-4 pb-24">
        <h3 className="font-semibold mb-3">Nearby Hidden Spots</h3>
        <div className="space-y-3">
          {mapSpots.map((spot) => (
            <Link key={spot.id} href={`/spot/${spot.id}`}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <Image
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.name}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{spot.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{spot.rating}</span>
                      </div>
                      <Badge className="text-xs mt-2" variant="secondary">
                        {spot.vibe}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
