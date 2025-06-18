"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star, MapPin, Heart, Share2, MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Sample spot data
const spotData = {
  1: {
    id: 1,
    name: "Sunset Point at Gwalior Fort",
    description:
      "A secluded corner of the fort with breathtaking sunset views, perfect for romantic moments. This hidden gem offers panoramic views of the city below and is especially magical during golden hour.",
    vibe: "Romantic",
    rating: 4.8,
    uniqueness: 4.9,
    safety: 4.7,
    crowdLevel: 2.1,
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Gwalior Fort, Gwalior",
    coordinates: "26.2295°N, 78.1773°E",
    bestTime: "5:30 PM - 7:00 PM",
    tips: [
      "Visit during sunset for the best experience",
      "Bring a camera for stunning photos",
      "Wear comfortable shoes for the climb",
    ],
    stories: [
      {
        id: 1,
        author: "Anonymous",
        content:
          "Proposed to my girlfriend here last month. The sunset was perfect and she said yes! This place will always be special to us.",
        likes: 24,
        date: "2 weeks ago",
      },
      {
        id: 2,
        author: "Priya S.",
        content:
          "Found this spot by accident while exploring the fort. Now it's my go-to place for peaceful evenings and reflection.",
        likes: 18,
        date: "1 month ago",
      },
    ],
  },
  2: {
    id: 2,
    name: "Hidden Garden Café",
    description:
      "A cozy café tucked away in Lashkar area, known for its peaceful ambiance and local art. The perfect spot for intimate conversations and creative inspiration.",
    vibe: "Serene",
    rating: 4.6,
    uniqueness: 4.4,
    safety: 4.8,
    crowdLevel: 1.8,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    location: "Lashkar, Gwalior",
    coordinates: "26.2124°N, 78.1772°E",
    bestTime: "9:00 AM - 11:00 AM, 4:00 PM - 6:00 PM",
    tips: ["Try their special masala chai", "Perfect for reading or working", "Local artists often display work here"],
    stories: [
      {
        id: 1,
        author: "Rahul M.",
        content:
          "This café has become my second home. The owner is incredibly welcoming and the atmosphere is perfect for writing.",
        likes: 15,
        date: "3 days ago",
      },
    ],
  },
}

const vibeColors = {
  Romantic: "bg-pink-100 text-pink-800",
  Serene: "bg-blue-100 text-blue-800",
  Creative: "bg-purple-100 text-purple-800",
}

export default function SpotDetailPage() {
  const params = useParams()
  const spotId = params.id as string
  const spot = spotData[spotId as keyof typeof spotData]
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  if (!spot) {
    return <div>Spot not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-md mx-auto">
        {/* Image Gallery */}
        <div className="relative">
          <Image
            src={spot.images[0] || "/placeholder.svg"}
            alt={spot.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
          <Badge className={`absolute top-4 left-4 ${vibeColors[spot.vibe as keyof typeof vibeColors]}`}>
            {spot.vibe}
          </Badge>
          {spot.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              1/{spot.images.length}
            </div>
          )}
        </div>

        {/* Spot Info */}
        <div className="px-4 py-4 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{spot.name}</h1>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{spot.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{spot.location}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{spot.description}</p>
          </div>

          {/* Ratings Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{spot.uniqueness}</div>
                  <div className="text-sm text-gray-600">Uniqueness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{spot.safety}</div>
                  <div className="text-sm text-gray-600">Safety</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{spot.crowdLevel}</div>
                  <div className="text-sm text-gray-600">Crowd Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{spot.rating}</div>
                  <div className="text-sm text-gray-600">Overall</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details & Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900">Best Time to Visit</h4>
                <p className="text-sm text-gray-600">{spot.bestTime}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Coordinates</h4>
                <p className="text-sm text-gray-600">{spot.coordinates}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Community Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {spot.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Stories & Experiences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Stories & Experiences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {spot.stories.map((story) => (
                <div key={story.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{story.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{story.author}</span>
                        <span className="text-xs text-gray-500">{story.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{story.content}</p>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          <span className="text-xs">{story.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Comment */}
              <div className="pt-4">
                <Textarea
                  placeholder="Share your experience at this spot..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Post anonymously or with your name</span>
                  <Button size="sm">Post Story</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="h-20"></div> {/* Bottom padding */}
    </div>
  )
}
