"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Heart, Star, Users, Camera, Search, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample data for Gwalior hidden spots
const hiddenSpots = [
  {
    id: 1,
    name: "Sunset Point at Gwalior Fort",
    description: "A secluded corner of the fort with breathtaking sunset views, perfect for romantic moments",
    vibe: "Romantic",
    latitude: 26.2295,
    longitude: 78.1773,
    rating: 4.8,
    uniqueness: 4.9,
    safety: 4.7,
    crowdLevel: 2.1,
    images: ["/placeholder.svg?height=200&width=300"],
    stories: 3,
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "Hidden Garden Café",
    description: "A cozy café tucked away in Lashkar area, known for its peaceful ambiance and local art",
    vibe: "Serene",
    latitude: 26.2124,
    longitude: 78.1772,
    rating: 4.6,
    uniqueness: 4.4,
    safety: 4.8,
    crowdLevel: 1.8,
    images: ["/placeholder.svg?height=200&width=300"],
    stories: 7,
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "Artist's Corner at Phool Bagh",
    description: "A creative space where local artists gather, surrounded by beautiful gardens",
    vibe: "Creative",
    latitude: 26.2183,
    longitude: 78.1821,
    rating: 4.5,
    uniqueness: 4.6,
    safety: 4.5,
    crowdLevel: 2.3,
    images: ["/placeholder.svg?height=200&width=300"],
    stories: 5,
    distance: "2.1 km",
  },
  {
    id: 4,
    name: "Riverside Meditation Spot",
    description: "A peaceful spot along the river, perfect for solo reflection and morning meditation",
    vibe: "Serene",
    latitude: 26.2089,
    longitude: 78.1654,
    rating: 4.7,
    uniqueness: 4.3,
    safety: 4.6,
    crowdLevel: 1.5,
    images: ["/placeholder.svg?height=200&width=300"],
    stories: 4,
    distance: "3.0 km",
  },
]

const vibeColors = {
  Romantic: "bg-pink-100 text-pink-800",
  Serene: "bg-blue-100 text-blue-800",
  Creative: "bg-purple-100 text-purple-800",
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)
  const [filteredSpots, setFilteredSpots] = useState(hiddenSpots)

  useEffect(() => {
    let filtered = hiddenSpots

    if (searchQuery) {
      filtered = filtered.filter(
        (spot) =>
          spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedVibe) {
      filtered = filtered.filter((spot) => spot.vibe === selectedVibe)
    }

    setFilteredSpots(filtered)
  }, [searchQuery, selectedVibe])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hidden Spots</h1>
              <p className="text-sm text-gray-600">Gwalior, Madhya Pradesh</p>
            </div>
            <Link href="/add-spot">
              <Button size="sm" className="rounded-full">
                <Plus className="w-4 h-4 mr-1" />
                Add Spot
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Search and Filter */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search hidden spots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedVibe === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedVibe(null)}
            className="whitespace-nowrap"
          >
            All Vibes
          </Button>
          {["Romantic", "Serene", "Creative"].map((vibe) => (
            <Button
              key={vibe}
              variant={selectedVibe === vibe ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedVibe(vibe)}
              className="whitespace-nowrap"
            >
              {vibe}
            </Button>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/map">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Explore Map</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/discover">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Heart className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                <p className="text-sm font-medium">Discover Feed</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      {/* Hidden Spots List */}
      <div className="max-w-md mx-auto px-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Nearby Hidden Spots</h2>

        {filteredSpots.map((spot) => (
          <Link key={spot.id} href={`/spot/${spot.id}`}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={spot.images[0] || "/placeholder.svg"}
                    alt={spot.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-3 left-3 ${vibeColors[spot.vibe as keyof typeof vibeColors]}`}>
                    {spot.vibe}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {spot.distance}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{spot.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{spot.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{spot.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">{spot.stories} stories</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-500">Uniqueness</div>
                      <div className="font-medium">{spot.uniqueness}/5</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Safety</div>
                      <div className="font-medium">{spot.safety}/5</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Crowd</div>
                      <div className="font-medium">{spot.crowdLevel}/5</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center py-2 text-blue-600">
              <MapPin className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/map" className="flex flex-col items-center py-2 text-gray-500">
              <Search className="w-5 h-5" />
              <span className="text-xs mt-1">Map</span>
            </Link>
            <Link href="/add-spot" className="flex flex-col items-center py-2 text-gray-500">
              <Plus className="w-5 h-5" />
              <span className="text-xs mt-1">Add</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center py-2 text-gray-500">
              <Users className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-20"></div> {/* Bottom padding for fixed nav */}
    </div>
  )
}
