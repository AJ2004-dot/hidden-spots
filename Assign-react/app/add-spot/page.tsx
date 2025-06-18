"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Camera, Star } from "lucide-react"
import Link from "next/link"

const vibeOptions = ["Romantic", "Serene", "Creative", "Adventure", "Social", "Peaceful"]

export default function AddSpotPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    story: "",
    vibe: "",
    location: "",
    bestTime: "",
    tips: "",
    uniqueness: 0,
    safety: 0,
    crowdLevel: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Spot submitted:", formData)
  }

  const RatingInput = ({
    label,
    value,
    onChange,
  }: { label: string; value: number; onChange: (value: number) => void }) => (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onChange(star)} className="focus:outline-none">
            <Star className={`w-6 h-6 ${star <= value ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    </div>
  )

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
              <h1 className="text-lg font-semibold">Add Hidden Spot</h1>
              <p className="text-sm text-gray-600">Share your discovery</p>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Spot Name *</Label>
                <Input
                  id="name"
                  placeholder="Give your spot a memorable name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    placeholder="Area, Gwalior"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what makes this spot special..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Vibe Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vibe & Atmosphere</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>What's the vibe of this spot? *</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {vibeOptions.map((vibe) => (
                  <Badge
                    key={vibe}
                    variant={formData.vibe === vibe ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, vibe })}
                  >
                    {vibe}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Add photos of your spot</p>
                <Button variant="outline" size="sm">
                  Choose Photos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Story */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="story">Share your experience *</Label>
                <Textarea
                  id="story"
                  placeholder="Tell the community about your experience at this spot. What made it special? When did you discover it?"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Ratings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rate This Spot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RatingInput
                label="Uniqueness"
                value={formData.uniqueness}
                onChange={(value) => setFormData({ ...formData, uniqueness: value })}
              />
              <RatingInput
                label="Safety"
                value={formData.safety}
                onChange={(value) => setFormData({ ...formData, safety: value })}
              />
              <RatingInput
                label="Crowd Level (1 = Very Quiet, 5 = Very Busy)"
                value={formData.crowdLevel}
                onChange={(value) => setFormData({ ...formData, crowdLevel: value })}
              />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bestTime">Best Time to Visit</Label>
                <Input
                  id="bestTime"
                  placeholder="e.g., Early morning, Sunset, Weekday evenings"
                  value={formData.bestTime}
                  onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="tips">Tips for Visitors</Label>
                <Textarea
                  id="tips"
                  placeholder="Any tips or advice for people visiting this spot?"
                  value={formData.tips}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="space-y-3">
            <Button type="submit" className="w-full">
              Share Hidden Spot
            </Button>
            <p className="text-xs text-gray-500 text-center">
              By sharing this spot, you agree to our community guidelines and help others discover amazing places.
            </p>
          </div>
        </form>
      </div>
      <div className="h-20"></div> {/* Bottom padding */}
    </div>
  )
}
