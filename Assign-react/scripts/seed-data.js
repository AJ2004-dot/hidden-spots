// Seed data for Hidden Spots - Gwalior locations
// This script would populate MongoDB with initial data

const seedData = {
  spots: [
    {
      name: "Sunset Point at Gwalior Fort",
      description:
        "A secluded corner of the fort with breathtaking sunset views, perfect for romantic moments. This hidden gem offers panoramic views of the city below and is especially magical during golden hour.",
      vibe: "Romantic",
      location: {
        type: "Point",
        coordinates: [78.1773, 26.2295], // [longitude, latitude]
      },
      address: "Gwalior Fort, Gwalior, Madhya Pradesh",
      bestTime: "5:30 PM - 7:00 PM",
      tips: [
        "Visit during sunset for the best experience",
        "Bring a camera for stunning photos",
        "Wear comfortable shoes for the climb",
        "Best accessed from the main fort entrance",
      ],
      images: ["https://example.com/sunset-point-1.jpg", "https://example.com/sunset-point-2.jpg"],
      ratings: {
        overall: 4.8,
        uniqueness: 4.9,
        safety: 4.7,
        crowdLevel: 2.1,
        totalRatings: 45,
      },
      tags: ["sunset", "romantic", "fort", "panoramic-view", "photography"],
      isVerified: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      name: "Hidden Garden Café",
      description:
        "A cozy café tucked away in Lashkar area, known for its peaceful ambiance and local art. The perfect spot for intimate conversations and creative inspiration.",
      vibe: "Serene",
      location: {
        type: "Point",
        coordinates: [78.1772, 26.2124],
      },
      address: "Lashkar, Gwalior, Madhya Pradesh",
      bestTime: "9:00 AM - 11:00 AM, 4:00 PM - 6:00 PM",
      tips: [
        "Try their special masala chai",
        "Perfect for reading or working",
        "Local artists often display work here",
        "Free WiFi available",
      ],
      images: ["https://example.com/garden-cafe-1.jpg", "https://example.com/garden-cafe-2.jpg"],
      ratings: {
        overall: 4.6,
        uniqueness: 4.4,
        safety: 4.8,
        crowdLevel: 1.8,
        totalRatings: 32,
      },
      tags: ["cafe", "peaceful", "art", "reading", "wifi"],
      isVerified: true,
      createdAt: new Date("2024-01-10"),
    },
    {
      name: "Artist's Corner at Phool Bagh",
      description:
        "A creative space where local artists gather, surrounded by beautiful gardens. Perfect for inspiration and meeting like-minded creative souls.",
      vibe: "Creative",
      location: {
        type: "Point",
        coordinates: [78.1821, 26.2183],
      },
      address: "Phool Bagh, Gwalior, Madhya Pradesh",
      bestTime: "10:00 AM - 12:00 PM, 3:00 PM - 6:00 PM",
      tips: [
        "Great for meeting local artists",
        "Bring your sketchbook",
        "Check for art events on weekends",
        "Beautiful garden setting",
      ],
      images: ["https://example.com/artist-corner-1.jpg"],
      ratings: {
        overall: 4.5,
        uniqueness: 4.6,
        safety: 4.5,
        crowdLevel: 2.3,
        totalRatings: 28,
      },
      tags: ["art", "creative", "garden", "community", "events"],
      isVerified: true,
      createdAt: new Date("2024-01-08"),
    },
    {
      name: "Riverside Meditation Spot",
      description:
        "A peaceful spot along the river, perfect for solo reflection and morning meditation. The sound of flowing water creates a natural meditation soundtrack.",
      vibe: "Serene",
      location: {
        type: "Point",
        coordinates: [78.1654, 26.2089],
      },
      address: "Riverside, Gwalior, Madhya Pradesh",
      bestTime: "6:00 AM - 8:00 AM, 6:00 PM - 7:30 PM",
      tips: ["Best visited early morning", "Bring a yoga mat", "Very quiet and peaceful", "Watch for wildlife"],
      images: ["https://example.com/riverside-1.jpg"],
      ratings: {
        overall: 4.7,
        uniqueness: 4.3,
        safety: 4.6,
        crowdLevel: 1.5,
        totalRatings: 21,
      },
      tags: ["meditation", "river", "peaceful", "yoga", "nature"],
      isVerified: true,
      createdAt: new Date("2024-01-05"),
    },
    {
      name: "Rooftop Reading Nook",
      description:
        "A quiet rooftop space in the old city with comfortable seating and great natural light. Perfect for book lovers and students.",
      vibe: "Serene",
      location: {
        type: "Point",
        coordinates: [78.1698, 26.2156],
      },
      address: "Old City, Gwalior, Madhya Pradesh",
      bestTime: "8:00 AM - 11:00 AM, 4:00 PM - 7:00 PM",
      tips: ["Bring your own books", "Great natural lighting", "Comfortable cushioned seating", "Avoid during monsoon"],
      images: ["https://example.com/rooftop-reading-1.jpg"],
      ratings: {
        overall: 4.4,
        uniqueness: 4.2,
        safety: 4.3,
        crowdLevel: 1.7,
        totalRatings: 18,
      },
      tags: ["reading", "rooftop", "quiet", "study", "books"],
      isVerified: false,
      createdAt: new Date("2024-01-03"),
    },
  ],

  stories: [
    {
      spotName: "Sunset Point at Gwalior Fort",
      author: "Anonymous",
      content:
        "Proposed to my girlfriend here last month. The sunset was perfect and she said yes! This place will always be special to us.",
      isAnonymous: true,
      likes: 24,
      createdAt: new Date("2024-01-20"),
    },
    {
      spotName: "Sunset Point at Gwalior Fort",
      author: "Priya S.",
      content:
        "Found this spot by accident while exploring the fort. Now it's my go-to place for peaceful evenings and reflection.",
      isAnonymous: false,
      likes: 18,
      createdAt: new Date("2024-01-18"),
    },
    {
      spotName: "Hidden Garden Café",
      author: "Rahul M.",
      content:
        "This café has become my second home. The owner is incredibly welcoming and the atmosphere is perfect for writing.",
      isAnonymous: false,
      likes: 15,
      createdAt: new Date("2024-01-25"),
    },
    {
      spotName: "Artist's Corner at Phool Bagh",
      author: "Anonymous",
      content:
        "Met some amazing local artists here and got inspired for my next project. The energy is incredible and everyone is so supportive.",
      isAnonymous: true,
      likes: 31,
      createdAt: new Date("2024-01-22"),
    },
  ],
}

// Function to seed the database
async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // In a real implementation, this would connect to MongoDB
    // and insert the seed data

    console.log(`Seeding ${seedData.spots.length} spots...`)
    console.log(`Seeding ${seedData.stories.length} stories...`)

    // Example MongoDB operations:
    // await db.collection('spots').insertMany(seedData.spots)
    // await db.collection('stories').insertMany(seedData.stories)

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { seedData, seedDatabase }
}

// Run if called directly
if (typeof require !== "undefined" && require.main === module) {
  seedDatabase()
}
