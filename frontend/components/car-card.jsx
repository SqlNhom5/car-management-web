"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Star } from "lucide-react"

export default function CarCard({ car, onCompare, isInComparison }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={car.image || "/placeholder.svg?height=400&width=600"}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{car.name}</h3>
            <p className="text-sm text-gray-600">
              {car.brand} {car.model}
            </p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{car.rating}</span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
          <p className="text-sm text-gray-600">
            {car.year} • {car.mileage.toLocaleString()} miles
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            <span>{car.engine}</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            <span>{car.color}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link
            href={`/cars/${car.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center text-sm font-medium"
          >
            View Details
          </Link>
          <button
            onClick={() => onCompare(car)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              isInComparison
                ? "bg-green-100 text-green-800 border border-green-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {isInComparison ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  )
}
