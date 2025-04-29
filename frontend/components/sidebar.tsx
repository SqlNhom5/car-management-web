"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, ChevronLeft, ChevronRight, LayoutDashboard, LogOut, ShoppingCart, Users, Users2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"

const menuItems = [
  {
    title: "Tổng Quan",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Quản Lý Xe",
    href: "/xe",
    icon: Car,
  },
  {
    title: "Quản Lý Khách Hàng",
    href: "/khach-hang",
    icon: Users,
  },
  {
    title: "Quản Lý Bán Hàng",
    href: "/ban-hang",
    icon: ShoppingCart,
  },
  {
    title: "Quản Lý Nhân Viên",
    href: "/nhan-vien",
    icon: Users2,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle, isMobile } = useSidebar()

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-gradient-to-b from-blue-900 to-blue-950 text-white transition-all duration-300",
          isOpen ? "w-64" : "w-[70px]",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-blue-800">
          {isOpen ? (
            <h1 className="text-lg font-semibold">Quản Lý Xe</h1>
          ) : (
            <Car className="h-6 w-6 mx-auto text-white" />
          )}
          <Button variant="ghost" size="icon" onClick={toggle} className="ml-auto text-white hover:bg-blue-800">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  pathname === item.href
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-800/50 hover:text-white",
                  !isOpen && "justify-center px-0",
                )}
              >
                <item.icon className={cn("h-5 w-5", !isOpen && "mx-auto")} />
                {isOpen && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-blue-800 p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white",
              !isOpen && "justify-center px-0",
            )}
          >
            <LogOut className={cn("h-5 w-5 mr-2", !isOpen && "mr-0")} />
            {isOpen && <span>Đăng Xuất</span>}
          </Button>
        </div>
      </div>
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={toggle} />}
      <div className={cn("flex-1", isOpen ? "ml-64" : "ml-[70px]")}></div>
    </>
  )
}
