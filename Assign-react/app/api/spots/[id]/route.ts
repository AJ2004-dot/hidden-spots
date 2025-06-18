import { type NextRequest, NextResponse } from "next/server"

// Sample spot data with detailed information
const spotDetails = {
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
    latitude: 26.2295,
    longitude: 78.1773,
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
        createdAt: new Date("2024-01-20"),
      },
      {
        id: 2,
        author: "Priya S.",
        content:
          "Found this spot by accident while exploring the fort. Now it's my go-to place for peaceful evenings and reflection.",
        likes: 18,
        date: "1 month ago",
        createdAt: new Date("2024-01-15"),
      },
    ],
    createdAt: new Date("2024-01-15"),
    totalVisits: 156,
    averageStayTime: "45 minutes",
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
    latitude: 26.2124,
    longitude: 78.1772,
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
        createdAt: new Date("2024-01-25"),
      },
      {
        id: 2,
        author: "Anonymous",
        content:
          "Love the local art exhibitions here. Discovered some amazing artists and bought a beautiful painting for my home.",
        likes: 12,
        date: "1 week ago",
        createdAt: new Date("2024-01-18"),
      },
    ],
    createdAt: new Date("2024-01-10"),
    totalVisits: 89,
    averageStayTime: "1.5 hours",
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const spotId = params.id
  const spot = spotDetails[spotId as keyof typeof spotDetails]

  if (!spot) {
    return NextResponse.json({ error: "Spot not found" }, { status: 404 })
  }

  return NextResponse.json({ spot })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const spotId = params.id
    const body = await request.json()
    const { content, author = "Anonymous" } = body

    if (!content) {
      return NextResponse.json({ error: "Story content is required" }, { status: 400 })
    }

    const spot = spotDetails[spotId as keyof typeof spotDetails]
    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 })
    }

    // Create new story
    const newStory = {
      id: spot.stories.length + 1,
      author,
      content,
      likes: 0,
      date: "Just now",
      createdAt: new Date(),
    }

    // Add story to spot
    spot.stories.unshift(newStory)

    return NextResponse.json(
      {
        message: "Story added successfully",
        story: newStory,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding story:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
