"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search } from "lucide-react"

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
    stock: 3,
    status: "Available",
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
    stock: 2,
    status: "Available",
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
    stock: 1,
    status: "Available",
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
    stock: 0,
    status: "Out of Stock",
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
    stock: 2,
    status: "Available",
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
    stock: 1,
    status: "Available",
  },
]

export default function ProductsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [currentCar, setCurrentCar] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "",
    fuelType: "",
    engine: "",
    stock: "",
    status: "Available",
  })

  // Redirect if not logged in or not staff
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "staff" && user.role !== "admin") {
      router.push("/cars")
    }
  }, [user, router])

  // Load cars data
  useEffect(() => {
    // In a real app, you would fetch from an API
    setCars(mockCars)
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddNew = () => {
    setCurrentCar(null)
    setFormData({
      name: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      color: "",
      transmission: "",
      fuelType: "",
      engine: "",
      stock: "",
      status: "Available",
    })
    setShowForm(true)
  }

  const handleEdit = (car) => {
    setCurrentCar(car)
    setFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year.toString(),
      price: car.price.toString(),
      mileage: car.mileage.toString(),
      color: car.color,
      transmission: car.transmission,
      fuelType: car.fuelType,
      engine: car.engine,
      stock: car.stock.toString(),
      status: car.status,
    })
    setShowForm(true)
  }

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      // In a real app, you would call an API to delete
      setCars(cars.filter((car) => car.id !== carId))
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.brand || !formData.model || !formData.year || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    // Create new car object
    const carData = {
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      year: Number.parseInt(formData.year),
      price: Number.parseFloat(formData.price),
      mileage: Number.parseInt(formData.mileage) || 0,
      color: formData.color,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      engine: formData.engine,
      stock: Number.parseInt(formData.stock) || 0,
      status: Number.parseInt(formData.stock) > 0 ? "Available" : "Out of Stock",
    }

    if (currentCar) {
      // Update existing car
      const updatedCars = cars.map((car) => {
        if (car.id === currentCar.id) {
          return { ...carData, id: car.id }
        }
        return car
      })
      setCars(updatedCars)
    } else {
      // Add new car
      const newCar = {
        ...carData,
        id: Math.max(...cars.map((car) => car.id)) + 1,
      }
      setCars([...cars, newCar])
    }

    setShowForm(false)
  }

  if (!user || (user.role !== "staff" && user.role !== "admin")) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <Button onClick={handleAddNew} className="flex items-center">
            <Plus className="h-5 w-5 mr-1" />
            Add New Car
          </Button>
        </div>

        {showForm ? (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{currentCar ? "Edit Car" : "Add New Car"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">{currentCar ? "Update Car" : "Add Car"}</Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                placeholder="Search cars by name, brand, or model..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        )}

        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specifications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCars.map((car) => (
                  <tr key={car.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{car.name}</div>
                      <div className="text-sm text-gray-500">
                        {car.brand} {car.model} ({car.year})
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{car.engine}</div>
                      <div className="text-sm text-gray-500">
                        {car.transmission} • {car.fuelType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {car.color} • {car.mileage.toLocaleString()} miles
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${car.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{car.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(car)} className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCars.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No cars found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
