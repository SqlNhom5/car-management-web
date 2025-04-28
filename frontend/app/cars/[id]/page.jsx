"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone, Mail, Car, DollarSign, Calendar as CalendarIcon } from "lucide-react"

// Mock data for a single car
const mockCar = {
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
    description: "The Toyota Camry is a reliable and comfortable sedan perfect for families and daily commuting. Features include advanced safety systems, a spacious interior, and excellent fuel economy.",
    features: [
        "Advanced Safety Features",
        "Bluetooth Connectivity",
        "Backup Camera",
        "Cruise Control",
        "Air Conditioning",
        "Power Windows",
        "Power Locks",
        "Keyless Entry",
    ],
    images: [
        "/cars/camry-1.jpg",
        "/cars/camry-2.jpg",
        "/cars/camry-3.jpg",
    ],
}

export default function CarDetailsPage({ params }) {
    const { user } = useAuth()
    const router = useRouter()
    const [car, setCar] = useState(null)
    const [showAppointmentForm, setShowAppointmentForm] = useState(false)
    const [appointmentData, setAppointmentData] = useState({
        date: "",
        time: "",
        name: user?.name || "",
        email: "",
        phone: "",
        notes: "",
    })

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user, router])

    // Load car data
    useEffect(() => {
        // In a real app, you would fetch from an API using params.id
        setCar(mockCar)
    }, [params.id])

    const handleAppointmentSubmit = (e) => {
        e.preventDefault()

        // Create a new appointment object
        const newAppointment = {
            id: Date.now(), // Use timestamp as a simple unique ID
            carId: car.id,
            carName: car.name,
            customerName: appointmentData.name,
            customerEmail: appointmentData.email,
            customerPhone: appointmentData.phone,
            date: appointmentData.date,
            time: appointmentData.time,
            status: "Pending",
            notes: appointmentData.notes,
        }

        // Get existing appointments from localStorage
        const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")

        // Add the new appointment
        const updatedAppointments = [...existingAppointments, newAppointment]

        // Save back to localStorage
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments))

        // Show success message
        alert("Appointment scheduled successfully! A staff member will contact you to confirm.")
        setShowAppointmentForm(false)
    }

    if (!user || !car) return null

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Car Details */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{car.name}</h1>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center">
                                    <Car className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{car.year}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{car.mileage.toLocaleString()} miles</span>
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">${car.price.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600">{car.transmission}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Description</h2>
                                <p className="text-gray-600">{car.description}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Features</h2>
                                <ul className="grid grid-cols-2 gap-2">
                                    {car.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-500">Brand</p>
                                        <p className="font-medium">{car.brand}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Model</p>
                                        <p className="font-medium">{car.model}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Year</p>
                                        <p className="font-medium">{car.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Color</p>
                                        <p className="font-medium">{car.color}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Transmission</p>
                                        <p className="font-medium">{car.transmission}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Fuel Type</p>
                                        <p className="font-medium">{car.fuelType}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Engine</p>
                                        <p className="font-medium">{car.engine}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Stock</p>
                                        <p className="font-medium">{car.stock} available</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Appointment Section */}
                    <div>
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Schedule a Test Drive</h2>
                            {!showAppointmentForm ? (
                                <Button
                                    onClick={() => setShowAppointmentForm(true)}
                                    className="w-full flex items-center justify-center"
                                >
                                    <CalendarIcon className="h-5 w-5 mr-2" />
                                    Schedule Appointment
                                </Button>
                            ) : (
                                <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={appointmentData.date}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, date: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={appointmentData.time}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, time: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={appointmentData.name}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, name: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={appointmentData.email}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, email: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={appointmentData.phone}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, phone: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            value={appointmentData.notes}
                                            onChange={(e) =>
                                                setAppointmentData({ ...appointmentData, notes: e.target.value })
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            type="submit"
                                            className="flex-1"
                                        >
                                            Schedule
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowAppointmentForm(false)}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
} 