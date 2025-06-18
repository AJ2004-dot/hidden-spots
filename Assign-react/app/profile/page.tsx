"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Heart, Star, Settings, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const userStats = {
  spotsDiscovered: 12,
  storiesShared: 8,
  likesReceived: 156,
  savedSpots: 24,
}

const userSpots = [
  {
    id: 1,
    name: "Sunset Point at Gwalior Fort",
    image: "/placeholder.svg?height=150&width=200",
    vibe: "Romantic",
    rating: 4.8,
    likes: 24,
    dateAdded: "2 weeks ago",
  },
  {
    id: 2,
    name: "Hidden Garden Café",
    image: "/placeholder.svg?height=150&width=200",
    vibe: "Serene",
    rating: 4.6,
    likes: 18,
    dateAdded: "1 month ago",
  },
]

const savedSpots = [
  {
    id: 3,
    name: "Artist's Corner at Phool Bagh",
    image: "/placeholder.svg?height=150&width=200",
    vibe: "Creative",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Riverside Meditation Spot",
    image: "/placeholder.svg?height=150&width=200",
    vibe: "Serene",
    rating: 4.7,
  },
]

const vibeColors = {
  Romantic: "bg-pink-100 text-pink-800",
  Serene: "bg-blue-100 text-blue-800",
  Creative: "bg-purple-100 text-purple-800",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Profile</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="text-lg">PS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">Priya S.</h2>
            <p className="text-gray-600 mb-4">Hidden Spots Explorer</p>
            <div className="flex justify-center gap-2">
              <Button size="sm">Edit Profile</Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.spotsDiscovered}</div>
                <div className="text-sm text-gray-600">Spots Discovered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.storiesShared}</div>
                <div className="text-sm text-gray-600">Stories Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{userStats.likesReceived}</div>
                <div className="text-sm text-gray-600">Likes Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.savedSpots}</div>
                <div className="text-sm text-gray-600">Saved Spots</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Spots */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              My Hidden Spots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userSpots.map((spot) => (
              <Link key={spot.id} href={`/spot/${spot.id}`}>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Image
                    src={spot.image || "/placeholder.svg"}
                    alt={spot.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{spot.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${vibeColors[spot.vibe as keyof typeof vibeColors]}`}>
                        {spot.vibe}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{spot.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{spot.dateAdded}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs">{spot.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/add-spot">
              <Button variant="outline" className="w-full">
                Add New Spot
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Saved Spots */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Saved Spots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedSpots.map((spot) => (
              <Link key={spot.id} href={`/spot/${spot.id}`}>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Image
                    src={spot.image || "/placeholder.svg"}
                    alt={spot.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{spot.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${vibeColors[spot.vibe as keyof typeof vibeColors]}`}>
                        {spot.vibe}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{spot.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="h-20"></div> {/* Bottom padding */}
    </div>
  )
}
