'use client'

import { useRouter } from 'next/navigation'
import { Link2, Palette, Share2, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function MenuBar() {
  const router = useRouter()
  const [activeRoute, setActiveRoute] = useState<string>()

  const menuItems = [
    { icon: Link2, label: 'Links', route: '/user/links' },
    { icon: Palette, label: 'Appear', route: '/user/appear' },
    { icon: Settings, label: 'Settings', route: '/user' },
    { icon: Share2, label: 'Share', route: '/share' },
  ]

  const handleNavigation = (route: string) => {
    setActiveRoute(route)
    router.push(route)
  }

  // Set the active route based on the current path
  useEffect(() => {
    const currentPath = window.location.pathname
    setActiveRoute(currentPath)
  }, [])

  return (
    <nav className="bg-gradient-to-b from-purple-500 to-indigo-600 rounded-3xl p-4 
      h-[100px] w-full md:h-[600px] md:w-[100px] flex flex-col md:flex-col items-center shadow-xl 
      transition-all duration-300 ease-in-out">
      {/* For mobile display: horizontal layout */}
      <div className="flex flex-row md:hidden space-x-4 w-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.route)}
            className={`flex-1 p-3 rounded-xl transition-all duration-300 ease-in-out flex flex-col 
              items-center justify-center group ${activeRoute === item.route
                ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                : 'text-white hover:bg-white/10'}`}
          >
            <item.icon className={`w-6 h-6 mb-2 transition-transform group-hover:scale-110 ${activeRoute === item.route ? 'text-purple-600' : 'text-white'}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* For larger displays: vertical layout */}
      <div className="hidden md:flex flex-col space-y-8 w-full mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.route)}
            className={`w-full p-3 rounded-xl transition-all duration-300 ease-in-out flex flex-col 
              items-center justify-center group ${activeRoute === item.route
                ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                : 'text-white hover:bg-white/10'}`}
          >
            <item.icon className={`w-6 h-6 mb-2 transition-transform group-hover:scale-110 ${activeRoute === item.route ? 'text-purple-600' : 'text-white'}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
