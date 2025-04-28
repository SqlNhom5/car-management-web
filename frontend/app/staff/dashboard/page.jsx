"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Car, Users, DollarSign, Calendar, TrendingUp } from "lucide-react"

export default function StaffDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not logged in or not staff
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "staff" && user.role !== "admin") {
      router.push("/cars")
    }
  }, [user, router])

  if (!user || (user.role !== "staff" && user.role !== "admin")) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Staff Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                <p className="text-3xl font-bold mt-1">42</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>5% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-3xl font-bold mt-1">128</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                <p className="text-3xl font-bold mt-1">$245,500</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Appointments</p>
                <p className="text-3xl font-bold mt-1">15</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">5 scheduled for today</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">John Smith</td>
                    <td className="px-4 py-3 whitespace-nowrap">Tesla Model 3</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 25, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$52,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Sarah Johnson</td>
                    <td className="px-4 py-3 whitespace-nowrap">Honda Accord</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 23, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$27,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Michael Brown</td>
                    <td className="px-4 py-3 whitespace-nowrap">Ford Mustang</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 20, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$45,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Emily Davis</td>
                    <td className="px-4 py-3 whitespace-nowrap">Toyota Camry</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 18, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$28,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Robert Wilson</td>
                    <td className="px-4 py-3 whitespace-nowrap">Test Drive</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 27, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap">10:00 AM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Jennifer Lee</td>
                    <td className="px-4 py-3 whitespace-nowrap">Consultation</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 27, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap">1:30 PM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">David Miller</td>
                    <td className="px-4 py-3 whitespace-nowrap">Test Drive</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 28, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap">11:15 AM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Lisa Anderson</td>
                    <td className="px-4 py-3 whitespace-nowrap">Financing</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 28, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap">3:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
