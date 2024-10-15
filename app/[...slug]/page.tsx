'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Twitter, Globe, MoreHorizontal } from 'lucide-react'

interface Account {
  platform: string
  url: string
}

interface Profile {
  image: string
  name: string
  headline: string
  accounts: Account[]
}

export default function CatchAllPage() {
  const params = useParams()
  const slug = params?.slug
  const [profileData, setProfileData] = useState<Profile | null>(null)
  const [error, setError] = useState("")

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/cardinfo?username=${slugPath}`)
        const profile = res.data.profile // Access the profile object directly
        console.log("Response Data :", res)
        console.log("Profile Data :", profile)
        if (profile) {
          setProfileData(profile)
        } else {
          setError("No profile found.")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error while fetching data.")
      }
    }

    fetchData()
  }, [slugPath])

  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />
      case 'instagram':
        return <Instagram size={20} />
      case 'linkedin':
        return <Linkedin size={20} />
      case 'twitter':
        return <Twitter size={20} />
      default:
        return <Globe size={20} />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="w-full max-w-md space-y-6 backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="text-center">
          <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
            <AvatarImage src={profileData?.image || '/placeholder.svg'} alt={profileData?.name} />
            <AvatarFallback>{profileData?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <h1 className="mt-6 text-3xl font-bold text-white">{profileData?.name || 'User Name'}</h1>
          <p className="mt-2 text-xl text-white/80">{profileData?.headline || 'Title'}</p>
        </div>
        <div className="space-y-4">
          {profileData?.accounts?.map((account, index) => (
            <Button
              key={index}
              variant="secondary"
              className="w-full justify-between text-left font-medium bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 ease-in-out transform hover:scale-105"
              asChild
            >
              <a href={account.url} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-3">
                  {getIconForPlatform(account.platform)}
                  {account.platform}
                </span>
                <MoreHorizontal size={20} />
              </a>
            </Button>
          ))}
        </div>
        {error && (
          <div className="mt-4 text-red-300 text-center bg-red-500/20 p-3 rounded-lg">{error}</div>
        )}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            linkhive/{slugPath}
          </Button>
        </div>
      </div>
    </div>
  )
}
