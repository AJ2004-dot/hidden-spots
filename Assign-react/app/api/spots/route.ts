import { type NextRequest, NextResponse } from "next/server"

// Sample data - in a real app, this would come from MongoDB
const spots = [
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
    createdAt: new Date("2024-01-15"),
    location: "Gwalior Fort, Gwalior",
    bestTime: "5:30 PM - 7:00 PM",
    tips: [
      "Visit during sunset for the best experience",
      "Bring a camera for stunning photos",
      "Wear comfortable shoes for the climb",
    ],
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
    createdAt: new Date("2024-01-10"),
    location: "Lashkar, Gwalior",
    bestTime: "9:00 AM - 11:00 AM, 4:00 PM - 6:00 PM",
    tips: ["Try their special masala chai", "Perfect for reading or working", "Local artists often display work here"],
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
    createdAt: new Date("2024-01-08"),
    location: "Phool Bagh, Gwalior",
    bestTime: "10:00 AM - 12:00 PM, 3:00 PM - 6:00 PM",
    tips: ["Great for meeting local artists", "Bring your sketchbook", "Check for art events on weekends"],
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
    createdAt: new Date("2024-01-05"),
    location: "Riverside, Gwalior",
    bestTime: "6:00 AM - 8:00 AM, 6:00 PM - 7:30 PM",
    tips: ["Best visited early morning", "Bring a yoga mat", "Very quiet and peaceful"],
  },
]

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "26.2183") // Default to Gwalior center
  const lng = Number.parseFloat(searchParams.get("lng") || "78.1821")
  const radius = Number.parseFloat(searchParams.get("radius") || "10") // Default 10km radius
  const vibe = searchParams.get("vibe")
  const search = searchParams.get("search")

  let filteredSpots = spots

  // Filter by proximity
  filteredSpots = filteredSpots.filter((spot) => {
    const distance = calculateDistance(lat, lng, spot.latitude, spot.longitude)
    return distance <= radius
  })

  // Filter by vibe
  if (vibe) {
    filteredSpots = filteredSpots.filter((spot) => spot.vibe.toLowerCase() === vibe.toLowerCase())
  }

  // Filter by search query
  if (search) {
    filteredSpots = filteredSpots.filter(
      (spot) =>
        spot.name.toLowerCase().includes(search.toLowerCase()) ||
        spot.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Add distance to each spot
  const spotsWithDistance = filteredSpots.map((spot) => ({
    ...spot,
    distance: calculateDistance(lat, lng, spot.latitude, spot.longitude),
  }))

  // Sort by distance
  spotsWithDistance.sort((a, b) => a.distance - b.distance)

  return NextResponse.json({
    spots: spotsWithDistance,
    total: spotsWithDistance.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "vibe", "location", "story", "latitude", "longitude"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new spot
    const newSpot = {
      id: spots.length + 1,
      name: body.name,
      description: body.description,
      vibe: body.vibe,
      latitude: body.latitude,
      longitude: body.longitude,
      location: body.location,
      bestTime: body.bestTime || "",
      tips: body.tips ? body.tips.split("\n").filter((tip: string) => tip.trim()) : [],
      rating: 0, // Will be calculated from ratings
      uniqueness: body.uniqueness || 0,
      safety: body.safety || 0,
      crowdLevel: body.crowdLevel || 0,
      images: body.images || [],
      stories: 1, // Initial story from creator
      createdAt: new Date(),
      createdBy: body.userId || "anonymous",
    }

    // In a real app, save to MongoDB
    spots.push(newSpot)

    return NextResponse.json(
      {
        message: "Spot created successfully",
        spot: newSpot,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating spot:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
