"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search, DollarSign, Calendar, User, Car, CreditCard, Tag } from "lucide-react"

// Mock data for sales
const mockSales = [
  {
    id: 1,
    customer: "John Smith",
    customerId: 1,
    car: "Tesla Model 3",
    carId: 4,
    saleDate: "2023-04-25",
    amount: 52000,
    paymentMethod: "Financing",
    status: "Completed",
    discount: 0,
    notes: "Customer traded in previous vehicle for $15,000 credit.",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    customerId: 2,
    car: "Honda Accord",
    carId: 2,
    saleDate: "2023-04-23",
    amount: 27000,
    paymentMethod: "Cash",
    status: "Completed",
    discount: 1000,
    notes: "Customer received $1,000 discount for first-time buyer program.",
  },
  {
    id: 3,
    customer: "Michael Brown",
    customerId: 3,
    car: "Ford Mustang",
    carId: 3,
    saleDate: "2023-04-20",
    amount: 45000,
    paymentMethod: "Financing",
    status: "Pending",
    discount: 2000,
    notes: "Awaiting final loan approval from bank.",
  },
  {
    id: 4,
    customer: "Emily Davis",
    customerId: 4,
    car: "Toyota Camry",
    carId: 1,
    saleDate: "2023-04-18",
    amount: 28500,
    paymentMethod: "Financing",
    status: "Completed",
    discount: 500,
    notes: "Customer purchased extended warranty package.",
  },
]

// Mock data for customers and cars (for dropdowns)
const mockCustomers = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
]

const mockCars = [
  { id: 1, name: "Toyota Camry", price: 28500 },
  { id: 2, name: "Honda Accord", price: 27000 },
  { id: 3, name: "Ford Mustang", price: 45000 },
  { id: 4, name: "Tesla Model 3", price: 52000 },
  { id: 5, name: "BMW 3 Series", price: 42000 },
  { id: 6, name: "Audi A4", price: 39500 },
]

export default function SalesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [sales, setSales] = useState([])
  const [customers, setCustomers] = useState([])
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [currentSale, setCurrentSale] = useState(null)
  const [formData, setFormData] = useState({
    customerId: "",
    carId: "",
    saleDate: new Date().toISOString().split("T")[0],
    amount: "",
    paymentMethod: "Financing",
    status: "Pending",
    discount: "0",
    notes: "",
  })

  // Redirect if not logged in or not staff
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "staff" && user.role !== "admin") {
      router.push("/cars")
    }
  }, [user, router])

  // Load sales, customers, and cars data
  useEffect(() => {
    // In a real app, you would fetch from an API
    setSales(mockSales)
    setCustomers(mockCustomers)
    setCars(mockCars)
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddNew = () => {
    setCurrentSale(null)
    setFormData({
      customerId: "",
      carId: "",
      saleDate: new Date().toISOString().split("T")[0],
      amount: "",
      paymentMethod: "Financing",
      status: "Pending",
      discount: "0",
      notes: "",
    })
    setShowForm(true)
  }

  const handleEdit = (sale) => {
    setCurrentSale(sale)
    setFormData({
      customerId: sale.customerId.toString(),
      carId: sale.carId.toString(),
      saleDate: sale.saleDate,
      amount: sale.amount.toString(),
      paymentMethod: sale.paymentMethod,
      status: sale.status,
      discount: sale.discount.toString(),
      notes: sale.notes,
    })
    setShowForm(true)
  }

  const handleDelete = (saleId) => {
    if (window.confirm("Are you sure you want to delete this sale record?")) {
      // In a real app, you would call an API to delete
      setSales(sales.filter((sale) => sale.id !== saleId))
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Auto-fill amount when car is selected
    if (name === "carId" && value) {
      const selectedCar = cars.find((car) => car.id === Number.parseInt(value))
      if (selectedCar) {
        setFormData((prev) => ({
          ...prev,
          amount: (selectedCar.price - Number.parseInt(prev.discount || 0)).toString(),
        }))
      }
    }

    // Update amount when discount changes
    if (name === "discount" && formData.carId) {
      const selectedCar = cars.find((car) => car.id === Number.parseInt(formData.carId))
      if (selectedCar) {
        const discount = value ? Number.parseInt(value) : 0
        setFormData((prev) => ({
          ...prev,
          amount: (selectedCar.price - discount).toString(),
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.customerId || !formData.carId || !formData.amount) {
      alert("Please fill in all required fields")
      return
    }

    // Create new sale object
    const selectedCustomer = customers.find((c) => c.id === Number.parseInt(formData.customerId))
    const selectedCar = cars.find((c) => c.id === Number.parseInt(formData.carId))

    const saleData = {
      customerId: Number.parseInt(formData.customerId),
      customer: selectedCustomer ? selectedCustomer.name : "",
      carId: Number.parseInt(formData.carId),
      car: selectedCar ? selectedCar.name : "",
      saleDate: formData.saleDate,
      amount: Number.parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      status: formData.status,
      discount: Number.parseFloat(formData.discount) || 0,
      notes: formData.notes,
    }

    if (currentSale) {
      // Update existing sale
      const updatedSales = sales.map((sale) => {
        if (sale.id === currentSale.id) {
          return { ...saleData, id: sale.id }
        }
        return sale
      })
      setSales(updatedSales)
    } else {
      // Add new sale
      const newSale = {
        ...saleData,
        id: Math.max(...sales.map((sale) => sale.id)) + 1,
      }
      setSales([...sales, newSale])
    }

    setShowForm(false)
  }

  if (!user || (user.role !== "staff" && user.role !== "admin")) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
          <Button onClick={handleAddNew} className="flex items-center">
            <Plus className="h-5 w-5 mr-1" />
            Add New Sale
          </Button>
        </div>

        {showForm ? (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{currentSale ? "Edit Sale" : "Add New Sale"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Car className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="carId"
                      value={formData.carId}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    >
                      <option value="">Select Car</option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.name} - ${car.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="saleDate"
                      value={formData.saleDate}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                    >
                      <option value="Financing">Financing</option>
                      <option value="Cash">Cash</option>
                      <option value="Lease">Lease</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Final Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows="3"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">{currentSale ? "Update Sale" : "Add Sale"}</Button>
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
                placeholder="Search sales by customer, car, status, or payment method..."
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
                    Sale ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{sale.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.car}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(sale.saleDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{sale.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${sale.amount.toLocaleString()}</div>
                      {sale.discount > 0 && (
                        <div className="text-xs text-green-600">Discount: ${sale.discount.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sale.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : sale.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(sale)} className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(sale.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSales.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No sales found matching your search criteria.
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
