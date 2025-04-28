"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import CarCard from "@/components/car-card"
import { Search, Filter, ChevronDown } from "lucide-react"

// Mock data for cars
const mockCars = [
  {
    id: 1,
    name: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28500,
    mileage: 15000,
    color: "Silver",
    transmission: "Automatic",
    fuelType: "Gasoline",
    engine: "2.5L 4-Cylinder",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: "Honda Accord",
    brand: "Honda",
    model: "Accord",
    year: 2021,
    price: 27000,
    mileage: 22000,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Hybrid",
    engine: "2.0L 4-Cylinder",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    name: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    price: 45000,
    mileage: 5000,
    color: "Red",
    transmission: "Manual",
    fuelType: "Gasoline",
    engine: "5.0L V8",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    name: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 52000,
    mileage: 10000,
    color: "White",
    transmission: "Automatic",
    fuelType: "Electric",
    engine: "Dual Motor",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    name: "BMW 3 Series",
    brand: "BMW",
    model: "3 Series",
    year: 2021,
    price: 42000,
    mileage: 18000,
    color: "Blue",
    transmission: "Automatic",
    fuelType: "Gasoline",
    engine: "2.0L Turbo",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    name: "Audi A4",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 39500,
    mileage: 12000,
    color: "Gray",
    transmission: "Automatic",
    fuelType: "Gasoline",
    engine: "2.0L Turbo",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function CarsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    brand: "",
    priceMin: "",
    priceMax: "",
    year: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [comparisonList, setComparisonList] = useState([])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Load cars data
  useEffect(() => {
    // In a real app, you would fetch from an API
    setCars(mockCars)
    setFilteredCars(mockCars)
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let result = cars

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand)
    }

    if (filters.priceMin) {
      result = result.filter((car) => car.price >= Number.parseInt(filters.priceMin))
    }

    if (filters.priceMax) {
      result = result.filter((car) => car.price <= Number.parseInt(filters.priceMax))
    }

    if (filters.year) {
      result = result.filter((car) => car.year === Number.parseInt(filters.year))
    }

    setFilteredCars(result)
  }, [searchTerm, filters, cars])

  const handleCompare = (car) => {
    if (comparisonList.some((item) => item.id === car.id)) {
      // Remove from comparison
      setComparisonList(comparisonList.filter((item) => item.id !== car.id))
    } else {
      // Add to comparison (max 3)
      if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, car])
      } else {
        alert("You can compare up to 3 cars at a time")
      }
    }
  }

  const handleViewComparison = () => {
    // Store comparison list in localStorage
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList))
    router.push("/compare")
  }

  // Get unique brands for filter
  const brands = [...new Set(cars.map((car) => car.brand))]
  const years = [...new Set(cars.map((car) => car.year))]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>

          {comparisonList.length > 0 && (
            <button
              onClick={handleViewComparison}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              Compare Selected ({comparisonList.length})
            </button>
          )}
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="Search by make, model, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    placeholder="Min Price"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    placeholder="Max Price"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ brand: "", priceMin: "", priceMax: "", year: "" })}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onCompare={handleCompare}
                isInComparison={comparisonList.some((item) => item.id === car.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
