"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, MessageCircle, Share2, Star, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const discoveryFeed = [
  {
    id: 1,
    type: "new_spot",
    user: "Priya S.",
    userAvatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "2 hours ago",
    spot: {
      id: 1,
      name: "Sunset Point at Gwalior Fort",
      image: "/placeholder.svg?height=200&width=300",
      vibe: "Romantic",
      rating: 4.8,
    },
    content:
      "Just discovered this incredible sunset spot at the fort! The view is absolutely breathtaking and perfect for romantic evenings.",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    type: "story",
    user: "Anonymous",
    userAvatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "5 hours ago",
    spot: {
      id: 2,
      name: "Hidden Garden Café",
      image: "/placeholder.svg?height=200&width=300",
      vibe: "Serene",
      rating: 4.6,
    },
    content:
      "Had the most peaceful morning here with my book and their amazing masala chai. The garden setting is so calming and the local art on the walls adds such character.",
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    type: "recommendation",
    user: "Rahul M.",
    userAvatar: "/placeholder.svg?height=40&width=40",
    timeAgo: "1 day ago",
    spot: {
      id: 3,
      name: "Artist's Corner at Phool Bagh",
      image: "/placeholder.svg?height=200&width=300",
      vibe: "Creative",
      rating: 4.5,
    },
    content:
      "Perfect spot for creative souls! Met some amazing local artists here and got inspired for my next project. The energy is incredible.",
    likes: 31,
    comments: 12,
  },
]

const vibeColors = {
  Romantic: "bg-pink-100 text-pink-800",
  Serene: "bg-blue-100 text-blue-800",
  Creative: "bg-purple-100 text-purple-800",
}

export default function DiscoverPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Discover</h1>
              <p className="text-sm text-gray-600">Community stories & finds</p>
            </div>
          </div>
        </div>
      </header>
      {/* Feed */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {discoveryFeed.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.userAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{post.user}</span>
                      {post.type === "new_spot" && (
                        <Badge variant="secondary" className="text-xs">
                          New Spot
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
              </div>

              {/* Spot Image */}
              <div className="relative">
                <Image
                  src={post.spot.image || "/placeholder.svg"}
                  alt={post.spot.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">{post.spot.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${vibeColors[post.spot.vibe as keyof typeof vibeColors]}`}>
                          {post.spot.vibe}
                        </Badge>
                        <div className="flex items-center gap-1 text-white">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs">{post.spot.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/spot/${post.spot.id}`}>
                      <Button size="sm" variant="secondary" className="text-xs">
                        View Spot
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-4 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>

                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSave(post.id)}
                    className="text-gray-600 hover:text-yellow-500 transition-colors"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${savedPosts.includes(post.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Load More */}
        <div className="text-center py-4">
          <Button variant="outline">Load More Stories</Button>
        </div>
      </div>
      <div className="h-20"></div> {/* Bottom padding */}
    </div>
  )
}
