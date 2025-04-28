"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Menu, X, Car, Users, ShoppingCart, User, LogOut } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const isActive = (path) => {
    return pathname === path ? "bg-blue-700" : ""
  }

  const clientLinks = [
    { href: "/cars", label: "Cars", icon: Car },
    { href: "/compare", label: "Compare", icon: ShoppingCart },
  ]

  const staffLinks = [
    { href: "/staff/dashboard", label: "Dashboard", icon: Car },
    { href: "/staff/products", label: "Products", icon: Car },
    { href: "/staff/customers", label: "Customers", icon: Users },
    { href: "/staff/sales", label: "Sales", icon: ShoppingCart },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Car },
    { href: "/admin/employees", label: "Employees", icon: Users },
  ]

  let links = []
  if (user.role === "client") links = clientLinks
  else if (user.role === "staff") links = staffLinks
  else if (user.role === "admin") links = adminLinks

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Car className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">CarDealership</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive(link.href)} hover:bg-blue-700`}
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={logout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-blue-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${isActive(link.href)} hover:bg-blue-700`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-blue-700 pt-2 mt-2">
              <div className="flex items-center px-3 py-2">
                <User className="h-5 w-5 mr-2" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
