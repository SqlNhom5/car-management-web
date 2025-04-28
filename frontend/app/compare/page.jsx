"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Image from "next/image"
import { Check, X, ArrowLeft } from "lucide-react"

export default function ComparePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [comparisonList, setComparisonList] = useState([])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Load comparison list from localStorage
  useEffect(() => {
    const storedList = localStorage.getItem("comparisonList")
    if (storedList) {
      setComparisonList(JSON.parse(storedList))
    }
  }, [])

  if (!user) return null

  if (comparisonList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.push("/cars")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </button>

          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Cars Selected for Comparison</h1>
            <p className="text-gray-500 mb-6">Please select cars to compare from our inventory.</p>
            <button
              onClick={() => router.push("/cars")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Browse Cars
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Define comparison categories
  const categories = [
    { name: "Price", key: "price", format: (val) => `$${val.toLocaleString()}` },
    { name: "Year", key: "year" },
    { name: "Mileage", key: "mileage", format: (val) => `${val.toLocaleString()} miles` },
    { name: "Transmission", key: "transmission" },
    { name: "Fuel Type", key: "fuelType" },
    { name: "Engine", key: "engine" },
    { name: "Color", key: "color" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/cars")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cars
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Compare Cars</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Car Images and Names */}
          <div className="grid grid-cols-4 border-b">
            <div className="p-4 font-medium text-gray-500 border-r">
              <h2 className="text-lg">Comparison</h2>
            </div>
            {comparisonList.map((car) => (
              <div key={car.id} className="p-4 text-center">
                <div className="relative h-40 mb-4">
                  <Image
                    src={car.image || "/placeholder.svg?height=400&width=600"}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-sm text-gray-600">
                  {car.brand} {car.model}
                </p>
                <button
                  onClick={() => {
                    const newList = comparisonList.filter((item) => item.id !== car.id)
                    setComparisonList(newList)
                    localStorage.setItem("comparisonList", JSON.stringify(newList))
                  }}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm flex items-center justify-center mx-auto"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Comparison Categories */}
          {categories.map((category) => (
            <div key={category.key} className="grid grid-cols-4 border-b">
              <div className="p-4 font-medium text-gray-700 bg-gray-50 border-r">{category.name}</div>
              {comparisonList.map((car) => {
                const value = car[category.key]
                const formattedValue = category.format ? category.format(value) : value

                // Find best value (lowest price, lowest mileage, newest year)
                let isBest = false
                if (category.key === "price") {
                  isBest = car.price === Math.min(...comparisonList.map((c) => c.price))
                } else if (category.key === "mileage") {
                  isBest = car.mileage === Math.min(...comparisonList.map((c) => c.mileage))
                } else if (category.key === "year") {
                  isBest = car.year === Math.max(...comparisonList.map((c) => c.year))
                }

                return (
                  <div key={`${car.id}-${category.key}`} className={`p-4 text-center ${isBest ? "bg-green-50" : ""}`}>
                    <div className="flex items-center justify-center">
                      {isBest && <Check className="h-4 w-4 text-green-600 mr-1" />}
                      <span className={isBest ? "font-medium text-green-800" : ""}>{formattedValue}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
